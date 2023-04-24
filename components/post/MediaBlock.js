import PropTypes from 'prop-types';
import styles from './MediaBlock.styles.js';

const MediaBlock = ({ post }) => {
  const comment = post.caption.startsWith('<!--') ? post.caption.split('--')[1] : '';

  return (
    <div className="media">
      {post.photos &&
        <div className="media__content">
          {post.photos.map((photo, i) => {
            return (
              <div key={i}>
                <img alt={comment} src={photo.alt_sizes[0] ? photo.alt_sizes[0].url : photo.original_size.url} />
                <div dangerouslySetInnerHTML={{ __html: photo.caption }} />
              </div>
            );
          })}
        </div>
      }

      {post.video && post.video.youtube &&
        <div className="media__content media__content--video">
          <iframe width="700" height="383" src={`https://www.youtube.com/embed/${post.video.youtube.video_id}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      }

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
