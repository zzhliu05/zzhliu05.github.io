---
title: "电磁场的能动张量"
date: 2026-09-06
status: "resolved"
question: |
  分析电磁场作用量对应的能动张量.
tags: ["QFT"]
---
对于$U(1)$规范场我们有
$$
\mathcal{L}=-\frac{1}{4}F_{\mu\nu}F^{\mu\nu}
$$
能动张量为
$$
T^{\mu\nu}=\frac{\partial\mathcal{L}}{\partial(\partial_\mu A^\lambda)}\partial^\nu A^\lambda-\delta^{\mu\nu}\mathcal{L}
$$
代入$\mathcal{L}$可得
$$
T^{\mu\nu}=\frac{1}{4}F_{\lambda \sigma}F^{\lambda \sigma}\delta^{\mu\nu}-\partial^\nu A^\lambda F^{\mu}{}_{\lambda}
$$
$T^{\mu\nu}$不是对称的
$$
T^{\mu\nu}-T^{\nu\mu}=\partial^\mu A^\lambda F^{\nu}{}_{\lambda}-\partial^{\nu}A^{\lambda}F^{\mu}{}_{\lambda}\neq 0
$$
并且
$$
T^{00}=\frac{1}{2}(-|E|^2+|B|^2)-\partial_t A\cdot E
$$
注意到$\partial_t A=E-\nabla\phi$.但是如果我们定义$T^{\mu\nu}+\partial_{\lambda}(A^{\nu}F^{\mu\lambda})$,由于on-shell,$\partial_\lambda F^{\mu\lambda}=0$.