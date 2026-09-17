---
title: "耦合谐振子的有效理论"
description: ""
published: 2026-09-08
tags: ["经典力学","统计力学"]
category: "统计力学"
draft: true
---
我们考虑简单的耦合两体的哈密顿量
$$
H=\frac{p_1^2}{2 m_1}+\frac{p_2^2}{2m_2}+V(x_1-x_2)
$$
其配分函数为
$$
Z=\int dp_1dp_2dx_1dx_2 e^{-\beta H}
$$
我们对$p_2,x_2$取部分trace即可得到有效哈密顿量
$$
Z_1=\int dx_1dp_1 e^{-\beta H_{eff}}=\int dx_1 dp_1 e^{-(\beta(\frac{p_1^2}{2m}+V_{eff}(x_1))}
$$
其中(假如我们设$\int dx_2=L$.)
$$
V_{eff}(x_1)=-\frac{1}{\beta}ln(\int dx_2 e^{-\beta V(x_1-x_2)})\geq -\frac{ln L}{\beta}+\frac{1}{L}\int dx_2 V(x_1-x_2)
$$
记平衡位置$x_{20}(x_1)=x_2|_{V^\prime(x_1-x_2)=0}$,则我们有展开(假设$V$在平衡点附近非常sharp,并记$V^{(2)}(x_1-x_{20})=k$)
$$
V_{eff}(x_1)=V_0-\frac{1}{\beta}ln(\int dx_2 e^{-\beta\frac{k}{2}(x_1-x_2)^2})
$$


我们可以考虑一维原子链
$$
H=\sum_n (\frac{p_n^2}{2m}+\frac{k}{2}(x_n-x_{n-1})^2)
$$
我们可以部分trace掉所有偶数site,可以得到
$$
\int dx_{2n}e^{-\beta(\frac{k}{2}x_{2n}^2-kx_{2n}x_{2n-1}-kx_{2n}x_{2n+1})}\propto e^{-\beta \frac{k}{2}(x_{2n-1}+x_{2n+1})^2}
$$
