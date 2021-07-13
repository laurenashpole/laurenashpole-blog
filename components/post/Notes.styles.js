import css from 'styled-jsx/css';

export default css.global`
  @import 'variables.scss';

  .well__section:first-child .notes__heading {
    text-align: left;
    text-transform: uppercase;
  }

  .notes__item + .notes__item {
    margin-top: 1rem;
    border-top: 1px solid $color-gray-light;
    padding-top: 1rem;
  }

  .notes__footer {
    text-align: left;
    font-size: 1.75rem;

    button {
      width: auto;
      color: $color-red;
      text-transform: uppercase;
      letter-spacing: 0.075em;
    }
  }

  @media (min-width: $break-tablet) {
    .well__section:first-child .notes__heading {
      margin: -1rem 0;
    }

    .notes__footer {
      margin: -1rem 0;
    }
  }
`;