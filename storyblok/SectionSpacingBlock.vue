<template>
    <div aria-hidden="true" :class="blok.spacing"></div>
</template>

<script lang="ts" setup>
import type { SectionSpacingBlockStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionSpacingBlockStoryblok }>()
</script>
