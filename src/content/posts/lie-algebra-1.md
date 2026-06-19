---
title: "李代数的线性表示(一)"
description: "简单介绍李代数的定义与几类典型复李代数"
published: 2026-06-19
tags: ["李代数","李群","表示论"]
category: "李代数"
draft: false
---
## 李代数的定义

### 定义1.1
一个$\mathbb{C}$-李代数(以后简称李代数)是一个$\mathbb{C}$-线性空间$\mathfrak{L}$附带一个双线性映射$[\cdot,\cdot]:\mathfrak{L}\times \mathfrak{L}\to \mathfrak{L}$,满足

(1):$[a,b]=-[b,a],\forall a,b\in \mathfrak{L}$

(2)(Jacobi恒等式):$[a,[b,c]]+[c,[a,b]]+[b,[c,a]]=0,\forall a,b,c\in \mathfrak{L}$.

### 定义1.2
(1):若$\mathfrak{N}\subset \mathfrak{L}$是线性子空间并且满足
$$
[a,b]\in \mathfrak{N},\forall a,b\in \mathfrak{N}
$$
则称$\mathfrak{N}$是$\mathfrak{L}$的李子代数.记$[\mathfrak{N}_1,\mathfrak{N}_2]$为$[a,b],a\in \mathfrak{N}_1,b\in\mathfrak{N}_2$生成的线性子空间.

(2):若$f:\mathfrak{L}_1\to \mathfrak{L}_2$为线性映射并且满足 
$$
f([a,b])=[f(a),f(b)],\forall a,b\in \mathfrak{L}_1
$$
则称$f$是一个李代数同态.注意到$ker(f)$满足
$$
\forall a\in ker(f),b\in \mathfrak{L}_1,f([a,b])=[f(a),f(b)]=[0,f(b)]=0
$$
这说明$[ker(f),\mathfrak{L}_1]\subset ker(f)$.因此我们定义

(3):$\mathfrak{L}$的李子代数$\mathfrak{N}$称为$\mathfrak{L}$的理想,若
$$
\forall a\in \mathfrak{N},b\in \mathfrak{L},[a,b]\in \mathfrak{N}
$$


若$\mathfrak{N}$是$\mathfrak{L}$的理想,则商空间$\mathfrak{L}/\mathfrak{N}$具有自然的李代数结构.

### 命题1.1
若$\mathfrak{N}_1,\mathfrak{N}_2\subset \mathfrak{L}$是两个理想,则$[\mathfrak{N}_1,\mathfrak{N}_2]$也是理想.

证明: