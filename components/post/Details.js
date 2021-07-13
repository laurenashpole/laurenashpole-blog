import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './Details.styles.js';

const Details = ({ post }) => {  
  return (
    <div className="details">
      <ul className="details__list">
        <li className="details__item details__item--em details__item--type">
          <Link href={`/post/${post.id_string}${post.slug ? '/' + post.slug : ''}`}>
            <a data-ga-category="blog details" data-ga-click="true">{post.type}</a>
          </Link>
        </li>

        {(post.tags || []).map((tag, i) => {
          return (
            <li key={i} className="details__item">
              <Link href={`/tagged/${tag.replace(/ /g, '-')}`}>
                <a data-ga-category="blog details" data-ga-click="true">{tag}</a>
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="details__list">
        {post.note_count > 0 &&
          <li className="details__item details__item--em">
            <Link href={`/post/${post.id_string}${post.slug ? '/' + post.slug : ''}`}>
              <a data-ga-category="blog details" data-ga-click="true">{post.note_count} Note{post.note_count !== 1 ? 's' : ''}</a>
            </Link>
          </li>
        }

        <li className="details__item">
          <Link href={`${post.post_url}#disqus_thread`}>
            <a className="dsq-comment-count disqus-comment-count" data-disqus-url={post.post_url} data-ga-category="blog details" data-ga-click="true">Comments</a>
          </Link>
        </li>
      </ul>

      <style jsx global>
        {styles}
      </style>
    </div>
  );
};

Details.propTypes = {
  post: PropTypes.object
};

export default Details;
