const tumblr = require('tumblr.js');
const fs = require('fs');
const path = require('path');

async function writePosts () {
  const response = await getPosts();
  fs.writeFileSync(path.join(__dirname, '../posts.json'), JSON.stringify(response));
}

async function getPosts () {
  const client = tumblr.createClient(getAuth());
  const response = await connect(client, 0);
  const totalPages = Math.floor(response.total_posts / 20);

  const posts = await Array.from(Array(totalPages).keys()).reduce(async (arr, i) => {
    const pageResponse = await connect(client, 20 * (i + 1));
    return [...(await arr), ...pageResponse.posts];
  }, []);

  return {...response, posts: [...response.posts, ...posts]};
}

function connect (client, offset) {
  return new Promise ((resolve) => {
    client.blogPosts('laurenashpole.tumblr.com', { limit: 20, offset }, (err, response) => {
      if (err) return console.log(err);
      resolve(response);
    });
  });
}

function getAuth () {
  return {
    consumer_key: (process.argv.filter((arg) => arg.startsWith('c_key'))[0] || '').split('=')[1],
    consumer_secret: (process.argv.filter((arg) => arg.startsWith('c_sec'))[0] || '').split('=')[1],
    token: (process.argv.filter((arg) => arg.startsWith('t'))[0] || '').split('=')[1],
    token_secret: (process.argv.filter((arg) => arg.startsWith('t_sec'))[0] || '').split('=')[1]
  };
}

writePosts();
