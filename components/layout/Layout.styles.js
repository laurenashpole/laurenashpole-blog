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
  }

  @media (min-width: $break-tablet) {
    .layout__main {
      max-width: $width-desktop;
      margin: 0 auto;
      padding: 8rem 3rem 10rem 3rem;
      overflow: unset;
    }
  }

  @media (min-width: $break-desktop) {
    .layout__main {
      padding: 12rem 3rem 14rem 3rem;
    }
  }
`;