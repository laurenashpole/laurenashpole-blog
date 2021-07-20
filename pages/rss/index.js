import { Feed } from 'feed';
import { find } from '../../utils/posts';

const Rss = () => {};

export async function getServerSideProps ({ res }) {
  const response = find(10);

  const feed = new Feed({
    title: 'Lauren Ashpole',
    description: 'The fastest way to find out about new fonts, themes, and anything else I’m working on.',
    link: process.env.NEXT_PUBLIC_BASE_URL
  });

  response.posts.forEach((post) => {
    feed.addItem({
      title: post.title || post.summary,
      description: `${post.type === 'photo' ? post.photos.map((photo) => `<img src=${photo.original_size.url} /><br /><br />`) : ''}${post.type === 'video' ? `<iframe width="700" height="383" src="https://www.youtube.com/embed/${post.video.youtube.video_id}" frameborder="0" /><br /><br />` : ''}${post.type === 'link' ? `<a href=${post.url}>${post.title}</a>:` : ''}${post.type === 'answer' ? `${post.question}:` : ''}${post.trail[0].content_raw}`,
      link: `${process.env.NEXT_PUBLIC_BASE_URL}${post.pathname}`,
      pubDate: new Date(post.date).toISOString().substring(0, 10),
      category: post.tags.map((tag) => { return { name: tag }; })
    });
  });

  res.setHeader('Content-Type', 'text/xml');
  res.write(feed.rss2());
  res.end();

  return {
    props: {}
  };
}

export default Rss;