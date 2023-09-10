import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import Well from '../../shared/components/Well';
import PublishDate from './PublishDate';
import Details from './Details';
import TextBlock from './TextBlock';
import MediaBlock from './MediaBlock';
import LinkBlock from './LinkBlock';
import AnswerBlock from './AnswerBlock';
import Notes from './Notes';
import Comments from './Comments';
import styles from './Post.styles.js';

const Post = ({ post, isPermalink }) => {
  const [isMounted, setIsMounted] = useState(false);

  const isTablet = useMediaQuery({
    query: '(min-width: 768px)'
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <article className="post">
      <div className="post__details">
        {isMounted && isTablet &&
          <>
            <PublishDate date={post.date} />
            <Details post={post} />
          </>
        }
      </div>

      <div className="post__content">
        <Well size="custom">
          {isMounted && !isTablet && <PublishDate date={post.date} />}

          <div className="post__body">
            {/*{post.type === 'text' && <TextBlock post={post} />}*/}
            {/*{post.type === 'photo' && <MediaBlock post={post} />}*/}
            {/*{post.type === 'photoset' && <MediaBlock post={post} />}*/}
            {/*{post.type === 'video' && <MediaBlock post={post} />}*/}
            {/*{post.type === 'audio' && <div />}*/}
            {post.type === 'link' && <LinkBlock post={post} />}
            {/*{post.type === 'answer' && <AnswerBlock post={post} />}*/}
          </div>

          {isMounted && !isTablet && <Details post={post} />}

          {!isPermalink &&
            <footer className="post__footer" aria-label="Post footer">
              <Link href={post.pathname}>
                <a data-ga-category="blog footer" data-ga-click="true">Permalink</a>
              </Link>
            </footer>
          }
        </Well>

        {isPermalink &&
          <>
            {/*{post.note_count > 0 && <Notes post={post} />}*/}
            <Comments />
          </>
        }
      </div>

      <style jsx global>
        {styles}
      </style>
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  isPermalink: PropTypes.bool
};

export default Post;
