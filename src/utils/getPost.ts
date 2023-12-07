import { getCollection } from "astro:content";
import { isBefore, parseISO } from "date-fns";

export const getPostsCC = async (props = {}: { limit?: number } = {}) => {
  let allPosts = await getCollection("posts");

  if (!import.meta.env.DEV) {
    allPosts = allPosts
      .filter((p) => isBefore(parseISO(p.data.pubDate.valueOf()), new Date()))
      .filter((p) => p.data.status.toLowerCase() === "published");
  }

  const posts = allPosts.sort(
    (a, b) =>
      new Date(b.data.pubDate.valueOf()) - new Date(a.data.pubDate.valueOf())
  );

  if (props?.limit) return posts.slice(0, props.limit);

  return posts;
};

// from https://www.curiouslychase.com/posts/how-i-schedule-blog-posts-with-github-actions-and-netlify/

//original
export const getPosts = async (max?: number) => {
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
}
