<template>
    <h2 class="text-lg">
        {{ blok.title }}
    </h2>
</template>

<script lang="ts" setup>
import type { CardContentTextAreaStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: CardContentTextAreaStoryblok }>()
</script>
