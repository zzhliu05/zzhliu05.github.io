---
title: "一个Chiral edge mode的论证"
date: 2026-09-04
status: "resolved"
question: "用局部band touching的低能Dirac结构解释Chern band的chiral边界态."
description: ""
tags: ["拓扑物理"]
---
IQHE/Chern band边界态可以通过质量反转的Dirac Hamiltonian解释(边界一侧陈数为1,另一侧拓扑平凡,Dirac Hamiltonian质量反转).考虑$x$方向周期,质量与$y$方向相关的Dirac Hamiltonian
$$
H=\hbar v_F(k_x\sigma_x-i \partial_y\sigma_y)+m(y)\sigma_z
$$
我们希望求解其本征态
$$
	\left [ \begin{matrix}
		m(y)& \hbar k_x+\hbar v_F\partial_y \\
		\hbar v_F k_x+\hbar v_F\partial_y& m(y)
	\end{matrix} \right ]	\left [ \begin{matrix}
		\psi_+(y)\\
		\psi_-(y)
	\end{matrix} \right ]=E\left [ \begin{matrix}
		\psi_+(y)\\
		\psi_-(y)
	\end{matrix} \right ]
$$
注意到代换$\psi_\pm=f_\pm e^{-\int^y m(y^\prime)dy^\prime/\hbar v_F}$可以把质量项消掉,因此本征态为
$$
\psi_{\pm,E}=e^{i(k_x x+k_y y)}e^{- \int^y m(y^\prime)dy/\hbar v_F}
$$
当$v_F>0$时,这才确实是边界态(对指数上质量项的符号要求).因此群速度$v_x=\frac{1}{\hbar}\frac{\partial E}{\partial k_x}>0$,即边界态是Chiral的.
