<script setup lang="ts">
defineProps<{ blok: any }>()
</script>

<template>
    <div v-editable="blok">
        <StoryblokComponent
            v-for="nestedBlok in blok.body"
            :key="nestedBlok._uid"
            :blok="nestedBlok"
        />
    </div>
</template>
