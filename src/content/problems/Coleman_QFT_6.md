---
title: 量子Schrodinger场
date: 2026-09-07
status: resolved
question: |-
  量子化Schrodinger场
  $$
  \mathcal{L}=i\psi^*\partial_0\psi+b|\nabla\psi|^2
  $$
tags:
  - QFT
---
正则动量为
$$
\pi(x)=\frac{\partial\mathcal{L}}{\partial(\partial_0 \psi)}=i\psi^*
$$
因此正则对易关系
$$
[\psi(x),\pi(y)]=i[\psi(x),\psi^*(y)]=i\delta^{(3)}(x-y)
$$
考虑平面波展开
$$
\psi(x)=\int d^3p f(p)a^\dagger_p e^{ipx},\psi^*(x)=\int d^3p f^*(p)a_p e^{-ipx}
$$
由正则对易关系,
$$
\int d^3p_1 d^3p_2|f(p)|^2[a_{p_1}^\dagger,a_{p_2}]e^{i(p_1x-p_2y)}=\delta^{(3)}(x-y)
$$
$$
\implies
$$