import css from 'styled-jsx/css';

export default css.global`
  @import 'variables.scss';

  .media__content {
    width: calc(100% + 4rem);
    margin: -2rem -2rem 3rem -2rem;
  }

  .media__content--img > div + div {
    margin-top: -2rem;
  }

  .media__content--video {
    margin-bottom: 3rem;
    padding-bottom: 56.25%;
    position: relative;
  }

  .media__content--video iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (min-width: $break-tablet) {
    .media__content {
      width: auto;
      margin: 0 auto;
    }

    .media__content--img > div + div img {
      margin-top: -3rem;
    }

    .media__content--video {
      margin-bottom: 3.5rem;
    }
  }

  @media (min-width: $break-desktop) {
    .media__content--img > div + div img {
      margin-top: -5rem;
    }

    .media__content--video {
      margin-bottom: 4.5rem;
    }
  }
`;
