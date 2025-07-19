<template>
    <div class="container-px container" :class="blok.backgroundStyle">
        <div
            v-gsap.stagger.whenVisible.delay-300.once.from="{
                opacity: 0,
                y: -40
            }"
            class="grid-layout"
        >
            <component
                :is="blok.titleLevel"
                v-if="blok.title"
                class="col-span-full text-xl font-bold"
            >
                {{ blok.title }}
            </component>

            <div
                v-for="(card, index) in blok.cards"
                :key="index"
                class="xs:col-span-6 relative col-span-full grid grid-cols-1 grid-rows-1 overflow-clip rounded-lg xl:col-span-3 xl:aspect-[3/4]"
                :class="
                    blok.backgroundStyle === 'section-bg-ecru-500'
                        ? 'bg-white'
                        : 'bg-ecru-500'
                "
            >
                <span
                    class="pill absolute top-2 left-2 z-10 mr-2 lg:top-4 lg:left-4 lg:mr-4"
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
                        :focus="card.media.focus"
                    />
                </div>
                <div
                    class="relative col-span-full col-start-1 row-start-1 flex flex-col justify-end pt-8"
                >
                    <div
                        class="mt-auto flex flex-col gap-2 p-6"
                        :class="
                            card.media?.filename
                                ? 'bg-gradient-to-t from-black/70 via-black/50 text-white'
                                : 'text-black'
                        "
                    >
                        <storyblok-component
                            v-for="nestedBlok in card.content"
                            :key="nestedBlok._uid"
                            :blok="nestedBlok"
                            :has-image="!!card.media?.filename"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { SectionCardBlockStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionCardBlockStoryblok }>()
</script>
