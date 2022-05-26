import PropTypes from 'prop-types';
import { find } from '../../utils/tumblr';
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
  const response = await find(20);

  return {
    paths: response.posts.map((post) => {
      const params = post.pathname.replace('/post/', '').split('/');
      return { params: { id: [ params[0] , params[1] || '' ] }};
    }),
    fallback: 'blocking'
  };
}

export async function getStaticProps ({ params }) {
  const response = await find(1, 1, params.id[0]);

  if (!(response.posts || [])[0]) {
    return { notFound: true };
  }

  return {
    props: {
      post: response.posts[0]
    },
    revalidate: 3600
  };
}

Show.propTypes = {
  post: PropTypes.object
};

export default Show;