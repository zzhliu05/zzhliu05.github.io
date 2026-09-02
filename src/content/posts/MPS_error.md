---
title: "Matrix Product State及其误差"
description: "简单介绍DMRG和MPS.分析其误差"
published: 2026-09-01
tags: ["MPS"]
category: "凝聚态计算"
draft: true
---
MPS/DMRG类方法的基本思想都在于用少量tensor product state张成的子空间近似总的空间.假设一个Hilbert space由$A,B$两个子系统组成,维数分别为$d_A,d_B$.两个子空间分别有基底
$$
\ket{a_i},\ket{b_j}
$$
则总空间维数为$d_Ad_B$,基底为$\ket{a_i}\otimes \ket{b_j}$.假设现在我们有一个态
$$
\ket{\psi}=\sum_{i,j} \psi_{ij}\ket{a_i}\otimes \ket{b_j}
$$
我们不希望用这么多参数表示这个态.我们希望找到这个态的一个"低秩"近似.我们把$\psi_{ij}$看成一个矩阵,对其作SVD分解
$$
\psi_{ij}=(USV^\dagger)_{ij}
$$
记$d=\mathrm{min}(d_A,d_B)$,$U\in M^{d_A\times d}$,$S\in M^{d\times d},V\in M^{d_B\times d}$.我们可以定义约化密度矩阵
$$
\rho_A=\mathrm{Tr}_B \rho=\sum_{j}\braket{b_j|\rho|b_j}
$$
定义纠缠熵为
$$
S_A=-\mathrm{Tr}_A(\rho_A ln \rho_A)=-\sum_i \lambda_i ln\lambda_i
$$