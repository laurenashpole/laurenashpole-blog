import tumblr from 'tumblr.js';

export async function findNotes (params = {}) {
  const client = tumblr.createClient(getAuth());
  const response = await connect(client, params);
  return response;
}

function connect (client, params) {
  return new Promise ((resolve) => {
    client.getRequest('/v2/blog/laurenashpole.tumblr.com/notes', params, (err, response) => {
      if (err) return console.log(err);
      resolve(response);
    });
  });
}

function getAuth () {
  return {
    consumer_key: process.env.TUMBLR_CONSUMER_KEY,
    consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
    token: process.env.TUMBLR_TOKEN,
    token_secret: process.env.TUMBLR_TOKEN_SECRET
  };
}
