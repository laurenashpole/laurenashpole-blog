import { TEST_DATA } from './testData';

export async function findAll (offset) {
  // const posts = await fetch(`https://api.tumblr.com/v2/blog/laurenashpole.tumblr.com/posts?api_key=m2fp7UUweh0dBitMXyiMvVRMZqdlsucodqPSO1KPyr2j3L4GNf&limit=10&offset=${offset || 0}`)
  // return await posts.json();
  return TEST_DATA;
}