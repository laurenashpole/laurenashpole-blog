import { findAll } from '../utils/posts';

const Sitemap = () => {};

export async function getServerSideProps ({ res }) {
  const posts = await findAll().posts.map((post) => {
    return {
      loc: `${process.env.NEXT_PUBLIC_BASE_URL}${post.pathname}`,
      lastmod: new Date(post.date).toISOString().substring(0, 10)
    };
  });

  const getUrls = (posts) => {
    return posts.map((post) => {
      return `
        <url>
          <loc>${post.loc}</loc>
          <lastmod>${post.lastmod}</lastmod>
        </url>
      `;
    }).join('');
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <url>
        <loc>${process.env.NEXT_PUBLIC_BASE_URL}</loc>
        <changefreq>weekly</changefreq>
        <lastmod>${new Date().toISOString().substring(0, 10)}</lastmod>
      </url>

      ${getUrls(posts)}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
}

export default Sitemap;