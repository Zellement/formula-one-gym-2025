<template>
    <div v-editable="blok" class="white-space-pre-wrap">
        {{ blok.textarea }}
    </div>
</template>

<script lang="ts" setup>
import type { CardContentTextAreaStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: CardContentTextAreaStoryblok }>()
</script>
