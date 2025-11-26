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
    position: relative;
    flex-grow: 1.5;
  }

  @media (min-width: $break-container) {
    .layout {
      background-image: 
        linear-gradient(90deg, $color-gray-light, $color-gray-light 1px, transparent 1px, transparent),
        linear-gradient(90deg, transparent, transparent calc(100% - 1px), $color-gray-light calc(100% - 1px), $color-gray-light);
      background-size: $width-desktop-wide;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;

// import css from 'styled-jsx/css';

// export default css.global`
//   @import 'svgs.scss';
//   @import 'variables.scss';

//   .layout {
//     min-height: 100%;
//     display: flex;
//     flex-direction: column;
//   }

//   .layout__main {
//     width: 100%;
//     padding: 4rem 1.5rem 6rem 1.5rem;
//     position: relative;
//     flex-grow: 1.5;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     overflow: hidden;

//     &:after {
//       content: '';
//       background-image:
//         url(abstract-lines($color-pink-encoded)),
//         url(abstract-squiggle($color-green-encoded)),
//         url(abstract-dots($color-orange-encoded)),
//         url(node-circle()),
//         url(node-square());
//       background-position:
//         -1.5rem 5rem,
//         calc(100% + 3rem) calc(100% - 7.5rem),
//         center calc(100% - 12.5rem);
//       background-size: 40rem, 45rem, 12.5rem, 0, 0;
//       background-repeat: no-repeat;
//       width: 100%;
//       height: 100%;
//       min-height: 640px;
//       position: fixed;
//       top: 0;
//       left: 50%;
//       z-index: -2;
//       transform: translateX(-50%);
//     }
//   }

//   @media (min-width: 640px) {
//     .layout__main:after {
//       background-size: 50rem, 56rem, 15.5rem, 0, 0;
//     }
//   }

//   @media (min-width: $break-tablet) {
//     .layout__main {
//       max-width: $width-desktop;
//       margin: 0 auto;
//       padding: 8rem 3rem 10rem 3rem;
//       overflow: unset;

//       &:after {
//         min-height: $break-tablet;
//         background-size: 50rem, 56rem, 15.5rem, 0, 12.5rem;
//         background-position:
//           4.5rem 5rem,
//           calc(100% + 3rem) calc(100% - 10rem),
//           70% calc(100% - 17.5rem),
//           0,
//           -1.5rem 41.5rem;
//       }
//     }
//   }

//   @media (min-width: $break-desktop) {
//     .layout__main {
//       padding: 12rem 3rem 14rem 3rem;

//       &:after {
//         max-width: $width-desktop-wide;
//         background-size: 55rem, 62rem, 17rem, 25rem, 12.5rem;
//         background-position:
//           4.5rem 5rem,
//           calc(100% - 1rem) calc(100% - 10rem),
//           70% calc(100% - 17.5rem),
//           calc(100% - 1rem) 6rem,
//           -1.5rem 41.5rem;
//       }
//     }
//   }
// `;