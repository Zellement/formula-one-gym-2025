import type { MetaSiteOptionsStoryblok } from '@/types/storyblok-component-types'
import { useStoryblokStore } from '@/stores/storyblok'

export default defineNuxtPlugin(async (): Promise<void> => {
    // Get the Storyblok API client instance
    const storyblokApi = useStoryblokApi() // This gives you the configured API client

    let siteOptionsData = null

    try {
        // Make a direct API call using the client
        // This is equivalent to what useAsyncStoryblok does for the fetch itself,
        // but without the added bridge logic.
        const { data } = await storyblokApi.get(
            'cdn/stories/_data/site-options',
            {
                version: 'published', // Or 'draft' depending on your env config
                resolve_links: 'url'
            }
        )
        siteOptionsData = data.story
    } catch (error) {
        console.error('Error fetching site options in plugin:', error)
    }

    const storyblokStore = useStoryblokStore()

    if (siteOptionsData && siteOptionsData.content) {
        storyblokStore.siteOptions = {
            ...siteOptionsData.content,
            component: 'metaSiteOptions'
        } as MetaSiteOptionsStoryblok
    } else {
        // Fallback if data couldn't be fetched
        storyblokStore.siteOptions = {
            _uid: '',
            component: 'metaSiteOptions',
            email: '',
            telephone: '',
            defaultWhy: [],
            navigation: [],
            topBarButtonText: '',
            topBarText: '',
            modalList: [],
            modalText: '',
            modalTitle: '',
            modalPrice: ''
        }
        console.warn('Site options could not be loaded, using fallback.')
    }
})
