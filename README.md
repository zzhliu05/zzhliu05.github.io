# zzhliu05 的博客

基于 [Mizuki](https://github.com/LyraVoid/Mizuki) 和 Astro 构建的中文个人博客，支持 Markdown、KaTeX 数学公式、搜索、标签与归档。

## 本地开发

需要 Node.js 22+ 和 pnpm 9+。

```powershell
corepack pnpm install
corepack pnpm dev
```

## 构建

```powershell
corepack pnpm check
corepack pnpm build
```

推送到 `main` 后，GitHub Actions 会自动部署到 GitHub Pages。

## 许可

Mizuki 基于 Apache-2.0 许可发布，并包含原始项目的 MIT 许可声明。详见 `LICENSE` 与 `LICENSE.MIT`。
