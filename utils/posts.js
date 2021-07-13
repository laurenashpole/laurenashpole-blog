const TUMBLR_API = 'https://api.tumblr.com/v2/blog/laurenashpole.tumblr.com/';

export async function find (params = {}, canBreak) {
  const response = await fetchResponse(params);

  return {
    ...response,
    posts: response.posts.map((post) => {
      return post.type === 'text' ? parseText(post, canBreak) : post;
    })
  };
}

export async function findAll () {
  const maxLimit = 50;
  const response = await fetchResponse({ limit: maxLimit });
  const pages = Array.from(Array(Math.floor(response.total_posts / maxLimit)).keys());

  const posts = await pages.reduce(async (arr, i) => {
    const pageResponse = await fetchResponse({ limit: maxLimit, offset: maxLimit * (i + 1) });
    const promisedArr = await arr;
    return [...promisedArr, ...pageResponse.posts];
  }, []);

  return {...response, posts: [...response.posts, ...posts]};
}

export async function findNotes (params = {}) {
  const paramsString = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
  const response = await fetch(`${TUMBLR_API}/notes?api_key=${process.env.TUMBLR_API_KEY}&${paramsString}`);
  const responseJSON = await response.json();
  return responseJSON.response;
}

export function getTags (posts, char) {
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

async function fetchResponse (params = {}) {
  const paramsString = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
  const response = await fetch(`${TUMBLR_API}/posts?api_key=${process.env.TUMBLR_API_KEY}&${paramsString}`);
  const responseJSON = await response.json();
  return responseJSON.response;
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
