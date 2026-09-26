---
title: 代数Bethe ansatz
published: 2026-09-26
tags:
  - 统计力学
category: 统计力学
draft: false
---
## Ice Model
>"there is one proton along each oxygen-oxygen axis,closer to one or the other of the two oxygen atoms"--Linus Pauling

### 冰的剩余熵
精确的实验数据表明,冰晶体在零温时有剩余熵
$$
\frac{S}{N}\approx 0.41\approx ln(1.5)
$$
在冰晶体中氧原子形成近似正四面体配位结构.假设总共有$N$个氧原子,在每个O-O键上,氢原子可以选择临近其中任意一个氧原子,因此总共有$2^{2N}$种位形.如果这样假设,则剩余熵应该为
$$
lnZ/N=ln 2^{2N}/N=ln(4)
$$
这远大于实验结果.Pauling提出不是所有位形都被允许.只有每个氧原子恰好有两个氢原子临近的构型才被允许.在每个氧原子$2^4=16$种构型中总共有$C_4^2=6$种满足条件,因此
$$
lnZ/N=ln(2^{2N}(\frac{6}{16})^N)/N=ln(1.5)
$$
