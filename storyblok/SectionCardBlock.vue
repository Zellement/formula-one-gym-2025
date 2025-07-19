<template>
    <div class="container-px container">
        <div class="grid-layout">
            <div
                v-for="(card, index) in blok.cards"
                :key="index"
                class="bg-ecru-500 2xs:col-span-6 relative col-span-full grid aspect-[3/4] grid-cols-1 grid-rows-1 overflow-clip rounded-lg xl:col-span-3"
            >
                <span
                    class="pill absolute top-2 left-2 z-10 lg:top-4 lg:left-4"
                    :class="
                        card.media?.filename
                            ? 'border-black bg-black text-white'
                            : 'border-orange-100/80 bg-orange-100/50 text-orange-500'
                    "
                >
                    {{ card.pill }}
                </span>
                <div class="col-span-full col-start-1 row-start-1">
                    <single-storyblok-picture
                        v-if="card.media?.filename"
                        class="embla__slide basis-full"
                        :url="card.media.filename"
                        :alt="card.media.alt ?? ''"
                        :sizes="[
                            { dimensions: '500x666', from: '700px' },
                            { dimensions: '300x400', from: '1px' }
                        ]"
                    >
                    </single-storyblok-picture>
                </div>
                <div
                    class="relative col-span-full col-start-1 row-start-1 flex flex-col justify-end"
                >
                    <storyblok-component
                        v-for="nestedBlok in card.content"
                        :key="nestedBlok._uid"
                        :blok="nestedBlok"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { SectionCardBlockStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionCardBlockStoryblok }>()
</script>
