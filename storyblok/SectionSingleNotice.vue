<template>
    <div class="container-px container">
        <div
            class="flex flex-col gap-4 rounded-xl bg-black p-4 text-white lg:flex-row"
        >
            <div class="text-base">{{ blok.notice }}</div>
            <div class="shrink-0">
                <StoryblokComponent
                    v-for="nestedBlok in blok.buttons"
                    :key="nestedBlok._uid"
                    :blok="nestedBlok"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SectionSingleNoticeStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionSingleNoticeStoryblok }>()
</script>
