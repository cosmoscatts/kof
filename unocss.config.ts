import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['hstack', 'flex items-center'],
    ['vstack', 'flex flex-col justify-center'],
  ],
  theme: {
    fontFamily: {
      sans: '',
    },
    boxShadow: {
      nav: '0 1px 8px 0 rgba(27, 35, 47, .1)',
    },
    colors: {
      primary: '#BBB529',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'sub',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        ui: 'DM Sans:400,700',
      },
    }),
  ],
})
