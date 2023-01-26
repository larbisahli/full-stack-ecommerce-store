function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

module.exports = {
  future: {
    removeDeprecatedGapUtilities: false
  },
  mode: 'jit',
  purge: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './containers/**/*.tsx',
    './store/**/*/*.tsx',
    './store/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        green: '#209F85',
        'green-hover': '#1E957C',
        'green-light': 'rgba(32,159,133, 0.3)',
        error: '#ff5b60',
        'gray-f7': '#f7f7f7',
        'gray-3a': '#3a3a3a',
        'gray-light': '#fafafa',
        'light-yellow': '#feeec8',
        'light-blue': '#ceeffe',
        'light-green': '#d4f8c4',
        'light-purple': '#d8dafe',
        overlay: 'rgba(0,0,0,0.7)',
        dark: '#212121',
        gray: {
          100: '#f9f9f9',
          200: '#f3f3f3', // Light BG
          300: '#e6e6e6', // Border
          400: '#D5D5D5', // Border Alt
          500: '#999999', // Light Text
          600: '#757575',
          700: '#575757', // Normal Text
          800: '#424242',
          900: '#212121' // Heavy Text
        },
        light: withOpacity('--color-light'),
        accent: withOpacity('--color-accent'),
        'accent-hover': withOpacity('--color-accent-hover'),
        'accent-300': withOpacity('--color-accent-300'),
        'accent-400': withOpacity('--color-accent-400'),
        'accent-500': withOpacity('--color-accent-500'),
        'accent-600': withOpacity('--color-accent-600'),
        'accent-700': withOpacity('--color-accent-700'),
        'border-50': withOpacity('--color-border-50'),
        'border-100': withOpacity('--color-border-100'),
        'border-200': withOpacity('--color-border-200'),
        'border-base': withOpacity('--color-border-base'),
        'border-400': withOpacity('--color-border-400'),
        'gray-50': withOpacity('--color-gray-50'),
        'gray-100': withOpacity('--color-gray-100'),
        'gray-200': withOpacity('--color-gray-200'),
        'gray-300': withOpacity('--color-gray-300'),
        'gray-400': withOpacity('--color-gray-400'),
        'gray-500': withOpacity('--color-gray-500'),
        'gray-600': withOpacity('--color-gray-600'),
        'gray-700': withOpacity('--color-gray-700'),
        'gray-800': withOpacity('--color-gray-800'),
        'gray-900': withOpacity('--color-gray-900'),
        sidenav: '#151515',
        'sidenav-color': '#a5a5a5',
        'sidenav-divider': 'rgba(255,255,255,0.2)',
        social: {
          facebook: '#3b5998',
          'facebook-hover': '#35508a',
          twitter: '#1da1f2',
          instagram: '#e1306c',
          youtube: '#ff0000',
          google: '#4285f4',
          'google-hover': '#3574de'
        }
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem'
      },
      width: {
        'main-content': 'calc(100% - 360px)',
        sidebar: '360px'
      },
      minWidth: {
        8: '2rem'
      },
      gridColumnStart: {
        '40px': '40px'
      },

      spacing: {
        9: '2.25rem',
        11: '2.75rem',
        14: '3.5rem',
        22: '5.5rem',
        '3px': '3px',
        '5px': '5px',
        '10px': '10px',
        '15px': '15px',
        '-15px': '-15px',
        '18px': '18px',
        '20px': '20px',
        '-20px': '-20px',
        '30px': '30px',
        '35px': '35px',
        '40px': '40px',
        '45px': '45px',
        '50px': '50px',
        '60px': '60px',
        '70px': '70px',
        '80px': '80px',
        '90px': '90px',
        '95px': '95px',
        '100px': '100px',
        '105px': '105px',
        '110px': '110px',
        '120px': '120px',
        '130px': '130px',
        '146px': '146px',
        '200px': '200px',
        '235px': '235px',
        '320px': '320px',
        '360px': '360px',
        '480px': '480px',
        '580px': '580px',
        '650px': '650px',
        '1440px': '1440px'
      },
      inset: {
        8: '2rem',
        9: '2.25rem',
        14: '3.5rem',
        half: '50%',
        '10px': '10px',
        '15px': '15px',
        '20px': '20px',
        '25px': '25px',
        '30px': '30px',
        '40px': '40px',
        '60px': '60px',
        '62px': '62px',
        '90px': '90px'
      },
      borderRadius: {
        DEFAULT: '5px',
        default: '6px',
        '9px': '9px',
        '10px': '10px',
        '20px': '20px',
        '30px': '30px'
      },
      borderWidth: {
        '3px': '3px'
      },
      borderColor: (theme) => ({
        ...theme('colors'),
        default: theme('colors.gray.200', 'currentColor')
      }),
      transitionDuration: {
        350: '350ms'
      },
      screens: {
        '3xl': '1900px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: { min: '1400px' },
        '2xxl': { min: '1600px' },
        large: { min: '2100px' }
      },
      fontFamily: {
        open: ['Open Sans'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Open Sans', 'system-ui', 'sans-serif']
      },
      fontSize: {
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '14px': '14px',
        '16px': '16px',
        '18px': '18px',
        '21px': '21px',
        '24px': '24px',
        '30px': '30px',
        '36px': '36px'
      },
      textColor: {
        body: withOpacity('--text-base'),
        'body-dark': withOpacity('--text-base-dark'),
        muted: withOpacity('--text-muted'),
        'muted-light': withOpacity('--text-muted-light'),
        heading: withOpacity('--text-heading'),
        'sub-heading': withOpacity('--text-sub-heading'),
        bolder: withOpacity('--text-text-bolder')
      },

      height: {
        13: '3.125rem',
        double: '200%',
        drawer: 'calc(100vh - 90px)'
      },
      maxWidth: {
        5: '1.25rem',
        half: '50%',
        '720px': '720px',
        '820px': '820px'
      },
      maxHeight: {
        5: '1.25rem',
        '650px': '650px'
      },
      boxShadow: {
        base: 'rgba(0, 0, 0, 0.16) 0px 4px 16px',
        header: '0 2px 4px rgba(0,0,0,0.12)',
        mobile: '0 0px 2px rgba(0,0,0,0.12)',
        counter: '0 2px 4px rgba(0,32,25,0.06)',
        cart: '0 3px 6px rgba(0,0,0,0.12)',
        navigation: '0 3px 6px rgba(0, 0, 0, 0.16)',
        footer: '3px 0 6px rgba(0,0,0,0.12)',
        float: '0 0 6px rgba(0,0,0,0.12)',
        floatBig: '0 0 10px rgba(0,0,0,0.16)',
        floatingUp: '0 5px 10px rgba(0,0,0,0.16)',
        upside: '0 9px 7px -8px rgba(0,0,0,0.6)',
        imgFloat: '0 10px 10px rgba(0,0,0,0.16)'
      },

      gridTemplateColumns: {
        fit: 'repeat(auto-fit, minmax(0, 1fr))'
      }
    }
  },
  plugins: [require('tailwindcss-rtl')],
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
    padding: ['responsive, odd, even'],
    width: ['responsive', 'hover', 'focus']
  }
};
