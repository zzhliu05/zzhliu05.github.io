---
title: "全同Bose谐振子与Hardy-Ramanujan公式"
description: "通过考虑Bose谐振子得到整数拆分的Hardy-Ramanujan公式."
published: 2026-08-21
tags: ["统计力学","解析数论"]
category: "统计力学"
draft: false
---

我们考虑(热力学极限下)无穷个独立的全同Bose谐振子组成的统计系综.我们知道独立谐振子的能级为
$$
E_n=n\hbar\omega
$$
为了避免显而易见的发散,我们去掉真空能.我们可以考虑总能量为$E=N\hbar \omega$时的简并度
$$
g(E=N\hbar\omega)=\#\{(n_i)|\sum_{i=1}^\infty n_i=N \}/\sim
$$
其中$\sim$表示Bose统计商掉的自由度.注意到这等价于整数拆分问题:

一个整数$N$有多少种被拆分的方案(不考虑拆分顺序)?比如$4$共有如下$4$种拆分方案
$$
4=1+1+1+1,4=2+1+1,4=2+2,4=3+1
$$
该系综的配分函数为(记$z=e^{-\beta \hbar \omega}$)
$$
Z=\sum_{N=0}^\infty g(N)(e^{-\beta \hbar \omega})^n=\sum_{N=0}^\infty g(N)z^n
$$
另一种角度(横着看变成竖着看)是我们可以认为这是无穷个$\omega_n=n\omega$的可分辨谐振子,但是填的Boson是声子,这给出配分函数
$$
Z=\prod_{N=1}^\infty \frac{1}{1-e^{-N\beta \hbar \omega}}
$$
因此$\prod_{N=1}^\infty \frac{1}{1-z^n}=\sum_{N=0}^\infty g(N) z^n$.该关系最早由Euler得到.

我们可以尝试计算自由能
$$
F=-\frac{ln Z}{\beta}=\frac{1}{\beta}\sum_{n=1}^\infty ln(1-z^n)
$$
由于我们想要筛出$g(N)$在$N\to \infty$的渐近展开,而只有高温极限才能探测高能量的态密度,我们可以考虑自由能在$z\to 1^{-}\impliedby \beta \to 0$的渐进行为.求和可以通过Euler-Maclaurin公式转化为积分,但是$ln(1-e^{-x})$这个函数在$x=0$发散,不太好搞.因此我们首先引入一个counter term把奇点搞掉.定义
$$
g(x)=ln(1-e^{-\beta\hbar\omega x})-lnx\implies g(0)=ln\beta+ln(\hbar\omega)
$$
则由Euler-Maclaurin公式
$$
\sum_{n=0}^\infty g(n)=\int_0^\infty g(x)dx+\frac{g(0)+g(\infty)}{2}+\frac{g^\prime (\infty)-g^\prime(0)}{12}+\cdots
$$
由Stirling公式
$$
\lim_{N\to \infty}\sum_{n=1}^N ln(n)-\int_0^N ln(x)dx-\frac{ln(N)}{2}=\frac{ln(2\pi)}{2}
$$
因此把两侧对应的counter term消掉后做分部积分可得
$$
F=\frac{1}{\beta}\sum_{n=1}^\infty ln(1-e^{-\beta\hbar \omega n})=
$$
$$
\frac{1}{\beta}[\int_0^\infty ln(1-e^{-\beta \hbar\omega x})dx-\frac{ln\beta+ln(\hbar\omega)-ln(2\pi)}{2}]=-\frac{\zeta(2)}{\beta^2\hbar\omega}-\frac{ln(\beta\hbar\omega/2\pi)}{2\beta}+O(1)
$$
其中$\zeta$是Riemann zeta函数.我们想把态密度从配分函数中提取出来,做逆Laplace变换可得
$$
\rho(E)=\frac{1}{2\pi i}\int_{\epsilon-i\infty}^{\epsilon+i\infty} d\beta e^{\beta E}Z(\beta)=\frac{1}{2\pi i}\int_{\epsilon-i\infty}^{\epsilon+i\infty} d\beta e^{\beta (E-F)}=\frac{1}{2\pi i}\int_{\epsilon-i\infty}^{\epsilon+i\infty} d\beta e^{S}
$$
其中$S=\beta(E-F)=\frac{\zeta(2)}{\beta\hbar\omega}+\beta E+\frac{ln(\beta\hbar\omega/2\pi)}{2}$.在saddle point $$\frac{\partial S}{\partial \beta}(\beta^*,E)=0\implies (\beta^*)^2 E+\frac{1}{2}\beta^*-\frac{\zeta(2)}{\hbar\omega}=0$$
$$
\implies \beta^*=\frac{-1+ \sqrt{1+16 \frac{E\zeta(2)}{\hbar\omega}}}{4E}
=\sqrt{\frac{\zeta(2)}{E\hbar\omega}}+O(\frac{1}{N^{3/2}})$$
附近展开可得
$$e^{S}\sim e^{S^*(E)+\frac{1}{2}\frac{\partial^2 S}{\partial E^2}(\beta^*,E)(\beta-\beta^*)^2}=\sqrt{\frac{\beta^*\hbar\omega}{2\pi}}\mathrm{exp}[2\sqrt{\frac{\zeta(2)E}{\hbar \omega}}+\sqrt{\frac{\hbar\omega E^3}{\zeta(2)}}(\beta-\beta^*)^2]$$
因此
$$
\rho(E)\sim \zeta(2)^{1/4}E^{-1/4}(\hbar\omega)^{1/4}(2\pi)^{-3/2}\int_{-\infty}^{\infty} d\beta \mathrm{exp}[2\sqrt{\frac{\zeta(2)E}{\hbar \omega}}-\sqrt{\frac{\hbar\omega E^3}{\zeta(2)}}\beta^2]
$$
高斯积分可得
$$
\rho(E=N\hbar \omega)\sim \frac{1}{\hbar\omega}\frac{\zeta(2)^{1/2}}{2^{3/2}N\pi}e^{2\sqrt{\zeta(2)N}}
$$
代入$\zeta(2)=\frac{\pi^2}{6}$,即简并度有渐近展开形式$g(E)=\rho(E)\hbar\omega\sim \frac{e^{\pi\sqrt{2N/3}}}{4\sqrt{3}} $
此即Hardy和Ramanujan得到的整数拆分数的渐进公式.


> 这些似乎与2D CFT中的Cardy Formula有关,但是我不懂CFT.

>  在可分辨谐振子,$\omega_n=n\omega$的picture下,如果我们把重整化的真空能$E_{vac}=\frac{1}{2}\sum_{n=1}^\infty n\hbar\omega=\frac{\zeta(-1)}{2}\hbar\omega$算上,则配分函数变为$$Z=z^{-1/24}\prod_{n=1}^\infty \frac{1}{1-z^n},z:=e^{-\beta\hbar\omega} $$ 这是Dedekind eta函数的倒数$Z(\beta)=\frac{1}{\eta(i\beta\hbar\omega/2\pi)}$
