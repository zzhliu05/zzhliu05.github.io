---
title: "运动电荷的相对论性修正"
description: "对运动电荷组Lagrangian的微扰展开计算,以及对氢原子能级的相对论性修正."
published: 2026-06-16
tags: ["电动力学"]
category: "电动力学"
draft: false
---
## 相对论性Lagrangian
> 本文中不带$()$的函数默认在$t$时刻取值.

一些相对论性带电粒子的Lagrangian为
$$
L=\sum_{\alpha}(-m_\alpha c^2\sqrt{1-v_\alpha^2/c^2}-q_\alpha \phi(x_\alpha,t)+q_\alpha A^i(x_\alpha,t)v_i)
$$
在Lorenz规范下我们有
$$
\phi(x_\alpha,t)=\frac{1}{4\pi \epsilon_0}\int \frac{\rho(x,t_r)}{R}dV,A^i(x_\alpha,t)=\frac{1}{4\pi \epsilon_0 c}\int \frac{j^i(x,t_r)}{R}dV
$$
其中$R=|x_\alpha-x|$,$t_r=t-R/c$.考虑点粒子时即为推迟势
$$
\phi(x_\alpha,t)=\frac{1}{4\pi \epsilon_0}\sum_\beta \frac{q_\beta}{|x_\alpha-x_\beta(t_r)|-v_\beta(t_r)\cdot (x_\alpha-x_\beta(t_r))/c}
$$
$$
A^i(x_\alpha,t)=\frac{1}{4\pi \epsilon_0 c^2}\sum_\beta \frac{q_\beta v_\beta(t_r)}{|x_\alpha-x_\beta(t_r)|-v_\beta(t_r)\cdot (x_\alpha-x_\beta(t_r))/c}
$$
我们首先考虑电势的展开.对于$x_\beta(t_r)$其微扰展开为
$$
x_\beta(t-R/c)=x_\beta(t)-\frac{v_\beta R}{c}+\frac{a_\beta R^2}{2c^2}+o(\frac{1}{c^2})
$$
因此$|x_\alpha-x_\beta(t_r)|$的展开为(记$|x_\alpha-x_\beta|=R_0$)
$$
|x_\alpha-x_\beta(t_r)|=R=R_0+\frac{v_\beta^i R_{0i}R}{cR_0}-\frac{a_\beta^iR_{0i}R^2}{2c^2R_0}+\frac{v_\beta^2 R_0^2R^2-(v_\beta^iR_{0i})^2R^2}{2c^2R_0^3}+o(\frac{1}{c^2})
$$
$$
\implies R=R_0+\frac{v_\beta\cdot R_0}{c}+\frac{(v_\beta \cdot R_0)^2}{ c^2 R_0}-\frac{(a_\beta \cdot R_0)R_0^2-v_\beta^2 R_0^2+(v_\beta \cdot R_0)^2}{2c^2 R_0}+o(\frac{1}{c^2})
$$
对于分母上的第二项我们只需展开到一阶
$$
v_\beta(t_r)\cdot (x_\alpha-x_\beta(t_r))=v_\beta \cdot R_0-\frac{a_\beta \cdot R_0}{c}R_0+\frac{v_\beta^2}{c}R_0+o(\frac{1}{c})
$$
综上,分母的二阶展开为
$$
R_0-\frac{v_\beta^2}{2c^2}R_0+\frac{(a_\beta \cdot R_0)R_0}{2c^2}+\frac{(v_\beta \cdot R_0)^2}{2c^2R_0}+o(\frac{1}{c^2})
$$
这给出了电势能的展开
$$
-q_\alpha \phi_\alpha(x_\alpha,t)=-\sum_\beta \frac{q_\alpha q_\beta}{4\pi \epsilon_0 R_{\alpha \beta}}(1+\frac{v_\beta^2}{2c^2}-\frac{a_\beta \cdot R_{\alpha\beta}}{2c^2}-\frac{(v_\beta \cdot \hat{R}_{\alpha\beta})^2}{2c^2})+o(\frac{1}{c^2})
$$
由于磁矢势本身就是二阶的,因此无需展开.
结合动能,最终的展开形式为
$$

L=\sum_{\alpha}m_\alpha c^2+\frac{m_\alpha v_\alpha^2}{2}+\frac{m_\alpha v_\alpha^4}{8c^2}\\+\sum_{\alpha>\beta}\frac{q_\alpha q_\beta}{4\pi \epsilon_0 R_{\alpha \beta}}( -1+\frac{v_\alpha\cdot v_\beta}{c^2}-\frac{v_\beta^2}{2c^2}+\frac{a_\beta \cdot R_{\alpha\beta}}{2c^2}+\frac{(v_\beta \cdot \hat{R}_{\alpha\beta})^2}{2c^2})+o(\frac{1}{c^2})

$$
为了不让Lagrangian中出现加速度,我们需要一些分部积分.注意到
$$
\frac{a_\beta\cdot R_{\alpha \beta}}{2}=\frac{d}{dt}\frac{v_\beta\cdot R_{\alpha\beta}}{2}-\frac{v_\beta\cdot(v_\alpha-v_\beta)}{2}
$$
而全微分对作用量变分无影响.代入$L$
$$
L=\sum_{\alpha}m_\alpha c^2+\frac{m_\alpha v_\alpha^2}{2}+\frac{m_\alpha v_\alpha^4}{8c^2}\\+\sum_{\alpha>\beta}\frac{q_\alpha q_\beta}{4\pi \epsilon_0 R_{\alpha\beta}}\left\{-1+\frac{v_\alpha \cdot v_\beta}{2c^2}+\frac{(v_\beta \cdot \hat{R}_{\alpha\beta})^2}{2c^2}\right \}+o(\frac{v^2}{c^2})
$$
这称为Darwin Lagrangian.

## 相对论性Hamiltonian
考虑Legendre变换
$$

$$