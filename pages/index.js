import PropTypes from 'prop-types';
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout/Layout';
import styles from '../styles/Home.module.css'
import { findAll } from '../utils/posts';

const Home = ({ posts }) => {
  console.log(posts);
  return (
    <Layout className={styles.container}>
      hi
    </Layout>
  )
};

export async function getStaticProps ({ }) {
  const posts = await findAll();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
}

Home.propTypes = {
  posts: PropTypes.array
};

export default Home;
