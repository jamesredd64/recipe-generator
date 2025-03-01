import { extendTheme, defineStyleConfig } from '@chakra-ui/react';

const colors = {
  licorice: {
    DEFAULT: '#1A0A14',
    100: '#050204',
    200: '#0a0408',
    300: '#0f060c',
    400: '#150810',
    500: '#1a0a14',
    600: '#5e2548',
    700: '#a23f7c',
    800: '#ca76aa',
    900: '#e4bbd4'
  },
  black_bean: {
    DEFAULT: '#461713',
    100: '#0e0504',
    200: '#1b0907',
    300: '#290e0b',
    400: '#36120f',
    500: '#461713',
    600: '#872d25',
    700: '#c84438',
    800: '#db827a',
    900: '#edc1bd'
  },
  chestnut: {
    DEFAULT: '#894535',
    100: '#1b0e0b',
    200: '#361b15',
    300: '#522920',
    400: '#6d362a',
    500: '#894535',
    600: '#b65b47',
    700: '#c98474',
    800: '#dbada2',
    900: '#edd6d1'
  },
  black: {
    DEFAULT: '#0A060F',
    100: '#020103',
    200: '#040206',
    300: '#060309',
    400: '#08050c',
    500: '#0a060f',
    600: '#392255',
    700: '#673e9b',
    800: '#9973c7',
    900: '#ccb9e3'
  },
  midnight: {
    50: '#e6f1f4',
    100: '#cce3e8',
    200: '#99c7d2',
    300: '#66abbb',
    400: '#338fa5',
    500: '#014A5B',
    600: '#013b49',
    700: '#012c37',
    800: '#001e24',
    900: '#000f12',
  },
  saffron: {
    50: '#fff9e6',
    100: '#fff3cc',
    200: '#ffe799',
    300: '#ffdb66',
    400: '#F1C22E',
    500: '#f3cc4d',
    600: '#d4ab29',
    700: '#a0801f',
    800: '#6d5615',
    900: '#392b0a',
  }
};

const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Inter', sans-serif`,
};

const buttonStyle = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: 'md',
  },
  variants: {
    solid: {
      bg: 'saffron.400',
      color: 'black.500',
      _hover: {
        bg: 'saffron.500',
      },
    },
    outline: {
      borderColor: 'saffron.400',
      color: 'saffron.400',
      _hover: {
        bg: 'saffron.400',
        color: 'black.500',
      },
    },
  },
  defaultProps: {
    variant: 'solid',
  },
});

const components = {
  Button: buttonStyle,
  Input: {
    variants: {
      outline: {
        field: {
          borderColor: 'gray.500',
          _focus: {
            borderColor: 'saffron.400',
            boxShadow: '0 0 0 1px var(--chakra-colors-saffron-400)',
          },
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        backgroundColor: 'midnight.500',
        borderRadius: 'xl',
      },
    },
  },
};

const styles = {
  global: {
    body: {
      bg: 'black.DEFAULT',
      color: 'white',
    },
    a: {
      color: 'saffron.400',
      _hover: {
        textDecoration: 'underline',
      },
    },
  },
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  styles,
  config,
  breakpoints,
});

export default theme;
