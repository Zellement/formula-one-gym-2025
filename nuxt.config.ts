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

    modules: ['@nuxt/image', '@pinia/nuxt', 'nuxt-viewport', '@nuxtjs/seo', '@nuxt/fonts', '@nuxt/icon', '@storyblok/nuxt', 'v-gsap-nuxt'],

    fonts: {
        defaults: {
            weights: [400, 700],
            styles: ['normal', 'italic']
        }
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
            '3xs': 21 * 16, // 336px
            '2xs': 23 * 16, // 368px
            xs: 25.625 * 16, // 410px
            sm: 30 * 16, // 480px
            'sm-md': 35 * 16, // 560px
            md: 43.125 * 16, // 690px
            lg: 54.875 * 16, // 878px
            xl: 79.6875 * 16, // 1275px
            '2xl': 90 * 16, // 1440px
            '3xl': 100 * 16, // 1600px
            max: 1848 // 1848px
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

    compatibilityDate: '2024-08-08'
})