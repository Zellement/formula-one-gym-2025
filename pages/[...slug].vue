<template>
    <div>
        <site-hero :title="story?.name" />
        <storyblok-component
            v-if="story?.content?.component"
            :blok="story.content"
        />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

const routePath = computed(() => {
    return route.path === '/' ? 'home' : route.path
})

const { fetchGoogleReviews } = useSerpApiUtils()

const story = await useAsyncStoryblok(routePath.value, {
    version: 'published',
    resolve_links: 'url'
})

await useAsyncData('reviews', () => fetchGoogleReviews())

// useHead({
//     title: story.value?.content?.meta_tags?.title || 'Formula One Gym',
//     meta: [
//         {
//             name: 'description',
//             content: story.value?.content?.meta_tags?.description ?? ''
//         }
//     ]
// })
</script>
