<template>
    <div v-editable="blok" class="flex flex-col">
        <site-hero-homepage
            :title="blok.primary ?? storyName"
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
