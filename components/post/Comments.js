import PropTypes from 'prop-types';
import { InView } from 'react-intersection-observer';
import Well from '../../shared/components/Well';
import styles from './Comments.styles.js';

const Comments = () => {
  const handleInView = (inView) => {
    if (inView) {
      const script = document.createElement('script');
      script.src = '//laurenashpole.disqus.com/embed.js';
      script.async = true
      document.body.appendChild(script);
    }
  };

  return (
    <Well size="custom">
      <InView threshold={1} triggerOnce={true} onChange={handleInView}>
        <h3 className="comments__heading">Comments</h3>
      </InView>

      <>
        <div id="disqus_thread" />

        <noscript>
          Please enable JavaScript to view the <a href='//disqus.com/?ref_noscript'>comments powered by Disqus.</a>
        </noscript>

        <style jsx global>
          {styles}
        </style>
      </>
    </Well>
  );
};

export default Comments;