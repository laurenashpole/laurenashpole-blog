import PropTypes from 'prop-types';
import { findAll, findByTag } from '../../../../utils/posts';
import Layout from '../../../../components/layout/Layout';
import Posts from '../../../../components/posts/Posts';

const Index = ({ posts, pagination, page, tag }) => {
  return (
    <Layout title={`Posts tagged ${tag} – page ${page}` }>
      <Posts posts={posts} heading={`Posts tagged ${tag} <br />– page ${page}`} pagination={pagination} paginationPath={`/tagged/${(tag || '').replace(/ /g, '+')}`} />
    </Layout>
  );
};

export async function getStaticPaths () {
  const response = findAll({ char: '+' });

  const paths = Object.keys(response.tags).reduce((arr, tag) => {
    const pages = [...Array(Math.ceil(response.tags[tag] / 10)).keys()];

    return [
      ...arr,
      ...(pages.map((i) => {
        return { params: { tag, page: (i + 1).toString() }};
      }))
    ];
  }, []);

  return {
    paths: paths,
    fallback: false
  };
}

export async function getStaticProps ({ params }) {
  const tag = params.tag.replace(/\+/g, ' ');
  const response = findByTag(tag, 10, parseInt(params.page), true);

  return {
    props: { ...response, tag, page: params.page }
  };
}

Index.propTypes = {
  posts: PropTypes.array,
  pagination: PropTypes.object,
  tag: PropTypes.string,
  page: PropTypes.string
};

export default Index;
