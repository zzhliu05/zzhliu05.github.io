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

工程效果:如何快速Mixing到目标分布.

## Review of Prob and Stat

### Basic of probability theory
随机事件建模:事件$\subset$样本空间.$\sigma$代数,概率.

$$
P(A|B)=\frac{P(A\cap B)}{P(B)}
$$
随机变量是样本空间上的函数.

RL perspective:状态空间$S_t$,动作空间$A_t$,奖励函数$R_{t+1}$.动作我们一般认为是随机变量.

一步RL包含如下要素:$(S_t,A_t,R_{t+1},S_{t+1})$.

概率论的Bayesian Perspective:概率是信念,不是频率.

期望/条件期望:T=life,E[T]=70.

RL perspective:返回的奖励函数为后续奖励的衰减叠加
$$
G_t=R_{t+1}+\gamma R^{t+2}+\gamma^2 R_{t+3}+\cdots
$$
估值函数是关于策略分布(关于目前状态的条件)期望.
$$
V^\pi(s)=E_\pi[G_t|S_t=s]
$$
$\pi$是策略.

Bellman equation:
$$
E[R_{t+1}+\gamma V(S_{t+1})|S_t=s,A_t=a]
$$

$E(Y|X)$也是一个随机变量.因此我们可以定义 $E(E(Y|X))$ 和 $var(E(Y|X))$

Theorem:If $X,Y$ 为独立随机变量,那么 $E(Y|X)=Y$.

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
MMSE: 如何用函数$g(X)$估计$Y$,i.e. 最小化
$$
\min_g ||Y-g(X)||
$$
因为
$$
E[(Y-g(X))^2]=E[(Y-E(Y|X))^2]+E[(E(Y|X)-g(X))^2]
$$
最小化二次损失的估值函数是 $g=E(Y|X)$.并且我们也知道
$$
E((Y-E(Y|X))h(X))=0,\forall h
$$

一般来说MMSE不是线性函数.

LLSE:如果我们把变分空间限制在线性函数空间中
$$
\min_{g=c+dx}E(y-g(X))
$$
这种估计叫LLSE.

不同的近似变分方法对应不同的学习模式.


Theorem:如果$X,Y$都是Gaussian的,那么
$$
E[Y|X]=L[Y|X]=E(Y)+\frac{Cov(X,Y)}{Var(X)}(X-E(X))
$$

### Concentration Theorem
弱大数定理:uncorrelated均值依概率收敛于期望.
我们想通 通过Monte Carlo估计期望,但是估计不是无偏就行.我们还需要了解估计的方差.
MC估值in RL:$\hat{V}^\pi(s)=\frac{1}{N(s)}\sum_{i=1}^{N(s)} G^{(i)}$.

不能实时估算(off-policy),因为需要跑完整局游戏.

能不能实时估算(on-policy)?

随机采样中,只给一个无偏的估计值是不够的.还要关注其不确定性(方差)
$$
P(|\hat{\mu}_n-\mu_n|\geq \epsilon)=?
$$
中心极限定理:对于$n$足够大,我们有
$$
\frac{\hat{\mu}_n-\mu}{\sigma/\sqrt{n}}\sim \mathcal{N}(0,1)
$$


探索奖励基于置信区间:"confidence".

Cauchy-Schwarz不等式:
$$
|E(XY)|\leq \sqrt{E(X^2)E(Y^2)}
$$

Jensen不等式:If $f$ convex
$$
f(\lambda x_1+(1-\lambda)x_2)\leq \lambda_1f(x_1)+(1-\lambda)f(x_2)
$$
$$
E(f(X))\geq f(E(X))
$$

Entropy:$H(p)=-E[log p]$.由Jensen不等式,均匀分布可以极大化熵.

对于连续分布,最大熵分布是Gaussian.

KL Divergence:
$$
D(p|q)=-E_p[logp-logq]
$$
KL散度是非负的.由于它不是对称的,因此不是度量.

Markov 不等式:
$$
P(|X|\geq a)\leq \frac{E|X|}{a}
$$
由此我们可以推出Chebyshev不等式:
$$
P(|X-\mu|\geq a)\leq \frac{\sigma^2}{a^2}
$$
**Remark**:注意到这种trick可以推广到任意单调递增函数$g$.
$$
P(|X|\geq a)=P(g(|X|)\geq g(a))\leq \frac{E[g(|X|)]}{g(a)}
$$
如果我们令$g(x)=e^{tx}$,则有Chernoff不等式:
$$
P(X\geq a)\leq \frac{E(e^{tX})}{e^{ta}}
$$

Hoeffding lemma:如果随机变量$E(X)=0,a\leq X\leq b$,则
$$
E(e^{\lambda X})\leq e^{\frac{1}{8}\lambda^2(b-a)^2}
$$
Hoeffding不等式:如果$X_n$是独立随机变量,$E(X_i)=\mu$,并且这些随机变量一致有界.则
$$
\forall \epsilon>0,P(|\hat{\mu}_n-\mu|\geq \epsilon)\leq 2e^{-\frac{2n\epsilon^2}{(b-a)^2}}
$$
即有界随机采样的平均估计是"指数级"准确的.

更一般的Hoeffding不等式:如果第$k$个随机变量$a_k\leq X_k\leq b_k$,则
$$
P(|S_n-\mu|\geq t)\leq 2e^{-\frac{2t^2}{\sum_{k=1}^n(b_k-a_k)^2}}
$$
如果奖励函数在$[0,1]$之间,则我们有置信概率
$$
P(|\hat{\mu}_n-\mu|\geq \epsilon)\leq 2e^{-2n\epsilon^2}
$$
如果置信阈值为$2e^{-2n\epsilon^2}=\delta$,则置信区间为
$$
\mu\in [\hat{\mu}_n-\sqrt{\frac{ln(2/\delta)}{2n}},\hat{\mu}_n+\sqrt{\frac{ln(2/\delta)}{2n}}]
$$
