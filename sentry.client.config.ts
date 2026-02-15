import * as Sentry from '@sentry/nuxt'

Sentry.init({
    // If set up, you can use your runtime config here
    // dsn: useRuntimeConfig().public.sentry.dsn,
    dsn: 'https://354ee2d2f12a74ed6ac6a44cc70a7372@o4510888821784576.ingest.de.sentry.io/4510888825978960',

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,

    // Enable logs to be sent to Sentry
    enableLogs: process.env.NODE_ENV === 'production',

    // Enable sending of user PII (Personally Identifiable Information)
    // https://docs.sentry.io/platforms/javascript/guides/nuxt/configuration/options/#sendDefaultPii
    sendDefaultPii: true,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false
})
