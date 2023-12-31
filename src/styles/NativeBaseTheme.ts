import {extendTheme} from 'native-base';

export const NativeBaseTheme = extendTheme({
  fontConfig: {
    Figtree: {
      100: {
        normal: 'Figtree-Light',
        italic: 'Figtree-LightItalic',
      },
      200: {
        normal: 'Figtree-Light',
        italic: 'Figtree-LightItalic',
      },
      300: {
        normal: 'Figtree-Light',
        italic: 'Figtree-LightItalic',
      },
      400: {
        normal: 'Figtree-Regular',
        italic: 'Figtree-Italic',
      },
      500: {
        normal: 'Figtree-Medium',
      },
      600: {
        normal: 'Figtree-Medium',
        italic: 'Figtree-MediumItalic',
      },
      700: {
        normal: 'Figtree-Bold',
      },
      800: {
        normal: 'Figtree-Bold',
        italic: 'Figtree-BoldItalic',
      },
      900: {
        normal: 'Figtree-ExtraBold',
        italic: 'Figtree-ExtraBoldItalic',
      },
    },
  },
  fonts: {
    heading: 'Figtree',
    body: 'Figtree',
    mono: 'Figtree',
  },
  colors: {
    primary: {
      '50': '#ffa200',
      '100': '#ffa200',
      '200': '#ffa200',
      '300': '#ffa200',
      '400': '#ffa200', //actual color
      '500': '#ffa200',
      '600': '#ffa200',
      '700': '#ffa200',
      '800': '#ffa200',
      '900': '#ffa200',
    },

    secondary: {
      '300': '#141414',
      '400': '#000000',
      '600': '#000000',
      '800': '#525252',
    },
  },
});
