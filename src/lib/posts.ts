import { getCollection } from 'astro:content';

export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getAllTags(posts: Awaited<ReturnType<typeof getPublishedPosts>>) {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries()).sort((a, b) => {
    return b[1] - a[1] || a[0].localeCompare(b[0], 'zh-Hans-CN');
  });
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}
