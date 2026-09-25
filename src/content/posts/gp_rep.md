---
title: "有限群表示论"
description: "给出有限群表示的分类定理."
published: 2026-09-22
tags: ["群表示论"]
category: "群表示论"
draft: false
---
## 定义

### 定义1
群$G$的表示是同态
$$
\rho:G\to GL(V)
$$
其中$V$是$\mathbb{C}$向量空间.如果表示$\rho$是单射,则称$\rho$是忠实的.

:::note[]
在不引起歧义的情形下,我们总是记
$$
\rho(g)v=gv,v\in V
$$
:::

### 定义2
群$G$的两个表示$\rho:G\to GL(V)$,$\rho^\prime:G\to GL(V^\prime)$是同构的,如果存在向量空间同构$T:V\to V^\prime$,满足
$$
T(gv)=gT(v),\forall g\in G,v\in V
$$


## 可约表示

### 定义3
令$\rho$是$G$在$V$上的表示.$V$的子空间$W$称为不变子空间,如果
$$
\forall g\in G,gW\subset W
$$

### 引理1
若$W\subset V$是不变子空间,则
$$
gW=W,\forall g
$$
证明:由于$g$是可逆的,因此$\rho(g)$也是可逆矩阵,因此$gW$与$W$有相同的维数.又因为$gW\subset W$,所以$gW=W$.

### 定义4
令$\rho$是$G$在$V$上的表示.如果$V$有/没有非平凡的不变子空间,则称$V$是可约/不可约的.


## Unitary表示

令$V$是带有正定Hermitian form的($\braket{v,w}=\braket{w,v}^*$)$\mathbb{C}$向量空间.

### 定义5
$V$上的线性算子$T$是Unitary的,如果
$$
\braket{Tv,Tw}=\braket{v,w},\forall v,w\in V
$$
表示$\rho$称为unitary的,如果$\rho(g)$是unitary的,$\forall g$.

### 引理2
令$W\subset V$是Unitary表示$\rho$的不变子空间.则其正交补也是不变子空间.

证明:
$$
\forall g,\forall v\in W^\perp,\forall w\in W,\braket{gv,w}=\braket{g^{-1}gv,g^{-1}w}=\braket{v,g^{-1}w}=0
$$
因为$g^{-1}w\in W$.这说明$gv\in W^{\perp}\implies gW^{\perp}\subset W^\perp$.

同样的可逆性论证给出$gW^\perp=W^\perp$.

### 定理1
给定表示$\rho:G\to GL(V)$,存在V$上的内积使得$\rho$是Unitary表示.

证明:任取$V$上内积$\braket{}$,定义平均内积为
$$
\braket{v,w}_G=\frac{1}{|G|}\sum_{g\in G}\braket{gv,gw}
$$
我们证明$\rho$在这个内积下是Unitary的.注意到
$$
\forall v,w\in V,\braket{gv,gw}_G=\frac{1}{|G|}\sum_{h\in G}\braket{hgv,hgw}=\braket{v,w}_G
$$

### 定理1的推论
(a):每个有限群表示都可以分解为不可约表示的直和.

(b):$V$上存在基底使得表示在这个基底下的矩阵表示都是unitary的.

## 特征标

### 定义6
表示$\rho$的特征标定义为
$$
\chi_\rho:G\to \mathbb{C},g\to tr(\rho(g))
$$

### 命题
(a):$\chi(e)$是表示的维数.

(b):特征标在群的共轭类上为常数.

(c):让$g$是$G$中阶为$k$的元素.则$\chi(g)$是$k$阶单位根$\xi$的幂次的和.

(d):$\chi(g^{-1})$是$\chi(g)$的复共轭.

(e):同构的表示有相同的特征标.


## Schur引理

### 引理3

一个表示同构$T:V\to V^\prime$的$ker$和$im$都是不变子空间.

证明:只需注意到
$$
v\in kerT\implies gT(v)=0 \implies T(gv)=0\implies gv\in ker T,\forall g\in G
$$
并且
$$
v^\prime\in imT\implies v^\prime=T(v)\implies gv^\prime=gT(v)=T(gv)\in imT,\forall g\in G
$$
因此$gimT\subset imT$.


### Schur引理

(a):如果$\rho$,$\rho^\prime$分别是在$V,V^\prime$上的不可约表示,并且$T:V\to V^\prime$是一个表示同构,则要么$T=0$,要么$T$是同构.

(b):如果对于同一个不可约表示$\rho:G\to GL(V)$,$T:V\to V$是表示同构,则要么$T=0$,要么$T=cI$.

证明:

(a):由于$ker T$是不变子空间,并且$\rho$是不可约表示,因此$ker T=V$(对应$T=0$)或者$T$是单射.

由于$im T$是不变子空间,并且$\rho^\prime$是不可约表示,因此$im T=0$(对应$T=0$)或者$T$是满射.

综上$T=0$或者$T$是双射.

(b):根据(a)我们不妨考虑$T\neq 0$.此时$T$是同构.注意到
$$
ker(T-\lambda I)
$$
也是不变子空间,因此由$\rho$的不可约性,要么$ker(T-\lambda I)$平凡,要么$ker(T-\lambda I)$为$V$.必然存在一个$\lambda $使得$ker(T-\lambda I)=V$.因此$$T=\lambda I$.


## 特征标的正交性关系

记$\mathcal{M}$为$m\times n$复矩阵全体.

### 引理4
让$A,B$分别为$m\times m$和$n\times n$矩阵.两者构成$\mathcal{M}$上的线性算子
$$
F_{AB}:\mathcal{M}\to \mathcal{M},M\to AMB
$$
这个算子的trace为
$$
tr(F_{AB})=tr(A)tr(B)
$$

证明:取$M$的一组基$E_{ij},i=1,\dots,m,j=1,\dots,n$,则
$$
tr(F_{AB})=\sum_{i,j}\braket{E_{ij}|F|E_{ij}}=\sum_{i,j}[AE_{ij}B]_{ij}=\sum_{i,j,k,l}A_{ik}\delta_{ki}\delta_{jl}B_{lj}
$$
$$
=\sum_{i,j}A_{ii}B_{jj}=tr(A)tr(B)
$$

对于两个表示$\rho,\rho^\prime$,任取$V,V^\prime$的基底(维度分别为$n,m$),定义$\mathcal{M}$上的线性算符
$$
\Phi(M)=\frac{1}{|G|}\sum_{g} \rho(g^{-1})M\rho^\prime(g)
$$

### 引理5

(a):$tr\Phi=\braket{\chi,\chi^\prime}$

(b):$tr\Phi=dim(im\Phi)$

(c):如果 $\rho$ 和$\rho^\prime$都是不可约表示,则
$$
\braket{\chi,\chi}=1,\braket{\chi,\chi^\prime}=0
$$

证明:
(a):