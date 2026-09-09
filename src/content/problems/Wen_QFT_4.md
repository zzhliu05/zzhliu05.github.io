---
title: "相干态路径积分"
date: 2026-09-08
status: "resolved"
question: |
  通过相干态给出谐振子格林函数的路径积分表示.
tags: ["QFT"]
---
相干态完备关系
$$
I=\int \frac{d^2 a}{\pi}\ket{a}\bra{a}
$$
考虑相干态格林函数
$$
G(a_b,t_b,a_a,t_a)=-i\braket{a_b|U(t_b,t_a)|a_a}
$$
在其中$\frac{t_b-t_a}{N}$间隔插入完备关系,并带入$H=\hbar\omega(a^\dagger a+1/2)$
$$
G=-i\int \prod_{i=1}^{N-1}(\frac{d^2 a_i}{\pi})[1-i\hbar\omega(a_{i+1}a_i+1/2)\Delta t]\braket{a_{i+1}|a_i}+O(\Delta t)^2]
$$
利用$\braket{a_{i+1}|a_i}=e^{-|a_{i+1}|^2/2-|a_{i}|^2/2+a_{i+1}^*a_i}=e^{\dot{a}^*a\Delta t-a^*\dot{a}\Delta t}$,可得
$$
G=-i\int D[a(t)] exp\{-i\int dt[\omega(a(t)^2+1/2)+i(\dot{a}^*a-c.c.)/2]\}
$$
注意到相干态Lagrangian
$$
L=\frac{i}{2}(\dot{a}^\dagger a-c.c.)-H
$$
代入$a=\frac{1}{\sqrt{2}}(x-ip),a^\dagger=\frac{1}{sqrt{2}}(x+ip)$
$$
L=\frac{1}{2}(p\dot{x}-x\dot{p})-H=p\dot{x}-\frac{1}{2}\frac{d}{dt}(px)-H
$$
