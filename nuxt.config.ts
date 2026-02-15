import { defineNuxtConfig } from 'nuxt/config'
import eslintVitePlugin from 'vite-plugin-eslint'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Fix for issue - https://github.com/nuxt-modules/tailwindcss/issues/480
  devServerHandlers: [],

  ssr: true,

  nitro: {
      compressPublicAssets: true,
      minify: true
  },

  modules: ['@nuxt/image', '@pinia/nuxt', 'nuxt-viewport', '@nuxtjs/seo', '@nuxt/fonts', '@nuxt/icon', '@storyblok/nuxt', 'v-gsap-nuxt', '@nuxtjs/sitemap', '@sentry/nuxt/module'],

  fonts: {
      defaults: {
          weights: [500, 600, 700],
          styles: ['normal', 'italic']
      }
  },

  sitemap: {
      exclude: ['/_icons'],
      excludeAppSources: true,
      sources: ['/api/__sitemap__/urls']
  },

  storyblok: {
      accessToken: import.meta.env.STORYBLOK_DELIVERY_API_TOKEN
  },

  css: ['@/assets/css/app.css'],

  components: [
      {
          path: '~/components', // for everything else like Atoms/Molecules
          pathPrefix: false
      }
  ],

  viewport: {
      breakpoints: {
          initial: 0,
          '3xs': 21 * 16,
          '2xs': 25.625 * 16,
          xs: 30 * 16,
          sm: 35 * 16,
          md: 45.714 * 16,
          lg: 54.875 * 16,
          xl: 67.375 * 16,
          '2xl': 79.19 * 16,
          '3xl': 90 * 16,
          '4xl': 111.25 * 16
      },
      fallbackBreakpoint: 'initial'
  },

  // Allows for local testing on devices
  devServer: {
      port: 3000, // default: 3000
      host: '0.0.0.0' // default: localhost
  },

  alias: {
      '@blocks': fileURLToPath(
          new URL('./components/Sections', import.meta.url)
      )
  },

  site: {
      url: import.meta.env.WEBSITE_URL,
      name: 'Formula One Gym',
      trailingSlash: true
  },

  app: {
      head: {
          htmlAttrs: {
              lang: 'en'
          },
          title: 'Formula One Gym | Nottingham',
          meta: [
              {
                  name: 'viewport',
                  content: 'width=device-width, initial-scale=1'
              },
              {
                  name: 'description',
                  content:
                      'No joining fee or contract. Our independent Nottingham gym offers free weights, resistance machines, cardio machines, classes, saunas and sunbeds'
              },
              { id: 'og-type', property: 'og:type', content: 'website' }
          ],
          link: [
              {
                  rel: 'icon',
                  type: 'image/x-icon',
                  href: '/favicon.png'
              },
              {
                  rel: 'preload',
                  as: 'script',
                  href: `https://www.googletagmanager.com/gtm.js?id=${import.meta.env.GTM_ID}`
              }
          ],
          script: [
              {
                  id: 'gtm-script',
                  innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${import.meta.env.GTM_ID}');`,
                  type: 'text/javascript'
              },
              {
                  src: 'https://consent.cookiebot.com/uc.js?cbid=4b3914b9-5096-46ec-b4d5-249696e5f182'
              }
          ]
      },
      pageTransition: { name: 'page', mode: 'out-in' }
  },

  runtimeConfig: {
      public: {
          WEBSITE_URL: import.meta.env.WEBSITE_URL
      }
  },

  vite: {
      plugins: [
          tailwindcss(),
          eslintVitePlugin({
              fix: true,
              include: ['./**/*.vue', './**/*.ts', './**/*.js']
          })
      ]
  },

  typescript: {
      typeCheck: true,
      strict: true,
      tsConfig: {
          compilerOptions: {
              strict: true
          },
          include: [
              '@pinia/nuxt',
              '@types/node',
              '@nuxt/image',
              '@nuxt/types',
              '**/*.d.ts'
          ]
      }
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-08-08',

  sentry: {
    org: 'zellement',
    project: 'formula-one-gym',
    autoInjectServerSentry: 'top-level-import'
  },

  sourcemap: {
    client: 'hidden'
  }
})