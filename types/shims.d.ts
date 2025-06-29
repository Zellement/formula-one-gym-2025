import type { MetaSiteOptionsStoryblok } from '@/types/storyblok-component-types'

declare global {
    type ImageTypes = {
        url?: string
        alt?: string
        caption?: string
        focus?: string
    }

    type NavItem = {
        key: string
        label: string
        url: string
        subItems?: NavItem[]
    }

    interface UtmParameters {
        [key: `utm_${string}`]: string
    }

    interface ExtendedMetaSiteOptionsStoryblok
        extends MetaSiteOptionsStoryblok {
        reviewsGoogle?: any
    }
}

export {}
