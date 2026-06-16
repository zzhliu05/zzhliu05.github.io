---
title: "Hopf Fibration小记"
description: "一篇介绍Hopf Fibration及其物理图景的短文."
published: 2026-06-15
tags: ["数学","拓扑物理"]
image: "/images/posts/hopf-fiber.jpg"
category: "拓扑"
draft: false
---

> 没有人能真正看见Hopf fibration.

我们考虑一个归一化的二分量波函数$\ket{\psi}=\left[ \begin{aligned}\psi_1 \\ \psi_2  \end{aligned}\right]$.其所处的态空间实际上为
$$
\{\ket{\psi}\in \mathbb{C}^2||\psi_1^2|+|\psi_2|^2=1\}=\mathbb{CP}^1\cong S^3
$$
一种常见的参数化如下
$$
\ket{\psi}=e^{i\varphi}\left[\begin{aligned}cos\frac{\theta}{2} \ \ \ \\
sin\frac{\theta}{2}e^{i\phi}
\end{aligned}\right]
$$
因为此时$\ket{\psi}$是自旋算符$|\vec{S}|=sin\theta cos\phi S_x+sin\theta sin\phi S_y+cos\theta S_z$的本征态.我们注意到有一个物理上冗余的$U(1)$因子$e^{i\varphi}$,如果把这个因子商掉(看作物理等价波函数空间上的纤维),我们就得到了Hopf纤维化
$$U(1)\hookrightarrow S^3\rightarrow S^2$$
这说明$S^3$可以看作$S^2$上的$U(1)$主丛.底空间$S^2$(又称Bloch球面)可视作由$\theta,\phi$参数化的空间.现在我们开始考察这个纤维丛的一些几何性质.

选取丛的一个截面(局部平凡化)
$$
\ket{\psi}=\left[\begin{aligned}cos\frac{\theta}{2} \ \ \ \\
sin\frac{\theta}{2}e^{i\phi}
\end{aligned}\right]
$$
注意这个截面只在$\theta\neq \pi$是良定义的,即挖去北极点的局部坐标内.在南极点之外,可以计算这个截面对应的Berry联络为
$$
A=i(\braket{\psi|\partial_\theta|\psi}d\theta+\braket{\psi|\partial_\phi|\psi}d\phi)=-sin^2\frac{\theta}{2}d\phi
$$
在南极点$\theta=0$,$A=0$.Berry曲率为
$$
F=dA=-sin\frac{\theta}{2}cos\frac{\theta}{2}d\theta \wedge d\phi=\frac{1}{2}sin\theta d\phi\wedge d\theta
$$
正为球面面元.因此$F=\frac{1}{2}d\Omega\implies \int_{S^2} F=2\pi\in 2\pi \mathbb{Z}$.我们得到Hopf纤维化给出的是陈数为$1$的$U(1)$丛.

另一种视角可以沿用Dirac的想法.选取丛的另一个截面
$$
\ket{\psi}=\left[\begin{aligned}cos\frac{\theta}{2}e^{-i\phi} \\
sin\frac{\theta}{2} \ \ \
\end{aligned}\right]
$$
这个截面只在$\theta\neq 0$,即挖去南极点的局部坐标内.坐标转移函数显然为
$$g_{12}=e^{i\phi}\implies A_2=A_1+g_{12}dg_{12}^{-1}=A_1+d\phi$$
因此曲率在球面上的积分可以通过Stokes定理转化为在赤道$E$上的积分
$$
\int_{S^2} dA=\int_{S^2_n}dA_1+\int_{S^2_s}dA_2=\int_{E}(A_2-A_1)=\int_E d\phi=2\pi
$$
因此,hopf fibration对应$eg=\frac{\hbar c}{2}$的磁单极子.

最后,我们可以试着取$S^3$的局部坐标系,观察纤维的具体形状.设$\psi_1=x_1+ix_2,\psi_2=x_3+ix_4$,取$x_4\neq 1$的局部覆盖,我们可以用球极投影坐标
$$
(x_1,x_2,x_3,x_4)\to \frac{1}{1-x_4}(x_1,x_2,x_3)
$$
此时单个纤维可以表示为
$$
\frac{1}{1-sin\varphi x_3}(cos\varphi x_1-sin\varphi x_2,sin\varphi x_1+cos\varphi x_2,cos\varphi x_3)
$$
其中$(x_1,x_2,x_3)\in S^2$决定了纤维基点.$\varphi\in [0,2\pi)$是纤维参数.

以下Mathematica代码绘制了两个不同基点上的纤维在球极投影坐标系的形状.
```ts
gamma[x_, \[Phi]_] := {Cos[\[Phi]] x[[1]] - Sin[\[Phi]] x[[2]], 
    Sin[\[Phi]] x[[1]] + Cos[\[Phi]] x[[2]], 
    Cos[\[Phi]] x[[3]]}/(1 - Sin[\[Phi]] x[[3]]);
xA = {1/Sqrt[2], 0, 1/Sqrt[2]};
xB = {0, Sqrt[3]/2, 1/2};

curvePlot = 
  ParametricPlot3D[
   Evaluate[{gamma[xA, \[Phi]], gamma[xB, \[Phi]]}], {\[Phi], 0, 
    2 Pi}, PlotStyle -> {{Red, Thick}, {Blue, Thick}}, 
   PlotRange -> All, AxesLabel -> {"X", "Y", "Z"}, 
   BoxRatios -> {1, 1, 1}, PlotPoints -> 200, MaxRecursion -> 3];

Show[curvePlot, ImageSize -> Large]
```
效果如下


<img src="/images/posts/hopf_fiber.png"
     alt=""
     style="display:block; margin:0 auto; width:70%;">


注意到两支不同的纤维相互缠绕.事实上在这个例子中,任意两个不同基点的纤维都会相互缠绕,并且卷绕数恰好为$1$.

---
为什么它叫Hopf纤维化呢?因为数学家Hopf最早用这个方法证明了$\pi_3(S^2)=\mathbb{Z}$.上述纤维化$S^1\hookrightarrow S^3\rightarrow S^2$可以诱导同伦群的长正合列
$$
\cdots \rightarrow \pi_3(S^1)\to \pi_3(S^3)\to \pi_3(S^2)\to \pi_2(S^1)\to \cdots
$$
由于我们已经知道$\pi_2(S^1)=\pi_3(S^1)=0$,这说明$\pi_3(S^2)\cong \pi_3(S^3)=\mathbb{Z}$.而$\pi_3(S^2)$的生成元正是Hopf纤维丛的投影映射.

>这是个非凡的例子,因为它告诉我们球面的高阶同伦群是非平凡的,不同于同调群.