---
title: XGboost
description: ""
published: 2026-09-01
tags:
  - ""
category: ""
draft: false
---
## Tree Boosting
一个经典的机器学习问题是,我们有一些状态值$x_i\in \mathbb{R}^m$和对应的目标函数$y_i\in \mathbb{R}$,我们希望学习一个函数$y=F(x)$使得损失泛函
$$
L[F]=\sum_i l(y_i,F(x_i))
$$
最小.这个问题in general是一个函数变分问题(非常困难).

我们设想,假如我们的目标问题是一个决策问题,$y\in \{0,1\}$.一种常见的拟合函数是决策树