---
title: "谐振子相干态完备关系"
date: 2026-09-08
status: "resolved"
question: |
  证明谐振子相干态的完备关系.
tags: ["量子力学"]
---
对于谐振子降算符$a$,我们定义相干态
$$
a\ket{\alpha}=\alpha\ket{\alpha}
$$
一种显然的取法是
$$
\ket{\alpha}=C\sum_{n=0}^\infty\frac{\alpha^n}{\sqrt{n!}}\ket{n}
$$
注意到
$$
\braket{\alpha|\alpha}=|C|^2\sum_{n=0}^\infty \frac{|\alpha|^{2n}}{n!}
$$
因此$|C|=e^{-|\alpha|^2/2}$
