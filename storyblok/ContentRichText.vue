<template>
    <rich-text v-editable="blok" :content="blok.richText" />
</template>

<script lang="ts" setup>
import type { ContentRichTextStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: ContentRichTextStoryblok }>()
</script>
