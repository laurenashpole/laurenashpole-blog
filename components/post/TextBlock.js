import PropTypes from 'prop-types';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';
import styles from './TextBlock.styles.js';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const components = {
  block: {
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => (
      <p dangerouslySetInnerHTML={{ __html: children.filter((child) => {
        return child !== '' && typeof child === 'string';
        // return child;
      })}} />
    )
  },
  listItem: {
    bullet: ({ children }) => (
      <>{children[1] ? <li>{children}</li> : <li dangerouslySetInnerHTML={{ __html: children }} />}</>
    )
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} target={value.blank ? '_blank' : null} rel={value.blank ? 'noreferrer noopener' : null}>
        {children}
      </a>
    )
  },
  types: {
    image: ({ value }) => <img alt={value.image.alt || null} src={value.image.url} />,
    code: ({ value }) => (
      <SyntaxHighlighter language="jsx" style={prism}>
        {value.code}
      </SyntaxHighlighter>
    ),
  }
}

const TextBlock = ({ post }) => {
  console.log(post);
  return (
    <div className="text">
      <h2>{post.title}</h2>

      <PortableText value={post.body} components={components} />

      {/*{post.body.map((block, i) => {
        if (block._type === 'block') {
          return <p key={block._key} dangerouslySetInnerHTML={{ __html: block.children[0].text }} />;
        }

        if (block._type === 'image' && block.image) {
          return <img key={block._key} alt={block.image.alt || null} src={block.image.url} />;
        }

        if (block._type === 'code') {
          return (
            <SyntaxHighlighter key={block._key} language="jsx" style={prism}>
              {block.code}
            </SyntaxHighlighter>
          );
        }
      })}*/}

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
