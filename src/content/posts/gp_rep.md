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

证明:
(a):显然.
(b):由trace的共轭不变性,
$$
tr(\rho(h^{-1}gh))=tr(\rho(h)^{-1}\rho(g)\rho(h))=tr(g)
$$
(c):设$\lambda$是$\rho(g)$特征值,则
$$
\rho(g)v=\lambda v\implies \lambda^k v=\rho(g^k)v=\rho(e)v=Iv=v\implies \lambda^k=1
$$
因此$\rho(g)$特征值皆为$k$阶根,trace为特征值直和,因此为$k$阶根的和.
(d):因为$\rho(g)$特征值在圆周上,因此
$$
\lambda_{g^{-1}}=\frac{1}{\lambda_g}=\bar{\lambda}_g
$$
求和即得$\chi(g^{-1})$是$\chi(g)$的共轭.
(e):由trace共轭不变性即得.
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

(a):如果$\rho$,$\rho^\prime$分别是在$V,V^\prime$上的不可约表示,并且$T:V\to V^\prime$是一个表示同态,则要么$T=0$,要么$T$是同构.

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
(a):由引理4,我们有
$$
tr\Phi=\frac{1}{|G|}\sum_g tr \rho(g^{-1}) tr \rho^\prime(g)=\frac{1}{|G|}\sum_g \bar{\chi}(g)\bar{\chi^\prime}(g)=\braket{\chi,\chi^\prime}
$$

(b):我们只需证明$\Phi$是一个投影算符.注意到
$$
\Phi^2(M)=\frac{1}{|G|^2}\sum_{g,h}\rho(h^{-1})\rho(g^{-1})M\rho^\prime(g)\rho^\prime(h)
$$
对于任意$k\in G$,恰好有$|G|$个$gh$使得$k=gh$.因此
$$
\Phi^2(M)=\frac{1}{|G|}\sum_{k}\rho(k^{-1})M\rho^\prime(k)=\Phi(M)
$$
因此$\Phi$是投影算符.对于投影算符我们有
$$
\mathcal{M}=im\Phi\oplus ker\Phi
$$
并且$\Phi|_{im\Phi}=I$,因此显然有
$$
tr\Phi=dim(im\Phi)
$$
(c):如果$\rho,\rho^\prime$都不可约,则$\forall M\in im\Phi\implies M=\Phi(M)$,因为我们有
$$
\forall h\in G,\rho(h^{-1})M\rho^\prime(h)=\rho(h^{-1})\Phi(M)\rho^\prime(h)=\frac{1}{|G|}\sum_g \rho((gh)^{-1})M\rho^\prime(gh)=\Phi(M)=M
$$
这说明$[M]:V\to V^\prime$是一个表示同态.由Schur引理,要么$M=0$,要么$M$是同构.

如果$\rho=\rho^\prime$,则由Schur引理的(b),我们有$\forall M\in im\Phi,M=cI$,因此$dim(im\Phi)=1$.由(a),(b),
$$
\braket{\chi,\chi}=tr(\Phi)=dim(im\Phi)=1
$$
如果表示$\rho,\rho^\prime$不同构,则由上述论证我们必然有$\forall M\in im\Phi,M=0$.因此由(a),(b),
$$
\braket{\chi,\chi^\prime}=tr(\Phi)=dim(im\Phi)=0
$$

## 不可约表示等价类
我们接下来证明不等价的不可约表示只有共轭类的个数种.

### 引理6
(a):令$\varphi$是与所有特征标正交的类函数(在共轭类上为常数的函数),则对$G$的任意表示,
$$
T=\frac{1}{|G|}\sum_g \overline{\varphi(g)}\rho(g)
$$
是零算子.
(b):令$\rho^{reg}$是正则表示,则$\rho^{reg}(g)$是线性无关的.
(c):与每个特征标正交的类函数是零函数.

证明:
(a):因为任意表示是不可约表示的直和,因此可以假设$\rho$是不可约的.我们首先证明$T$是表示同构.注意到
$$
\rho(h^{-1})T\rho(h)=\frac{1}{|G|}\sum_g \overline{\varphi(g)}\rho(h^{-1}gh)
$$
我们可以将对$g$的求和分解为在每个共轭类里求和.因为$\varphi$是类函数,所以$\varphi(hgh^{-1})=\varphi(g)$.令$g^\prime=hgh^{-1}$即得
$$
\rho(h^{-1})T\rho(h)=\frac{1}{|G|}\sum_{g^\prime}\overline{\varphi(h^{-1}g^\prime h)}\rho(g^\prime)=T
$$
因此$T$是$\rho$到$\rho$的表示同态.由Schur引理,$T$是数量映射,完全由trace决定.然后我们考虑$tr(T)$.注意到由条件$\varphi$与$\chi$垂直,
$$
tr(T)=\frac{1}{|G|}\sum_g \overline{\varphi(g)}\chi(g)=\braket{\varphi,\chi}=0
$$
因此$T$是零算子.
(b):$\{\rho^{reg}(g)e_1=e_g,g\in G\}$线性无关,因此$\rho^{reg}(g)$线性无关.

(c):令$\varphi$是这样的函数,则由(a),
$$
\frac{1}{|G|}\sum_g \overline{\varphi(g)}\rho^{reg}(g)
$$
是零算子.又因为$\rho^{reg}(g)$线性无关,因此$\forall g,\varphi(g)=0$.

综上所述,特征标的维数等于类函数的维数,即共轭类的个数.