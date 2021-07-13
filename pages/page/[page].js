import PropTypes from 'prop-types';
import { find } from '../../utils/posts';
import Layout from '../../components/layout/Layout';
import Posts from '../../components/posts/Posts';

const Index = ({ posts, totalPosts, pagination, page }) => {
  return (
    <Layout title={`Page ${page}`}>
      <Posts posts={posts} totalPosts={totalPosts} heading={`Page ${page}`} pagination={pagination} />
    </Layout>
  );
};

export async function getStaticPaths () {
  const response = await find();

  return {
    paths: Array.from(Array(Math.ceil((response.total_posts / 10) + 1)).keys()).map((i) => {
      return { params: { page: i.toString() }};
    }),
    fallback: false
  };
}

export async function getStaticProps ({ params }) {
  const response = await find({ limit: 10, offset: 10 * (params.page - 1) }, true);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(response.posts)),
      totalPosts: response.total_posts,
      pagination: JSON.parse(JSON.stringify(response._links)),
      page: params.page
    }
  };
}

Index.propTypes = {
  posts: PropTypes.array,
  totalPosts: PropTypes.number,
  pagination: PropTypes.object,
  page: PropTypes.string
};

export default Index;
