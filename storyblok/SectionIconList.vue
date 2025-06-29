<template>
    <div class="text-black">
        <div class="container-px container">
            <div class="col-span-full flex flex-col gap-8">
                <h2
                    v-if="blok.title"
                    v-gsap.whenVisible.animateText
                    class="h2 text-center"
                >
                    {{ blok.title }}
                </h2>
                <ul
                    v-if="blok.icons"
                    class="flex flex-wrap items-start justify-center gap-12 2xl:justify-between"
                >
                    <li
                        v-for="icon in blok.icons"
                        :key="icon._uid"
                        class="flex flex-1 flex-col items-center justify-center gap-2 text-center"
                    >
                        <Icon
                            v-gsap.magnetic
                            :name="icon.icon"
                            :size="icon.iconSize || '50'"
                            class="text-pizazz-500"
                        />
                        <span class="text-sm font-bold">{{ icon.name }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SectionIconListStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionIconListStoryblok }>()
</script>
