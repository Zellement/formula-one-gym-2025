import { useStoryblokStore } from '@/stores/storyblok' // Adjust path if needed

export const useSerpApiUtils = () => {
    const fetchGoogleReviews = async () => {
        const storyblokStore = useStoryblokStore()

        const today = new Date()
        today.setHours(0, 0, 0, 0) // Start of today

        const lastFetched = new Date(
            storyblokStore.siteOptions?.reviewsLastFetched
        )
        lastFetched.setHours(0, 0, 0, 0) // Start of that day

        if (
            storyblokStore.siteOptions?.reviewsGoogle &&
            storyblokStore.siteOptions?.reviewsLastFetched &&
            lastFetched >= today
        ) {
            // console.log(
            //     'Google reviews already fetched today, skipping API call.'
            // )
            return storyblokStore.siteOptions?.reviewsGoogle
        }

        // console.log('Fetching Google reviews from SerpAPI...')

        // 1. Fetch reviews from SerpAPI
        const { data: serpApiData, error: serpApiError } = await useFetch(
            '/api/integrations/serpapi'
        )

        if (serpApiError.value) {
            console.error('Error fetching from SerpAPI:', serpApiError.value)
            // Optionally throw an error or handle it gracefully
            throw new Error('Failed to fetch Google reviews from SerpAPI.')
        }

        if (!serpApiData.value) {
            console.warn('SerpAPI returned no data.')
            return null // No data to process
        }

        const reviewsToSave = serpApiData.value

        // console.log(
        //     'SerpAPI data received, attempting to post to Storyblok MAPI...'
        // )

        const requestBody = {
            reviewsGoogle: reviewsToSave,
            reviewsLastFetched: new Date().toISOString()
        }

        try {
            await $fetch('/api/storyblok/mapi', {
                method: 'POST',
                body: requestBody
            })

            // console.log('Successfully posted to Storyblok MAPI:', postResponse)
        } catch (err) {
            console.error('Error posting to Storyblok MAPI:', err)
        }

        return
    }

    return {
        fetchGoogleReviews
    }
}
