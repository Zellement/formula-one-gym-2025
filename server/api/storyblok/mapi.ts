import { H3Event, sendError, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    // Ensure you have STORYBLOK_PERSONAL_ACCESS_TOKEN configured in your .env or nuxt.config.ts
    const token = import.meta.env.STORYBLOK_PERSONAL_ACCESS_TOKEN

    // Make sure these IDs are correct for your Storyblok setup
    const siteOptionsId = '63469607958820' // Story ID
    const spaceId = '285425567212385' // Space ID

    try {
        // 1. Fetch existing story
        const response = await fetch(
            `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories/${siteOptionsId}`, // <-- FIXED: Added backticks
            {
                method: 'GET',
                headers: { Authorization: token }
            }
        )
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(
                `Failed to fetch story: ${response.status} - ${errorText}`
            )
        }
        const existingStory = await response.json()

        // 2. Get new data from request
        const newData = await readBody(event)

        // 3. Merge data (customize as needed)
        // Note: existingStory.story contains the full story object
        // newData should contain the fields you want to update within existingStory.story.content
        // If newData is just the 'content' object, you'll want to merge into content:
        const mergedStoryContent = {
            ...existingStory.story.content, // Merge existing content
            ...newData // with the new data
        }

        const storyToUpdate = {
            ...existingStory.story, // Keep existing story metadata (name, slug, parent_id etc.)
            content: mergedStoryContent // Update only the content part
        }

        // 4. Update story in Storyblok
        const updateResponse = await fetch(
            `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories/${siteOptionsId}`, // <-- FIXED: Added backticks
            {
                method: 'PUT',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    story: storyToUpdate, // Send the refined story object
                    force_update: 1, // Ensures update even if not latest version
                    publish: 1 // Publishes the story immediately
                })
            }
        )

        if (!updateResponse.ok) {
            const errorText = await updateResponse.text()
            throw new Error(
                `Failed to update story: ${updateResponse.status} - ${errorText}`
            )
        }
        return await updateResponse.json()
    } catch (error: any) {
        console.error('Storyblok API route error:', error) // Log the error for debugging
        return sendError(
            event,
            createError({
                statusCode: error.status ?? 500,
                statusMessage:
                    error.response?.statusText || // Access response.statusText if available
                    error.message || // Use the message from your thrown errors
                    'Sorry, an error occurred while updating the story.'
            })
        )
    }
})
