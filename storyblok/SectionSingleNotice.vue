<template>
    <section v-editable="blok" class="container container-px">
        <div
            v-gsap.whenVisible.delay-200.once.from="{ opacity: 0, x: -40 }"
            class="flex flex-col gap-4 rounded-xl bg-black p-6 text-white lg:flex-row lg:items-center lg:justify-between"
        >
            <div :class="blok.bolden ? 'text-lg' : 'text-base'">
                {{ blok.notice }}
            </div>
            <div class="shrink-0">
                <StoryblokComponent
                    v-for="nestedBlok in blok.buttons"
                    :key="nestedBlok._uid"
                    :blok="nestedBlok"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { SectionSingleNoticeStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionSingleNoticeStoryblok }>()
</script>
