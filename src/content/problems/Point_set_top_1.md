---
title: "点拓复健:边界"
date: 2026-09-08
status: "resolved"
question: |
  证明边界$\partial A=\bar{A}\backslash \mathing{A}$满足
  (1):$\partial A=\bar{A}\cap \overline{A^c}$
  (2):$\partial A=\emptyset\iff A$既开又闭 
tags: ["点集拓扑"]
---
(1):$\partial A=\bar{A}\backslash \mathring{A}$.显然$\partial A\subset \bar{A}$.对于任意闭集$B \supset A^c\implies B^c\subset A\implies B^c\subset \mathring{A}\implies \partial A\subset B $.因此$\partial A\subset \overline{A^c}$.因此$\partial A\subset \bar{A}\cap \overline{A^c}$.
$$
x\in \overline{A^c}\iff x\in B\supset A^c,\forall B\iff x\notin \mathring{A} 
$$
因为上述是等价,所以足矣.

(2):$\partial A=\emptyset\iff \bar{A}=\mathring{A}$,但是$\mathring{A}\subset A\subset \bar{A}$,因此$\bar{A}=A=\mathring{A}$,显然这当且仅当$A$既开又闭.