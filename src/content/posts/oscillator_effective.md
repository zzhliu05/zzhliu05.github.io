---
title: "耦合谐振子的有效理论"
description: ""
published: 2026-09-08
tags: ["经典力学","统计力学"]
category: "统计力学"
draft: true
---
我们考虑简单的耦合谐振子的哈密顿量
$$
H=\frac{p_1^2}{2 m_1}+\frac{p_2^2}{2m_2}+\frac{k(x_1-x_2)^2}{2}
$$
其配分函数为
$$
Z=\int dp_1dp_2dx_1dx_2 e^{-\beta H}
$$
我们对$p_2,x_2$取部分trace即可得到有效哈密顿量$\int dx_2 e^{-\beta(\frac{kx_2^2}{2}-kx_1x_2)}$
$$
Z_1=\int dx_1dp_1 e^{-\beta H_{eff}}=\int dx_1 dp_1 e^{-\beta(\frac{p_1^2}{2m})+kx_1^2}
$$
即劲度系数翻倍.

我们可以考虑一维原子链
$$
H=\sum_n (\frac{p_n^2}{2m}+\frac{k}{2}(x_n-x_{n-1})^2)
$$
我们可以部分trace掉所有偶数site,可以得到
$$
\int dx_{2n}e^{-\beta(\frac{k}{2}x_{2n}^2-kx_{2n}x_{2n-1}-kx_{2n}x_{2n+1})}
$$
