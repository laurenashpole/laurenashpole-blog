import PropTypes from 'prop-types';
import { findAll, findById } from '../../utils/posts';
import Layout from '../../components/layout/Layout';
import Post from '../../components/post/Post';

const Show = ({ post }) => {
  return (
    <Layout title={post.headline || post.summary || ''}>
      <Post post={post} isPermalink={true} />
    </Layout>
  );
};

export async function getStaticPaths () {
  const response = findAll();

  return {
    paths: response.posts.map((post) => {
      const params = post.pathname.replace('/post/', '').split('/');
      return { params: { id: [ params[0] , params[1] || '' ] }};
    }),
    fallback: false
  };
}

export async function getStaticProps ({ params }) {
  const response = findById(params.id[0]);

  return {
    props: response
  };
}

Show.propTypes = {
  post: PropTypes.object
};

export default Show;