---
title: "频域格林函数性质"
date: 2026-09-07
status: "resolved"
question: |
  证明在频域空间(推迟)格林函数
  $$
  G(x_b,x_a,\omega)=\sum_n \frac{\psi_n(x_b)\psi_n^*(x_a)}{\omega-\epsilon_n}
  $$
  其中$\psi_n$是完备本征基底.
tags: ["QFT"]
---
直接由定义可知,推迟格林函数为
$$
G(x_b,x_a,\omega)=-i\int_0^\infty dt e^{i\omega t-\epsilon t}\braket{x_b|U(t,0)|x_a}
$$
插入完备关系$I=\sum_n \ket{\psi_n}\bra{\psi_n}$
$$
G(x_b,x_a,\omega)=-i\sum_n\int_0^\infty dt e^{i\omega t-\epsilon t}\braket{x_b|U(t,0)|\psi_n}\braket{\psi_n|x_a}
$$
对于本征态,$U(t,0)=e^{-i\epsilon_n t}$,因此直接积分可得
$$
G(x_b,x_a,\omega)=\sum_n \frac{\braket{x_b|\psi_n}\braket{\psi_n|x_a}}{\omega-\epsilon_n+i\epsilon}=\sum_n \frac{\psi_n(x_b)\psi_n^*(x_a)}{\omega-\epsilon_n+i\epsilon}
$$