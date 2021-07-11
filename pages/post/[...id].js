import PropTypes from 'prop-types';
import { find, findAll } from '../../utils/posts';
import Layout from '../../components/layout/Layout';
import Post from '../../components/post/Post';

const Show = ({ post }) => {
  return (
    <Layout>
      <Post post={post} isPermalink={true} />
    </Layout>
  );
};

export async function getStaticPaths () {
  const response = await findAll();

  return {
    paths: response.posts.map((post) => {
      return { params: { id: [post.id_string, post.slug] }};
    }),
    fallback: false
  };
}

export async function getStaticProps ({ params }) {
  const response = await find({ id: params.id[0], reblog_info: true, notes_info: true });

  return {
    props: {
      post: JSON.parse(JSON.stringify(response.posts[0]))
    }
  };
}

Show.propTypes = {
  post: PropTypes.object
};

export default Show;