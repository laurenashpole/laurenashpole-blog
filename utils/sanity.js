import { createClient } from 'next-sanity';
import { toHTML } from '@portabletext/to-html';
import { decode } from 'html-entities';
import Prism from 'prismjs';

const client = createClient({
  projectId: process.env.SANITY_PROJECT,
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false
});

function getQuery (limit, page, id, tag) {
  return `*[_type == 'post' && state == 'published'${id ? ` && _id == '${id}'` : ''} ${tag ? ` && '${tag}' in tags` : ''}] | order(date desc)${limit ? `[${limit * (page - 1)}...${limit * page}]` : ''} {
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
    caption,
    "body": body[] {
      _type,
      _key,
      style,
      children,
      code,
      language,
      "image": {
        "url": asset->url,
        alt
      },
      markDefs,
      listItem,
      level,
    },
    video_type,
    video_id,
    thumbnail_url,
    answer,
    asking_name,
    asking_url,
    question,
  }`;
}

function getHtml (body) {
  return toHTML(body, {
    components: {
      block: {
        h3: ({ children }) => `<h3>${children}</h3>`,
        normal: ({ children }) => children ? `<p>${decode(children)}</p>` : ''
      },
      listItem: {
        bullet: ({ children }) => `<li>${decode(children)}</li>`,
        number: ({ children }) => `<li>${decode(children)}</li>`
      },
      marks: {
        internalLink: ({ children, value }) => `<a href="${value.href}"${value.blank ? ' target="_blank" rel="noreferrer noopener"' : ''}>${children}</a>`,
        link: ({ children, value }) => `<a href="${value.href}"${value.blank ? ' target="_blank" rel="noreferrer noopener"' : ''}>${children}</a>`
      },
      types: {
        code: ({ value }) => `<pre><code class="${value.language || 'javascript'}">${Prism.highlight(value.code, Prism.languages[value.language || 'javascript'], value.language || 'javascript')}</code></pre>`,
        image: ({ value }) => `<img${value.image.alt ? ` alt="${value.image.alt}"` : ''} src="${value.image.url}" />`,
      }
    }
  });
}

function getPreview (html) {
  const blocks = html.split('<!-- more -->');
  return blocks.length > 1 ? blocks[0] : null;
}

async function getPagination (limit, page) {
  const totalPosts = await client.fetch(`count(*[_type == 'post'])`);
  const lastPage = Math.ceil(totalPosts / limit);

  return {
    nextPage: page < lastPage ? page + 1 : null,
    prevPage: page === 1 ? null : page - 1
  };
}

async function getPosts (limit, page, id, tag) {
  return (await client.fetch(getQuery(limit, page, id, tag))).map((post) => {
    const html = getHtml(post.body);

    return {
      ...post,
      html,
      preview: id ? null : getPreview(html),
      pathname: `${post.pathname}${post.slug ? `/${post.slug}` : ''}`
    };
  });
}

export async function find (limit = 10, page = 1, id, tag) {
  return {
    posts: await getPosts(limit, page, id, tag),
    pagination: await getPagination(limit, page)
  };
}
