---
title: "李代数的线性表示(二)"
description: "可解李代数的结构."
published: 2026-07-18
tags: ["李代数","李群","表示论"]
category: "李代数"
draft: false
---

## 可解李代数的定义

### 定义2.1
一个李代数$\mathfrak{L}$称为可解的,如果存在一个理想子列
$$
0=\mathfrak{N}_m\subset \mathfrak{N}_{m-1}\subset \cdots \subset \mathfrak{N}_0=\mathfrak{L}
$$
使得每个$\mathfrak{N}_i$都是$\mathfrak{N}_{i-1}$的理想并且$\mathfrak{N}_{i-1}/\mathfrak{N}_i$是交换李代数.

### 定义2.2
设$\rho$为李代数$\mathfrak{L}$在线性空间$V$上的线性表示.若对于所有的$\rho(a),a\in \mathfrak{L}$有一个公共特征向量,使得存在$\lambda:\mathfrak{L}\to \mathbb{C}$,s.t.
$$
\rho(a)(v)=\lambda(a)v
$$
则称$\lambda$为$\rho$的一个权.$v$称为$\lambda$的权向量.记
$$
V_{\rho,\lambda}=\{v\in V|\exists n,(\rho(a)-\lambda(a)I)^nv=0,\forall a\in \mathfrak{L}\}
$$
为$\lambda$的权空间.

### 引理2.1 (Sophus Lie)
任何可解李代数的表示都有一个权.

证明:我们回忆起线性代数中对于这种类似"对角化"或者特征子空间的问题我们总是尝试使用归纳法对维数进行归纳.此处同理.假设$\mathfrak{L}$是一个可解李代数,则我们知道$[\mathfrak{L},\mathfrak{L}]\neq \mathfrak{L}$(否则你就找不到一个理想使得商代数是交换李代数了).任取$\mathfrak{L}/[\mathfrak{L},\mathfrak{L}]$中的一个非零元素$a$.取$\mathfrak{L}$的一个余维数为$1$的理想$\mathfrak{N}$使得$\mathfrak{L}$由$a$和$\mathfrak{N}$生成.由归纳假设$\mathfrak{N}$存在权向量
$$
\exists v,\rho(b)(v)=\lambda(b)v,\forall b\in \mathfrak{N}
$$
现在的问题是$v$不一定是$\rho(a)$的特征向量.怎么办呢?我们首先尝试用$a$生成一个不变子空间
$$
W=\{v_n=(\rho(a))^n v\}
$$
显然$W$是$\rho(a)$的不变子空间.我们接下来证明$W$也是$\rho(b),\forall b\in \mathfrak{N}$的不变子空间.

由于$v$是$\mathfrak{N}$的权向量,$\rho(b)v_0=\rho(b)v=\lambda(b)v\in W$.我们将归纳地证明$\rho(b)v_n\in W,\forall b\in \mathfrak{N}$.

假设$\rho(b)v_{n-1}\in W,\forall b\in \mathfrak{N}$.则
$$
\rho(b)v_n=\rho(b)(\rho(a))^n v=\rho(a)\rho(b)v_{n-1}-\rho([a,b])v_{n-1}
$$
因为$\mathfrak{N}$是理想,$[a,b]\in \mathfrak{N}$,由归纳假设$\rho(b)v_{n-1},\rho([a,b])v_{n-1}\in W$
因此$\rho(a)\rho(b)\in \rho(a)W\subset W$.这说明$\rho(b)v_n\in W$.

$\rho(b),b\in \mathfrak{N}$还有如下的有趣性质,我们同样的归纳地证明.

显然$\rho(b)v_0=\lambda(b)v_0\in \{v_0\}$.假设$\rho(b)v_n\in \{v_0,v_1,\dots,v_n\},\forall b\in \mathfrak{N}$,则$\rho(a)\rho(b)v_n\in \rho(a)\{v_0,\dots,v_n\}=\{v_1,\dots,v_{n+1}\}$.因为$\mathfrak{N}$是理想,$[a,b]\in \mathfrak{N}$,同样我们由归纳假设$\rho([a,b])v_n\in \{v_0,\dots,v_n\}$
$$
\rho(b)v_{n+1}=\rho(a)\rho(b)v_n-\rho([a,b])v_n\in \{v_0,\dots,v_{n+1}\}
$$
 上述归纳说明如果我们以$v_n$为基底的话,$\forall b\in \mathfrak{N}$,$\rho(b)$都是一个下三角矩阵.如果我们考察对角元的话,会发现这个规律:记$\rho(b)$在基$v_0,v_1,\dots$下的矩阵表示为$[\rho(b)]$.
 $[\rho(b)]_{n,n}$,即$\braket{v_n|\rho(b)|v_n}$,只有一项贡献,那就是
 $$
 \braket{v_n|\rho(b)|v_n}=\braket{v_n|\rho(a)\rho(b)|v_{n-1}}=\braket{v_{n-1}|\rho(b)|v_{n-1}}
 $$
 而$\braket{v|\rho(b)|v}$是$\lambda(b)$!这说明$[\rho(b)]$在对角元上的元素是完全相同的,全部为$\lambda(b)$.这个结论对于$\forall b\in \mathfrak{N},[a,b]\in \mathfrak{N}$也适用.但是我们知道
 $$
 tr([\rho(a),\rho(b)])=0,\forall b\in \mathfrak{N}
 $$
 一个对角线上都一样的矩阵trace还为$0$,那只能是对角线上的每个元素都为$0$,也即$\lambda([a,b])=0$.

有了这个结论之后,我们就无敌了.考虑如下这个空间
$$
W^\prime=\{w|\rho(b)w=\lambda(b)w,\forall b\in \mathfrak{N}\}
$$
注意到这是$\rho(a)$的不变子空间.因为代入$\lambda([a,b])=0$,
$$
\rho(b)\rho(a)w=\rho(a)\rho(b)w-\rho([a,b])w=\lambda(b)\rho(a)w-\lambda([a,b])w=\lambda(b)\rho(a)w
$$
并且这个$W^\prime$非空(由归纳假设).所以我们可以考虑$\rho(a)$在这个不变子空间上的限制.由基本的线性代数我们知道$\rho(a)|_{W^\prime}$存在特征向量$w$.而同时$w$由定义也是所有$\rho(b),b\in \mathfrak{N}$的特征向量.因此$w$是$\mathfrak{L}=\{a,\mathfrak{N}\}$的公共特征向量.这说明了$\mathfrak{L}$有权.

### 定义2.3
归纳地记$\mathfrak{L}_1=\mathfrak{L},\mathfrak{L}_{i+1}=[\mathfrak{L}_i,\mathfrak{L}_i]$.如果某个$\mathfrak{L}_i=0$,则称李代数$\mathfrak{L}$是幂零的.

### 命题2.1
一个李代数$\mathfrak{L}$是可解的当且仅当其是幂零的.

证明:幂零$\implies$可解是显然的.考虑另一方向.若$\mathfrak{L}$可解,考虑其伴随表示$\mathrm{ad}$.由引理2.1伴随表示有一个权向量$v\in \mathfrak{L}$使得
$$
\mathrm{ad}(a)v=[a,v]=\lambda(a)v,\forall a\in \mathfrak{L}
$$
考虑商空间$\mathfrak{L}/\{v\}$,$\mathrm{ad}$在其上诱导一个线性表示(并且这个表示是良定义的,因为$\{v\}$是不变子空间).归纳地使用引理2.1我们可以得到:$\mathfrak{L}$存在一组基底使得表示$\mathrm{ad}$全部是上三角的.因此
$$
[\mathrm{ad}(a),\mathrm{ad}(b)]
$$
对角线上全部是零.我们会发现每一次对易都会把零往右上推一行,因此必然有$\mathfrak{L}_n=0$,即$\mathfrak{L}$是幂零的.

### 引理2.2
若$\mathfrak{L}$是幂零复李代数,$V$为有限维线性空间,$\rho$为线性表示,则$V$可以分解为$\rho$的权空间的直和.

证明:线性代数告诉我们对于单个线性算子$T$,线性空间$V$可以分解为特征子空间的直和
$$
V=\oplus_{\lambda} \{v|(T-\lambda I)^n v=0,\exists n\}=\oplus_{\lambda}V_{\lambda}
$$
我们只需说明这个不变子空间分解对于其他线性算子同样成立.

引理:$V_\lambda$同时是$S$的不变子空间,当且仅当$(adT)^n(S)=0$.

我们首先计算$(\mathrm{ad}T)^n S$.注意到
$$
(\mathrm{ad}T)^n S=\sum_{i=0}^n C_n^i (-1)^i T^{n-i}ST^i
$$
因此若$V_\lambda$是$S$的不变子空间,则取$n$足够大即可.

若$(adT)^n (S)=0$,
