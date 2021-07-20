import data from '../posts.json';

export function findAll (tags) {
  return {
    posts: data.posts.map((post) => {
      return { ...post, pathname: new URL(post.post_url).pathname };
    }),
    totalPosts: data.total_posts,
    tags: tags ? getTags(data.posts, tags.char) : []
  };
}

export function find (limit = 10, page = 1, canBreak) {
  return parseData(data.posts, limit, page, canBreak);
}

export function findByTag (tag, limit = 10, page = 1, canBreak) {
  const posts = data.posts.filter((post) => post.tags.indexOf(tag) !== -1);
  return parseData(posts, limit, page, canBreak);
}

export function findById (id) {
  const posts = data.posts.filter((post) => post.id_string === id);
  return { post: parseData(posts).posts[0] };
}

function parseData (posts = [], limit = 10, page = 1, canBreak) {
  return {
    posts: posts.slice((page - 1) * limit, page * limit).map((post) => {
      post.pathname = new URL(post.post_url).pathname;
      return post.type === 'text' ? parseText(post, canBreak) : post;
    }),
    pagination: getPagination(limit, page, data.total_posts)
  };
}

function parseText (post, canBreak) {
  if (canBreak) {
    post = parseMore(post);
  }

  return {...post, body: parseBlocks([post.body], '<pre><code', '</code></pre>')};
}

function parseMore (post) {
  const blocks = post.body.split('<p><!-- more --></p>');
  return {...post, body: blocks[0], read_more: blocks.length > 1};
}

function parseBlocks (blocks, startString, endString) {
  let updatedBlocks = [];

  blocks.forEach((block) => {
    let startIdx = block.indexOf(startString);

    while (startIdx !== -1) {
      const endIdx = block.indexOf(endString) + endString.length;
      updatedBlocks = [...updatedBlocks, block.slice(0, startIdx), block.slice(startIdx, endIdx)];
      block = block.slice(endIdx);
      startIdx = block.indexOf(startString);
    }

    updatedBlocks = [...updatedBlocks, block];
  });

  return updatedBlocks;
}

function getPagination (limit, page, totalPosts) {
  const lastPage = Math.ceil(totalPosts / limit);

  return {
    nextPage: page < lastPage ? page + 1 : null,
    prevPage: page === 1 ? null : page - 1
  };
}

function getTags (posts, char) {
  return posts.reduce((obj, post) => {
    post.tags.forEach((tag) => {
      const slug = tag.replace(/ /g, char);

      if (!obj[slug]) {
        return obj[slug] = 1;
      }

      obj[slug] = obj[slug] + 1;
    });

    return obj;
  }, {});
}
