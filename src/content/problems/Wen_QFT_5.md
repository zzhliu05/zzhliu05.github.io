---
title: 均匀势场的传播子
date: 2026-09-13
status: resolved
question: 给出均匀势场$V(x)=-\lambda x$下的传播子.
tags:
  - QFT
---
**Schrodinger方程法**:我们可以直接写出
$$
i\partial_t G(x,t)=HG(x,t)=(-\frac{\partial_x^2}{2m}-\lambda x)G(x,t)
$$
假设$G(x,t)=-i(\frac{m}{2\pi it})^{1/2}f(x,t)e^{i\frac{mx^2}{2t}}=f(x,t)G_0$,代入可得
$$
if[-\frac{G_0}{2t}-\frac{imx^2}{2t^2}G_0]+iG_0\partial_tf=-\lambda x fG_0-\frac{1}{2m}[G_0\partial_x^2 f+2i\frac{mx}{t}\partial_x f G_0+fG_0(i\frac{m}{t}-\frac{m^2 x^2}{t^2})]
$$
化简可得
$$
i\partial_t f=-\lambda x f-\frac{\partial_x^2 f}{2m}-\frac{ix}{t}\partial_x f
$$
假设$f=e^g$,那么
$$
i\partial_t g=-\lambda x-\frac{(\partial_x g)^2+\partial_x^2 g}{2m}-\frac{x}{t}\partial_x g
$$


**路径积分法**:
