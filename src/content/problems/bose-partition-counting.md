---
title: "整数拆分为什么等价于 Bose 谐振子计数？"
date: 2026-08-29
status: "resolved"
question: "把总能量写成不同频率模式的占据数之和时，为什么得到的正好是整数拆分问题？"
description: "每个频率模式的占据数记录整数出现的次数，Bose 统计不区分粒子顺序，因此只保留拆分的重数数据。"
tags: ["统计力学", "数论"]
relatedPosts:
  - title: "全同Bose谐振子与Hardy-Ramanujan公式"
    url: "/posts/Bose-Ramanujan/"
---

每个频率模式的占据数记录整数 $n$ 出现的次数，Bose 统计不区分粒子顺序，因此只保留各整数出现的重数，正是整数拆分的数据。

换句话说，如果总能量单位化为 $N$，那么一个占据数列

$$
N=\sum_{n\ge 1} n k_n
$$

就对应整数 $N$ 的一种拆分，其中 $k_n$ 表示整数 $n$ 出现了多少次。
