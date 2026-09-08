---
title: "Big Pie:如何将$\\pi$算到$10^n$位?"
description: ""
published: 2026-09-06
tags: ["解析数论"]
category: "cuda"
draft: true
---
## NTT
$\mathbb{Z}_q$上的多项式乘法时间复杂度是多少?类似FFT的思想我们可以把他做到$O(nlogn)$.取整环$\mathbb{Z}_q$中的原根$\omega,\omega^n=1$,则
对于$p=\sum_{i}a_i\omega^i\in \mathbb{Z}_q[\omega]\cong \mathbb{Z}_q[x]/(x^n-1)$,定义数论傅里叶变换(number theoretic transform,NTT)
$$
\bar{p}:=\sum_{j=0}^{n-1}b_j\omega^j\in \mathbb{Z}_q[\omega],b_j=\sum_{i=0}^{n-1}a_i\omega^{i\times j}
$$
则有$\overline{p_1 p_2}=\sum_{j=0}^{n-1}(b_1)_j(b_2)_j \omega^nj$.经典的FFT鲽形算法告诉我们,如果我们想要做总长度为$2^L$的DFT,则可以将其分为前$2^{L-1}$和后$2^{L-1}$部分
$$
b_{j}=\sum_{i=0}^{2^{L-1}-1} [a_{2i}(\omega^2)^{ij}+\omega^j a_{2i+1}(\omega^2)^{ij}],b_{j+2^{L-1}}=\sum_{i=0}^{2^{L-1}-1}[a_{2i}(\omega^2)^{ij}-\omega^ja_{2i+1}(\omega^2)^{ij}]
$$
