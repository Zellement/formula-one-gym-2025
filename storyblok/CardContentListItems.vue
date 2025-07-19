<template>
    <ul class="list-none">
        <storyblok-component
            v-for="nestedBlok in blok.items"
            :key="nestedBlok._uid"
            :blok="nestedBlok"
        />
    </ul>
</template>

<script lang="ts" setup>
import type { CardContentListItemsStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: CardContentListItemsStoryblok }>()
</script>
