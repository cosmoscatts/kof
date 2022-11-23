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
      sans: 'Changa',
    },
    boxShadow: {
      nav_item: '0px 0px 4px #eee inset',
    },
    colors: {
      primary: '#507C59',
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
