const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function writePosts () {
  const apiKey = (process.argv.filter((arg) => arg.startsWith('api_key'))[0] || '').split('=')[1];

  if (!apiKey) {
    return console.error('API key required.');
  }

  const response = await fetchPosts(apiKey);
  fs.writeFileSync(path.join(__dirname, '../posts.json'), JSON.stringify(response));
}

async function fetchPosts (apiKey) {
  const response = await request(apiKey);
  const totalPages = Math.floor(response.response.total_posts / 20);

  const posts = await Array.from(Array(totalPages).keys()).reduce(async (arr, i) => {
    const pageResponse = await request(apiKey, 20 * (i + 1));
    return [...(await arr), ...pageResponse.response.posts];
  }, []);

  return {...response.response, posts: [...response.response.posts, ...posts]};
}

async function request (apiKey, offset) {
  try {
    const response = await fetch(`https://api.tumblr.com/v2/blog/laurenashpole.tumblr.com/posts?api_key=${apiKey}&limit=20&reblog_info=true${offset ? `&offset=${offset}` : ''}`);

    if (response.ok) {
      return await response.json();
    }

    throw new Error(response.statusText);
  } catch (err) {
    console.error(err);
  }
}

writePosts();
