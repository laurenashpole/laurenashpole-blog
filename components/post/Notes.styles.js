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
`;