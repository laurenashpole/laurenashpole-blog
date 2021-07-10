import { TEST_DATA } from './testData';

export async function find (params = {}, canBreak) {
  const paramsString = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
  const response = await fetch(`https://api.tumblr.com/v2/blog/laurenashpole.tumblr.com/posts?api_key=${process.env.TUMBLR_API_KEY}&${paramsString}`);
  const responseJSON = await response.json();

  return {
    ...responseJSON.response,
    posts: responseJSON.response.posts.map((post) => {
      return post.type === 'text' ? parseText(post, canBreak) : post;
    })
  };
}

function parseText (post, canBreak) {
  if (canBreak) {
    post = parseMore(post);
  }

  return {...post, body: parseCode(post.body)};
}

function parseMore (post) {
  const blocks = post.body.split('<p><!-- more --></p>');
  return {...post, body: blocks[0], read_more: blocks.length > 1};
}

function parseCode (body) {
  let blocks = [];
  let startIdx = body.indexOf('<pre><code');

  while (startIdx !== -1) {
    const endIdx = body.indexOf('</code></pre>') + 13;
    blocks = [...blocks, body.slice(0, startIdx), body.slice(startIdx, endIdx)];
    body = body.slice(endIdx);
    startIdx = body.indexOf('<pre><code');
  }

  return [...blocks, body];  
}