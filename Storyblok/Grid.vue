<script setup>
defineProps({ blok: Object })
</script>

<template>
    <div class="bg-red-500">
        <StoryblokComponent
            v-for="currentBlok in blok.columns"
            :key="currentBlok._uid"
            :blok="currentBlok"
        />
    </div>
</template>
