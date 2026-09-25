---
title: "经典Schrodinger场"
date: 2026-09-07
status: "thinking"
question: |
  分析经典Schrodinger场Lagrangian
  $$
  \mathcal{L}=i\psi^*\partial_0\psi+b|\nabla\psi|^2
  $$
tags: ["QFT"]
---
其EL方程为
$$
\frac{\partial \mathcal{L}}{\partial(\partial_\mu \psi)}\partial_\mu\psi=0\implies i\psi^*\partial_0 \psi+b|\nabla \psi|^2=0
$$
显然$\psi$有平面波解$\psi=e^{i(px-\omega t)}$,代入可得
$$
\omega+b|p|^2=0\implies \omega=-b|p|^2
$$
其具有时空平移对称性,因此有守恒能动张量
$$
T^{\mu\nu}=\frac{\partial \mathcal{L}}{\partial(\partial_\mu\psi)}\partial^{\nu}\psi+\frac{\partial \mathcal{L}}{\partial(\partial_\mu \psi^*)}\partial^\nu \psi^*-\delta^{\mu\nu}\mathcal{L}
$$
对应守恒荷为
$$
H=\int d^3 x T^{00}=\int d^3x b|\nabla \psi|^2
$$
$$
P=\int d^3xT^{0i}=\int d^3 x i\psi^*\nabla \psi
$$
$U(1)$对称性给出守恒荷
$$
j^\mu=\frac{\partial\mathcal{L}}{\partial(\partial_\mu \psi)}i\psi-\frac{\partial\mathcal{L}}{\partial(\partial_\mu \psi^*)}i\psi^*,Q=\int d^3x j^0=2\int d^3x \psi^* \psi
$$
