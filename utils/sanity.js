import { createClient } from 'next-sanity';
import { toHTML } from '@portabletext/to-html';
import { decode } from 'html-entities';
import Prism from 'prismjs';

const client = createClient({
  projectId: 'm9nd93xl',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false
});

function getQuery (limit = 10, page = 1, id, tag) {
  return `*[_type == 'post' && type == 'text' ${id ? ` && _id == '${id}'` : ''} ${tag ? ` && tag == '${tag}'` : ''}] | order(date desc) [${limit * (page - 1)}...${limit * page}] {
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
      level
    }
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
        bullet: ({ children }) => `<li>${decode(children)}</li>`
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

async function getPosts (limit = 10, page = 1, id, tag) {
  return (await client.fetch(getQuery(limit, page, id, tag))).map((post) => ({
    ...post,
    html: getHtml(post.body),
    pathname: `${post.pathname}${post.slug ? `/${post.slug}` : ''}`
  }));
}

export async function find (limit = 10, page = 1, id, tag) {
  return {
    posts: await getPosts(limit, page, id, tag)
  };
}
