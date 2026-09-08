---
title: "经典力学中的Dyson级数展开"
description: "哈密顿力学中如何使用Dyson级数?"
published: 2026-07-23
tags: ["理论力学"]
category: "理论力学"
draft: true
---


## Hamilton力学
我们知道对于一个经典力学系统,其运动方程由哈密顿量$H(q^i,p_i)$和Poisson括号$\{\}$决定.
$$
\frac{d}{dt}=X_H,s.t. X_H=\{H,\}
$$
假设现在我们的Hamiltonian具有微扰形式
$$
H=H_0+V
$$
我们希望获得经典方程的微扰展开.记$x_0=(q_0,p_0)$为经典解,满足$\frac{dx_0}{dt}=\{H,x_0\}$.定义经典传播子
$$
U_0(t_2,t_1):C^\infty(M)\to C^\infty(M),f(x)\to f(x_0(t_2)),s.t. x_0(t_1)=x
$$
对于函数$f(x)$,定义其相互作用表象表示为
$$
f_I(x,t):=U(t,0)[f(U(0,t)[x])]
$$
