import PropTypes from 'prop-types';
import { find } from '../utils/posts';
import Layout from '../components/layout/Layout';
import Posts from '../components/posts/Posts';

const Index = ({ posts, pagination }) => {
  return (
    <Layout>
      <Posts posts={posts} pagination={pagination} />
    </Layout>
  );
};

export async function getStaticProps () {
  const response = find(10, 1, true);

  return {
    props: response
  };
}

Index.propTypes = {
  posts: PropTypes.array,
  pagination: PropTypes.object
};

export default Index;
