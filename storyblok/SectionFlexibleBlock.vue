<template>
    <div class="container-px container">
        <div class="grid-layout">
            <div class="col-span-full lg:col-span-2">
                <component :is="blok.browHeadingLevel">
                    {{ blok.browHeading }}
                </component>
            </div>
            <!-- Primary block -->
            <div class="col-span-full lg:col-span-5">
                <component :is="blok.mainHeadingLevel">
                    {{ blok.mainHeading }}
                </component>
            </div>
            <!-- Secondary block -->
            <div class="col-span-full lg:col-span-5">
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
                {{ blok.tertiaryBlock }}
            </div>

            <!-- Quartenary block -->
            <div
                class="col-span-full lg:col-span-5 lg:col-start-8 lg:row-start-2"
            >
                <StoryblokComponent
                    v-for="nestedBlok in blok.quarternaryBlock"
                    :key="nestedBlok._uid"
                    :blok="nestedBlok"
                />
            </div>
        </div>
    </div>
    {{ blok }}
</template>

<script setup lang="ts">
import type { SectionFlexibleBlockStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionFlexibleBlockStoryblok }>()
</script>
