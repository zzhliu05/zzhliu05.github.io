---
title: "第一篇笔记：公式与中文排版"
description: "用一篇短文测试中文博客的段落、数学公式、代码块和标签展示。"
published: 2026-05-27
tags: ["数学", "LaTeX", "笔记"]
category: "数学"
draft: false
---

这是博客的第一篇示例文章。它的目标不是给出复杂结论，而是验证中文段落、数学公式和代码块在页面中的视觉效果。行内公式可以直接写成 $e^{i\pi}+1=0$，不会打断中文阅读节奏。

## 一个简单公式

高斯积分是数学分析中常见的例子：

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx=\sqrt{\pi}.
$$

如果需要多行推导，也可以使用对齐环境：

$$
\begin{aligned}
(a+b)^2 &= a^2 + 2ab + b^2,\\
(a-b)^2 &= a^2 - 2ab + b^2.
\end{aligned}
$$

## 代码片段

文章中也可以插入代码。比如下面这个 TypeScript 函数用于格式化日期：

```ts
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}
```

> 好的博客不需要复杂装饰。清晰的文字层级、稳定的行距和可靠的公式渲染，已经足够支撑长期写作。

后续写新文章时，只需要在 `src/content/posts` 中新增 Markdown 文件，并在 frontmatter 里填写标题、摘要、日期和标签。
