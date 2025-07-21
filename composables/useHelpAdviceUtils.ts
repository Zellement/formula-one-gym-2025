export const useHelpAdviceUtils = () => {
    const storyblokApi = useStoryblokApi()

    return useAsyncData('help-advice-posts', () =>
        storyblokApi.get('cdn/stories', {
            starts_with: 'help-advice/',
            version: 'published',
            resolve_links: 'story',
            is_startpage: false,
            sort_by: 'first_published_at:desc'
        })
    )
}
