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

证明:$\forall [a,b]\in [\mathfrak{N}_1,\mathfrak{N}_2],\forall c\in \mathfrak{L}$,则由Jacobi identity
$$
[[a,b],c]=[[a,c],b]+[[c,b],a]
$$
由于$[a,c]\in \mathfrak{N}_1,[c,b]\in \mathfrak{N}_2$,所以
$$
[[a,c],b],[a,[c,b]]\in [\mathfrak{N}_1,\mathfrak{N_2}]
$$
这说明了$[[a,b],c]\in [\mathfrak{N}_1,\mathfrak{N}_2],\forall c\in \mathfrak{L}$,也即$[\mathfrak{N}_1,\mathfrak{N}_2]$是理想.

由命题1.1,$[\mathfrak{L},\mathfrak{L}]\subset \mathfrak{L}$是理想,我们可以考虑其商代数$\mathfrak{L}/[\mathfrak{L},\mathfrak{L}]$,显然这个代数是交换李代数.

### 定义1.3
一个李代数$\mathfrak{L}$称为可解的,如果存在子代数列
$$
0=\mathfrak{L}_m\subset \mathfrak{L}_{m-1}\subset \cdots \subset \mathfrak{L}_0=\mathfrak{L}
$$
使得任何$\mathfrak{L}_i$是$\mathfrak{L}_{i-1}$的理想并且$\mathfrak{L}_{i-1}/\mathfrak{L}_i$是交换李代数.

由命题1.1我们可以令$\mathfrak{L}_{i+1}=[\mathfrak{L}_i,\mathfrak{L}_i]$.如果这个序列可以终止,那么$\mathfrak{L}$就是可解的.

:::note[不能终止的例子]
考虑$3$维李代数$\mathfrak{so}(3)$,
$$
[L_i,L_j]=\epsilon_{ijk}L_k
$$
则$[\mathfrak{so}(3),\mathfrak{so}(3)]=\mathfrak{so}(3)$,因此序列会一致恒等地运行下去.
:::
:::note[可以终止的例子]
考虑二维李代数$\mathfrak{L}=\left<x,y\right>,[x,y]=x$,则同样有
$$
\mathfrak{L}_1=[\mathfrak{L},\mathfrak{L}]=\left<x\right>
$$
则显然有$[\mathfrak{L}_1,\mathfrak{L}_1]=0$
:::

### 定义1.4
李代数的线性表示指的是同态$\rho:\mathfrak{L}\to \mathrm{End}(V)$,其中$\mathrm{End}(V)$是线性空间$V$上自同态,对应的李代数为$[X,Y]=X\circ Y-Y\circ X$.

### 命题1.2
李代数的伴随表示
$$
\mathrm{ad}:\mathfrak{L}\to \mathrm{End}(\mathfrak{L}),a\to [a,\cdot]
$$
确实是一个$\mathfrak{L}$的线性表示.

证明:只需证$\mathrm{ad}$是李代数同态.对于$\forall a,b\in \mathfrak{L}$,由Jacobi identity
$$
ad([a,b])(c)=[[a,b],c]=[[a,c],b]+[[c,b],a]
\\
=[a,[b,c]]-[b,[a,c]]=\mathrm{ad}(a)\circ \mathrm{ad}(b)(c)-\mathrm{ad}(a)\circ \mathrm{ad}(b)(c)
$$
因此$ad([a,b])=[ad(a),ad(b)]$,证毕.

## 常见线性李代数

### 正交群
正交群$O(n)$的定义为
$$
\{R\in GL_n(\mathbb{R})|R^TR=I\}
$$
若$\mathrm{exp}(tA)\in O(n)$,则
$$
0=\frac{d}{dt}I=\frac{d}{dt}(\mathrm{exp}(tA^T)\mathrm{exp}(tA))|_{t=0}=A^T+A
$$
因此$A反对称.反过来可以说明若$A$反对称,$\mathrm{exp}(tA)\in O_n(k)$.因此$O(n)$的李代数$\mathfrak{o}(n)$为反对称矩阵全体,维数为$\frac{n(n-1)}{2}$.

### 辛群
辛群$Sp(2n)$的定义为
$$
\{S\in GL_n(\mathbb{R})|S^TJ_0 S=J_0\}
$$
其中$J_0=\left[\begin{matrix}0 & I \\ -I & 0\end{matrix}\right]$.同理可得$\mathrm{exp}(tA)\in Sp(2n)$当且仅当
$$
AJ_0+J_0A^T=0
$$
若记$A=\left[\begin{matrix}A_{11} & A_{12} \\ A_{21} & A_{22}\end{matrix}\right]$,则须满足
$$
A_{12}=A_{12}^T,A_{21}=A_{21}^T,A_{11}=-A_{22}^T
$$
因此$\mathrm{dim}\mathfrak{sp}(2n)=n^2+n+n^2=2n^2+n$.

### 幺正群
幺正群$U(n)$的定义为
$$
\{U\in GL_n(\mathbb{C})|U^\dagger U=I\}
$$
同理可得$\mathfrak{u}(n)$为anti Hermitian矩阵全体.如果考虑$SU(n)=U(n)\cap SL_n(\mathbb{C})$,则$\mathfrak{su}(n)$为$0$迹anti Hermitian矩阵全体.分别有
$$
\mathrm{dim}_{\mathbb{R}}\mathfrak{u}(n)=n^2,\mathrm{dim}\mathfrak{su}(n)=n^2-1
$$