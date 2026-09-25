---
title: "RL(1):Randomness and Confidence"
description: "强化学习的概率统计基础."
published: 2026-07-23
tags: ["强化学习","概率统计"]
category: "强化学习"
draft: false
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
MMSE:How to approximate random var $Y$ using function $g(X)$,i.e. to minimize
$$
\min_g E(Y-g(X))
$$
Because
$$
E[(Y-g(X))^2]=E[(Y-E(Y|X))^2]+E[(E(Y|X)-g(X))^2]
$$
The answer is $g=E(Y|X)$.It is also known that
$$
E((Y-E(Y|X))h(X))=0,\forall h
$$

In general MMSE is a highly nonlinear function.

LLSE:If we only restrict possible functional variational space to linear functions,
$$
\min_{g=c+dx}E(y-g(X))
$$
Then it is called LLSE.

Adopt different approximation methods leads to different learning methods.


Theorem:Let X,Y be Gaussian,then
$$
E[Y|X]=L[Y|X]=E(Y)+\frac{Cov(X,Y)}{Var(X)}(X-E(X))
$$

### Concentration Theorem
弱大数定理:uncorrelated均值依概率收敛于期望.

MC value estimation in RL:$\hat{V}^\pi(s)=\frac{1}{N(s)}\sum_{i=1}^{N(s)} G^{(i)}$.

不能实时估算(off-policy),因为需要跑完整局游戏.

能不能实时估算(on-policy)?

随机采样中,只给一个无偏的估计值是不够的.还要关注其不确定性(方差)
$$
P(|\hat{\mu}_n-\mu_n|\geq \epsilon)=?
$$
Optimism,exploration bonuses depend on "confidence".

Cauchy-Schwarz
$$
|E(XY)|\leq \sqrt{E(X^2)E(Y^2)}
$$

Jensen:If $f$ convex
$$
f(\lambda x_1+(1-\lambda)x_2)\leq \lambda_1f(x_1)+(1-\lambda)f(x_2)
$$
$$
E(f(X))\geq f(E(X))
$$

Entropy:$H(p)=-E[log p]$.By Jensen,the entropy is maximum when distribution is uniform.

对于连续分布,最大熵分布是Gaussian.

KL Divergence:
$$
D(p|q)=-E_p[logp-logq]
$$
which is non-negative.It is not symmetric,so not a metric.

Markov:
$$
P(|X|\geq a)\leq \frac{E|X|}{a}
$$

In fact such trick can be generalized to any monotone increasing functions.For example,we can
