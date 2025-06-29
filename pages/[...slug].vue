<template>
    <div class="page">
        <StoryblokComponent
            v-if="story?.value?.content?.component"
            :blok="story.value.content"
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
    version: 'published'
})

await useAsyncData('reviews', () => fetchGoogleReviews())

useHead({
    title: story.value?.content?.meta_tags?.title || 'Formula One Gym',
    meta: [
        {
            name: 'description',
            content: story.value?.content?.meta_tags?.description ?? ''
        }
    ]
})
</script>
