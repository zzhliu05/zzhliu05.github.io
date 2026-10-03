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
### 指数关联函数的谱函数
假设飞行器沿某个方向飞行,并且遭受了随机湍流.我们考察三个不同方向湍流速度场的傅里叶变换谱(沿飞行器飞行方向).设与飞行器方向平行的速度场为$v_x$,并且假设其关联函数为指数衰减形式
$$
\braket{v_x(x)v_x(x+r)}=Ce^{-\frac{|r|}{L}}
$$
其中平均为关于飞行方向的平均.考虑其Fourier变换
$$
v_x(x)=\int_{-\infty}^{\infty}e^{-i\Omega x}\tilde{v}_x(\Omega)d\Omega
$$
则
$$
\braket{v_x(x)v_x(x+r)}=\int dx\int d\Omega_1\int d\Omega_2 e^{-i(\Omega_1x+\Omega_2(x+r))} \tilde{v}_x(\Omega_1)\tilde{v}_x(\Omega_2)
$$
积掉$x$得到$2\pi \delta(\Omega_1+\Omega_2)$,再积掉其中一个$\Omega$得到
$$
\braket{v_x(x)v_x(x+r)}=2\pi \int d\Omega [\tilde{v}_x(\Omega)\tilde{v}_x(-\Omega)] e^{-i\Omega r}=Ce^{-\frac{|r|}{L}}
$$
由于$v_x$是一个实数场,我们有$\tilde{v}_x(-\Omega)=\tilde{v}_x^*(\Omega)$,因此
$$
2\pi \int_{-\infty}^{+\infty} d\Omega |\tilde{v}_x(\Omega)|^2 e^{-i\Omega r}=4\pi \int_{0}^{+\infty} d\Omega |\tilde{v}_x(\Omega)|^2 cos(\Omega r)=Ce^{-\frac{|r|}{L}}
$$
即
$$
|\tilde{v}_x(\Omega)|^2=\frac{1}{2(2\pi)^2}2Re[\int_{0}^{+\infty}Ce^{i\Omega r-|r|/L}dr]=\frac{1}{(2\pi)^2}Re[\frac{2C}{1/L-i\Omega }]=\frac{2CL}{8\pi^2(1+(L\Omega)^2)}
$$
因此平行速度的功率谱传递函数为
$$
|\tilde{v}_x(\Omega)|^2=\frac{CL}{(2\pi)^2(1+(L\Omega)^2)}
$$
### 各项同性不可压缩流体的关联函数约束
接下来我们考虑垂直方向的谱函数.我们假设旋转对称性,因此
$$
\tilde{v}_y(\Omega)=\tilde{v}_z(\Omega)
$$
速度场关联函数应该有什么性质?定义速度场关联函数
$$
C_{ij}(r)=\braket{v_i(x)v_j(x+r)}
$$
假如我们旋转整个空间,对应的$r$和$v$都会旋转.如果空间各向同性的话,关联函数在旋转后应该不变.因此$SO(3)$在关联函数上有表示
$$
C_{ij}(Rr)=R_{ik}R_{jl}C_{kl}(r)
$$
即$C_{ij}$是一个二阶张量.熟悉量子力学/电动力学的读者应该了解二阶张量(作为$SO(3)$的$9$维表示)具有如下不可约分解
$$
C_{ij}(r)=C_{l=0}\oplus C_{l=1}\oplus C_{l=2}=\frac{\sum_k C_{kk}(r)}{3}\delta_{ij}+\frac{C_{ij}(r)-C_{ji}(r)}{2}+(\frac{C_{ij}(r)+C_{ji}(r)}{2}-\frac{\sum_k C_{kk}(r)}{3}\delta_{ij})
$$
一个有趣的观察是如果湍流具有空间反演对称性(即没有vortex之类的东西),那么关联函数的反对称部分$l=1$消失.这是因为
$$
C_{ji}(r)=C_{ji}(-r)=\braket{v_j(x)v_{i}(x-r)}=\braket{v_i(x)v_j(x+r)}=C_{ij}(r)
$$
因此一个最一般的各向同性+空间反演对称的关联函数应该具有以下形式
$$
C_{ij}(r)=\frac{f(|r|)}{3}\delta_{ij}+g(|r|)(\frac{r_ir_j}{r^2}-\frac{\delta_{ij}}{3})
$$
由于我们已经知道当$r=r \hat{e}_x$时,$C_{xx}(r)=Ce^{-r/L}$,因此
$$
\frac{f(|r|)}{3}+\frac{2}{3}g(|r|)=Ce^{-r/L}
$$
另一个约束是我们假设湍流是不可压缩流体.则我们有
$$
\nabla\cdot v=0\implies \sum_i \partial_i v_i=0\implies \sum_i\braket{\partial_i v_i(x)}=0\implies \sum_i \braket{v_j(x)\partial_i v_i(x)}=0
$$
注意到$\braket{v_j(x)\partial_i v_i(x)}=\partial_i C_{ji}(r)$.因此我们有约束
$$
\sum_i \partial_i C_{ji}(r)=0\implies \partial_j f(|r|)-\partial_j g(|r|)+3(\partial_i g(|r|)\frac{r_i r_j}{r^2}+g(|r|))\partial_i (\frac{r_i r_j}{r^2}))=0,\forall j
$$
$\partial_i |r|=\frac{r_i}{|r|}$,因此
$$
f^\prime\frac{r_j}{|r|}-g^\prime \frac{r_j}{|r|}+3(g^\prime \frac{r_j}{|r|}+g\frac{2r_j}{r^2})=0\implies r(f^\prime +2g^\prime)+6g=0
$$
联立二式得到
$$
-\frac{3}{L}C re^{-r/L}+6g=0\implies g=\frac{Cr e^{-r/L}}{2 L},f=3Ce^{-r/L}-\frac{Cre^{-r/L}}{L}
$$
因此
$$
C_{yy}(r \hat{e}_x)=C_{zz}(r\hat{e}_x)=\frac{f-g}{3}=Ce^{-r/L}-\frac{Cr e^{-r/L}}{2L}
$$
其对应的谱函数为
$$
|\tilde{v}_y|^2=|\tilde{v}_z|^2=\frac{1}{2(2\pi)^2}2Re[\int_{0}^{+\infty}C(1-\frac{|r|}{2L})e^{i\Omega r-|r|/L}dr]=\frac{C}{(2\pi)^2}[\frac{L}{1+(L\Omega)^2}-\frac{1}{2}\frac{L(1-(L\Omega)^2)}{[1+(L\Omega)^2]^2}]
$$
$$
=\frac{CL(1+3(L\Omega)^2)}{2(2\pi)^2 [1+(L\Omega)^2]^2}
$$
此即湍流的Dryden模型.
