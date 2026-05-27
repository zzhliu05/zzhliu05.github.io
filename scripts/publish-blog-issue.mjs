import fs from 'node:fs';
import path from 'node:path';

const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) {
  throw new Error('GITHUB_EVENT_PATH is required.');
}

const event = JSON.parse(fs.readFileSync(eventPath, 'utf8').replace(/^\uFEFF/, ''));
const issue = event.issue;
if (!issue) {
  throw new Error('No issue payload found.');
}

const sections = parseIssueBody(issue.body ?? '');
const title = required(sections['文章标题'], '文章标题');
const description = required(sections['摘要'], '摘要');
const body = required(sections['正文'], '正文');
const tags = parseTags(sections['标签']);
const draft = /^是|true|yes$/i.test(clean(sections['是否草稿']));
const slug = normalizeSlug(clean(sections['文件名（slug）'])) || fallbackSlug(issue);
const date = (issue.created_at ?? new Date().toISOString()).slice(0, 10);
const postPath = path.join('src', 'content', 'posts', `${slug}.md`);

fs.mkdirSync(path.dirname(postPath), { recursive: true });
fs.writeFileSync(postPath, renderPost({ title, description, date, tags, draft, body }), 'utf8');
writeOutput('slug', slug);
writeOutput('path', postPath.replaceAll(path.sep, '/'));
writeOutput('issue_number', String(issue.number));

function parseIssueBody(markdown) {
  const result = {};
  const lines = markdown.split(/\r?\n/);
  let current = null;
  let buffer = [];

  for (const line of lines) {
    const match = line.match(/^###\s+(.+?)\s*$/);
    if (match) {
      if (current) {
        result[current] = buffer.join('\n');
      }
      current = match[1].trim();
      buffer = [];
    } else if (current) {
      buffer.push(line);
    }
  }

  if (current) {
    result[current] = buffer.join('\n');
  }

  return result;
}

function required(value, label) {
  const cleaned = clean(value);
  if (!cleaned) {
    throw new Error(`${label} is required.`);
  }
  return cleaned;
}

function clean(value = '') {
  const cleaned = String(value).trim();
  return cleaned === '_No response_' ? '' : cleaned;
}

function parseTags(value = '') {
  return clean(value)
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{Script=Han}\p{Letter}\p{Number}_-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function fallbackSlug(issue) {
  return `post-${(issue.created_at ?? new Date().toISOString()).slice(0, 10)}-${issue.number}`;
}

function renderPost(post) {
  return `---\ntitle: ${yamlString(post.title)}\ndescription: ${yamlString(post.description)}\ndate: ${post.date}\ntags: [${post.tags.map(yamlString).join(', ')}]\ndraft: ${post.draft}\n---\n\n${post.body.trim()}\n`;
}

function yamlString(value) {
  return JSON.stringify(value);
}

function writeOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
  }
}
