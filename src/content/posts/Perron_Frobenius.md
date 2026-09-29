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
并且$r=\rho(A)$,$r$的几何重数是$1$.除了$r$以外的所有特征值$\lambda$满足
$$
|\lambda|<r
$$

我们通过以下几步来证明.

### Simplex上的优化问题
考虑标准simplex
$$
\Delta=\left \{ x\in \mathbb{R}^n|x_i\geq 0,\sum_i x_i=1\right \}
$$
我们声明在这个simplex上优化得到的结果就是全局最优结果.因此我们定义
$$
r=\sup \{\lambda|\exists x\in \Delta,Ax\geq \lambda x\}=\sup \Lambda
$$
上式右侧集合非空,因为由$A$的正性,$Ae_1\geq a_{11}e_1$.显然$\sum_{i,j}a_{ij}$是上式集合的上界,因此上确界存在.
我们证明这个上确界可以取到.对于$\lambda_n\in \Lambda \to \lambda$,由条件
$$
\exists x_n\in \Delta,Ax_n\geq \lambda_n x_n
$$
由$\Delta$的紧性,存在收敛子列$x_{n_k}\to x_\lambda$.由于$A:\mathbb{R}^n\to \mathbb{R}^n$是连续的,因此
$$
\lim_{k\to \infty}A x_{n_k}=A x_\lambda\geq \lim_{k\to \infty}\lambda_{n_k}x_{n_k}=\lambda x_\lambda
$$
因此$\lambda\in \Lambda$,进而$r\in \Lambda\implies \exists x\in \Delta,Ax\geq rx$.

下一步我们证明这个不等式其实是等式.假设$Ax-rx=y>0$,由于$A$严格正,我们有
$$
A(Ax)=A(rx+y)=rAx+Ay>rAx
$$
因为$Ax$严格正,因此$\frac{Ax}{||Ax||_1}\in \Delta$,并且$Ay$的每个分量都$>0$(**这里用到了严格正性**).所以
$$
\exists v=\frac{Ax}{||Ax||_1},Av>rv
$$
与$r$是上确界矛盾.因此$Ax-rx=0$.这就完成了存在性的证明.

### 唯一性
现在我们证明这个特征向量是唯一的.假设存在$x^\prime>0,Ax^\prime=rx^\prime$.令
$$
c=\min_i \frac{x^\prime_i}{x_i}
$$
则$x^\prime-cx$的每个坐标$\geq 0$,$A(x^\prime-cx)=r(x^\prime-cx)$.但是$x^\prime-cx$一定有某个坐标为$0$.又因$A$严格正,如果$x^\prime-cx>0$,则必然有$A(x^\prime-cx)$的所有坐标大于$0$.矛盾.因此$x^\prime=cx$.这说明$r$的几何重数为$1$.
### $r$是谱半径
我们接下来证明$\forall \lambda\neq r,|\lambda|<r$.假设
$$
Av=\lambda v,\lambda\in \mathbb{C},v\in \mathbb{C}^n\implies |Av|=|\lambda v|=|\lambda||v|\leq A|v|
$$
我们还是用相同的trick.令
$$
c=\max_i \frac{|v|_i}{x_i}
$$
由于$|v|-cx\leq 0$,$A$严格正,我们有
$$
A(|v|-cx)\leq 0\implies A|v|\leq crx
$$
因此
$$
|\lambda||v|\leq A|v|\leq cr x
$$
并且$\exists i,|v|_i=cx_i\implies |\lambda|\leq r$.

假设$|\lambda|=r$,则须满足对于$c$取等的那一个$i$,
$$
\sum_j a_{ij}|v|_j=r|v|_i=|\lambda v|_i=|\sum_j a_{ij} v_j|_i
$$
而绝对值不等式取等的条件是所有项相位相同.这说明
$$
v_j=|v|_je^{i\theta}
$$
也即$|v|_j$是特征值为$\lambda$的向量.但是$|v|_j$是正的实向量,因此$0<\lambda\in \mathbb{R}\implies \lambda=r$,与前提矛盾.