---
title: "谐振子格林函数极点"
date: 2026-09-08
status: "resolved"
question: |
  讨论谐振子格林函数
  $$
  G(x_b,t,x_a,0)=-i(\frac{m\omega_0}{2\pi i sin(\omega_0 t)})^{1/2}exp\{\frac{im\omega_0}{2\pi sin(\omega_0 t)}[(x_b^2+x_a^2)cos(\omega_0 t)-2x_ax_b]\}
  $$
  $G(0,0,\omega)$的极点结构.
tags: ["QFT"]
---
直接由定义
$$
G(0,0,\omega)=-i\int_0^\infty e^{i\omega t-\epsilon t}(\frac{m\omega_0}{2\pi i sin(\omega_0 t)})^{1/2}dt
$$
我们首先做一些变量代换.
$$
G(0,0,\omega)=-i\sqrt{m/2\pi i\omega_0}\int_0^\infty \frac{e^{-\lambda x}}{\sqrt{sinx}}dx,\lambda=(\epsilon-i\omega)/\omega_0
$$