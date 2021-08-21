import css from 'styled-jsx/css';

export default css.global`
  @import 'variables.scss';

  .welcome {
    margin-bottom: 3rem;
    text-align: center;

    .tags {
      max-width: 50rem;
      margin: 0 auto;

      li:last-child {
        display: none;
      }
    }
  }

  .welcome__heading {
    padding: 0 2rem;
  }

  p.welcome__text {
    max-width: 36rem;
    margin: 0 auto 2rem auto;
    font-size: 2.15rem;
  }

  @media (min-width: $break-tablet) {
    .welcome {
      margin: 0 0 5rem 25%;
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

    .welcome__heading {
      padding: 0 0 2rem 0;
    }

    p.welcome__text {
      margin: 0 0 3.5rem 0;
      font-size: 2.25rem;
    }
  }
`;