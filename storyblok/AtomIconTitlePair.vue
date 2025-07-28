<template>
    <li v-editable="blok" class="flex w-full flex-col">
        <a
            v-if="blok.link?.linktype === 'url'"
            :href="blok.link?.cached_url || blok.link?.url"
            class="flex flex-row items-center gap-2 text-orange-500 underline underline-offset-1"
        >
            <Icon :name="blok.icon" :size="blok.size" />
            <span>{{ blok.name }}</span>
        </a>
        <a
            v-else-if="blok.link?.linktype === 'email'"
            :href="`mailto:${blok.link?.cached_url || blok.link?.url}`"
            class="flex flex-row items-center gap-2 text-orange-500 underline underline-offset-1"
        >
            <Icon :name="blok.icon" :size="blok.size" />
            <span>{{ blok.name }}</span>
        </a>
        <nuxt-link
            v-else-if="
                blok.link?.linktype === 'story' && blok.link.story?.full_slug
            "
            :href="`/${blok.link.story?.full_slug}`"
            class="flex flex-row items-center gap-2 text-orange-500 underline underline-offset-1"
        >
            <Icon :name="blok.icon" :size="blok.size" />
            <span>{{ blok.name }}</span>
        </nuxt-link>

        <span v-else class="flex flex-row items-center gap-2 text-orange-500">
            <Icon :name="blok.icon" :size="blok.size" />
            <span>{{ blok.name }}</span>
        </span>
    </li>
</template>

<script lang="ts" setup>
import type { AtomIconTitlePairStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: AtomIconTitlePairStoryblok }>()
</script>
