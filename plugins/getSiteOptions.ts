/**
 *
 * This plugin fetches the site options from Storyblok and stores them in the Storyblok store.
 *
 */
import type { MetaSiteOptionsStoryblok } from '@/types/storyblok-component-types'

export default defineNuxtPlugin(async (): Promise<void> => {
    const siteOptions = await useAsyncStoryblok(
        '_data/site-options',
        {
            version: 'published',
            resolve_links: 'url'
        },
        {
            resolveLinks: 'url'
        }
    )

    const storyblokStore = useStoryblokStore()

    storyblokStore.siteOptions = {
        ...siteOptions.value.content,
        component: 'metaSiteOptions'
    } as MetaSiteOptionsStoryblok
})
