---
title: "标量场的量纲"
date: 2026-09-06
status: "resolved"
question: |
  对于自然单位制$\hbar=c=1$,计算$d$维标量场$\phi$的量纲.
tags: ["QFT"]
---
由对易关系
$$
[\phi^2]=[p^{d-1}]=[L^{1-d}]=[M^{d-1}]
$$
因此$[\phi=M^{(d-1)/2}]$.作用量$[S]=[\hbar]=1$无量纲,因此$[\mathcal{L}]=[M^d]$,所以如果
$$
\mathcal{L}=\frac{1}{2}(\partial \phi)^2+\sum a_n\phi^n
$$
则$[a_n]=[M^{d-(d-1)n/2}]$.