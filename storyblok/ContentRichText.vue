<template>
    <rich-text :content="blok.richText" class="content large-first" />
</template>

<script lang="ts" setup>
import type { ContentRichTextStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: ContentRichTextStoryblok }>()
</script>
