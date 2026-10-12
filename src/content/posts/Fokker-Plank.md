---
title: Fokker-Planck 方程
description: Fokker-Planck 方程学习笔记。
published: 2026-10-10
tags:
  - 统计物理
category: 统计物理
draft: true
---

## 随机力概率分布的Hamiltonian动力学
假设我们有相空间上的一个概率分布$f(x,p,t)$,假设$f$是"粒子数密度".相空间该点$(x,p)$的速度场和加速度场分别为$v(t),a(t)$.则由局部粒子数守恒,我们有$f$的随体导数为$0$:
$$
\frac{Df}{Dt}=\frac{\partial f}{\partial t}+\partial_x(vf)+\partial_p(af)=0
$$
对于哈密顿量为$H$的经典系统,我们有
$$
v=\frac{dx}{dt}=\frac{\partial H}{\partial p},a=\frac{dp}{dt}=-\frac{\partial H}{\partial x}
$$
所以
$$
\frac{\partial f}{\partial t}+\frac{\partial H}{\partial p}\frac{\partial f}{\partial x}-\frac{\partial H}{\partial x}\frac{\partial f}{\partial p}=0\implies \frac{\partial f}{\partial t}=\{f,H\}
$$
对于$H=\frac{p^2}{2m}+U(x)$,我们有平衡态分布
$$
\partial_t f=0\implies \frac{p}{m}\partial_x f-U^\prime(x)\partial_p f=0\implies f=Ce^{-\beta(\frac{p^2}{2m}+U(x))}
$$
which is Boltzmann分布.

我们考虑在运动方程中加入随机力$F(t)$,则
$$
\frac{dp}{dt}=-\frac{\partial H}{\partial x}+F(t)
$$
代入$f$的运动方程即得
$$
\partial_t f=\{f,H\}-F(t)\partial_p f
$$
记非微扰传播子为$e^{Lt}$,即
$$
\partial_t f=Lf-F(t)\partial_p f
$$
则仿照Dyson级数展开的方法,我们有
$$
f(x,p,t)=e^{Lt} g(x,p,t)
$$
则
$$
\partial_t f=Lf+e^{Lt}\partial_t g=Lf-F(t)e^{Lt}\partial_p g\implies \partial_t g=-F(t)\partial_p g
$$
因此
$$
g(x,p,t)=f(x,p,0)-\int_0^t F(s)\partial_p g(x,p,s)ds$$
$$
\implies f(x,p,t)=e^{Lt}f(x,p,0)-\int_0^t F(s)e^{L(t-s)}\partial_p f(x,p,s)ds
$$
和Dyson级数长得完全一样.现在我们对解$f(x,p,t)$求关于时间的偏导,带入原方程,可以得到
$$
\partial_t f(t)=Lf(t)-F(t)\partial_p(e^{Lt}f(x,p,0))+\int_0^t F(t)F(s)\partial_p[e^{L(t-s)}\partial_pf(x,p,s)]ds
$$
对随机力系综求平均可以得到(因为$\braket{F(t)}=0,\braket{F(t)F(s)}=2A\delta(t-s)$)
$$
\partial_t \braket{f(t)}=\braket{Lf(t)}+\int_0^t \delta(t-s)\partial_p[e^{L(t-s)}\partial_pf(x,p,s)]ds
$$
因此在系综平均下,我们有
$$
\partial_t f=Lf+\partial_p(A\partial_p f)
$$
此即Fokker-Plank方程.加入我们考虑经典哈密顿量和对应的损耗项$F=-\xi \frac{p}{m}$,则对应的Livioulle operator为
$$
Lf=\partial_p(U^\prime(x)-\frac{p\xi}{m})f-\frac{p}{m}\partial_x f
$$
假设随机力满足FDT,即$A=\xi k_BT$,则对应的Fokker-Plank方程为
$$
\partial_t f=\partial_p(U^\prime(x)-\frac{p\xi}{m}) f-\frac{p}{m}\partial_x f+\xi k_BT \partial_p^2 f
$$
其平衡态分布满足
$$
\partial_p(U^\prime(x)-\frac{p\xi}{m})f-\frac{p}{m}\partial_x f+\xi k_BT \partial_p^2 f=0
$$
容易看出$f=e^{-\beta(\frac{p^2}{2m}+U(x))}$满足该方程(这也是为什么FDT给出$A=\xi k_BT$).
