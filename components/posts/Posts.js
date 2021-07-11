import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { InView } from 'react-intersection-observer';
import Post from '../post/Post';
import Pagination from './Pagination';
import styles from './Posts.styles.js';

const Posts = ({ posts, totalPosts, pagination, paginationPath, heading }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//laurenashpole.disqus.com/count.js';
    document.body.appendChild(script);
  }, [])

  return (
    <>
      <div>
        {heading && <h1 className="posts__heading" dangerouslySetInnerHTML={{ __html: heading}} />}
        {posts.map((post) => <Post key={post.id} post={post} />)}
      </div>

      <Pagination totalPosts={totalPosts} pagination={pagination} paginationPath={paginationPath} />

      <style jsx global>
        {styles}
      </style>
    </>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
  totalPosts: PropTypes.number,
  pagination: PropTypes.object,
  paginationPath: PropTypes.string
};

export default Posts;
