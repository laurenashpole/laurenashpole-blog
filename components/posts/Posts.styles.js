import css from 'styled-jsx/css';

export default css.global`
  @import 'variables.scss';
  @import 'svgs.scss';

  .posts__heading {
    padding: 0 2rem;
    text-align: center;

    &:after {
      content: '';
      background: url(abstract-line-hr($color-orange-encoded)) no-repeat;
      width: 4rem;
      height: 2rem;
      margin: 1rem auto 4rem auto;
      display: block;
    }
  }

  @media (min-width: $break-tablet) {
    .posts__heading {
      margin-left: 25%;
      padding: 0 8rem 0 0;
      text-align: left;

      &:after {
        width: 4.75rem;
        height: 2.25rem;
        margin: 1.5rem 0 6rem 0;
      }
    }
  }

  @media (min-width: $break-desktop) {
    .posts__heading {
      padding: 0 12rem 0 0;

      &:after {
        width: 5.5rem;
        height: 2.5rem;
        margin: 2rem 0 8rem 0;
      }
    }
  }
`;