import PropTypes from 'prop-types';
import { find } from '../../../../utils/posts';
import Layout from '../../../../components/layout/Layout';
import Posts from '../../../../components/posts/Posts';

const Index = ({ posts, totalPosts, pagination, page, tag }) => {
  return (
    <Layout>
      <Posts posts={posts} totalPosts={totalPosts} heading={`Posts tagged ${tag} <br />– page ${page}`} pagination={pagination} paginationPath={`/tagged/${(tag || '').replace(/ /g, '+')}`} />
    </Layout>
  );
};

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps ({ params }) {
  const tag = params.tag.replace(/\+/g, ' ');
  const response = await find({ limit: 10, offset: 10 * (params.page - 1), tag: tag }, true);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(response.posts)),
      totalPosts: response.total_posts,
      pagination: JSON.parse(JSON.stringify(response._links)),
      tag: tag,
      page: params.page
    }
  };
}

Index.propTypes = {
  posts: PropTypes.array,
  totalPosts: PropTypes.number,
  pagination: PropTypes.object,
  tag: PropTypes.string,
  page: PropTypes.number
};

export default Index;
