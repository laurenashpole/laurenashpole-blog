import PropTypes from 'prop-types';
import styles from './Affiliate.styles.js';

const Affiliate = ({ affiliate }) => {
  if (!affiliate.banner && !affiliate.snippet) {
    return null;
  }

  return (
    <div className="affiliate">
      <div className="affiliate__mobile">
        {affiliate.banner &&
          <a href={affiliate.banner.url}>
            <img alt={affiliate.banner.alt || ''} src={affiliate.banner.mobile.url} />
          </a>
        }

        {affiliate.snippet &&
          <div dangerouslySetInnerHTML={{ __html: affiliate.snippet.mobile }} />
        }
      </div>

      <div className="affiliate__desktop">
        {affiliate.banner &&
          <a href={affiliate.banner.url}>
            <img alt={affiliate.banner.alt || ''} src={affiliate.banner.desktop.url} />
          </a>
        }

        {affiliate.snippet &&
          <div dangerouslySetInnerHTML={{ __html: affiliate.snippet.desktop }} />
        }
      </div>

      <div className="affiliate__text">Advertisement</div>

      <style jsx global>
        {styles}
      </style>
    </div>
  );
};

Affiliate.propTypes = {
  affiliate: PropTypes.object
};

export default Affiliate;
