import PropTypes from 'prop-types';
import styles from './MediaBlock.styles.js';

const MediaBlock = ({ post }) => {
  return (
    <div className="media">
      {post.photos.map((photo, i) => {
        return (
          <div key={i} className="media__content">
            <img alt="" src={photo.original_size.url} />
            <div dangerouslySetInnerHTML={{ __html: photo.caption }} />
          </div>
        );
      })}

      <div dangerouslySetInnerHTML={{ __html: post.caption }} />

      <style jsx global>
        {styles}
      </style>
    </div>
  );
};

MediaBlock.propTypes = {
  post: PropTypes.object
};

export default MediaBlock;
