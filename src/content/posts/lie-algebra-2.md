---
title: "Dirac旋量场的量子化"
description: "对狄拉克方程解的正则量子化."
published: 2026-06-21
tags: ["量子场论"]
category: "量子场论"
draft: false
---
我们知道Dirac方程为
$$
(i\gamma^\mu \partial_\mu-m)\psi=0
$$
其中$\sigma^\mu=(1,\vec{\sigma}),\bar{\sigma}^\mu=(1,-\vec{\sigma})$
$$
\gamma^\mu=\left[\begin{matrix}0 & \sigma^\mu \\
\bar{\sigma}^\mu & 0\end{matrix} \right]
$$
为Dirac矩阵,满足对易关系
$$
\{\gamma^\mu \gamma^\nu\}=2\eta^{\mu\nu}I
$$
定义$\bar{\psi}=\psi^\dagger \gamma^0$.对$\psi$做模式分解$\psi=u(p)e^{-ipx}$,则$u(p)$满足
$$
\left[\begin{matrix}-m & p_\mu\sigma^\mu \\
p_\mu\bar{\sigma}^\mu & -m\end{matrix} \right]\left[\begin{matrix}u_L(p)\\
u_R(p)\end{matrix} \right]=0
$$
取$u_L^s(p)=\sqrt{p\cdot \sigma}\xi^s,u_R^s(p)=\sqrt{p\cdot \bar{\sigma}}\xi^s$.我们验证其满足Dirac方程.
$$
-mu_L+p_\mu \sigma^\mu u_R=(-m\sqrt{p\cdot \sigma}+p\cdot \sigma \sqrt{p\cdot \bar{\sigma}})\xi^s\\=(-m+\sqrt{(p\cdot \sigma)(p\cdot \bar{\sigma})})\sqrt{p\cdot \sigma}\xi^s
$$
注意到$\{\sigma^\mu,\bar{\sigma}^\nu\}=2\eta^{\mu\nu} I$,
$$
p_\mu p_\nu \sigma^\mu \bar{\sigma}^\nu=\frac{1}{2}p_\mu p_\nu\{\sigma^\mu,\bar{\sigma}^\nu\}=p_0p_0-\frac{1}{2}p_ip_j\{\sigma^i,\sigma^j\}=p^2 I=m^2 I
$$
因此
$$
-m+\sqrt{(p\cdot \sigma)(p\cdot \bar{\sigma})}=0
$$
$\xi^s$对应自旋的两个分量.注意到$u$有归一化,由$\sigma^\dagger=\bar{\sigma}$
$$
\bar{u}u=u^\dagger \gamma^0 u=(u_L^s)^\dagger u_R+(u_R^s)^\dagger u_L=2m(\xi^s)^\dagger \xi^s
$$
可以去$\xi^1=(1,0),\xi^2=(0,1)$.

接下来我们考虑Dirac方程的负能解.设$\psi=d(p)e^{ipx}$.则