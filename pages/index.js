import PropTypes from 'prop-types';
import { find } from '../utils/tumblr';
import Layout from '../components/layout/Layout';
import Welcome from '../components/posts/Welcome';
import Posts from '../components/posts/Posts';

const Index = ({ posts, pagination }) => {
  return (
    <Layout>
      <Welcome />
      <Posts posts={posts} pagination={pagination} />
    </Layout>
  );
};

export async function getStaticProps () {
  const response = await find();

  return {
    props: response,
    revalidate: 3600
  };
}

Index.propTypes = {
  posts: PropTypes.array,
  pagination: PropTypes.object
};

export default Index;
