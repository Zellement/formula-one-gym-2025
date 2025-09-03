import type { SitemapUrl, SitemapUrlInput } from '#sitemap/types'
import type { TemplatePageStoryblok } from '~/types/storyblok-component-types'
import { storyblokInit } from '@storyblok/js'

const config = useRuntimeConfig()

const { storyblokApi } = storyblokInit({
    accessToken: (config.STORYBLOK_DELIVERY_API_TOKEN as string) || ''
})

const fetchAllStories = async () => {
    const stories = []
    const perPage = 100
    let page = 1
    let total = 0

    if (!storyblokApi) return

    while (true) {
        // Fetch the current page
        const response = await storyblokApi.get('cdn/stories', {
            version: 'published',
            per_page: perPage,
            page: page,
            content_type: 'templatePage'
        })

        // Append the stories from this page to the main array
        stories.push(...response.data.stories)

        // Set total from the API response
        total = response.total

        // Break the loop if we've fetched all stories
        if (stories.length >= total) break

        // Increment the page number
        page++
    }

    return stories
}

const parseUrlForSitemap = (story: any) => {
    let url = story.full_slug

    if (story.full_slug === 'home') {
        url = '/'
    }

    return url
}

export default defineSitemapEventHandler(async (): Promise<any> => {
    let response: SitemapUrlInput[] = []

    try {
        const stories = await fetchAllStories()
        if (stories) {
            response = stories.map(
                (story: TemplatePageStoryblok): SitemapUrl => {
                    return {
                        loc: parseUrlForSitemap(story),
                        lastmod: story.published_at,
                        _sitemap: 'pages'
                    }
                }
            )
        }
    } catch (error) {
        console.error('Error fetching stories:', error)
    }

    return response
})
