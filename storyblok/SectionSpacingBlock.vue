<template>
    <div
        v-editable="blok"
        aria-hidden="true"
        :class="[blok.backgroundStyle, blok.height]"
    ></div>
</template>

<script lang="ts" setup>
import type { SectionSpacingBlockStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionSpacingBlockStoryblok }>()
</script>
