<template>
    <p v-editable="blok" class="flex items-center gap-1">
        <span
            v-if="blok.bold"
            class="text-lg"
            :class="hasImage ? '' : 'text-orange-500'"
        >
            {{ blok.bold }}
        </span>
        <span v-if="blok.standard">{{ blok.standard }}</span>
    </p>
</template>

<script lang="ts" setup>
import type { CardContentTextAreaStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: CardContentTextAreaStoryblok; hasImage: boolean }>()
</script>
