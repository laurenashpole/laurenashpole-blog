import PropTypes from 'prop-types';
import Head from 'next/head';

const Meta = ({ post }) => {
  const getFormattedDate = (date) => {
    return new Date(date.replace(/-/g, '/')).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getStructuredData = (post) => {
    return `
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${process.env.NEXT_PUBLIC_BASE_URL}${post.pathname}"
        },
        "headline": "${post.summary}",
        "datePublished": "${getFormattedDate(post.date)}",
        "dateModified": "${getFormattedDate(post.date)}",
        "author": {
          "@type": "Person",
          "name": "Lauren Ashpole"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Lauren Ashpole"
        }
      }
    `;
  };

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: getStructuredData(post) }} />

      <meta property="og:title" content={post.headline || post.summary} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/og-image?headline=${post.headline || post.summary}&type=${post.type}`} />
      <meta property="article:published_time" content={`${getFormattedDate(post.date)}`} />
      <meta property="article:author" content="Lauren Ashpole" />
    </Head>
  );
};

Meta.propTypes = {
  post: PropTypes.object
};

export default Meta;