import PropTypes from 'prop-types';

const AnswerBlock = ({ post }) => {
  return (
    <div>
      <h2>{post.question}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.answer }} />
    </div>
  );
};

AnswerBlock.propTypes = {
  post: PropTypes.object
};

export default AnswerBlock;
