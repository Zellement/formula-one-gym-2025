import { defineStore } from 'pinia'

export const useStoryblokStore = defineStore('storyblok', () => {
    /**
     * State
     **/
    const siteOptions: Ref<ExtendedMetaSiteOptionsStoryblok | null> = ref(null)

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
