---
title: 经典力学中的Dyson级数展开
description: 哈密顿力学中如何使用Dyson级数?
published: 2026-07-23
tags:
  - 理论力学
category: 理论力学
draft: false
---


我们知道对于一个经典力学系统,其运动方程由哈密顿量$H(q^i,p_i)$和Poisson括号$\{\}$决定.
$$
\frac{d}{dt}=X_H,s.t. X_H=\{H,\}
$$
假设现在我们的Hamiltonian具有微扰形式
$$
H=H_0+V(t)
$$
可观测量是相空间上的一个函数,记为$X(q^i,p_i,t)$.容易验证其满足Heisenberg方程
$$
\frac{dX}{dt}(q^i(t),p_i(t),t)=\frac{\partial X}{\partial t}+\{X,H\}
$$
我们考虑$\partial_t X=0$的情形.则记非微扰传播子为
$$
U_0(t)=e^{-tX_H }
$$
并且假设
$$
X(q^i(t),p_i(t))=(U_0(t)f)(q^i(0),p_i(0),t)
$$
代入运动方程
$$
\frac{dX}{dt}=-X_{H_0}(X)+U_0(t)\partial_t f=-X_{H_0}(X)-X_{V(t)}(U_0(t)f)
$$
因此
$$
U_0(t)\partial_t f=-X_{V(t)}U_0(t)[f]
$$
显然我们应该有$f(q^i,p_i,0)=X(q^i,p_i)$,因此
$$
f(q^i,p_i,t)=X(q^i,p_i)-\int_0^t d\tau U_0^{-1}(\tau)X_{V(\tau)}U_0(\tau)[f]
$$
类似Dyson级数展开,我们得到
$$
f(q^i,p_i,t)=\sum_{n=0}^\infty (-1)^n \prod_{i=1}^n (\int_0^{t_{i+1}}dt_i U_0^{-1}(t_i)X_{V(t_i)}U_0(t_i))[X]=\mathcal{T}\{e^{-\int_0^t d\tau  \tilde{X}_{V(\tau)}}\}[X]
$$
其中$\tilde{X}_{V(\tau)}:=U_0^{-1}(\tau)X_{V(\tau)}U_0(\tau)$是相互作用绘景下的可观测量.

### examples
如果我们取$X(q^i,p_i)=q^i$,则我们可以考虑哈密顿量微扰对轨迹的影响.
