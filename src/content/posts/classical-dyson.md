---
title: 经典力学中的Dyson级数展开
description: 哈密顿力学中如何使用Dyson级数?
published: 2026-07-23
tags:
  - 理论力学
category: 理论力学
draft: false
---
我们知道对于一个经典力学系统,其运动方程由哈密顿量$H(q^i,p_i)$和Poisson括号${\ ,\ }$决定.

$$\frac{d}{dt}=-X_H,\quad \text{s.t. } X_H={H,\cdot}$$

假设现在我们的Hamiltonian具有微扰形式
$$H=H_0+V(t)$$
可观测量是相空间上的一个函数,记为$X(q^i,p_i,t)$.容易验证其满足Heisenberg方程

$$\frac{dX}{dt}(q^i(t),p_i(t),t)=\frac{\partial X}{\partial t}+\{X,H\}$$

我们考虑$\partial_t X=0$的情形.则记非微扰传播子为
$$U_0(t)=e^{-tX_{H_0}}$$
并且假设
$$X(q^i(t),p_i(t))=(U_0(t)f)(q^i(0),p_i(0),t)$$
代入运动方程
$$\frac{dX}{dt}=-X_{H_0}(X)+U_0(t)\partial_t f=-X_{H_0}(X)-X_{V(t)}(U_0(t)f)$$

因此

$$U_0(t)\partial_t f=-X_{V(t)}U_0(t)[f]$$

即

$$\partial_t f=-U_0^{-1}(t)X_{V(t)}U_0(t)[f]$$

显然我们应该有$f(q^i,p_i,0)=X(q^i,p_i)$,因此

$$f(q^i,p_i,t)=X(q^i,p_i)-\int_0^t d\tau, U_0^{-1}(\tau)X_{V(\tau)}U_0(\tau)[f]$$

类似Dyson级数展开,我们得到

$$f(q^i,p_i,t)=\sum_{n=0}^\infty (-1)^n \prod_{k=n}^{1} \left(\int_0^{t_{k+1}}dt_k, U_0^{-1}(t_k)X_{V(t_k)}U_0(t_k)\right)[X]=\mathcal{T}\left{e^{-\int_0^t d\tau, \tilde{X}_{V(\tau)}}\right}[X]$$

其中$t_{n+1}:=t$,乘积中$k=n$在最左边(即时间较晚的算符在左),$\mathcal{T}$为时间编序,$\tilde{X}_{V(\tau)}:=U_0^{-1}(\tau)X_{V(\tau)}U_0(\tau)$是相互作用绘景下的可观测量.由于$U_0$是正则变换,保持Poisson括号,故

$$\tilde{X}_{V(\tau)}=X_{\tilde{V}(\tau)},\quad \tilde{V}(\tau)=U_0^{-1}(\tau)V(\tau)$$

## examples

如果我们取$X(q^i,p_i)=q^i$,则我们可以考虑哈密顿量微扰对轨迹的影响.比如我们可以考察Duffing型的微扰

$$H=\frac{p^2}{2m}+\frac{m\omega^2 x^2}{2}+\lambda x^4$$

此时$H_0$为谐振子,$X=x$.非微扰传播子作用为

$$(U_0(t)g)(x,p)=g\left(x\cos\omega t+\frac{p}{m\omega}\sin\omega t,\ p\cos\omega t-m\omega x\sin\omega t\right)$$

故

$$\tilde{V}(\tau)=\lambda\left(x\cos\omega\tau-\frac{p}{m\omega}\sin\omega\tau\right)^4$$

考虑一阶修正.由${\tilde{V},x}=-\partial_p\tilde{V}$

$$f_1=-\int_0^t d\tau, X_{\tilde{V}(\tau)}[x]=-\int_0^t d\tau, {\tilde{V}(\tau),x}=\int_0^t d\tau, \partial_p\tilde{V}(\tau)=-\frac{4\lambda}{m\omega}\int_0^t d\tau, \sin\omega\tau\left(x\cos\omega\tau-\frac{p}{m\omega}\sin\omega\tau\right)^3$$

再作用$U_0(t)$,并令$s=t-\tau$,则得到

$$x(t)=x_0(t)-\frac{4\lambda}{m\omega}\int_0^t ds, \sin\omega(t-s),x_0(s)^3+O(\lambda^2)$$

其中$x_0(t)=x(0)\cos\omega t+\frac{p(0)}{m\omega}\sin\omega t$是非微扰轨迹.这正是方程$m\ddot{x}+m\omega^2 x=-4\lambda x^3$在一阶下用推迟Green函数求得的结果.

进一步令$x_0(s)=A\cos(\omega s-\phi)$,$A=\sqrt{x(0)^2+p(0)^2/m^2\omega^2}$,利用$\cos^3\theta=\frac{1}{4}(3\cos\theta+\cos 3\theta)$,积分中$\cos(\omega s-\phi)$项与系统共振,给出久期项

$$x(t)\supset-\frac{3\lambda A^3}{2m\omega},t\sin(\omega t-\phi)$$

它对应频率移动$\Delta\omega=\frac{3\lambda A^2}{2m\omega}$.久期项随$t$线性增长,说明一阶微扰只在$\Delta\omega, t\ll1$时有效.