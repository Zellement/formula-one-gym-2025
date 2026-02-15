import { useStoryblokStore } from '@/stores/storyblok'

export const useSerpApiUtils = () => {
    const fetchGoogleReviews = async () => {
        const storyblokStore = useStoryblokStore()

        // Extract existing cached data from Pinia
        const existingReviews = storyblokStore.siteOptions?.reviewsGoogle
        const lastFetchedRaw = storyblokStore.siteOptions?.reviewsLastFetched

        // Helper: check if a date string represents today (ignoring time)
        const isToday = (iso?: string) => {
            if (!iso) return false
            const d = new Date(iso)
            if (isNaN(d.getTime())) return false
            const today = new Date()
            return (
                d.getFullYear() === today.getFullYear() &&
                d.getMonth() === today.getMonth() &&
                d.getDate() === today.getDate()
            )
        }

        const alreadyFetchedToday = isToday(lastFetchedRaw)

        // Use cache only if fetched today and data exists; otherwise fetch
        if (existingReviews && alreadyFetchedToday) {
            return existingReviews
        }

        // Fetch reviews from SerpAPI
        let serpApiData
        try {
            serpApiData = await $fetch('/api/integrations/serpapi')
        } catch (err) {
            console.error('SerpAPI fetch error:', err)
            // Fall back to any existing cached reviews if available
            return existingReviews ?? null
        }

        if (!serpApiData) {
            console.warn('SerpAPI returned no data.')
            return existingReviews ?? null
        }

        const reviewsToSave = serpApiData
        const nowIso = new Date().toISOString()

        // Persist to Storyblok (MAPI)
        try {
            await $fetch('/api/storyblok/mapi', {
                method: 'POST',
                body: {
                    reviewsGoogle: reviewsToSave,
                    reviewsLastFetched: nowIso
                }
            })
        } catch (err) {
            console.error('Error posting to Storyblok MAPI:', err)
        }

        // Update local Pinia cache for immediate use
        try {
            const current = storyblokStore.siteOptions || {}
            // Assign back to store to keep reactive updates
            storyblokStore.siteOptions = {
                ...current,
                reviewsGoogle: reviewsToSave,
                reviewsLastFetched: nowIso
            } as any
        } catch (err) {
            console.error('Error updating local store cache:', err)
        }

        return reviewsToSave
    }

    return {
        fetchGoogleReviews
    }
}
