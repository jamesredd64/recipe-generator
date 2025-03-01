import { createTheme } from '@mui/material';

// For component Styling

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F1C22E', // saffron
      light: '#f3cc4d', // lighter saffron
      dark: '#d4ab29', // darker saffron
    },
    secondary: {
      main: '#014A5B', // midnight-green
      light: '#015d73', // lighter midnight-green
      dark: '#013744', // darker midnight-green
    },
    background: {
      default: '#014A5B', // midnight-green
      paper: '#015d73', // lighter midnight-green for elevated surfaces
    },
    text: {
      primary: '#FEFEFE', // white
      secondary: '#B4B4B4', // silver
    },
    error: {
      main: '#ff2c96',
    },
    warning: {
      main: '#ff9d00',
    },
    success: {
      main: '#3ad900',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.MuiButton-contained': {
            backgroundColor: '#014A5B', // saffron
            color: '#193549', // midnight-green
            '&:hover': {
              backgroundColor: '#d4ab29', // darker saffron
            },
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          margin: '0 auto',
          backgroundColor: '#014A5B', // midnight-green
        },
      },
    },
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "090355", // cobalt-1
    //     },
    //   },
    // },
  },
});

export default muiTheme;
