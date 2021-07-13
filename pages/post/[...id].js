import PropTypes from 'prop-types';
import { find, findAll, findNotes } from '../../utils/posts';
import Layout from '../../components/layout/Layout';
import Post from '../../components/post/Post';

const Show = ({ post, notes }) => {
  return (
    <Layout title={post.headline || post.summary || ''}>
      <Post post={post} isPermalink={true} notes={notes} />
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
  const response = await find({ id: params.id[0] });
  const notes = await findNotes({ id: params.id[0], mode: 'all' });

  return {
    props: {
      post: JSON.parse(JSON.stringify(response.posts[0])),
      notes: JSON.parse(JSON.stringify(notes))
    }
  };
}

Show.propTypes = {
  post: PropTypes.object,
  notes: PropTypes.object
};

export default Show;