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
我们称这种模型为Ice model.

## Square Lattice Vertex Model
Vertex model和一维可积量子力学系统以及Bethe ansatz有关.假如我们不要求两个氢原子临近,则每个vertex总共有16种构型.假如$j$对应允许构型的下标,我们将每种构型对应一个能量
$$
\epsilon_j
$$
以及其对应的Boltzmann weight
$$
e^{-\beta \epsilon_j}
$$
总配分函数为
$$
Z=\sum_{\text{allowed configs}} e^{-\beta \epsilon}
$$
Ice model条件对应单个Vertex散度为$0$.
### R-Matrix
顶点四条边的指向分别记为$\alpha,\alpha^\prime,\gamma,\gamma^\prime$.定义R-Matrix
$$
R^{\alpha^\prime}_\alpha(\gamma,\gamma^\prime)=e^{-\beta \epsilon_j}
$$
其中$j$对应$\alpha,\alpha^\prime,\gamma,\gamma^\prime$这个构型.

注意到如果我们把vertex横着放在一起,则其对应的$\gamma$指标会缩并
$$
T_{[\alpha]}(\gamma_1,\gamma_N)=\sum_{\gamma_2,\cdots,\gamma_{N-1}}R(\gamma_1,\gamma_2)R(\gamma_2,\gamma_3)\cdots R(\gamma_{n-1},\gamma_n)
$$
矩阵乘法恰好对应不同Configuration的求和,元素相乘对应Boltzmann weight相乘.
这个$T$矩阵的维度为$2^N\times 2^N$.然后我们再把每行的vertex堆到一起,得到
$$
Z=\sum_{[\alpha]_1,[\alpha]_M}\prod_{i=1}^{M-1}T_{[\alpha]_i,[\alpha]_{i+1}}
$$
如果我们取周期性边界条件,即$[\alpha]_1=[\alpha]_N$,则恰好有
$$
Z=tr(T^M)
$$
因此我们只需要对角化$T$就能得到配分函数.特别地如果我们考虑热力学极限$M\to \infty$,则
$$
Z\to \lambda_1^M
$$
下一步我们需要知道怎么对角化$T$.
### 可积性与转移矩阵
我们可以问一个有趣的问题:任给Boltzmann weight,我们是否能同时对角化这些不同Boltzmann weight的转移矩阵,即
$$
[T,T^\prime]=0
$$
是否恒成立?这直接决定了我们能不能在不同温度下