---
title: "n维刚体的Euler动力学方程"
description: "对n维刚体的运动学描述."
published: 2026-06-17
tags: ["理论力学","刚体","李群"]
category: "理论力学"
image: "/images/posts/dimn-rigid.jpg"
draft: false
---
## 刚体位形空间
考虑$n$维欧氏空间中的刚体,为了讨论简便不妨设其位于质心系内.容易证明其位形空间为$SO(n)$.考虑其李代数(右不变切向量场全体)$so(n)$,定义其一组基底为
$$
X_{ij},j>i, \ s.t. X_{ij}(I)=E_{ij}-E_{ji}
$$
可以看出对易关系
$$
[X_{ij},X_{kl}]=\delta_{jk}X_{il}-\delta_{jl}X_{ik}+\delta_{ik}X_{lj}+\delta_{il}X_{jk}
$$
其中我们将$X_{ij}(j<i)$理解为$-X_{ji}$.切丛$TSO(n)$为有限生成$C^\infty(SO(n))$模,由$X_{ij}$生成.

:::note[Notation]
下文中的$X_{ij}$都是指$X_{ij}(I)=E_{ij}-E_{ji}$.
:::

## Lagrangian
Lagrangian是$TSO(n)$上的函数.考虑处于状态$(U,\omega)$的刚体,其中$\omega$是反对称的,即
$$\omega=\sum_{j>i} \omega_{ij}X_{ij}(U)=\sum_{i,j} \omega_{ij} E_{ij} U\in T_USO(n) 
$$
考虑初始时(即$U=I$)位于$x$,目前位于$Ux$的微小质量元$dm$,其速度为
$$
v=\sum_{j>i}\omega_{ij}X_{ij}Ux
$$
因此由$U^TU=I$,
$$
L=\int dm \frac{v^Tv}{2}=-\int \frac{dm}{2}\sum_{j>i,l>k}\omega_{ij}\omega_{kl} x^TU^TX_{kl}X_{ij}Ux
$$

$$=-\int \frac{dm}{2}\sum_{j>i,l>k}\omega_{ij}\omega_{kl}(\delta_{il}x^a (U^T)_a{}^k U_j{}^b x_b-\delta_{ik}x^a (U^T)_a{}^l U_j{}^b x_b-\\ \delta_{jl}x^a (U^T)_a{}^k U_i{}^b x_b+\delta_{jk}x^a (U^T)_a{}^l U_i{}^b x_b)
$$

定义转动惯量张量(从这里开始我们开始区分协变/逆变(下/上)指标,并且开始采用爱因斯坦求和约定)
$$
I_{ij}{}^{kl}=\int dm(\delta_i^{k} x^lx_j+\delta_j^{l}x^kx_i-\delta_i^{l}x^kx_j-\delta_j^{k}x^lx_i)
$$
容易看出它确实满足变换规则,即确实是个张量
$$
(I_U)_{ab}{}^{cd}=U_a{}^iU_b{}^jI_{ij}{}^{kl}(U^T)_k{}^c (U^T)_l{}^d
$$
并且$I_{ij}{}^{kl}$关于$ij,kl$分别反对称.代入拉格朗日量
$$
L=\frac{1}{8}\omega^{ij}(I_U)_{ij}{}^{kl}\omega_{kl}=\frac{1}{8}\omega^{ij}U_{i}{}^aU_j{}^bI_{ab}{}^{cd}(U^T)_c{}^k(U^T)_d{}^l \omega_{kl}
$$


## 运动方程
李群上的Euler-Lagrange方程应该是什么样的?考虑$SO(n)$上的一条路径$U(t)$,给出作用量
$$
S[U(t)]=\int_{t_0}^{t_1}L(U(t),\frac{dU}{dt}(t))dt
$$
考虑变分$U(t)\to U(t)+\frac{1}{2}\epsilon^{ij}(t)X_{ij}(U(t))=(I+\frac12\epsilon^{ij}(t) X_{ij})U(t)$,则角速度坐标有如下变换
$$
\frac{1}{2}(\omega^{ij}+\delta \omega^{ij})X_{ij}(I+\frac{1}{2}\epsilon^{kl}(t)X_{kl})U(t)=\frac{dU}{dt}+\frac{d}{dt}(\frac{1}{2}\epsilon^{ij}(t)X_{ij}U(t))
$$
定义结构常数$[X_{ij},X_{kl}]=C_{ijkl}^{ab}X_{ab}$
$$
\implies \delta \omega^{ij}=\frac{d\epsilon^{ij}}{dt}(t)+\frac{1}{2}\epsilon^{ab}(t)\omega^{kl}C_{abkl}^{ij}+O(\epsilon^2)
$$
代入原作用量变分
$$
\delta S[U(t),\epsilon^{ij}(t)]=\int_{t_0}^{t_1}[X_{ij}(L) \epsilon^{ij}(t)+\frac{\partial L}{\partial \omega^{ij}}\delta\omega^{ij}]dt
$$
$$
=\int_{t_0}^{t_1}\left[X_{ij}(L) \epsilon^{ij}(t)+\frac{\partial L}{\partial \omega^{ij}}\left(\frac{d\epsilon^{ij}}{dt}+\frac{1}{2}\epsilon^{ab}\omega^{kl}C_{abkl}^{ij}\right)\right]dt=0
$$
标准的分部积分将$\frac{d\epsilon^{ij}}{dt}$转换为$\epsilon^{ij}$后给出
$$
\delta S=0\implies X_{ij}(L)=\frac{d}{dt}\frac{\partial L}{\partial \omega^{ij}}-\frac{1}{2}\frac{\partial L}{\partial \omega^{ab}}\omega^{kl}C_{ijkl}^{ab}
$$
其中$\omega^{ij}$由$\frac{dU}{dt}=\omega^{ij}X_{ij}U$给出.由定义,$X_{ij}(L)$应该由类似以下项给出
$$
(X_{ij})_p{}^r=\delta_{ip}\delta_j^r-\delta_{jp}\delta_i^r
$$
$$
X_{ij}(U_p{}^a)=\delta_{ip}U_j{}^a-\delta_{jp}U_i{}^a,\qquad
X_{ij}((U^T)_c{}^s)=\delta_{is}(U^T)_c{}^j-\delta_{js}(U^T)_c{}^i
$$
$$
X_{ij}(I_U)_{pq}{}^{st}
=\delta_{ip}(I_U)_{jq}{}^{st}-\delta_{jp}(I_U)_{iq}{}^{st}
+\delta_{iq}(I_U)_{pj}{}^{st}-\delta_{jq}(I_U)_{pi}{}^{st}
\\
+\delta_{is}(I_U)_{pq}{}^{jt}-\delta_{js}(I_U)_{pq}{}^{it}
+\delta_{it}(I_U)_{pq}{}^{sj}-\delta_{jt}(I_U)_{pq}{}^{si}
$$
$$
X_{ij}(L)=\frac18\omega^{pq}\omega_{st}X_{ij}(I_U)_{pq}{}^{st}
$$
定义角动量$J$:
$$
J_{pq}:=(I_U)_{pq}{}^{st}\omega_{st},\qquad
J^{st}:=\omega^{pq}(I_U)_{pq}{}^{st}
$$
我们分别计算$X_{ij}(L)$的第一行和第二行:
$$
X_{ij}(L)_1
=\frac18\omega^{pq}\omega_{st}\left[
\delta_{ip}(I_U)_{jq}{}^{st}-\delta_{jp}(I_U)_{iq}{}^{st}
+\delta_{iq}(I_U)_{pj}{}^{st}-\delta_{jq}(I_U)_{pi}{}^{st}
\right] \\
=\frac18\left[
\omega^{iq}J_{jq}-\omega^{jq}J_{iq}+\omega^{pi}J_{pj}-\omega^{pj}J_{pi}
\right] =\frac14\left[
\omega^{iq}J_{jq}-\omega^{jq}J_{iq}
\right]

$$
$$
\implies X_{ij}(L)_2
=\frac18\omega^{pq}\omega_{st}\left[
\delta_{is}(I_U)_{pq}{}^{jt}-\delta_{js}(I_U)_{pq}{}^{it}
+\delta_{it}(I_U)_{pq}{}^{sj}-\delta_{jt}(I_U)_{pq}{}^{si}
\right] \\
=\frac18\left[
\omega_{it}J^{jt}-\omega_{jt}J^{it}+\omega_{si}J^{sj}-\omega_{sj}J^{si}
\right] 
=\frac14\left[
\omega^{iq}J_{jq}-\omega^{jq}J_{iq}
\right]

$$
$$
X_{ij}(L)=\frac12\left[
\omega^{iq}J_{jq}-\omega^{jq}J_{iq}
\right]
$$
Euler-Lagrange方程右式第二项代入对易结果$[X_{ij},X_{kl}]=\delta_{jk}X_{il}-\delta_{jl}X_{ik}+\delta_{ik}X_{lj}+\delta_{il}X_{jk}$

$$
C_{ijkl}^{ab}
=\frac{1}{2}[\delta_{jk}\delta_{il}^{ab}
-\delta_{jl}\delta_{ik}^{ab}
+\delta_{ik}\delta_{lj}^{ab}
+\delta_{il}\delta_{jk}^{ab}],
\qquad
\delta_{mn}^{ab}:=\delta_m^a\delta_n^b-\delta_n^a\delta_m^b
$$
代入可得
$$
\frac{\partial L}{\partial\omega^{ab}}=\frac12J_{ab}
,
J_{ab}\delta_{mn}^{ab}=2J_{mn}
\implies 
J_{ab}C_{ijkl}^{ab}
=\delta_{jk}J_{il}-\delta_{jl}J_{ik}
+\delta_{ik}J_{lj}+\delta_{il}J_{jk}
$$
$$

\frac{1}{2}\frac{\partial L}{\partial\omega^{ab}}\omega^{kl}C_{ijkl}^{ab}
=\frac14J_{ab}\omega^{kl}C_{ijkl}^{ab} 
=\frac14\omega^{kl}\left[
\delta_{jk}J_{il}-\delta_{jl}J_{ik}
+\delta_{ik}J_{lj}+\delta_{il}J_{jk}
\right]
 \\
=\frac14\left[
\omega^{jl}J_{il}-\omega^{kj}J_{ik}
+\omega^{il}J_{lj}+\omega^{ki}J_{jk}
\right] =\frac12\left[
\omega^{jq}J_{iq}-\omega^{iq}J_{jq}
\right]

$$
$$
\implies X_{ij}(L)=-\frac12\frac{\partial L}{\partial\omega^{ab}}\omega^{kl}C_{ijkl}^{ab}
$$
因此原Euler-Lagrange方程简化为
$$
\frac{d}{dt}\frac{\partial L}{\partial \omega^{ij}}=0\implies \frac{d}{dt}J_{ij}=0
$$
也即角动量守恒.具体展开上式
$$
\frac{d}{dt}J_{ij}=\frac{d(I_U)_{ij}{}^{kl}}{dt}\omega_{kl}+(I_U)_{ij}{}^{kl}\frac{d\omega_{kl}}{dt}
$$
$$
=(I_U)_{ij}{}^{kl}\frac{d\omega_{kl}}{dt}+\frac{dU}{dt}_i{}^p(U^T)_p{}^q(I_U)_{qj}{}^{kl}\omega_{kl}+\frac{dU}{dt}_j{}^p(U^T)_p{}^q(I_U)_{iq}{}^{kl}\omega_{kl}
$$
$$
+(I_U)_{ij}{}^{pl}U_p{}^q\frac{dU^T}{dt}_q{}^k\omega_{kl}+(I_U)_{ij}{}^{kp}U_p{}^q\frac{dU^T}{dt}_q{}^l\omega_{kl}
$$
代入$\frac{dU}{dt}_i{}^j=\frac{1}{2}\omega^{kl}(X_{kl}U)_{i}{}^j=\frac{1}{2}\omega^{kl}(\delta_{ik}U_{l}{}^j-\delta_{il}U_{k}{}^j)$可得
$$
\frac{d}{dt}J_{ij}=(I_U)_{ij}{}^{kl}\frac{d\omega_{kl}}{dt}+[\omega_i{}^tJ_{tj}+\omega_j{}^tJ_{it}-(I_U)_{ij}{}^{kl}\omega_{k}{}^p\omega_{pl}-(I_U)_{ij}{}^{kl}\omega_{l}{}^p\omega_{kp}]
$$
注意$\omega_{k}{}^p\omega_{pl}$是关于$k,l$的对称张量,因此与$(I_U)_{ij}{}^{kl}$缩并为$0$.因此
$$
(I_U)_{ij}{}^{kl}\omega_{k}{}^p\omega_{pl}+(I_U)_{ij}{}^{kl}\omega_{l}{}^p\omega_{kp}=0
$$
$$
\implies (I_U)_{ij}{}^{kl}\frac{d\omega_{kl}}{dt}+\omega_i{}^kJ_{kj}+\omega_j{}^kJ_{ik}=0
$$
此即刚体的Euler运动方程.
