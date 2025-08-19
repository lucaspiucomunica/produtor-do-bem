/** @type {import('tailwindcss').Config} */
module.exports = {
  // Arquivos
  content: [
    '../../*.php',
    '../../src/js/*.js',
    '../../inc/**/*.php',
    '../../template-parts/**/*.php',
  ],

  // Classes que devem sempre ser incluídas no CSS final
  safelist: [
    // Classes geradas dinamicamente pela função get_class_section()
    {
      pattern: /^sections-.*/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    // Outras classes dinâmicas se necessário
    'p-section',
    'p-section-top',
  ],

  // Estilos
  theme: {
    extend: {
      // Cores
      colors: {
        primario: {
          'principal': '#13863D',
          'variacao-1': '#117937',
          'variacao-2': '#0F6B31',
          'variacao-3': '#0D5E2B',
          'variacao-4': '#0B5025',
          'variacao-5': '#0A431F',
        },
        secundario: {
          'principal': '#78BE21',
          'variacao-1': '#6AA91F',
          'variacao-2': '#5E961B',
          'variacao-3': '#117937',
          'variacao-4': '#538418',
          'variacao-5': '#3B5E11',
        },
        neutro: {
          'principal': '#F2EBE7',
          'variacao-1': '#DAD4D0',
          'variacao-2': '#C2BCB9',
          'variacao-3': '#A9A5A2',
          'variacao-4': '#918D8B',
          'variacao-5': '#797674',
          'variacao-6': '#29292B',
          'branco': '#ffffff',
          'preto': '#202022',
        },
        limao: {
          'principal': '#E6F200',
          'variacao-1': '#AEF50B',
          'variacao-2': '#97DD05',
        },
        danger: {
          'principal': '#EB5757',
        },
      },

      // Fontes
      fontFamily: {
        'body': ['Inter', 'sans-serif'],
        'display': ['Sora', 'sans-serif'],
      },

      fontWeight: {
        'regular': 400,
        'semibold': 600,
        'bold': 700,
      },

      // Container
      container: {
        center: true,
        padding: '2.5rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': '1600px',
        },
      },

      // Border Radius
      borderRadius: {
        '4xl': '2.25rem',
        '2xl': '1.25rem',
      },

      // Box shadow
      boxShadow: {
        'custom-1': '0px 0px 24px 0px rgba(10, 67, 31, 0.32)',
      }
    },
  },
  plugins: []
}