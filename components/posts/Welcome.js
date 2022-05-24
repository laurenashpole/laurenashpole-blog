import Tags from '../../shared/components/Tags';
import { FEATURED_TAGS } from '../../constants/featuredTags';
import styles from './Welcome.styles.js';

const Welcome = () => {
  return (
    <div className="welcome">
      <h1 className="welcome__heading">Welcome to the blog!</h1>
      <p className="welcome__text">Not sure where to start? Here are some of my most active tags:</p>
      <Tags path={`${process.env.NEXT_PUBLIC_BASE_URL}/tagged`} source="blog header" tags={FEATURED_TAGS} />

      <style jsx global>
        {styles}
      </style>
    </div>
  );
};

export default Welcome;
