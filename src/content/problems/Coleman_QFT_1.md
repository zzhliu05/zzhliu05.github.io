---
title: "Lorentz协变测度"
date: 2026-09-01
status: "resolved"
question: "直接解释动量空间的Lorentz协变积分测度$\\frac{d^3p}{2p^0}$."
description: ""
tags: ["QFT"]
---
It suffices to考虑一个沿$x$方向的boost,变换为
$$
(p^0)^\prime=\mathrm{cosh}\theta p^0+\mathrm{sinh}\theta p^1,(p^1)^\prime=\mathrm{sinh}\theta p^0+\mathrm{cosh}\theta p^1|_{p^0=\sqrt{p^2+m^2}}
$$
则很显然Jacobian $J=\frac{dp^\prime}{dp}$是上三角矩阵,并且下两行的block是单位阵.因此
$$
det J=\frac{d^3 p^\prime}{d^3 p}=\frac{\partial (p^1)^\prime}{\partial p^1}=\mathrm{cosh}\theta+\mathrm{sinh}\theta \frac{\partial \sqrt{p^2+m^2}}{\partial p^1}=\mathrm{cosh}\theta+\mathrm{sinh}\theta\frac{p^1}{p^0}=\frac{(p^0)^\prime}{p^0}
$$
因此$\frac{d^3 p}{p^0}$在boost下是不变的.
