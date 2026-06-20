---
title: "电磁波的辐射"
description: "详细介绍加速运动场源的电磁辐射."
published: 2026-06-20
tags: ["电动力学","电磁辐射"]
category: "电动力学"
draft: false
---

在Lorenz规范下我们有(记$t_r=t-\frac{R}{c},R=|x^\prime-x|$)
$$
\phi(x^\prime,t)=\frac{1}{4\pi \epsilon_0}\int \frac{\rho(x,t_r)}{R}dV,A^i(x^\prime,t)=\frac{1}{4\pi \epsilon_0 c^2}\int \frac{j^i(x,t_r)}{R}dV
$$
考虑傅里叶变换
$$
\rho(x,\omega)=(2\pi)^{-1/2}\int_{-\infty}^{\infty}\rho(x,t)e^{i\omega t}dt,j^i(x,\omega)=\mathcal{F}[j^i(x,t)]
$$
则
$$
\phi(x^\prime,\omega)=\frac{1}{4\pi \epsilon_0}\int e^{ikR}\frac{\rho(x,\omega)}{R}dV,A(x^\prime,\omega)=\frac{1}{4\pi \epsilon_0 c^2}\int e^{ikR}\frac{j(x,\omega)}{R}dV
$$
其中$k=\frac{\omega}{c}$.辐射考虑的是加速电荷运动系统整体的能量损耗,即在无穷远处的能流通量.因此我们可以采用远场近似来衡量辐射能量.假设场源局域地分布于原点附近,即
$$
x\ll x^\prime
$$
则我们有展开(记$|x^\prime|=r$)
$$
R=|x^\prime-x|=r-\frac{x^ix^\prime_i}{r}+\frac{1}{2}(\frac{\delta_{ij}}{r}-\frac{x_i^\prime x_j^\prime}{r^3})x^ix^j+o(\frac{x^2}{r^2})
$$
我们具体展开到几阶?能流密度$ P\propto EB$,无穷远处面积$\propto r^2$.因此我们至少需要展开到$\phi,A\propto \frac{1}{r}$.因此
$$
\phi(x^\prime,\omega)=\frac{1}{4\pi \epsilon_0}\int \frac{\rho(x,\omega)}{r}\mathrm{exp}(ikr(1-\frac{x^ix^\prime_i}{r^2}))dV+O(\frac{1}{r^2})
$$
$$
A(x^\prime,\omega)=\frac{1}{4\pi \epsilon_0 c^2}\int \frac{j(x,\omega)}{r}\mathrm{exp}(ikr(1-\frac{x^ix^\prime_i}{r^2}))dV+O(\frac{1}{r^2})
$$
有了$\phi,A$我们来计算电场和磁场.首先我们计算磁场$B^i=\epsilon^{ijk}\partial_jA_k$
注意到
$$
\partial^i \frac{1}{r}=o(\frac{1}{r}),\partial^i [\mathrm{exp}(ikr(1-\frac{x^ix^\prime_i}{r^2})]=ik\frac{(x^\prime)^i}{r}\mathrm{exp}(ikr(1-\frac{x^ix^\prime_i}{r^2})+o(1)
$$
因此
$$
B^i=\epsilon^{ijk}\partial_j A_k=\frac{ik e^{ikr}}{4\pi \epsilon_0 c^2 r}\int \epsilon^{ijk}(e_r)_jj_k(x,\omega)e^{-ik x\cdot e_r}dV
$$
由Maxwell方程组电场为
$$
E=i\frac{c^2}{\omega}\nabla\times B
$$
同样注意到$\nabla$能够给出的常数阶项只有$ike_r$,因此
$$
E^i=-\frac{ike^{ikr}}{4\pi \epsilon_0 cr}\int e_r\times (e_r\times j)e^{-ikx\cdot e_r}dV
$$
考虑平均能流密度
$$
\bar{S}=\frac{1}{\mu_0}\int_{-\infty}^\infty E(x,t)\times B(x,t) dt
$$
$$
=\frac{1}{2\pi \mu_0}\int_{-\infty}^\infty \int_{\infty}^\infty\int_{-\infty}^\infty dt d\omega_1 d\omega_2 E(x,\omega_1)\times B(x,\omega_2)e^{-i(\omega_1+\omega_2)t}
$$
$$
=\frac{1}{\mu_0}\int_{-\infty}^\infty d\omega E(x,\omega)\times B(x,-\omega)=\frac{1}{\mu_0}\int_{-\infty}^\infty d\omega E(x,\omega)\times B^*(x,\omega)
$$
定义$\bar{S}(x,\omega)=E(x,\omega)\times B^*(x,\omega)$.记$p(x^\prime,\omega)=\int j(x,\omega)e^{-ikx\cdot e_r}dV$,则
$$
\begin{aligned}
\bar{S}(x^\prime,\omega)&=\frac{k^2}{\mu_0(4\pi \epsilon_0)^2c^3 r^2}e_r\times (e_r\times p)\times (e_r\times p^*)\\&=\frac{k^2}{16\pi^2 \epsilon_0 c r^2}(|p|^2-(e_r\cdot p)^2)e_r
\end{aligned}
$$
因此总平均辐射功率为(取无穷远处半径为$r$球面)
$$
P=\int_{-\infty}^\infty d\omega \int \bar{S}\cdot dS=\int_{-\infty}^\infty d\omega \int d\Omega \frac{\mu_0\omega^2}{16\pi^2 c}[|p|^2-|e_r\cdot p|^2]
$$
由Planchel定理
$$
P=\int_{-\infty}^\infty dt \int d\Omega \frac{\mu_0}{16\pi^2 c}[|\dot{p}(x,t)|^2-|e_r\cdot \dot{p}(x,t)|^2]
$$
## 长波近似

如果假定场源尺度远小于波长,即$kx\ll 1$,则我们有如下近似
$$
p^i=\int j^i(1-ikx\cdot e_r)dV+o(kx)
$$
对于第一项我们可以采用如下技巧.注意到$j^i=\delta_j^i j^j=\partial_j(j^j x^i)-x^i\partial_j j^j$.而由连续性方程
$$
\partial_j j^j=-\partial_t \rho=i\omega \rho(x,\omega)
$$
第一项由Stokes定理可以转移到无穷远边界为$0$.因此
$$
\int j^i dV=-i\omega \int x^i\rho dV=-i\omega d^i
$$
其中$d$是电偶极矩.

## 圆周运动的电子
考虑一个带电荷$q$,做半径为$a$,频率为$\omega_0$的圆周运动的粒子.则
$$
j(x,t)=\delta(x-(acos(\omega_0 t),asin(\omega_0 t),0))qv\left[\begin{matrix}-sin(\omega_0 t)\\cos(\omega_0 t)\\
0\end{matrix}\right]
$$
则
$$
p_x=\int dV\delta(x-(acos(\omega_0 (t+x\cdot e_r/c),asin(\omega_0 (t+x\cdot e_r/c),0))(-qvsin(\omega_0 (t+x\cdot r/c)))
$$
设$e_r=(sin\theta cos\phi,sin\theta sin\phi,cos\theta)$,则
$$
p_x=\frac{-qvsin(\omega_0 t_r)}{1-\frac{e_r\cdot v(t_r)}{c}},p_y=\frac{qvcos(\omega_0 t_r)}{1-\frac{e_r\cdot v(t_r)}{c}}
$$
$$
e_r\cdot v(t_r)=-v sin\theta cos\phi sin(\omega_0 t_r)+sin\theta sin\phi cos(\omega_0 t_r)=vsin\theta sin(\omega_0 t_r-\phi)
$$
记$\beta=v/c$,则
$$
p(x^\prime,t)=\frac{qv}{1-\beta sin\theta sin(\phi-\omega_0 t_r)}\left[\begin{matrix}-sin(\omega_0 t_r)\\cos(\omega_0 t_r)\\
0\end{matrix}\right]
$$
其中$t_r$由隐函数方程决定.我们尝试计算$t_r$关于时间的导数
$$
t_r=t+a\frac{sin\theta cos(\omega_0 t_r-\phi)}{c}\implies \frac{dt_r}{dt}=1-\frac{a\omega_0}{c}sin\theta sin(\omega_0 t_r-\phi)\frac{dt_r}{dt}
$$
所以
$$
\frac{dt_r}{dt}=\frac{1}{1-\beta sin\theta sin(\phi-\omega_0 t_r) }=\gamma
$$
$$
\frac{dp}{dt}=-\gamma^2\omega_0\beta cos(\omega_0 t_r-\phi) p+\gamma^2 q\omega_0^2 a \left[\begin{matrix}cos(\omega_0 t_r)\\sin(\omega_0 t_r)\\
0\end{matrix}\right]
$$
所以
$$
|\dot{p}|^2=\gamma^4\omega_0^4q^2a^2[1+\beta^2cos^2(\omega_0 t_r-\phi)]
$$
而
$$
e_r\cdot \dot{p}=\gamma^2\omega_0^2qa [sin\theta cos(\omega_0 t_r-\phi)-\beta sin\theta sin(\omega_0 t_r-\phi)]=\gamma\omega_0^2qasin\theta cos(\omega_0 t_r-\phi)
$$
因此
$$
|\dot{p}|^2-|e_r\cdot \dot{p}|^2=\gamma^2\omega_0^4 q^2a^2[\gamma^2(1+\beta^2 cos^2\psi)-sin^2\theta cos^2\psi]
$$
代入能流密度即得
$$
\left<\frac{dP}{d\Omega}\right>=\frac{\mu_0 q^2a^2\omega_0^4}{16\pi^2 c}[\braket{\gamma^4}+\beta^2\braket{\gamma^4cos^2\psi}-sin^2\theta\braket{\gamma^2 cos^2\psi}]
$$
对于非相对论性粒子$\beta\ll 1$,$\gamma\sim 1$,$t_r\sim t$,因此$\braket{cos\psi}=\frac12$
$$
\left<\frac{dP}{d\Omega}\right>=\frac{\mu_0 q^2a^2\omega_0^4}{32\pi^2 c}(1+cos^2\theta)
$$
积分可得
$$
\braket{P}=\int \left<\frac{dP}{d\Omega}\right>d\Omega=\frac{\mu_0 q^2a^2\omega_0^4}{6\pi c} 
$$
对于氢原子$E=-\frac{e^2}{8\pi \epsilon_0 a},\omega_0=(\frac{e^2}{4\pi \epsilon_0 m_e a^3})^{1/2}$,因此
$$
\left<\frac{dE}{dt}\right>=\frac{e^2}{8\pi \epsilon_0 a^2}\frac{da}{dt}=-\frac{e^2 a^2}{6\pi \epsilon_0 c^3}(\frac{e^2}{4\pi \epsilon_0 m_e a^3})^2
\\
\implies a^2 da=-\frac{e^4}{12\pi^2\epsilon_0^2m_e^2 c^3}dt\implies a=(a_0^3-\frac{e^4 t}{4\pi^2 \epsilon_0^2m_e^2 c^3})^{1/3}
$$
即电子最终会在$t\sim \frac{4\pi^2 \epsilon_0^2m_e^2 c^3a_0^3}{e^4}$后掉入原子核中,这说明经典图像是无法解释电子轨道的.

