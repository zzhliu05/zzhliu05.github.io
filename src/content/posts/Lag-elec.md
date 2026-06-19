---
title: "运动电荷的相对论性修正"
description: "对运动电荷组Lagrangian的微扰展开计算."
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
\frac{a_\beta\cdot R_{\alpha \beta}}{2 R_{\alpha\beta}}=\frac{d}{dt}\frac{v_\beta\cdot R_{\alpha\beta}}{2R_{\alpha\beta}}-\frac{v_\beta\cdot(v_\alpha-v_\beta)}{2R_{\alpha\beta}}+\frac{(v_\beta \cdot \hat{R}_{\alpha \beta})((v_\alpha-v_\beta)\cdot \hat{R}_{\alpha\beta})}{2R_{\alpha\beta}}
$$
而全微分对作用量变分无影响.代入$L$
$$
L=\sum_{\alpha}m_\alpha c^2+\frac{m_\alpha v_\alpha^2}{2}+\frac{m_\alpha v_\alpha^4}{8c^2}\\+\sum_{\alpha>\beta}\frac{q_\alpha q_\beta}{4\pi \epsilon_0 R_{\alpha\beta}}\left\{-1+\frac{v_\alpha \cdot v_\beta}{2c^2}+\frac{(v_\alpha\cdot \hat{R}_{\alpha\beta})(v_\beta \cdot \hat{R}_{\alpha\beta})}{2c^2}\right \}+o(\frac{1}{c^2})
$$
这称为Darwin Lagrangian.

## 相对论性Hamiltonian
考虑Legendre变换
$$
p_\alpha=\frac{\partial L}{\partial v_\alpha}=m_\alpha v_\alpha+\frac{m_\alpha v_\alpha^3}{2c^2}+\sum_\beta \frac{q_\alpha q_\beta}{4\pi \epsilon_0 c^2 R_{\alpha\beta}}(\frac{v_\beta}{2}+\frac{v_\beta\cdot \hat{R}_{\alpha\beta}}{2}\hat{R}_{\alpha\beta})+o(\frac{1}{c^2})
$$
反解$v_\alpha$
$$
v_\alpha=\frac{p_\alpha}{m_\alpha}-\frac{p_\alpha^3}{2m_\alpha^3c^2}-\sum_{\beta\neq \alpha} \frac{q_\alpha q_\beta}{4\pi \epsilon_0 c^2R_{\alpha\beta}}(\frac{p_\beta}{2m_\beta}+\frac{p_\beta\cdot \hat{R}_{\alpha\beta}}{2m_\beta}\hat{R}_{\alpha\beta})+o(\frac{1}{c^2})
$$
$$
H=\sum_{\alpha}p_\alpha v_\alpha-L|_{p_\alpha=\frac{\partial L}{\partial v_\alpha}}=\sum_{\alpha}\frac{m_\alpha v_\alpha^2}{2}+\frac{3m_\alpha v_\alpha^4}{8 c^2}
$$
$$
+\sum_{\alpha>\beta}\frac{q_\alpha q_\beta}{4\pi \epsilon_0 R_{\alpha\beta}}\left\{1+\frac{v_\alpha \cdot v_\beta}{2c^2}+\frac{(v_\alpha\cdot \hat{R}_{\alpha\beta})(v_\beta \cdot \hat{R}_{\alpha\beta})}{2c^2}\right\}+o(\frac{1}{c^2})
$$
$$
=\sum_{\alpha}(\frac{p_\alpha^2}{2m_\alpha}-\frac{p_\alpha^4}{8m^3_\alpha c^2})+\sum_{\alpha>\beta}\frac{q_\alpha q_\beta}{4\pi \epsilon_0 R_{\alpha\beta}}\left\{1+\frac{p_\alpha \cdot p_\beta}{2m_{\alpha}m_\beta c^2}+\frac{(p_\alpha\cdot \hat{R}_{\alpha\beta})(p_\beta \cdot \hat{R}_{\alpha\beta})}{2m_\alpha m_\beta c^2}\right\}+o(\frac{1}{c^2})
$$

## 运动方程
将Lagrangian代入Euler-Lagrange方程
$$
\frac{d}{dt}\left\{m_\alpha v_\alpha+\frac{m_\alpha v_\alpha^3}{2c^2}+\sum_\beta \frac{q_\alpha q_\beta}{4\pi \epsilon_0 c^2 R_{\alpha\beta}}(\frac{v_\beta}{2}+\frac{v_\beta\cdot \hat{R}_{\alpha\beta}}{2}\hat{R}_{\alpha\beta})\right\}=\frac{\partial L}{\partial x_\alpha}
$$
$$
\implies m_\alpha a_\alpha+\frac{m_\alpha a_\alpha\cdot v_\alpha}{c^2}v_\alpha+m_\alpha\frac{v_\alpha^2}{2c^2}a_\alpha
\\+\sum_{\beta\neq \alpha}\frac{q_\alpha q_\beta}{4\pi \epsilon_0 c^2 R_{\alpha\beta}}\{-\frac{v_\alpha\cdot R_{\alpha\beta}-v_\beta \cdot R_{\alpha\beta}}{R_{\alpha\beta}^2}(\frac{v_\beta}{2}+\frac{v_\beta\cdot \hat{R}_{\alpha\beta}}{2}\hat{R}_{\alpha\beta})+\frac{a_\beta}{2}+\frac{a_\beta\cdot \hat{R}_{\alpha\beta}}{2}\hat{R}_{\alpha_\beta}
\\
+\frac{v_\beta\cdot v_{\alpha\beta}}{2R_{\alpha\beta}}\hat{R}_{\alpha\beta}-\frac{(v_\beta\cdot \hat{R}_{\alpha\beta})(v_{\alpha\beta}\cdot \hat{R}_{\alpha\beta})}{R_{\alpha\beta}}\hat{R}_{\alpha\beta}+\frac{v_\beta \cdot \hat{R}_{\alpha\beta}}{2}\hat{v}_{\alpha\beta}\}
$$
$$
=-\sum_{\beta\neq \alpha}\frac{q_\alpha q_\beta}{4\pi\epsilon_0 R_{\alpha\beta}}\{-\frac{\hat{R}_{\alpha\beta}}{R_{\alpha\beta}}(1-\frac{v_\alpha\cdot v_\beta}{2c^2}-\frac{(v_\alpha\cdot \hat{R}_{\alpha\beta})(v_\beta\cdot \hat{R}_{\alpha\beta})}{2c^2})-\frac{v_\beta \cdot \hat{R}_{\alpha\beta}}{2c^2R_{\alpha\beta}}v_\alpha-\\\frac{v_\alpha \cdot \hat{R}_{\alpha\beta}}{2c^2R_{\alpha\beta}}v_\beta+\frac{(v_\alpha\cdot \hat{R}_{\alpha\beta})(v_\beta \cdot \hat{R}_{\alpha\beta})}{c^2 R_{\alpha\beta}}\hat{R}_{\alpha\beta}\}
$$
简化得到
$$
m_\alpha [a_\alpha+\frac{2(a_\alpha \cdot v_\alpha)v_\alpha+v_\alpha^2 a_\alpha}{2c^2}]=\sum_{\beta\neq \alpha}\frac{q_\alpha q_\beta}{4\pi \epsilon_0 R_{\alpha\beta}}\{-\frac{a_\beta+(a_\beta \cdot \hat{R}_{\alpha\beta})\hat{R}_{\alpha\beta}}{2c^2}\\
+\frac{-3(v_{\beta}\cdot \hat{R}_{\alpha\beta})(v_\beta \cdot \hat{R}_{\alpha\beta})\hat{R}_{\alpha\beta}+2(v_\alpha\cdot \hat{R}_{\alpha\beta})v_\beta+(v_\beta^2-2v_\alpha\cdot v_\beta)\hat{R}_{\alpha\beta}}{2R_{\alpha\beta}c^2}+\frac{\hat{R}_{\alpha\beta}}{R_{\alpha\beta}}\}
$$

## 数值模拟
由于这是一个常微分方程,我们可以尝试用RK4模拟一下.取$q_1q_2<0$的双星系统,设置双星初始速度$v_0=\frac{c}{4}$,结果如下
```py
import numpy as np
import matplotlib.pyplot as plt
ke = 1.0        
m1 = 1.0     
m2 = 1.0        
q = 0.5        
c = 1
q1 = +q
q2 = -q
eps = 1e-6
R0 = 2.0
r1_0 = np.array([-R0 / 2, 0.0])
r2_0 = np.array([+R0 / 2, 0.0])
alpha = - ke * q1 * q2
v0 = np.sqrt(alpha / (2 * m1 * R0))
v1_0 = np.array([0.0, -v0])
v2_0 = np.array([0.0, +v0])
y0 = np.array([
    r1_0[0], r1_0[1], v1_0[0], v1_0[1],
    r2_0[0], r2_0[1], v2_0[0], v2_0[1]
])

def derivatives(y):
    """
    y = [x1, y1, vx1, vy1, x2, y2, vx2, vy2]
    """

    r1 = y[0:2]
    v1 = y[2:4]
    r2 = y[4:6]
    v2 = y[6:8]
    print(np.linalg.norm(v1), np.linalg.norm(v2))
    r12 = r2 - r1 
    dist = np.sqrt(np.dot(r12, r12) + eps**2)
    e12 = r12 / dist
    e21 = -e12
    factor1 = 2*np.dot(v1,e21)*v2+(np.dot(v2,v2)-2*np.dot(v1,v2))*e21-3*np.dot(v2,e21)*np.dot(v2,e21)*e21
    factor2 = 2*np.dot(v2,e12)*v1+(np.dot(v1,v1)-2*np.dot(v1,v2))*e12-3*np.dot(v1,e12)*np.dot(v1,e12)*e12
    cofactor = ke * q1 * q2 / dist /2/c**2
    RHS1 = ke * q1 * q2 / dist**3 *(-r12)+cofactor*factor1
    RHS2 = ke * q1 * q2 / dist**3 *(r12)+cofactor*factor2
    RHS = np.concatenate([RHS1,RHS2])
    ofdiag = np.array([[cofactor*(1+e12[0]**2),cofactor*e12[0]*e12[1]],[cofactor*e12[0]*e12[1],cofactor*(1+e12[1]**2)]])
    diag1 = m1*np.array([[1+v1[0]**2/c**2+np.dot(v1,v1)/2/c**2, v1[0]*v1[1]/c**2],[v1[0]*v1[1]/c**2, 1+v1[1]**2/c**2+np.dot(v1,v1)/2/c**2]])
    diag2 = m2*np.array([[1+v2[0]**2/c**2+np.dot(v2,v2)/2/c**2, v2[0]*v2[1]/c**2],[v2[0]*v2[1]/c**2, 1+v2[1]**2/c**2+np.dot(v2,v2)/2/c**2]])
    M = np.block([[diag1, ofdiag], [ofdiag, diag2]])
    a = np.linalg.solve(M, RHS)

    dydt = np.zeros_like(y)

    dydt[0:2] = v1
    dydt[2:4] = a[0:2]
    dydt[4:6] = v2
    dydt[6:8] = a[2:4]

    return dydt

def H(y):
    r1 = y[0:2]
    v1 = y[2:4]
    r2 = y[4:6]
    v2 = y[6:8]
    r12 = r2 - r1
    e12 = r12 / np.sqrt(np.dot(r12, r12) + eps**2)
    dist = np.sqrt(np.dot(r12, r12) + eps**2)
    kinetic = 0.5*m1*np.dot(v1,v1)+0.5*m2*np.dot(v2,v2)
    kinetic_rel = 3*m1*np.dot(v1,v1)**2/8/c**2+3*m2*np.dot(v2,v2)**2/8/c**2
    potential = ke*q1*q2/dist
    potential_rel = ke*q1*q2/(2*dist*c**2)*(np.dot(v1,v2)+np.dot(v1,e12)*np.dot(v2,e12))
    return kinetic , kinetic_rel , potential , potential_rel

def rk4_step(y, dt):
    k1 = derivatives(y)
    k2 = derivatives(y + 0.5 * dt * k1)
    k3 = derivatives(y + 0.5 * dt * k2)
    k4 = derivatives(y + dt * k3)
    return y + dt * (k1 + 2 * k2 + 2 * k3 + k4) / 6


dt = 0.005
T = 100.0
N = int(T / dt)

trajectory = np.zeros((N, len(y0)))
trajectory[0] = y0

y = y0.copy()
Energy = np.zeros((N, 4))
Energy[0] = H(y)
for i in range(1, N):
    y = rk4_step(y, dt)
    trajectory[i] = y
    Energy[i] = H(y)
```

<img src="/images/posts/relativistic.png"
     alt=""
     style="display:block; margin:0 auto; width:70%;">

可以看到当$\frac{v}{c}\sim \frac{1}{4}$时轨道与圆形有显著偏离.