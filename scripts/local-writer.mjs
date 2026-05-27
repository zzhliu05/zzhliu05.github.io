import http from 'node:http';
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const host = '127.0.0.1';
const port = Number(process.env.LOCAL_WRITER_PORT ?? 8787);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${host}:${port}`);

    if (req.method === 'GET' && url.pathname === '/') {
      return html(res, renderPage());
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

async function publishPost(input) {
  const title = required(input.title, '标题');
  const description = required(input.description, '摘要');
  const body = required(input.body, '正文');
  const tags = String(input.tags ?? '')
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  const draft = Boolean(input.draft);
  const slug = normalizeSlug(input.slug || title);
  if (!slug) {
    throw new Error('无法生成有效文件名，请手动填写 slug。');
  }

  const clean = await git(['status', '--porcelain']);
  if (clean.trim()) {
    throw new Error('工作区不干净。请先提交或处理现有改动后再发布。');
  }

  await git(['pull', '--ff-only', 'origin', 'main']);

  const date = new Date().toISOString().slice(0, 10);
  const postPath = path.join(root, 'src', 'content', 'posts', `${slug}.md`);

  try {
    await fs.access(postPath);
    throw new Error(`文章文件已存在：src/content/posts/${slug}.md`);
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }

  await fs.writeFile(
    postPath,
    renderMarkdown({ title, description, date, tags, draft, body }),
    'utf8'
  );

  await command('npm', ['run', 'build']);
  await git(['add', path.relative(root, postPath)]);
  await git([
    'commit',
    '-m',
    `blog: publish ${slug}`,
    '-m',
    'Co-authored-by: codex <codex@openai.com>'
  ]);
  await gitPush();

  return {
    ok: true,
    slug,
    path: `src/content/posts/${slug}.md`,
    url: `https://zzhliu05.github.io/posts/${encodeURIComponent(slug)}/`
  };
}

function required(value, label) {
  const cleaned = String(value ?? '').trim();
  if (!cleaned) {
    throw new Error(`${label}不能为空。`);
  }
  return cleaned;
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
        req.destroy(new Error('请求内容太大。'));
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
  <title>本地博客写作</title>
  <style>
    :root { --text:#202124; --muted:#6b7280; --line:#d7dce1; --soft:#f6f7f8; --link:#1f5f8b; }
    * { box-sizing: border-box; }
    body { margin: 0; color: var(--text); font: 16px/1.7 "Noto Sans SC", "Microsoft YaHei", Arial, sans-serif; background: #fff; }
    main { width: min(980px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 56px; }
    header { border-bottom: 1px solid var(--line); margin-bottom: 24px; padding-bottom: 18px; }
    h1 { margin: 0 0 6px; font-size: 28px; }
    p { margin: 0; color: var(--muted); }
    form { display: grid; gap: 16px; }
    label { display: grid; gap: 6px; font-weight: 700; }
    input, textarea { width: 100%; border: 1px solid var(--line); color: var(--text); font: inherit; padding: 10px 12px; }
    textarea { min-height: 360px; resize: vertical; font-family: "Cascadia Code", Consolas, monospace; line-height: 1.6; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .check { display: flex; align-items: center; gap: 8px; font-weight: 400; }
    .check input { width: auto; }
    button { justify-self: start; border: 1px solid var(--text); background: var(--text); color: #fff; font: inherit; padding: 10px 16px; cursor: pointer; }
    button:disabled { cursor: wait; opacity: .65; }
    .status { border: 1px solid var(--line); background: var(--soft); min-height: 48px; padding: 12px; white-space: pre-wrap; }
    .hint { color: var(--muted); font-size: 14px; font-weight: 400; }
    @media (max-width: 720px) { .row { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>本地博客写作</h1>
      <p>只运行在 localhost。提交后会生成 Markdown、构建检查、commit 并 push 到 GitHub。</p>
    </header>
    <form id="form">
      <label>标题<input name="title" required placeholder="例如：一个关于高斯积分的笔记"></label>
      <div class="row">
        <label>slug <span class="hint">可留空，将从标题生成</span><input name="slug" placeholder="gaussian-integral-note"></label>
        <label>标签 <span class="hint">逗号分隔</span><input name="tags" placeholder="数学, LaTeX, 笔记"></label>
      </div>
      <label>摘要<input name="description" required placeholder="一两句话概括文章。"></label>
      <label>正文 <span class="hint">支持 Markdown、$...$ 和 $$...$$</span><textarea name="body" required placeholder="这里写正文。"></textarea></label>
      <label class="check"><input type="checkbox" name="draft"> 保存为草稿，不在正式站点展示</label>
      <button type="submit">提交并推送</button>
      <div class="status" id="status">等待输入。</div>
    </form>
  </main>
  <script>
    const form = document.querySelector('#form');
    const status = document.querySelector('#status');
    const button = document.querySelector('button');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      button.disabled = true;
      status.textContent = '正在生成文章、构建、提交并推送...';
      const data = Object.fromEntries(new FormData(form).entries());
      data.draft = form.elements.draft.checked;
      try {
        const response = await fetch('/api/publish', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok || !result.ok) throw new Error(result.message || '提交失败');
        status.textContent = '发布成功。\\n文件：' + result.path + '\\n部署完成后访问：' + result.url;
        form.reset();
      } catch (error) {
        status.textContent = '失败：' + error.message;
      } finally {
        button.disabled = false;
      }
    });
  </script>
</body>
</html>`;
}
