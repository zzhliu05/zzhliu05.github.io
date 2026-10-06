---
title: XGboost
description: ""
published: 2026-09-01
tags:
  - 机器学习
category: 机器学习
draft: true
---
## Tree Boosting
一个经典的机器学习问题是,我们有一些状态值$x_i\in \mathbb{R}^m$和对应的目标函数$y_i\in \mathbb{R}$,我们希望学习一个函数$y=F(x)$使得损失泛函
$$
L[F]=\sum_i l(y_i,F(x_i))
$$
最小.这个问题in general是一个函数变分问题(非常困难).

我们设想,假如我们的目标问题是一个决策问题,$y\in \{0,1\}$.一种常见的拟合函数是决策函数
$$
F(x)=\begin{cases}
0 & x<c \\
1 & x\geq c
\end{cases}
$$
不同的决策函数相加即构成了决策树函数.Tree boosting的idea就是通过决策树函数来拟合目标函数.其基本流程可以如下归纳地给出.

假如我们已经给出了第$m$步的拟合函数$F_{m}(x)$.我们希望给出第$m+1$步的拟合函数.这通过最优化一个$D$段分段函数$S^D$给出
$$
f_{m+1}=\mathrm{argmin}_{f\in S^D} \ L[F_m+f]
$$
特别地对Mean square loss,我们可以直接得到如果
$$
f=\sum_{d}w_dI(x\in U^d)
$$
则
