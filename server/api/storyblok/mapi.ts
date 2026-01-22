// api/storyblok/mapi.ts
import { H3Event, sendError, readBody } from 'h3'
import StoryblokClient from 'storyblok-js-client' // Import the client

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const oauthToken = import.meta.env.STORYBLOK_PERSONAL_ACCESS_TOKEN

    if (!oauthToken) {
        console.error('Storyblok MAPI: oauthToken is missing in runtimeConfig.')
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage:
                    'Storyblok Personal Access Token is not configured on the server.'
            })
        )
    }

    // Initialize the Storyblok Management API client
    const Storyblok = new StoryblokClient({
        oauthToken: oauthToken
    })

    const siteOptionsId = '63469607958820' // Story ID
    const spaceId = '285425567212385' // Space ID

    try {
        // 1. Fetch existing story using the client's GET method
        const existingStoryResponse = await Storyblok.get(
            `spaces/${spaceId}/stories/${siteOptionsId}`
        )
        const existingStory = existingStoryResponse.data // Client returns data directly

        // 2. Get new data from request body
        const newData = await readBody(event)

        // 3. Merge data
        const mergedStoryContent = {
            ...existingStory.story.content, // Preserve existing content fields
            ...newData // Overwrite/add new data (reviewsGoogle, reviewsLastFetched)
        }

        const storyToUpdate = {
            ...existingStory.story, // Preserve story metadata (name, slug, etc.)
            content: mergedStoryContent // Update only the content part
        }

        // 4. Update story in Storyblok using the client's PUT method
        const updateResult = await Storyblok.put(
            `spaces/${spaceId}/stories/${siteOptionsId}`,
            {
                story: storyToUpdate,
                force_update: 1, // Ensures update even if not latest version
                publish: 1 // Publishes the story immediately
            }
        )

        return updateResult // Client returns data directly
    } catch (error: any) {
        console.error('Storyblok API route error (caught):', error) // Log the full error object
        let statusMessage = 'Sorry, an error occurred while updating the story.'
        let statusCode = 500

        // Attempt to extract more specific error info from StoryblokClient's error structure
        if (error.response && error.response.status) {
            statusCode = error.response.status
            if (error.response.data && error.response.data.error) {
                statusMessage = `Storyblok API Error: ${error.response.data.error}`
            } else if (error.response.statusText) {
                statusMessage = `Storyblok API Error: ${error.response.statusText}`
            }
        } else if (error.message) {
            statusMessage = error.message
        }

        return sendError(
            event,
            createError({
                statusCode: statusCode,
                statusMessage: statusMessage
            })
        )
    }
})
