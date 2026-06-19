---
title: "李代数的线性表示(一)"
description: "简单介绍李代数的定义与几类典型复李代数"
published: 2026-06-17
tags: ["李代数","李群","表示论"]
category: "李代数"
draft: false
---
## 李代数的定义

### 定义1.1:
一个$\mathbb{C}$-李代数(以后简称李代数)是一个$\mathbb{C}$-线性空间$\mathfrak{L}$附带一个双线性映射$[\cdot,\cdot]:\mathfrak{L}\times \mathfrak{L}\to \mathfrak{L}$,满足

(1):$[a,b]=-[b,a],\forall a,b\in \mathfrak{L}$

(2)(Jacobi恒等式):$[a,[b,c]]+[c,[a,b]]+[b,[c,a]]=0,\forall a,b,c\in \mathfrak{L}$.