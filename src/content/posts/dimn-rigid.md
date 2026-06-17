---
title: "n维刚体的运动方程"
description: "对n维刚体的运动学描述."
published: 2026-06-16
tags: ["理论力学","刚体","李群"]
category: "理论力学"
draft: false
---
## 刚体相空间
考虑$n$维欧氏空间中的刚体,为了讨论简便不妨设其位于质心系内.容易证明其位形空间为$SO(n)$.考虑其李代数(左不变切向量场全体)$so(n)$,定义其一组基底为
$$
X_{ij},j>i, \ s.t. X_{ij}(I)=(-1)^{i+j}(E_{ij}-E_{ji})
$$
可以看出对易关系
$$
[X_{ij},X_{kl}]=(-1)^{i+j+k+l}(\delta_{jk}X_{il}+\delta_{jl}X_{ik}+\delta_{ik}X_{lj}+\delta_{il}X_{jk})
$$
其中我们将$X_{ij}(j<i)$理解为$-X_{ji}$.切丛$TSO(n)$为有限生成$C^\infty(SO(n))$模,由$X_{ij}$生成.

:::note[注意]
下文中的$X_{ij}$都是指$X_{ij}(I)$.
:::

## Lagrangian
Lagrangian是$TSO(n)$上的函数.考虑处于状态$(U,\sum_{j>i}\omega_{ij}X_{ij}(U))$的刚体,考虑初始时(即$U=I$)位于$x$,目前位于$Ux$的微小质量元$dm$,其速度为
$$
v=\sum_{j>i}\omega_{ij}UX_{ij}x
$$
因此由$U^TU=I$,
$$
L=\int dm \frac{v^Tv}{2}=-\int \frac{dm}{2}\sum_{j>i,l>k}\omega_{ij}\omega_{kl} x^TX_{kl}X_{ij}x
$$
$$=-\int \frac{dm}{2}\sum_{j>i,l>k}\omega_{ij}\omega_{kl}(\delta_{il}x_kx_j-\delta_{ik}x_lx_j-\delta_{jl}x_kx_i+\delta_{jk}x_lx_i)$$
定义转动惯量张量
$$
I_{ijkl}=\int dm(\delta_{ik} x_lx_j+\delta_{jl}x_kx_i-\delta_{il}x_kx_j-\delta_{jk}x_lx_i)
$$
为了方便不妨假定$\omega_{ij}=0,\forall j\leq i$,则
$$
L=\frac{1}{2}\sum_{i,j,k,l}I_{ijkl}\omega_{ij}\omega_{kl}=\frac{1}{2}I_{ijkl}\omega^{ij}\omega^{kl}
$$ 

## 运动方程

根据Euler-Lagrange方程,我们应该有
$$
\frac{d}{dt}\frac{\partial L}{\partial \omega}(U(t),\frac{dU}{dt}(t))=0
$$
求偏导可得$\frac{\partial L}{\partial \omega^{ij}}=I_{ijkl}\omega^{kl}\implies I_{ijkl}\frac{d\omega^{kl}}{dt}=0$.
$$
\frac{dU}{dt}(t)=\sum_{i,j}\omega_{ij}U(t)X_{ij}
$$
因此
$$
\omega^{ij}=\braket{U^{\dagger}\frac{dU}{dt},X_{ij}}
$$
$$
I_{ijkl}[\braket{U^\dagger \frac{d^2 U}{dt^2},X_{ij}}]
$$
