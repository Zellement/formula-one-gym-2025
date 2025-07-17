<template>
    <div v-if="renderedText" v-dompurify-html="renderedText" class="content" />
</template>

<script lang="ts" setup>
import { MarkTypes, richTextResolver } from '@storyblok/richtext'

interface Props {
    content: any
}

const props = defineProps<Props>()

const { render } = richTextResolver({
    resolvers: {
        [MarkTypes.LINK]: (node: any) => {
            // If a story link is detected, use the linkHelper to format it
            if (node.attrs.linktype === 'story') {
                // console.log('Story link detected:', node.attrs)
                return `<a href="${node.attrs?.story?.full_slug}">${node.text}</a>`
            }

            // Custom case for when DeepL copies over as links and not stories, or a link comes through starting with '/global/'
            if (node.attrs.href.startsWith('/global/')) {
                return `<a href="${node.attrs.href.replace('/global/', 'global/')}">${node.text}</a>`
            }

            // If an email link is detected, format it as a mailto link
            if (node.attrs.linktype === 'email') {
                return `<a href="mailto:${node.attrs.href}">${node.text}</a>`
            }

            // Handle links and 'asset' links
            return `<a href="${node.attrs.href}">${node.text}</a>`
        }
    }
})

const renderedText: ComputedRef<unknown> = computed(() => {
    if (typeof props?.content === 'string') {
        return props?.content
    }

    return render(props?.content)
})
</script>
