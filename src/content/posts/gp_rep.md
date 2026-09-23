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

(c):
