import css from 'styled-jsx/css';

export default css.global`
  @import 'svgs.scss';
  @import 'variables.scss';

  .affiliate {
    margin-bottom: 4rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .affiliate--permalink {
    padding-top: 5rem;
  }

  .affiliate--desktop {
    display: none;
  }

  .affiliate__banner--mobile {
    max-width: 300px;
    min-height: 250px;
  }

  .affiliate__text {
    padding-top: 1rem;
    color: $color-gray-darkest;
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.075em;
  }

  @media (min-width: $break-tablet) {
    .affiliate {
      margin-left: 25%;
      margin-bottom: 8rem;
      padding-top: 2rem;
    }

    .affiliate--permalink {
      margin-left: 0;
      padding-top: 8rem;
    }
  }

  @media (min-width: $break-desktop) {
    .affiliate--mobile {
      display: none;
    }

    .affiliate--desktop {
      display: flex;
    }

    .affiliate__banner--desktop {
      max-width: 728px;
      min-height: 90px;
    }
  }
`;