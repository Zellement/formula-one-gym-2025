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

const { story, error } = await useAsyncStoryblok(
    routePath.value,
    {
        api: {
            version: isDev || isPreview ? 'draft' : 'published',
            resolve_links: 'url'
        },
        bridge: {}
    }
)

if (error.value) {
    throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage
    })
}

const pageTitle = computed(() => {
    return (
        story.value?.content?.meta_tags?.title || 'Gym Nottingham City Centre'
    )
})
console.log('Page Title:', pageTitle.value)

const pageDescription = computed(() => {
    return story.value?.content?.meta_tags?.description || ''
})

useHead({
    title: pageTitle,
    meta: [
        {
            name: 'description',
            content: pageDescription
        }
    ]
})

onMounted(async () => {
    await useAsyncData('reviews', () => fetchGoogleReviews())
})
</script>
