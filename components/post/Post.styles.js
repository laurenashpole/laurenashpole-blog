import css from 'styled-jsx/css';

export default css.global`
  @import 'variables.scss';

  .post {
    border-top: 1px solid $color-gray-light;
    border-bottom: 1px solid $color-gray-light;
  }

  .post__body {
    padding-bottom: 1rem;

    img {
      margin: 0 auto;
    }

    img:not(:last-child) {
      margin-bottom: 3rem;
    }

    img + img {
      margin-top: -2rem;
    }

    p + img {
      margin-top: 3rem;
    }

    ol,
    ul {
      list-style: disc;
      padding-left: 2rem;
    }

    ol {
      list-style: number;

      li {
        padding-left: 0.75rem;
      }
    }

    li > ul {
      margin-top: 1.25rem;
    }

    ol:not(:last-child),
    ul:not(:last-child) {
      margin-bottom: 2.5rem;
    }

    li:not(:last-child) {
      margin-bottom: 1.25rem;
    }
  }

  .post__footer {
    font-size: 1.75rem;
    text-transform: uppercase;
    letter-spacing: 0.075em;

    a {
      color: $color-red;
    }
  }

  @media (min-width: $break-tablet) {
    .post {
      &:not(:last-child) {
        margin-bottom: 8rem;
      }
    }

    .post__container {
      display: flex;
    }

    .post__details {
      // width: 25%;
      min-width: calc(8.5rem * 5);
      border-right: 1px solid $color-gray-light;
      padding: 5rem 4rem 0 0;
      flex-shrink: 0;
    }

    .post__content {
      // width: 75%;
    }

    .post__body {
      img:not(:last-child) {
        margin-bottom: 4rem;
      }

      img + img {
        margin-top: -3rem;
      }

      p + img {
        margin-top: 4rem;
      }

      ol,
      ul {
        padding-left: 2.5rem;
      }

      ol:not(:last-child),
      ul:not(:last-child) {
        margin-bottom: 3rem;
      }

      li {
        padding-left: 1rem;
      }
    }

    .post__footer {
      margin: -1rem 0;
    }
  }

  @media (min-width: $break-desktop) {
    .post .well:first-child {
      &:not(:last-child) {
        margin-bottom: 8rem;
      }

      .well__section {
        padding-left: 6rem;
        padding-right: 6rem;

        &:not(:nth-child(2)) {
          padding: 6rem;
        }
      }
    }

    .post__details {
      // background: $color-gray-lightest;
      // background:
      //   repeating-linear-gradient(
      //     $color-white 0,
      //     $color-white 6px,
      //     transparent 6px,
      //     transparent 10px,
      //   ),
      //   repeating-linear-gradient(
      //     90deg,
      //     transparent 0,
      //     transparent calc(4.25rem - 1px),
      //     $color-gray-light calc(4.25rem - 1px),
      //     $color-gray-light 4.25rem,
      //   );

      background-image: 
        linear-gradient($color-gray-light 1px, transparent 1px),
        linear-gradient(90deg, $color-gray-light 1px, transparent 1px);
      background-size: 4.25rem 4.25rem;
      margin: -1px;

      // margin: -1px;
      // margin: 0 -1px 0 0;
      padding: 7.5rem 6rem 0 0;
    }

    .post__body {
      padding: 8.5rem;

      img:not(:last-child) {
        margin-bottom: 6rem;
      }

      img + img {
        margin-top: -5rem;
      }

      p + img {
        margin-top: 6rem;
      }

      h2:not(:last-child) {
        margin-bottom: 6rem;
      }

      ol:not(:last-child),
      ul:not(:last-child) {
        margin-bottom: 4rem;
      }

      li {
        padding-left: 2rem;
      }
    }
  }

  @media (min-width: $break-desktop-large) {
    .post__details {
      padding-right: 8rem;
    }
  }
`;
