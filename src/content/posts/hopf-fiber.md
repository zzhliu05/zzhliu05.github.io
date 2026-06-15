---
title: "Hopf Fibration小记"
description: "一篇介绍Hopf Fibration及其物理图景的短文."
published: 2026-06-15
tags: ["数学","拓扑物理"]
image: "/images/posts/hopf-fiber.jpg"
category: "拓扑"
draft: false
---

> 没有人能真正看见Hopf fibration

我们考虑一个归一化的二分量波函数$\ket{\psi}=\left[ \begin{aligned}\psi_1 \\ \psi_2  \end{aligned}\right]$.其所处的态空间实际上为
$$
\{\ket{\psi}\in \mathbb{C}^2||\psi_1^2|+|\psi_2|^2=1\}=\mathbb{CP}^1\cong S^3
$$
一种常见的参数化如下
$$
\ket{\psi}=e^{i\varphi}\left[\begin{aligned}cos\frac{\theta}{2}e^{i\phi} \\
sin\frac{\theta}{2}e^{-i\phi}
\end{aligned}\right]
$$
因为此时$\ket{\psi}$是自旋算符$|\vec{S}|=sin\theta cos\phi S_x+sin\theta sin\phi S_y+cos\theta S_z$的本征态.我们注意到有一个物理上冗余的$U(1)$因子$e^{i\varphi}$,如果把这个因子商掉(看作物理等价波函数空间上的纤维),我们就得到了Hopf纤维化
$$U(1)\hookrightarrow S^3\rightarrow S^2$$
这说明$S^3$可以看作$S^2$上的$U(1)$主丛.底空间$S^2$(又称Bloch球面)可视作由$\theta,\phi$参数化的空间.现在我们开始考察这个纤维丛的一些几何性质.

