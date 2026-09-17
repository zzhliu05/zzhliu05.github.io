---
title: "RL(1):Randomness and Confidence"
description: "强化学习的概率统计基础."
published: 2026-07-23
tags: ["强化学习","概率统计"]
category: "强化学习"
draft: true
---

Random experience->estimate value->quantify uncertainty.
强化学习是时序过程,并且不独立.(用Markov Chain建模)

Mixing到目标分布.

## Review of Prob and Stat

随机事件建模:事件$\subset$样本空间.$\sigma$代数,概率.

$$
P(A|B)=\frac{P(A\cap B)}{P(B)}
$$
随机变量是样本空间上的函数.

RL perspective:状态空间$S_t$,动作空间$A_t$,奖励函数$R_{t+1}$.动作我们一般认为是随机变量.

On step of RL:$(S_t,A_t,R_{t+1},S_{t+1})$.

概率论的Bayesian Perspective:Probability is belief (not frequency).

期望/条件期望:T=life,E[T]=70.

RL perspective:Return
$$
G_t=R_{t+1}+\gamma R^{t+2}+\gamma^2 R_{t+3}+\cdots
$$
value function
$$
V^\pi(s)=E_\pi[G_t|S_t=s]
$$
$\pi$ is a policy.

Bellman equation:
$$
E[R_{t+1}+\gamma V(S_{t+1})|S_t=s,A_t=a]
$$

$E(Y|X)$ is also a random variable,then it make sense to compute $E(E(Y|X))$ and $var(E(Y|X))$

Theorem:If $X,Y$ independent,then $E(Y|X)=Y$.

Theorem:
$$
E(h(X)Y|X)=h(X)E(Y|X)
$$

Theorem:
$$
E(E(Y|X))=E(Y)
$$

Theorem:
$$
E(E(Y|X,Z)|Z)=E(Y|Z)
$$

Theorem:
$$
Var(Y|X)=E((Y-E(Y|X))^2|X)
$$
$$
Var(Y|X)=E(Y^2|X)-(E(Y|X))^2
$$
$$
Var(Y)=E(Var(Y|X))+Var(E(Y|X))
$$
