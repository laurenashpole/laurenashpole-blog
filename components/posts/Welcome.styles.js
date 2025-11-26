import css from 'styled-jsx/css';

export default css.global`
  @import 'variables.scss';

  .welcome {
    // border-bottom: 1px solid $color-gray-light;
    // margin-bottom: 3rem;
    text-align: center;

    .tags {
      max-width: 50rem;
      margin: 0 auto;

      li:last-child {
        display: none;
      }
    }
  }

  .welcome__container {
    padding: 5.25rem 3.5rem;
  }

  .welcome__heading {
    padding: 0 2rem;
  }

  p.welcome__text {
    max-width: 64rem;
    margin: 0 auto 3rem auto;
    font-size: 2.15rem;
  }

  @media (min-width: $break-tablet) {
    .welcome {
      text-align: left;

      .tags {
        max-width: 75rem;
        margin-left: -1rem;
        justify-content: flex-start;

        li:last-child {
          display: block;
        }
      }
    }

    .welcome__container {
      margin: 0 0 5rem 25%;
      padding: 8.5rem;
    }

    .welcome__heading {
      padding: 0 0 2rem 0;
    }

    p.welcome__text {
      margin: 0 0 5rem 0;
      font-size: 2.25rem;
    }
  }
`;