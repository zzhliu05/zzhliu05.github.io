---
title: "平面水波中的桥墩"
description: "一个关于波动方程的小问题."
published: 2026-08-24
tags: ["流体力学","数学物理方法2"]
category: "流体力学"
draft: false
---
> 本文的出现纯粹是因为笔者看到了一个桥墩.


我们首先回顾关于二维不可压缩浅水波的一般理论.定义水面高度函数为$H(x,y,t)=h_0+h(x,y,t)$.则单个面积微元内体积为$(h_0+h(x,y,t))dxdy$.假设流体只有平行于平面速度,并且速度随高度依赖可忽略,速度场为$\vec{u}(x,y,t)$.连续性方程给出
$$
\frac{\partial h}{\partial t}+\nabla ((h_0+h)\vec{u})=0
$$
忽略流体垂直方向加速度,则压强
$$
p=p_{atm}+\rho g(h-z)
$$
对流体微元做受力分析即可得Euler方程
$$
\rho(\partial_t+\mathcal{L}_{\vec{u}})\vec{u}=-\nabla p-\rho g
$$
代入$p$
$$
\partial_t \vec{u}+(\vec{u}\cdot \nabla)\vec{u}=-g\nabla h
$$
对连续性方程求$\partial_t$,并忽略所有非线性项$(\vec{u}\cdot \nabla)\vec{u},\partial_t h \nabla \vec{u}$,并代入Euler方程可得
$$
(\partial_t^2-gh_0\nabla^2)h=0
$$
现在我们考虑沿$x$方向传播的平面波解.但是此时中心有一个半径为$R$的实心桥墩.桥墩表面的边界条件应该如何?水波不能有垂直于桥墩表面的速度,因此边界条件为
$$
(\vec{n}\cdot \vec{u})|_{\partial D}=0\implies (\vec{n}\cdot \nabla)h=0
$$
设$h=Ae^{i(kx-\omega t)}+f$.极坐标分离变量和Sommerfield辐射条件(即我们只考虑沿桥墩朝无穷远传播的波)会给出Hemholtz方程和第一类Hankel函数展开.记
$$
f=e^{-i\omega t}\sum_{m\in \mathbb{Z}}C_m e^{im\phi}H^{(1)}_m(kr)
$$
边界条件匹配要求
$$
(ik Asin \phi e^{ikrsin\phi}+\partial_r f)|_{r=R}=0
$$
由展开$e^{ikrsin\phi}=\sum_m J_m(kr)e^{im\phi}$逐项匹配系数可得
$$
A J^\prime_m(kR)+C_m (H^{(1)}_m)^\prime(kR)=0
$$
因此总的水波是平面波和反射波的叠加
$$
h=A[e^{i(kx-\omega t)}-e^{-i\omega t}\sum_{m\in \mathbb{Z}}\frac{J^\prime_m(kR)}{(H^{(1)}_m)^\prime(kR)}e^{im\phi}H^{(1)}_m(kr)]
$$
