---
title: Dryden Spectrum
description: 解释湍流的Dryden谱近似.
published: 2026-10-01
tags:
  - 信号与系统
  - 流体力学
category: 流体力学
draft: false
---
## 速度场的谱函数
假设飞行器沿某个方向飞行.我们考察三个不同方向速度场的傅里叶变换谱(沿飞行器飞行方向).设与飞行器方向平行的速度场为$u$,并且假设其关联函数为指数衰减形式
$$
\braket{u(x)u(x+r)}=Ce^{-\frac{r}{L}}
$$
考虑其Fourier变换
$$
u(x)=\int_{-\infty}^{\infty}e^{-i\Omega x}\tilde{u}(\Omega)d\Omega
$$
则
$$
\braket{u(x)u(x+r)}=\int dx\int d\Omega_1\int d\Omega_2 e^{-i(\Omega_1x+\Omega_2(x+r))} \tilde{u}(\Omega_1)\tilde{u}(\Omega_2)
$$
积掉$x$得到$2\pi \delta(\Omega_1-\Omega_2)$,再积掉其中一个$\Omega$得到
$$
\braket{u(x)u(x+r)}=\int d\Omega [\tilde{u}(\Omega)\tilde{u}(-\Omega)] e^{-}
$$
