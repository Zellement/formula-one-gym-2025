<template>
    <StoryblokComponent
        v-if="story?.value?.content?.component"
        :blok="story.value.content"
    />
</template>

<script setup>
const story = await useAsyncStoryblok('home', {
    version: 'draft' // or 'published'
})
</script>
