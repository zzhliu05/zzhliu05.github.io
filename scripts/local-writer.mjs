import http from 'node:http';
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const postsDir = path.join(root, 'src', 'content', 'posts');
const host = '127.0.0.1';
const port = Number(process.env.LOCAL_WRITER_PORT ?? 8787);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${host}:${port}`);

    if (req.method === 'GET' && url.pathname === '/') {
      return html(res, renderPage());
    }

    if (req.method === 'GET' && url.pathname === '/api/posts') {
      return json(res, 200, { ok: true, posts: await listPosts() });
    }

    if (req.method === 'GET' && url.pathname.startsWith('/api/posts/')) {
      const slug = decodeURIComponent(url.pathname.slice('/api/posts/'.length));
      return json(res, 200, { ok: true, post: await readPost(slug) });
    }

    if (req.method === 'POST' && url.pathname === '/api/publish') {
      const payload = JSON.parse(await readBody(req));
      const result = await publishPost(payload);
      return json(res, 200, result);
    }

    return text(res, 404, 'Not found');
  } catch (error) {
    return json(res, 500, {
      ok: false,
      message: error instanceof Error ? error.message : String(error)
    });
  }
});

server.listen(port, host, () => {
  console.log(`Local blog writer: http://${host}:${port}/`);
});

async function listPosts() {
  const files = await fs.readdir(postsDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const slug = file.slice(0, -3);
        const post = await readPost(slug);
        return {
          slug,
          title: post.title,
          description: post.description,
          date: post.date,
          tags: post.tags,
          draft: post.draft
        };
      })
  );

  return posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

async function readPost(slug) {
  const safeSlug = requiredSlug(slug);
  const postPath = path.join(postsDir, `${safeSlug}.md`);
  const file = await fs.readFile(postPath, 'utf8');
  return { slug: safeSlug, ...parseMarkdown(file) };
}

async function publishPost(input) {
  const mode = input.mode === 'edit' ? 'edit' : 'create';
  const originalSlug = mode === 'edit' ? requiredSlug(input.originalSlug) : '';
  const title = required(input.title, 'Title');
  const description = required(input.description, 'Description');
  const body = required(input.body, 'Body');
  const tags = String(input.tags ?? '')
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  const draft = Boolean(input.draft);
  const slug = normalizeSlug(input.slug || title);
  if (!slug) {
    throw new Error('Cannot generate a valid slug. Please enter one manually.');
  }

  const clean = await git(['status', '--porcelain']);
  if (clean.trim()) {
    throw new Error('Working tree is not clean. Commit or discard existing changes first.');
  }

  await git(['pull', '--ff-only', 'origin', 'main']);

  const postPath = path.join(postsDir, `${slug}.md`);
  const oldPath = originalSlug ? path.join(postsDir, `${originalSlug}.md`) : '';

  if (mode === 'create' && (await exists(postPath))) {
    throw new Error(`Post already exists: src/content/posts/${slug}.md`);
  }

  if (mode === 'edit') {
    if (!(await exists(oldPath))) {
      throw new Error(`Original post does not exist: src/content/posts/${originalSlug}.md`);
    }
    if (slug !== originalSlug && (await exists(postPath))) {
      throw new Error(`Target slug already exists: src/content/posts/${slug}.md`);
    }
  }

  const date = input.date || new Date().toISOString().slice(0, 10);
  await fs.writeFile(
    postPath,
    renderMarkdown({ title, description, date, tags, draft, body }),
    'utf8'
  );

  if (mode === 'edit' && slug !== originalSlug) {
    await fs.rm(oldPath);
  }

  await command('npm', ['run', 'build']);
  await git(['add', 'src/content/posts']);

  const staged = await git(['diff', '--cached', '--name-only']);
  if (!staged.trim()) {
    throw new Error('No article changes to commit.');
  }

  await git([
    'commit',
    '-m',
    mode === 'edit' ? `blog: update ${slug}` : `blog: publish ${slug}`,
    '-m',
    'Co-authored-by: codex <codex@openai.com>'
  ]);
  await gitPush();

  return {
    ok: true,
    mode,
    slug,
    path: `src/content/posts/${slug}.md`,
    url: `https://zzhliu05.github.io/posts/${encodeURIComponent(slug)}/`
  };
}

function parseMarkdown(file) {
  const match = file.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error('Post is missing frontmatter.');
  }

  const data = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const raw = line.slice(separator + 1).trim();
    data[key] = parseFrontmatterValue(raw);
  }

  return {
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: Boolean(data.draft),
    body: match[2].trim()
  };
}

function parseFrontmatterValue(raw) {
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  if (raw.startsWith('"') || raw.startsWith('[')) {
    return JSON.parse(raw);
  }
  return raw;
}

function required(value, label) {
  const cleaned = String(value ?? '').trim();
  if (!cleaned) {
    throw new Error(`${label} is required.`);
  }
  return cleaned;
}

function requiredSlug(value) {
  const slug = normalizeSlug(value);
  if (!slug) {
    throw new Error('A valid slug is required.');
  }
  return slug;
}

function normalizeSlug(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{Script=Han}\p{Letter}\p{Number}_-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function renderMarkdown(post) {
  return `---\ntitle: ${yamlString(post.title)}\ndescription: ${yamlString(post.description)}\ndate: ${post.date}\ntags: [${post.tags.map(yamlString).join(', ')}]\ndraft: ${post.draft}\n---\n\n${post.body.trim()}\n`;
}

function yamlString(value) {
  return JSON.stringify(value);
}

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function git(args) {
  return command('git', args);
}

async function gitPush() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    await git(['push', 'origin', 'main']);
    return;
  }

  const basic = Buffer.from(`zzhliu05:${token}`).toString('base64');
  await git([
    '-c',
    `http.https://github.com/.extraheader=AUTHORIZATION: basic ${basic}`,
    'push',
    'origin',
    'main'
  ]);
}

function command(file, args) {
  return new Promise((resolve, reject) => {
    execFile(file, args, { cwd: root, shell: process.platform === 'win32' }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`${file} ${args.join(' ')}\n${stdout}${stderr}`.trim()));
        return;
      }
      resolve(stdout);
    });
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_500_000) {
        req.destroy(new Error('Request body is too large.'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function html(res, body) {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(body);
}

function text(res, status, body) {
  res.writeHead(status, { 'content-type': 'text/plain; charset=utf-8' });
  res.end(body);
}

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function renderPage() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>&#26412;&#22320;&#21338;&#23458;&#20889;&#20316;</title>
  <style>
    :root { --text:#202124; --muted:#6b7280; --line:#d7dce1; --soft:#f6f7f8; --link:#1f5f8b; }
    * { box-sizing: border-box; }
    body { margin: 0; color: var(--text); font: 16px/1.7 "Noto Sans SC", "Microsoft YaHei", Arial, sans-serif; background: #fff; }
    main { width: min(1120px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 56px; }
    header { border-bottom: 1px solid var(--line); margin-bottom: 24px; padding-bottom: 18px; }
    h1 { margin: 0 0 6px; font-size: 28px; }
    p { margin: 0; color: var(--muted); }
    .layout { display: grid; grid-template-columns: minmax(0, 260px) minmax(0, 1fr); gap: 24px; }
    .layout > *, .row > *, label { min-width: 0; }
    .panel { border: 1px solid var(--line); background: #fcfcfc; padding: 14px; }
    .posts { display: grid; gap: 8px; margin-top: 12px; }
    .post-button { border: 1px solid var(--line); background: #fff; color: var(--text); text-align: left; overflow-wrap: anywhere; padding: 9px 10px; cursor: pointer; }
    .post-button.active { border-color: var(--text); background: var(--soft); }
    form { display: grid; gap: 16px; }
    label { display: grid; gap: 6px; font-weight: 700; }
    input, textarea { width: 100%; border: 1px solid var(--line); color: var(--text); font: inherit; padding: 10px 12px; }
    textarea { min-height: 380px; resize: vertical; font-family: "Cascadia Code", Consolas, monospace; line-height: 1.6; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .check { display: flex; align-items: center; gap: 8px; font-weight: 400; }
    .check input { width: auto; }
    .actions { display: flex; flex-wrap: wrap; gap: 10px; }
    button, .button-link { border: 1px solid var(--text); background: var(--text); color: #fff; display: inline-flex; align-items: center; font: inherit; line-height: 1.7; padding: 10px 16px; cursor: pointer; text-decoration: none; }
    button.secondary, .button-link.secondary { background: #fff; color: var(--text); }
    button:disabled { cursor: wait; opacity: .65; }
    .status { border: 1px solid var(--line); background: var(--soft); min-height: 48px; padding: 12px; white-space: pre-wrap; }
    .hint { color: var(--muted); font-size: 14px; font-weight: 400; }
    @media (max-width: 820px) { .layout, .row { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>&#26412;&#22320;&#21338;&#23458;&#20889;&#20316;</h1>
      <p>&#21482;&#36816;&#34892;&#22312; localhost&#12290;&#21487;&#20197;&#26032;&#24314;&#25110;&#20462;&#25913;&#25991;&#31456;&#65292;&#25552;&#20132;&#21518;&#20250;&#26500;&#24314;&#12289;commit &#24182; push &#21040; GitHub&#12290;</p>
    </header>
    <div class="layout">
      <aside class="panel">
        <a class="button-link secondary" id="newPost" href="/">&#26032;&#24314;&#25991;&#31456;</a>
        <div class="posts" id="posts"></div>
      </aside>
      <section>
        <form id="form">
          <input type="hidden" name="mode" value="create">
          <input type="hidden" name="originalSlug" value="">
          <label>&#26631;&#39064;<input name="title" required placeholder="&#20363;&#22914;&#65306;&#19968;&#20010;&#20851;&#20110;&#39640;&#26031;&#31215;&#20998;&#30340;&#31508;&#35760;"></label>
          <div class="row">
            <label>slug <span class="hint">&#21487;&#30041;&#31354;&#65292;&#23558;&#20174;&#26631;&#39064;&#29983;&#25104;</span><input name="slug" placeholder="gaussian-integral-note"></label>
            <label>&#26631;&#31614; <span class="hint">&#36887;&#21495;&#20998;&#38548;</span><input name="tags" placeholder="&#25968;&#23398;, LaTeX, &#31508;&#35760;"></label>
          </div>
          <label>&#25688;&#35201;<input name="description" required placeholder="&#19968;&#20004;&#21477;&#35805;&#27010;&#25324;&#25991;&#31456;&#12290;"></label>
          <label>&#26085;&#26399;<input name="date" type="date"></label>
          <label>&#27491;&#25991; <span class="hint">&#25903;&#25345; Markdown&#12289;$...$ &#21644; $$...$$</span><textarea name="body" required placeholder="&#36825;&#37324;&#20889;&#27491;&#25991;&#12290;"></textarea></label>
          <label class="check"><input type="checkbox" name="draft"> &#20445;&#23384;&#20026;&#33609;&#31295;&#65292;&#19981;&#22312;&#27491;&#24335;&#31449;&#28857;&#23637;&#31034;</label>
          <div class="actions">
            <button type="submit" id="submit">&#25552;&#20132;&#24182;&#25512;&#36865;</button>
            <a class="button-link secondary" id="reset" href="/">&#28165;&#31354;&#34920;&#21333;</a>
          </div>
          <div class="status" id="status">&#27491;&#22312;&#21152;&#36733;&#25991;&#31456;&#21015;&#34920;&#12290;</div>
        </form>
      </section>
    </div>
  </main>
  <script>
    const form = document.querySelector('#form');
    const statusBox = document.querySelector('#status');
    const submitButton = document.querySelector('#submit');
    const postsBox = document.querySelector('#posts');
    let activeSlug = '';

    function setStatus(message) {
      statusBox.textContent = message;
    }

    function setStatusHtml(message) {
      statusBox.innerHTML = message;
    }

    function setMode(mode, slug = '') {
      form.elements.mode.value = mode;
      form.elements.originalSlug.value = slug;
      activeSlug = slug;
      submitButton.innerHTML = mode === 'edit' ? '&#20445;&#23384;&#20462;&#25913;&#24182;&#25512;&#36865;' : '&#25552;&#20132;&#24182;&#25512;&#36865;';
      document.querySelectorAll('.post-button').forEach((button) => {
        button.classList.toggle('active', button.dataset.slug === activeSlug);
      });
    }

    async function loadPosts() {
      const response = await fetch('/api/posts');
      const result = await response.json();
      if (!result.ok) throw new Error(result.message || 'Failed to load posts');
      postsBox.innerHTML = '';
      for (const post of result.posts) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'post-button';
        button.dataset.slug = post.slug;
        button.textContent = post.title + ' (' + post.slug + ')';
        button.addEventListener('click', () => loadPost(post.slug));
        postsBox.append(button);
      }
      setStatusHtml(result.posts.length ? '&#21487;&#36873;&#25321;&#24050;&#26377;&#25991;&#31456;&#20462;&#25913;&#65292;&#25110;&#26032;&#24314;&#25991;&#31456;&#12290;' : '&#36824;&#27809;&#26377;&#25991;&#31456;&#12290;');
    }

    async function loadPost(slug) {
      setStatusHtml('&#27491;&#22312;&#21152;&#36733;&#25991;&#31456;...');
      const response = await fetch('/api/posts/' + encodeURIComponent(slug));
      const result = await response.json();
      if (!result.ok) throw new Error(result.message || 'Failed to load post');
      const post = result.post;
      form.elements.title.value = post.title;
      form.elements.slug.value = post.slug;
      form.elements.tags.value = post.tags.join(', ');
      form.elements.description.value = post.description;
      form.elements.date.value = post.date;
      form.elements.body.value = post.body;
      form.elements.draft.checked = post.draft;
      setMode('edit', post.slug);
      setStatus('\u5df2\u52a0\u8f7d\uff1a' + post.slug);
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      submitButton.disabled = true;
      setStatusHtml('&#27491;&#22312;&#26500;&#24314;&#12289;&#25552;&#20132;&#24182;&#25512;&#36865;...');
      const data = Object.fromEntries(new FormData(form).entries());
      data.draft = form.elements.draft.checked;
      try {
        const response = await fetch('/api/publish', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok || !result.ok) throw new Error(result.message || 'Publish failed');
        setStatus('\u6210\u529f\u3002\\n\u6587\u4ef6\uff1a' + result.path + '\\n\u90e8\u7f72\u5b8c\u6210\u540e\u8bbf\u95ee\uff1a' + result.url);
        await loadPosts();
        await loadPost(result.slug);
      } catch (error) {
        setStatus('\u5931\u8d25\uff1a' + error.message);
      } finally {
        submitButton.disabled = false;
      }
    });

    loadPosts().catch((error) => setStatus('\u5931\u8d25\uff1a' + error.message));
  </script>
</body>
</html>`;
}
