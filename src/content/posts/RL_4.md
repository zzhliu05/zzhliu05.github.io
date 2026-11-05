---
title: RL(4):Diffusion Model and Flow Matching
description: 强化学习笔记草稿
published: 2026-11-03
tags:
  - 强化学习
category: 强化学习
draft: true
---
## DDPM
DDPM的正过程是一个逐步加Gaussian噪声的过程.我们选取一个加噪声强度的计划
$$
0<\beta_t<1
$$
让$\alpha_t=1-\beta_t$,$\bar{\alpha}_t=\prod\alpha_t$,对于初始样本集$X_0$,定义加噪过程
$$
X_t=\sqrt{\alpha_t}X_{t-1}+\beta_t \epsilon_t,\epsilon_t\sim \mathcal{N}(0,I)
$$
正向过程是人工选择的,因此DDPM没有学习正向过程.注意到由归纳法我们有
$$
X_t=\sqrt{\bar{\alpha}_t} X_0+\sqrt{1-\bar{\alpha}_t}\epsilon
$$
如果我们进行无穷步噪声,则$X_t$最终会收敛于完全的Gaussian白噪声.由这个过程的定义,我们知道如下条件概率是Gaussian的(我们简记事件$X_t=x_t$为$x_t$)
$$
p(x_t|x_{t-1},x_0)=p(x_t|x_{t-1})=\mathcal{N}(\sqrt{\alpha_t}x_{t-1},\beta_t I)
$$
现在我们希望从完全的高斯白噪声中恢复这个样本.为此假设我们在第$t$步得到了恢复过程的样本$x_t$.我现在希望知道$x_{t_1}$.显然这是一个贝叶斯推断问题,即我们想要知道$p(x_{t-1}|x_t)$.由贝叶斯公式
$$
p(x_{t-1}|x_t)\propto p(x_t|x_{t-1})p(x_{t-1})=\sum_{x_0}p(x_t|x_{t-1})p(x_{t-1}|x_0)p(x_0)
$$
因此目标样本的概率分布就隐式地包含在了反向贝叶斯的条件概率中.加入目标样本分布(初始分布)是conditioned,那么
$$
p(x_{t-1}|x_t,x_0)=p(x_{t}|x_{t-1})\frac{p(x_{t-1}|x_0)}{p(x_t|x_0)}=\mathcal{N}(x_t;\sqrt{\alpha_t}x_{t-1},\beta_t I)\frac{\mathcal{N}(x_{t-1};\sqrt{\bar{\alpha}_{t-1}}x_0,\sqrt{1-\bar{\alpha}_{t-1}}I)}{\mathcal{N}(x_{t};\sqrt{\bar{\alpha}_t}x_0,\sqrt{1-\bar{\alpha}_t}I)}
$$
代入Gaussian分布则有
$$
p(x_{t-1}|x_t,x_0)=exp[-\frac{(x_t-\sqrt{\alpha_t}x_{t-1})^2}{2(1-\alpha_t)}-\frac{()}{2(1-\bar{\alpha}_t)}]
$$
既然反向概率分布不知道,那怎么在反向过程中取样呢?自然的是我们可以训练一个神经网络来拟合这个反向概率分布本身,即
$$
\text{train }\min_\theta p_\theta(x_{t-1}|x_t)\to p(x_{t-1}|x_t)
$$
这里的似然函数是
$$
\mathbb{E}_{(x_{t-1},x_t)}[log p_\theta(x_{t-1}|x_t)]
$$
极小化似然函数等价于如上的拟合问题.

我们可以观察这个似然损失怎么用条件概率计算
$$
\mathbb{E}_{(x_{t-1},x_t)}[logp_\theta (x_{t-1}|x_t)]=\sum_{(x_0,x_{t-1},x_t)}p(x_0,x_{t-1},x_t)logp_\theta(x_{t-1}|x_t)
$$
$$
=\sum_{x_{t-1},x_t,x_0} p(x_{t-1}|x_t,x_0)p(x_t,x_0)logp_\theta(x_{t-1}|x_t)
$$
如果我们将$p_\theta(x_{t-1}|x_t)$的变分空间取为Gaussian分布的话,我们有
$$

$$
