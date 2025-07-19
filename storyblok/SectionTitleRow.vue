<template>
    <section :class="blok.backgroundStyle">
        <div class="container-px container">
            <div class="grid-layout @container pb-4">
                <div
                    v-gsap.entrance.slide-left
                    class="col-span-full lg:col-span-2"
                >
                    <component :is="blok.browLevel" class="uc-text">
                        {{ blok.brow }}
                    </component>
                </div>
                <!-- Primary block -->
                <div
                    v-gsap.entrance.slide-left
                    class="col-span-full lg:col-span-5"
                >
                    <component :is="blok.titleLevel" class="text-2xl font-bold">
                        <span>
                            {{ blok.title }}
                        </span>
                    </component>
                </div>
                <!-- Secondary block -->
                <div
                    v-gsap.entrance.slide-left.stagger
                    class="col-span-full my-auto flex flex-col gap-4 lg:col-span-5"
                >
                    <StoryblokComponent
                        v-for="nestedBlok in blok.mixedContent"
                        :key="nestedBlok._uid"
                        :blok="nestedBlok"
                    />
                </div>
                <!-- Tertiary block -->
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { SectionTitleRowStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionTitleRowStoryblok }>()
</script>
