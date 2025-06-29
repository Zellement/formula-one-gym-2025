import { defineStore } from 'pinia'
import type { MetaSiteOptionsStoryblok } from '@/types/storyblok-component-types'

export const useStoryblokStore = defineStore('storyblok', () => {
    /**
     * State
     **/
    const siteOptions: Ref<MetaSiteOptionsStoryblok | null> = ref(null)

    /**
     * Getters
     **/

    /**
     * Actions
     **/

    /**
     * Return
     **/
    return {
        siteOptions
    }
})
