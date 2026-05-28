# zzhliu05 的博客

一个使用 Astro、Markdown 和 KaTeX 构建的极简中文数学博客。

## 本地开发

```powershell
npm install
npm run dev
```

## 本地写作并推送

启动只在本机运行的写作页面：

```powershell
npm run write
```

然后打开：

```text
http://127.0.0.1:8787/
```

页面左侧会列出已有文章，可以点击加载后修改；也可以新建文章。提交后，脚本会生成或更新 Markdown、运行构建检查、创建 commit 并 push 到 `origin/main`。如果本机 Git 没有 GitHub 写权限，可以临时提供 token：

写作页支持插入本地图片。选择图片后点击“插入图片”，脚本会把图片保存到 `public/images/blog/`，并在正文光标位置插入 Markdown 图片语法。右侧预览会用 KaTeX 编译显示 LaTeX 公式。

```powershell
$env:GITHUB_TOKEN="你的 GitHub token"
npm run write
```

## 构建

```powershell
npm run build
```
