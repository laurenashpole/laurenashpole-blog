import Tags from '../../shared/components/Tags';
import styles from './Welcome.styles.js';

const Welcome = () => {
  return (
    <div className="welcome">
      <h1 className="welcome__heading">Welcome to the blog!</h1>
      <p className="welcome__text">Not sure where to start? Here are some of my most active tags:</p>
      <Tags path="tagged" source="blog header" tags={[{ name: 'my fonts', slug: 'my-fonts' }, { name: 'font recs', slug: 'font-recs' }, { name: 'open source', slug: 'open-source' }, { name: 'themes', slug: 'themes' }, { name: 'code', slug: 'code' }, { name: 'design', slug: 'design' }, { name: 'what i listen to at work', slug: 'what-i-listen-to-at-work' }]} />

      <style jsx global>
        {styles}
      </style>
    </div>
  );
};

export default Welcome;
