---
title: Langevin动力学的方差
date: 2026-10-08
status: resolved
question: Langevin动力学的方差计算
tags:
  - 随机微分方程
draft: false
---
考虑Langevin方程
$$
m\frac{dv}{dt}=-\xi v+F(t)
$$
其中随机力$F(t)$有关联
$$
\braket{F(t)}=0,\braket{F(t)F(t^\prime)}=2A\delta(t-t^\prime)
$$
则
$$
v=e^{-\xi t/m}v_0+\int_0^t d\tau e^{-\xi (t-\tau)/m}\frac{F(t)}{m}
$$
再次积分
$$
\Delta x=\frac{m v_0}{\xi} (1-e^{-\xi t/m})+\int_0^t d\tau^\prime \tilde{v}(\tau^\prime)
$$
因此
$$
\braket{\Delta x^2}=\frac{m^2v_0^2}{\xi^2}(1-e^{-\xi t/m})^2+e^{-2\xi t/m}\int dt_1dt_2\int d\tau_1d\tau_2 e^{\xi(\tau_1+\tau_2)/m}\frac{2A\delta(\tau_1-\tau_2)}{m^2}
$$
化简得
$$
\braket{\Delta x^2}=\frac{m^2v_0^2}{\xi^2}(1-e^{-\xi t/m})^2+\int_0^t dt_1\int_0^t dt_2 \int_0^{max(t_1,t_2)}d\tau e^{2\xi \tau/m}\frac{2A}{m^2}=\cdots+\frac{2Ae^{-2\xi t/m}}{m^2}
$$

对于正则系综,代入FDT:$A=\xi k_B T$,我们有
$$
\braket{\Delta x^2}=\frac{m^2v_0^2}{\xi^2}(1-e^{-\xi t/m})^2+\int_0^t dt_1\int_0^t dt_2 \int_0^{min(t_1,t_2)}d\tau e^{\xi (2\tau-t_1-t_2)/m}\frac{2A}{m^2}
$$
我们仔细计算这个积分
$$
\frac{A}{m\xi}\int_0^t dt_1[\int_0^{t_1}dt_2 e^{\xi(t_2-t_1)/m}+\int_{t_1}^t dt_2 e^{\xi(t_1-t_2)/m}]=\frac{2A}{\xi^2}[t-\frac{m}{\xi}(e^{-\xi t/m}-1)]-\frac{mA}{\xi^3}(e^{-\xi t/m}-1)^2
$$
化简得到
$$
\braket{\Delta x^2}=\frac{m^2v_0^2}{\xi^2}(1-e^{-\xi t/m})^2+\frac{2k_B T}{\xi}
(t-\frac{m}{\xi}e^{-\xi t/m}+\frac{m}{\xi})-\frac{mk_B T}{\xi^2}(1-e^{-\xi t/m})^2$$
如果我们再对初始速度做正则系综Maxwell-Boltzmann平均,我们有
$$
\braket{v_0^2}=\frac{k_B T}{m}
$$
注意到首尾两个平方项正好相消.因此我们有
$$
\braket{\Delta x^2}=\frac{2k_B T}{\xi}(t-\frac{m}{\xi}e^{-\xi t/m}+\frac{m}{\xi})
$$
当$t\to \infty$时,我们回到Einstein关系
$$
\braket{\Delta x^2}=\frac{2k_B T}{\xi}t
$$
