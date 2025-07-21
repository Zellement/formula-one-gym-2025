<template>
    <div v-editable="blok" class="flex flex-col">
        <site-hero
            :title="blok.primary || storyName"
            :title-level="blok.title_level || 'p'"
            :subtitle="blok.secondary"
            :brow="blok.brow"
            :media="blok.media || []"
        />
        <div
            v-if="route.path === '/help-advice/'"
            class="grid-layout container-px container"
        >
            <nuxt-link
                v-for="post in posts?.data.stories"
                :key="post.id"
                class="col-span-full bg-red-100 sm:col-span-2 md:col-span-3 lg:col-span-4"
            >
                {{ post.name }}
            </nuxt-link>
        </div>
        <template v-else>
            <storyblok-component
                v-for="nestedBlok in blok.body"
                :key="nestedBlok._uid"
                :blok="nestedBlok"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import type { TemplatePageStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: TemplatePageStoryblok; storyName: string }>()

const route = useRoute()

const { data: posts } = await useAsyncData('posts', () =>
    useStoryblokApi().get('cdn/stories', {
        starts_with: 'help-advice/',
        version: 'published',
        resolve_links: 'url'
    })
)
</script>
