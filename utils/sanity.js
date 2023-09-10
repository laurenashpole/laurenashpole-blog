import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'm9nd93xl',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false
});

function getQuery (limit = 10, page = 1, id, tag) {
  return `*[_type == 'post'${id ? ` && _id == '${id}'` : ''} ${tag ? ` && tag == '${tag}'` : ''}] | order(date desc) [${limit * (page - 1)}...${limit * page}] {
    _id,
    type,
    title,
    "slug": slug.current,
    "pathname": pathname.current,
    date,
    tags,
    summary,
    url,
    excerpt,
    description,
    "photos": photos[] {
      "url": asset->url,
      alt
    },
    caption
  }`;
}

async function getPosts (limit = 10, page = 1, id, tag) {
  return (await client.fetch(getQuery(limit, page, id, tag))).map((post) => ({
    ...post,
    pathname: `${post.pathname}${post.slug ? `/${post.slug}` : ''}`
  }));
}

export async function find (limit = 10, page = 1, id, tag) {
  return {
    posts: await getPosts(limit, page, id, tag)
  };
}
