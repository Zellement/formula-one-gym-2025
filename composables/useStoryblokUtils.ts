import type { AtomSingleLinkStoryblok } from '~/types/storyblok-component-types'

export const useStoryblokUtils = () => {
    const getLinkUrl = (
        singleLink: AtomSingleLinkStoryblok
    ): string | undefined => {
        if (singleLink.link.linktype === 'story') {
            if (singleLink.link?.story?.full_slug === 'home') {
                return '/'
            }
            // Make sure the link is suffixed with a slash
            if (singleLink.link?.story?.full_slug.endsWith('/')) {
                return `/${singleLink.link.story?.full_slug}`
            }
            // If the slug does not end with a slash, add it
            if (!singleLink.link?.story?.full_slug.endsWith('/')) {
                return `/${singleLink.link.story?.full_slug}/`
            }
        }

        return singleLink.link.url || singleLink.link.cached_url || undefined
    }

    const getLinkName = (singleLink: AtomSingleLinkStoryblok): string => {
        if (singleLink.displayText) {
            return singleLink.displayText
        }
        if (singleLink.link.linktype === 'story') {
            return (
                singleLink.link?.story?.name ||
                singleLink.link.url ||
                singleLink.link.cached_url
            )
        }

        return singleLink.link.url || singleLink.link.cached_url
    }

    const getBgStyle = (style: string) => {
        switch (style) {
            case 'off-white':
                return 'bg-ecru-500'
            default:
                return 'bg-white'
        }
    }

    const getPaddingFromStyle = (style: string) => {
        switch (style) {
            case 'off-white':
                return 'py-10 lg:py-20'
            default:
                return ''
        }
    }

    return {
        getLinkUrl,
        getLinkName,
        getBgStyle,
        getPaddingFromStyle
    }
}
