import PropTypes from 'prop-types';
import { find, findAll, getTags } from '../../utils/posts';
import Layout from '../../components/layout/Layout';
import Posts from '../../components/posts/Posts';

const Index = ({ posts, totalPosts, pagination, tag }) => {
  return (
    <Layout>
      <Posts posts={posts} totalPosts={totalPosts} pagination={pagination} paginationPath={`/tagged/${(tag || '').replace(/ /g, '+')}`} heading={`Posts tagged ${tag}`} />
    </Layout>
  )
};

export async function getStaticPaths () {
  const response = await findAll();
  const tags = getTags(response.posts, '-');

  return {
    paths: Object.keys(tags).map((tag) => {
      return { params: { tag: tag }};
    }),
    fallback: false
  };
}

export async function getStaticProps ({ params }) {
  const tag = params.tag.replace(/-/g, ' ');
  const response = await find({ limit: 10, tag: tag }, true);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(response.posts)),
      totalPosts: response.total_posts,
      pagination: JSON.parse(JSON.stringify(response._links)),
      tag: tag
    }
  };
}

Index.propTypes = {
  posts: PropTypes.array,
  totalPosts: PropTypes.number,
  pagination: PropTypes.object,
  tag: PropTypes.string
};

export default Index;
