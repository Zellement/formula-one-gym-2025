import { useStoryblokStore } from '@/stores/storyblok' // Adjust path if needed

export const useSerpApiUtils = () => {
    const fetchGoogleReviews = async () => {
        const storyblokStore = useStoryblokStore()

        const today = new Date()
        // Normalize 'today' to the beginning of the day for accurate comparison
        today.setHours(0, 0, 0, 0)

        // Check if reviewsGoogle exists and if reviewsLastFetched is today or later
        if (
            storyblokStore.siteOptions?.reviewsGoogle &&
            storyblokStore.siteOptions.reviewsLastFetched &&
            new Date(storyblokStore.siteOptions.reviewsLastFetched).setHours(
                0,
                0,
                0,
                0
            ) >= today.getTime()
        ) {
            console.log(
                'Google reviews already fetched today, skipping API call.'
            )
            return storyblokStore.siteOptions.reviewsGoogle // Return existing data if up-to-date
        }

        console.log('Fetching Google reviews from SerpAPI...')

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

        // IMPORTANT: Adjust `serpApiData.value` based on your actual SerpAPI response structure
        // If it's `data.value.reviews`, use that. If it's just `data.value`, use it.
        const reviewsToSave = serpApiData.value // Assuming serpApiData.value is the array of reviews or object containing them

        console.log(
            'SerpAPI data received, attempting to post to Storyblok MAPI...'
        )

        // 2. Update Storyblok MAPI
        const { data: postResponse, error: postError } = await useFetch(
            '/api/storyblok/mapi',
            {
                // Fixed typo: /api/
                method: 'POST',
                body: {
                    reviewsGoogle: reviewsToSave, // Ensure this matches your Storyblok content field name
                    reviewsLastFetched: new Date().toISOString() // Use current time for when it was truly fetched
                }
                // Add headers if your /api/storyblok/mapi expects them, though `readBody` won't use them
            }
        )

        if (postError.value) {
            console.error('Error posting to Storyblok MAPI:', postError.value)
            throw new Error('Failed to update Storyblok with new reviews.')
        }

        if (postResponse.value) {
            console.log(
                'Successfully posted to Storyblok MAPI:',
                postResponse.value
            )
        } else {
            console.warn('Post to Storyblok MAPI returned no response data.')
        }

        return
    }

    return {
        fetchGoogleReviews
    }
}
