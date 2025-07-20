<template>
    <li v-editable="blok" class="flex flex-row items-center gap-2">
        <Icon :name="blok.icon" :size="blok.size" />
        <span>{{ blok.name }}</span>
    </li>
</template>

<script lang="ts" setup>
import type { AtomIconTitlePairStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: AtomIconTitlePairStoryblok }>()
</script>
