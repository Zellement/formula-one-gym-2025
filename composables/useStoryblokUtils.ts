import type { AtomSingleLinkStoryblok } from '~/types/storyblok-component-types'

export const useStoryblokUtils = () => {
    const getLinkUrl = (singleLink: AtomSingleLinkStoryblok): string => {
        if (singleLink.linktype === 'story') {
            return `/${singleLink.story?.full_slug}`
        }

        return singleLink.link.url || singleLink.link.cached_url
    }
    const getLinkName = (singleLink: AtomSingleLinkStoryblok): string => {
        if (singleLink.displayText) {
            return singleLink.displayText
        }
        if (singleLink.linktype === 'story') {
            return `/${singleLink.story?.name}`
        }

        return singleLink.link.url || singleLink.link.cached_url
    }
    return {
        getLinkUrl,
        getLinkName
    }
}
