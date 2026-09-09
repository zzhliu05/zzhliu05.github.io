---
title: "谐振子格林函数极点"
date: 2026-09-08
status: "resolved"
question: |
  讨论谐振子格林函数
  $$
  G(x_b,t,x_a,0)=-i(\frac{m\omega_0}{2\pi i sin(\omega_0 t)})^{1/2}exp\{\frac{im\omega_0}{2\pi sin(\omega_0 t)}[(x_b^2+x_a^2)cos(\omega_0 t)-2x_ax_b]\}
  $$
  $G(0,0,\omega)$的极点结构.
tags: ["QFT"]
---
直接由定义
$$
G(0,0,\omega)=-i\int_0^\infty e^{i\omega t-\epsilon t}(\frac{m\omega_0}{2\pi i sin(\omega_0 t)})^{1/2}dt
$$
我们首先做一些变量代换.
$$
G(0,0,\omega)=-i\sqrt{m/2\pi i\omega_0}\int_0^\infty \frac{e^{-\lambda x}}{\sqrt{sinx}}dx,\lambda=(\epsilon-i\omega)/\omega_0
$$
由于$\sqrt{sinx}$是一个多值函数,我们需要取分支.假设对于$x\in [(2n+1)\pi,(2n+2)\pi]$,我们选定
$$
\sqrt{sinx}=i\sqrt{-sinx}
$$
那么由$sinx$的周期性,显然我们有
$$
\int_0^\infty \frac{e^{-\lambda x}}{\sqrt{sinx}}dx=\int_0^\pi\frac{e^{-\lambda x}}{\sqrt{sinx}}\sum_{n=0}^\infty(e^{-2\pi n\lambda}+ie^{-\pi(2n+1)\lambda})
$$
$$
=\frac{1+ie^{-\pi\lambda}}{1-e^{-2\pi \lambda}}\int_0^\pi dx\frac{e^{-\lambda x}}{\sqrt{sinx}}
$$
对于后面这个积分,我们直接丢给Mathematica,得到
$$
\int_0^\pi dx\frac{e^{-\lambda x}}{\sqrt{sinx}}=\frac{(1+i)e^{-\pi\lambda}(1-ie^{\pi\lambda})\sqrt{\pi}\Gamma(\frac{1}{4}-\frac{i\lambda}{2})}{2\Gamma(\frac{3}{4}-\frac{i\lambda}{2})}
$$
综上
$$
G(0,0,\omega)=-i\frac{\sqrt{m}(1-sin(i\lambda\pi))\Gamma(\frac{1}{4}-\frac{i\lambda}{2})}{\sqrt{\omega_0}(1-e^{-2\pi\lambda})\Gamma(\frac{3}{4}-\frac{i\lambda}{2})}
$$
我们可以分析$G(0,0,\omega)$的极点结构.对于分母,由于$\Gamma$函数没有零点.
$$
1-e^{-2\pi \lambda}=0\implies \lambda\in i\mathbb{Z}
$$
是一个可去奇点(和分子的$(1-sin(i\lambda\pi))$抵消了).

因此极点只有可能由分子贡献.$\Gamma$函数在$z\in \mathbb{Z}_{\leq 0}$时有一阶极点,对应
$$
\frac{1}{4}-\frac{i\lambda}{2}=-n\implies \omega=(2n+\frac{1}{2})\omega_0
$$
另一种方法是由上一个问题,
$$
G(x_b,x_a,\omega)=\sum_n \frac{\braket{x_b|\psi_n}\braket{\psi_n|x_a}}{\omega-\epsilon_n+i\epsilon}=\sum_n \frac{\psi_n(x_b)\psi_n^*(x_a)}{\omega-\epsilon_n+i\epsilon}
$$
注意到这是因为当$n$是偶数时,波函数是偶宇称,$\psi_n(0)\neq 0$,而当$n$是奇数时,$\psi_n(0)=0$.
