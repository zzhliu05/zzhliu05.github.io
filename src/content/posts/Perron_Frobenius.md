---
title: Perron Frobenius定理
description: 正矩阵的Perron-Frobenius定理
published: 2026-09-28
tags:
  - 线性代数
category: 线性代数
draft: false
---
## Perron Frobenius定理
### 定理
设$A\in \mathbb{R}^{n\times n}$是严格正矩阵(即$a_{ij}>0,\forall i,j$).则存在$r>0,v>0$,使得
$$
Av=rv
$$
并且$r=\rho(A)$.除了$r$以外的所有特征值$\lambda$满足
$$
|\lambda|<r
$$

我们通过以下几步来证明.

### Simplex上的优化问题
考虑标准simplex
$$
\Delta=\left \{ x\in \mathbb{R}^n|x_i\geq 0,\sum_i x_i=1\right \}
$$
我们声明在这个simplex上优化得到的结果就是全局最优结果.
