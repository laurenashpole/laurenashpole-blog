import PropTypes from 'prop-types';
import { findAll, find } from '../../utils/posts';
import Layout from '../../components/layout/Layout';
import Posts from '../../components/posts/Posts';

const Index = ({ posts, pagination, page }) => {
  return (
    <Layout title={`Page ${page}`}>
      <Posts posts={posts} heading={`Page ${page}`} pagination={pagination} />
    </Layout>
  );
};

export async function getStaticPaths () {
  const response = findAll();
  const pages = [...Array(Math.ceil(response.totalPosts / 10)).keys()];

  return {
    paths: pages.map((i) => {
      return { params: { page: (i + 1).toString() }};
    }),
    fallback: false
  };
}

export async function getStaticProps ({ params }) {
  const response = find(10, parseInt(params.page), true);

  return {
    props: { ...response, page: params.page }
  };
}

Index.propTypes = {
  posts: PropTypes.array,
  pagination: PropTypes.object,
  page: PropTypes.string
};

export default Index;
