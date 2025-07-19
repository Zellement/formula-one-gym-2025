<template>
    <div :class="blok.backgroundStyle">
        <div class="container-px container">
            <div class="grid-layout @container">
                <!-- Primary block -->
                <div class="col-span-full flex lg:col-span-5 lg:col-start-3">
                    <div class="my-auto flex flex-col gap-4">
                        <StoryblokComponent
                            v-for="nestedBlok in blok.mixedBlockPrimary"
                            :key="nestedBlok._uid"
                            :blok="nestedBlok"
                        />
                    </div>
                </div>

                <!-- Secondary block -->
                <div class="col-span-full flex lg:col-span-5 lg:col-start-8">
                    <div class="my-auto flex flex-col gap-4">
                        <StoryblokComponent
                            v-for="nestedBlok in blok.mixedBlockSecondary"
                            :key="nestedBlok._uid"
                            :blok="nestedBlok"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SectionInsetColumnMixedContentStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionInsetColumnMixedContentStoryblok }>()
</script>
