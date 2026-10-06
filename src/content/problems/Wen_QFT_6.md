---
title: 线性响应
date: 2026-10-04
status: resolved
question: 谐振子关于电场的线性响应.
tags:
  - QFT
---
考虑谐振子
$$
H=\frac{p^2}{2m}+\frac{1}{2}m\omega_0^2 x^2
$$
的极化问题.假设电场$E$与谐振子耦合
$$
V=-Ex
$$
根据一阶微扰,基态的微扰为
$$
\ket{\psi}=\ket{0}+\sum_{n\neq 0}\frac{\braket{n|V|0}}{E_0-E_n}\ket{n}+O(V^2)
$$
因此我们有
$$
d=\braket{\psi|x|\psi}=-2E\sum_{n\neq 0}\frac{|\braket{n|x|0}|^2}{E_0-E_n}
$$
极化率
$$
\chi=d/E=-2\sum_{n\neq 0}\frac{|\braket{n|x|0}|^2}{E_0-E_n}
$$
