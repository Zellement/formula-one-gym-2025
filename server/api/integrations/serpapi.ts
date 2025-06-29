import { getJson } from 'serpapi'

export default defineEventHandler(async () => {
    try {
        const response = await getJson({
            engine: 'google_maps_reviews',
            place_id: 'ChIJdXtvmdXDeUgR877Bo28YMYU',
            hl: 'en',
            sort_by: 'newestFirst',
            api_key: process.env.SERP_API_KEY
        })
        return response
    } catch (err) {
        console.error(err)
    }
})
