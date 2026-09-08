---
title: "Drude电导模型"
date: 2026-09-02
status: "resolved"
question: |
  推导Drude的电导模型.
tags: ["固体物理"]
---
考虑固体中运动的电子.假设其与原子实的碰撞是一个Poisson过程,即时间$t$内的碰撞次数的概率分布为
$$
P(t,N=n)=\frac{(t/\tau)^n}{n!}e^{-t/\tau}
$$
记随机变量首次碰撞时间为$T$.平均自由时为
$$
\braket{t}=\int_0^\infty tP(T=t)dt=\tau
$$
则电子平均速度为
$$
\braket{v}=\frac{eE\tau}{2m_e}\implies j=ne\braket{v}=\frac{e^2\tau}{m_e}E\implies \sigma\propto\frac{e^2\tau}{m_e}
$$