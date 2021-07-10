import PropTypes from 'prop-types';
import { find } from '../utils/posts';
import Layout from '../components/layout/Layout';
import Posts from '../components/posts/Posts';

const Index = ({ posts, totalPosts, pagination }) => {
  return (
    <Layout>
      <Posts posts={posts} totalPosts={totalPosts} pagination={pagination} />
    </Layout>
  );
};

export async function getStaticProps () {
  const response = await find({ limit: 10 }, true);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(response.posts)),
      totalPosts: response.total_posts,
      pagination: JSON.parse(JSON.stringify(response._links))
    }
  };
}

Index.propTypes = {
  posts: PropTypes.array,
  totalPosts: PropTypes.number,
  pagination: PropTypes.object
};

export default Index;
