import PropTypes from 'prop-types';
import styles from './LinkBlock.styles.js';

const LinkBlock = ({ post }) => {
  return (
    <div className="link">
      <h2><a className="link__link" href={post.url}>{post.title}</a></h2>
      {post.excerpt && <blockquote>{post.excerpt}...</blockquote>}
      <div dangerouslySetInnerHTML={{ __html: post.description }} />

      <style jsx global>
        {styles}
      </style>
    </div>
  );
};

LinkBlock.propTypes = {
  post: PropTypes.object
};

export default LinkBlock;
