import css from 'styled-jsx/css';

export default css.global`
  @import 'variables.scss';

  .well__section:first-child .comments__heading {
    text-align: left;
    text-transform: uppercase;
  }

  @media (min-width: $break-tablet) {
    .well__section:first-child .comments__heading {
      margin: -1rem 0;
    }
  }
`;