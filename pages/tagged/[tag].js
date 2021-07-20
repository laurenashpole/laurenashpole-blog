import PropTypes from 'prop-types';
import { findAll, findByTag } from '../../utils/posts';
import Layout from '../../components/layout/Layout';
import Posts from '../../components/posts/Posts';

const Index = ({ posts, pagination, tag }) => {
  return (
    <Layout title={`Posts tagged ${tag}`}>
      <Posts posts={posts} pagination={pagination} paginationPath={`/tagged/${(tag || '').replace(/ /g, '+')}`} heading={`Posts tagged ${tag}`} />
    </Layout>
  );
};

export async function getStaticPaths () {
  const response = findAll({ char: '-' });

  return {
    paths: Object.keys(response.tags).map((tag) => {
      return { params: { tag: tag }};
    }),
    fallback: false
  };
}

export async function getStaticProps ({ params }) {
  const tag = params.tag.replace(/-/g, ' ');
  const response = findByTag(tag, 10, 1, true);

  return {
    props: { ...response, tag }
  };
}

Index.propTypes = {
  posts: PropTypes.array,
  pagination: PropTypes.object,
  tag: PropTypes.string
};

export default Index;
