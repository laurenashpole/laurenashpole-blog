import PropTypes from 'prop-types';
import Link from 'next/link';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import htmlbars from 'react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars';
import stackoverflowLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/stackoverflow-light';
import styles from './TextBlock.styles.js';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('htmlbars', htmlbars);

const TextBlock = ({ post }) => {
  return (
    <div className="text">
      <h2>{post.title}</h2>

      {post.body.map((block, i) => {
        return (
          <div key={i}>
            {block.startsWith('<pre><code') ? (
              <SyntaxHighlighter language="javascript|htmlbars" style={stackoverflowLight}>
                {block.replace('<pre><code>', '').replace('<pre><code class="js">', '').replace('</code></pre>', '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')}
              </SyntaxHighlighter>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: block }} />
            )}
          </div>
        );
      })}

      {post.read_more &&
        <p className="text__more">
          <Link href={post.pathname}>
            <a data-ga-category="blog post" data-ga-click="true">Continue Reading</a>
          </Link>
        </p>
      }

      <style jsx global>
        {styles}
      </style>
    </div>
  );
};

TextBlock.propTypes = {
  post: PropTypes.object
};

export default TextBlock;
