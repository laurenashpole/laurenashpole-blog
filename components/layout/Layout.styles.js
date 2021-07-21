import css from 'styled-jsx/css';

export default css.global`
  @import 'svgs.scss';
  @import 'variables.scss';

  .layout {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .layout__main {
    width: 100%;
    padding: 4rem 1.5rem 6rem 1.5rem;
    position: relative;
    flex-grow: 1.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    &:after {
      content: '';
      background-image:
        url(abstract-lines($color-blue-encoded)),
        url(abstract-squiggle($color-green-encoded)),
        url(abstract-dots($color-orange-encoded)),
        url(node-circle()),
        url(node-square());
      background-position:
        -1.5rem 5rem,
        calc(100% + 3rem) calc(100% - 3rem),
        center calc(100% - 20rem);
      background-size: 40rem, 45rem, 12.5rem, 0, 0;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      min-height: $break-tablet;
      position: fixed;
      top: 0;
      left: 50%;
      z-index: -2;
      transform: translateX(-50%);
    }
  }

  @media (min-width: 640px) {
    .layout__main:after {
      background-size: 50rem, 55rem, 15rem, 0, 0;
    }
  }

  @media (min-width: $break-tablet) {
    .layout__main {
      max-width: $width-desktop;
      margin: 0 auto;
      padding: 8rem 3rem 10rem 3rem;
      overflow: unset;

      &:after {
        background-size: 50rem, 55rem, 15rem, 0, 12.5rem;
        background-position:
          4.5rem 5rem,
          calc(100% + 3rem) calc(100% - 3rem),
          70% calc(100% - 20rem),
          0,
          -1.5rem 41.5rem;
      }
    }
  }

  @media (min-width: $break-desktop) {
    .layout__main {
      padding: 12rem 3rem 14rem 3rem;

      &:after {
        max-width: $width-desktop-wide;
        background-size: 50rem, 55rem, 15rem, 25rem, 12.5rem;
        background-position:
          4.5rem 5rem,
          calc(100% - 1rem) calc(100% - 3rem),
          70% calc(100% - 20rem),
          calc(100% - 1rem) 6rem,
          1.5rem 41.5rem;
      }
    }
  }

  @media (min-width: $break-desktop-large) {
    .layout__main:after {
      background-size: 55rem, 62.5rem, 20rem, 25rem, 12.5rem;
      background-position:
        4.5rem 5rem,
        calc(100% - 1rem) calc(100% - 3rem),
        70% calc(100% - 20rem),
        calc(100% - 1rem) 6rem,
        1.5rem 45rem;
    }
  }
`;