<template>
    <div
        :class="getBgStyle(blok.backgroundStyle.toString())"
        class="py-16 lg:py-24"
    >
        <div class="container-px container">
            <div class="grid-layout @container">
                <div class="col-span-full lg:col-span-2">
                    <component :is="blok.browHeadingLevel" class="uc-text">
                        {{ blok.browHeading }}
                    </component>
                </div>
                <!-- Primary block -->
                <div class="col-span-full lg:col-span-5">
                    <component
                        :is="blok.mainHeadingLevel"
                        class="text-2xl font-bold"
                    >
                        <span v-gsap.entrance.slide-left>
                            {{ blok.mainHeading }}
                        </span>
                    </component>
                </div>
                <!-- Secondary block -->
                <div
                    v-gsap.entrance.slide-left.stagger
                    class="small-content col-span-full my-auto flex flex-col gap-4 lg:col-span-5"
                >
                    <StoryblokComponent
                        v-for="nestedBlok in blok.secondaryBlock"
                        :key="nestedBlok._uid"
                        :blok="nestedBlok"
                    />
                </div>
                <!-- Tertiary block -->
                <div
                    class="col-span-full lg:col-span-5 lg:col-start-3 lg:row-start-2"
                >
                    <single-storyblok-picture
                        v-gsap.whenVisible.once.from="{
                            opacity: 0,
                            transform: 'translateY(50px)'
                        }"
                        :url="blok.tertiaryBlock.filename"
                        :alt="blok.tertiaryBlock.alt ?? ''"
                        :focus="blok.tertiaryBlock.focus"
                        class="overflow-clip rounded-lg"
                        :sizes="[
                            { dimensions: '700x550', from: '700px' },
                            { dimensions: '600x450', from: '400px' },
                            { dimensions: '400x400', from: '1px' }
                        ]"
                    />
                </div>

                <!-- Quarternary block -->
                <div
                    class="col-span-full my-auto flex flex-col gap-4 lg:col-span-5 lg:col-start-8 lg:row-start-2"
                >
                    <StoryblokComponent
                        v-for="nestedBlok in blok.quarternaryBlock"
                        :key="nestedBlok._uid"
                        :blok="nestedBlok"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SectionFlexibleBlockStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionFlexibleBlockStoryblok }>()

const { getBgStyle } = useStoryblokUtils()
</script>
