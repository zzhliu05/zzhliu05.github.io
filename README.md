# zzhliu05 的博客

一个使用 Astro、Markdown 和 KaTeX 构建的极简中文数学博客。

## 本地开发

```powershell
npm install
npm run dev
```

## 构建

```powershell
npm run build
```

## 在线写作

访问博客的 `/write/` 页面，或直接打开 GitHub issue 表单：

```text
https://github.com/zzhliu05/zzhliu05.github.io/issues/new?template=blog-post.yml
```

提交后，GitHub Actions 会把 issue 内容转换为 `src/content/posts/*.md` 并重新部署站点。
