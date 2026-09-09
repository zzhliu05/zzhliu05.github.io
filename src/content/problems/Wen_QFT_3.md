---
title: "自由粒子格林函数"
date: 2026-09-08
status: "resolved"
question: |
  计算三维自由粒子的频域格林函数.
tags: ["QFT"]
---
显然有
$$
G(k_b,k_a,\omega)=-i\int_0^\infty \braket{k_b|U(t,0)|k_a}e^{i\omega t-\epsilon t}dt
$$
由于$k_a$是本征态,因此
$$
G(k_b,k_a,\omega)=-i\delta^{(3)}(k_b-k_a)\int_0^\infty e^{i(\omega t-\epsilon_k t)-\epsilon t}dt=\frac{\delta^{(3)}(k_b-k_a)}{\omega-\hbar^2 k_a^2/2m+i\epsilon}
$$
