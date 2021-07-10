import css from 'styled-jsx/css';

export default css.global`
  @import 'variables.scss';

  .media__content {
    width: calc(100% + 4rem);
    margin: -2rem -2rem 2.5rem -2rem;
  }

  @media (min-width: $break-tablet) {
    .media__content {
      width: auto;
      margin: 0 auto;
    }
  }
`;
