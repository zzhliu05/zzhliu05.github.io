---
title: Spontaneous Magnetization of the 2D Ising Model
description: ""
published: 2026-11-18
tags:
  - 统计力学
  - Ising模型
category: 统计力学
draft: true
---
## 2d Ising模型
我们考虑$L\times L$的正方形自旋格子,其中每个自旋$s_{ij}$可以取$\pm \frac{1}{2}$.在外场$h$下,哈密顿量为(我们假设周期性边界条件)
$$
H(S,h)=-\sum_{i,j=1}^L(J_h s_{i,j}s_{i,j+1}+J_vs_{i,j}s_{i+1,j}+hs_{i,j})
$$
其中记构型为$S$.对应的配分函数为
$$
Z(\beta,h)=\sum_{S}e^{-\beta H(S,h)}
$$
我们希望研究2d ising模型的自发磁化问题.定义平均磁化
$$
m(S)=\frac{\sum s_{i,j}}{L^2}
$$由于概率分布关于$h\to -h,s_{ij}\to -s_{ij}$对称,因此对于有限大小体系我们必然有
$$
\lim_{h\to 0}\braket{m}=0\implies\lim_{L\to \infty}\lim_{h\to 0}\braket{m}=0
$$
但是铁磁相变的来源就是热力学极限与零外场极限的非交换性.在临界温度$T_c$以下,可能出现
$$
\lim_{h\to 0^+}\lim_{L\to \infty}\braket{m}\neq 0
$$
的情况.我们希望研究这种自发磁化现象.

## 集团分解定理
以下我们假定$h>0$.由于体系具有平移对称性,因此
$$
m_0(\beta,h,L)=\braket{m}=\braket{s_{i,j}}>0,\forall i,j
$$
因此问题就变成了研究外场存在时的单个site的平均自旋.我们声明自旋有如下集团分解定理,说明距离足够远的两个自旋构型是不相关的.
### 定理
$$
\lim_{i^2+j^2\to \infty}\lim_{L\to \infty}\braket{s_{0,0}s_{i,j}}=(\lim_{L\to \infty} m_0)^2
$$
证明:我们首先证明如下引理(FKG不等式)
$$
\forall L,\braket{s_{0,0}s_{i,j}}\geq m_0^2
$$
注意到
$$
\braket{s_{0,0}s_{i,j}}=\sum_{C(s_{0,0},s_{i,j})}s_{0,0}s_{i,j} Z(C(s_{0,0},s_{i,j}))
$$
$$
m_0=p(s=+)-p(s=-)
$$
$$
\braket{s_{0,0}s_{i,j}}=p(s=+|s=+)p(s=+)+p(s=-|s=-)p(s=-)-2p(s=+|s=-)p(s=-)
$$
$$
\sum \sum_{S-} e^{2h}e^J Z_{++}+e^{-2h}e^JZ_{--}-2e^{-J}Z_{+-}
$$
$$
m_0=\frac{Z_{++}-Z_{--}}{Z_{++}+Z_{--}+2Z_{+-}}
$$
$$
s_{0,}s_{i,j}=\frac{Z_{++}+Z_{--}-2Z_{+-}}{Z}
$$
$$
(Z_{++}+Z_{--}-2Z_{+-})(Z_{++}+Z_{--}+2Z_{+-})\geq Z_{++}^2+Z_{--}^2-2Z_{++}Z_{--}
$$
$$
Z_{++}Z_{--}\geq Z_{+-}^2\iff e^{4J}(\sum W(S,+,+))(\sum W(S,-,-)
$$

$$
\frac{Z_{++-}+Z_{--+}-Z_{-+-}-Z_{+-+}}{Z}\geq 0
$$
