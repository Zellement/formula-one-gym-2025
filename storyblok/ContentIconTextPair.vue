<template>
    <StoryblokComponent
        v-for="nestedBlok in blok.body"
        :key="nestedBlok._uid"
        :blok="nestedBlok"
    />
</template>

<script lang="ts" setup>
import type { ContentIconTextPairStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: ContentIconTextPairStoryblok }>()
</script>
