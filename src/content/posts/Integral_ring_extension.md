---
title: 代数整环扩张
description: 代数整环.
published: 2026-09-29
tags:
  - 代数数论
category: 代数数论
draft: true
---
## Integral ring extension
### Def
Let $B|A$ be a ring extension,$b\in B$ is called interal over $A$ if $\exists$ monic polynomial $f(x)\in A[x]$,such that $f(b)=0$.

### Def
Let $A$ be a ring and $M$ a $A$-module.$M$ is called $A$-faithful if
$$
\{a\in A|\forall m,am=0\}=\{0\}
$$i.e. $A\to End(M),a\to a\cdot$ is injective.

**example:**
(a): $A=\mathbb{Z}$,$B=\mathbb{Q}[i]$,$b=2+3i$
$$
(b-2)^2+9=0\implies b^2-4b+13=0
$$
So $b$ is integral over $A$.

Is $\frac 1 5 +\frac 1 3 i$ integral over $\mathbb{Z}$?

(b):Let $B$ be a ring extension over $A$.Let $M:=A[b]$.Then
$M$ is finitely generated as a $A$-module.

Further $M$ is $A$-faithful.

### prop
Let $B|A$ a ring extension annd $b\in B$.The following are equivalent:

(1):$b$ is integral over $A$.
(2):$A[b]$ is finite over $A$.
(3):$\exists$ $A[b]$-faithful module $M\subset B$ such that $M$ is finite over $A$
(4):$\exists$ intermediate field $B|B^\prime|A$ such that $b\in B^\prime$ and $B^\prime$ is a finitely generated $A$-module.

**Proof:**
(1) $\implies$(2):easy
(2)$\implies$ (4):$B^\prime=A[b]$.
(4)$\implies$ (3):$M=B^\prime$
The non-trivial one is (3)$\implies$ (1).We use Noether's determinant trick.Take a finite generating set
$$
M=\sum Am_i
$$
Since $M$ is a $A[b]$-module$\implies bM\subset M$ ,then
$$
bm_i=\sum_j a_{ij}m_j,i.e. bm=Tm
$$
Where $T\in A^{l\times l}$.By Cayley Hamilton theorm (over commutative unital ring),the characteristic Polynomials
$$
\chi_T(\lambda)=\mathrm{det}(\lambda I-T)
$$
then
$$
\chi_T(b)m=\chi_T(T)m=0
$$
Since $M$ is faithful $A[b]$-module,we must have
$$
\chi_T(b)=0
$$
which implies $b$ is integral over $A$.

**example:** What elements of $\mathbb{Q}$ are integral over $\mathbb{Z}$?

(1): All elements of $\mathbb{Z}$,and they are all.

**proof:** Take $\frac{p}{q}\in \mathbb{Q}$ s.t. $gcd(p,q)=1$.assume it is integral over $\mathbb{Z}$,then
$$
(\frac{p}{q})^n+a_i(\frac{p}{q})^i=0\implies p^n+\sum_ia_ip^iq^{n-i}=0,a_i\in \mathbb{Z}
$$
Quotient $q$ gives
$$
p^n=0 \ (\mathrm{mod } \  q)
$$
Which contradicts $gcd(p,q)=1$.

Another proof:If it is integral over $\mathbb{Z}$,then $\mathbb{Z}[\frac{p}{q}]$ is finitely generated over $\mathbb{Z}$,then
$$
\forall a\in \mathbb{Z}[\frac{p}{q}],\exists N,q^Na\in \mathbb{Z}
$$
But take $a=(\frac{p}{q})^{N+1}$ leads to contradiction.

### prop
Let $B|A$ a ring extension.Define the integral closure
$$
\bar{A}=\{b\in B|b\text{ integral over }A\}
$$
Then $\bar{A}$ is a subring of $B$.

**proof**: Let $b_1,b_2\in \bar{A}$,then $A[b_1]$ is finite over $A$.But $b_2$ is also integral over $A[b_1]$,so $A[b_1,b_2]$ is also finite over $A$,which implies $b_1b_2$ is integral over $A$.
Or we can say if
$$
f_1(b_1)=0,f_2(b_2)=0,
$$

**example:** $\bar{\mathbb{Z}}^{\mathbb{Q}}=\mathbb{Z}$.

An integral domain $A$ is called integrally closed if $\bar{A}^{Q(A)}=A$.
For example,UFDs are integrally closed.(using the same argument with $\mathbb{Z}$)


### prop
Let $\sigma$ be integrally closed with quotient field $F$.$a\in \bar{F}$.Then the following are equivalent:
(1):$a$ is integral over $\sigma$.
(2):All coefficients of the minimal polynomial $f(x)$ of $a$ over $F$ are in $\sigma$.

**proof**:
(2)$\implies$ (1):trivial because $f(x)$ is monic.
(1)$\implies$(2):

**example**: Compute $\bar{\mathbb{Z}}^{\mathbb{Q}(i)}$.
