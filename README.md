# zzhliu05 的博客

基于 [Mizuki](https://github.com/LyraVoid/Mizuki) 和 Astro 构建的中文个人博客，支持 Markdown、KaTeX 数学公式、搜索、标签与归档。

## 本地开发

需要 Node.js 22+ 和 pnpm 9+。

```powershell
corepack pnpm install
corepack pnpm dev
```

## 本地写作并推送

```powershell
corepack pnpm write
```

然后访问 `http://127.0.0.1:8787/`。写作页支持新建、修改、删除、图片上传、Markdown 实时预览和 KaTeX 公式预览。

如果本机 Git 没有 GitHub 写权限，可以临时设置 token：

```powershell
$env:GITHUB_TOKEN="你的 GitHub token"
corepack pnpm write
```

## 构建

```powershell
corepack pnpm check
corepack pnpm build
```

推送到 `main` 后，GitHub Actions 会自动部署到 GitHub Pages。

## 许可

Mizuki 基于 Apache-2.0 许可发布，并包含原始项目的 MIT 许可声明。详见 `LICENSE` 与 `LICENSE.MIT`。
