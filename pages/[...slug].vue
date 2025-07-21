<template>
    <div class="flex flex-col">
        <storyblok-component
            v-if="story?.content?.component"
            :blok="story.content"
            :story-name="story.name"
            :first-published-at="story.first_published_at"
        />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

const routePath = computed(() => {
    return route.path === '/' ? 'home' : route.path
})

const { fetchGoogleReviews } = useSerpApiUtils()

const isDev = import.meta.dev
const isPreview = route.query._storyblok !== undefined

interface StoryblokOptions {
    version: 'draft' | 'published'
    resolve_links: 'url'
}

const storyblokOptions: StoryblokOptions = {
    version: isDev || isPreview ? 'draft' : 'published',
    resolve_links: 'url' as const
}

const story = await useAsyncStoryblok(routePath.value, storyblokOptions)

onMounted(async () => {
    await useAsyncData('reviews', () => fetchGoogleReviews())
})

useHead({
    title: story.value?.content?.meta_tags?.title || 'Formula One Gym',
    meta: [
        {
            name: 'description',
            content: story.value?.content?.meta_tags?.description || ''
        }
    ]
})
</script>
