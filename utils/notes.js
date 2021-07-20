import { request } from '../shared/utils/request';

export async function findNotes (params = {}) {
  const paramsString = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

  const response = await request({
    method: 'GET',
    endpoint: `https://api.tumblr.com/v2/blog/laurenashpole.tumblr.com/notes?api_key=${process.env.TUMBLR_API_KEY}&${paramsString}`
  });

  return response.response;
}
