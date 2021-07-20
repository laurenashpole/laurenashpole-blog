import PropTypes from 'prop-types';
import Post from '../post/Post';
import Pagination from './Pagination';
import styles from './Posts.styles.js';

const Posts = ({ posts, totalPosts, pagination, paginationPath, heading }) => {
  return (
    <>
      <div>
        {heading && <h1 className="posts__heading" dangerouslySetInnerHTML={{ __html: heading}} />}
        {posts.map((post) => <Post key={post.id} post={post} />)}
      </div>

      {pagination &&
        <Pagination totalPosts={totalPosts} pagination={pagination} paginationPath={paginationPath} />
      }

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
