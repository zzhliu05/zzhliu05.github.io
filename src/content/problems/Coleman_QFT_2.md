---
title: "Gaussian观测量探测真空涨落"
date: 2026-09-02
status: "resolved"
question: |
  对于自由标量场$\phi$,质量为$\mu$,定义可观测量
  $$
  A=\frac{1}{(a\sqrt{\pi})^3}\int d^3 x \phi(x)e^{-x^2/a^2}
  $$
  计算真空态$A$的variance.
tags: ["QFT"]
---

显然有$\braket{vac|A|vac}=0$.我们计算$\braket{A^2}$.
$$
\braket{A^2}=\frac{1}{(a^2\pi)^3}\int d^3x_1 d^3 x_2 \int \frac{d^3p_1 d^3p_2}{4p_1^0p_2^0} e^{-(x_1^2+x_2^2)/a^2}\braket{a_{p_1}a^\dagger_{p_2}e^{i(p_1x_1-p_2x_2)}+a_{p_1}^\dagger a_{p_2}e^{i(p_2x_2-p_1x_1)}+\cdots}
$$
一些变量代换和高斯积分可以得到
$$
=\frac{1}{(a^2\pi)^3}\int d^3x_1 d^3x_2e^{-(x_1^2+x_2^2)/a^2}\int \frac{d^3 p}{2p^0}e^{ip(x_1-x_2)}=\frac{1}{(2\pi)^3}\int \frac{d^3 p}{2p^0}e^{-a^2p^2/2}=\frac{1}{4\pi^2 a^2}\int \frac{u^2e^{-u^2/2}du}{\sqrt{u^2+\mu^2 a^2}}
$$
在$a\to \infty$极限
$$
\braket{A^2}\to a^{-3}\frac{1}{4\pi^2\mu}\int u^2e^{-u^2/2}du=\frac{a^{-3}}{4\sqrt{2}\pi^{3/2}\mu}
$$
在$a\to 0$极限
$$
\braket{A^2}\to \frac{a^{-2}}{4\pi^2}
$$
这说明在极小尺度下(UV极限),量子涨落效应不可忽略.
