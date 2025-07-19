<template>
    <div v-editable="blok" class="flex flex-col">
        <site-hero
            :title="blok.primary || storyName"
            :title-level="blok.title_level || 'p'"
            :subtitle="blok.secondary"
            :brow="blok.brow"
            :media="blok.media || []"
        />
        <storyblok-component
            v-for="nestedBlok in blok.body"
            :key="nestedBlok._uid"
            :blok="nestedBlok"
        />
    </div>
</template>

<script setup lang="ts">
import type { TemplatePageStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: TemplatePageStoryblok; storyName: string }>()
</script>
