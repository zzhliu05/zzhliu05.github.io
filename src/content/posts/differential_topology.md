---
title: Differential Topology
published: 2026-09-16
---

## General Topology

$(X,\tau)$ is a topological space.

Def:$\mathcal{B}\subset \tau$ is a basis if the following holds

$$
\forall U\in \tau,\forall x\in U,\exists E\in \mathcal{B},E\subset U
$$

theorem:There exists a unique topology on metric space.

Two ways of defining topology on $\mathbb{R}^n$:product topology and metric topology.Are they the same?

09/17

$x\in X$ is a topological space.

Def:$x\in X$ is locally Euclidean of $dimn$ $\iff$ $\exists x\in U\subset X,U\cong \mathbb{R}^n$.

Theorem:$x$ is locally Euclidean of $dim m$ and $dim n$,then $m=n$.

Proof:By theorem on Tuesday,we can find
$$
x\in U_n\subset X,U_n\cong \mathbb{R}^n,x\in U_m\subset X,U_m\cong \mathbb{R}^m
$$
Take $U_n\cap U_m$,then it is open and
$$
\mathbb{R}^n \supset V_n\cong U_n\cap U_m \cong V_m\subset \mathbb{R}^m
$$
The cohomology group argument shows that two open sets in $\mathbb{R}^m$ and $\mathbb{R}^n$ are hom implies $m=n$.

Def:$C^0$ manifold is a Hausdorff,second countable topological space such that $\forall x\in X$ is locally Euclidean of dimension $n(x)$.

Cor:If $X$ is connected,then the $n$ is global.

proof:Show $n:X\to \mathbb{Z}$ is continuous.

Theorem:there exists topological spaces that only satisfy two of the conditions in