<template>
    <div class="site-hero bg-orange-500 pt-32 pb-12 text-white">
        <div class="container grid-layout container-px">
            <div
                v-gsap.stagger.from="{ opacity: 0, x: -40 }"
                class="col-span-full flex flex-col items-start justify-end xl:col-span-7"
            >
                <p
                    v-if="date"
                    class="pill border-orange-600 bg-white/50 text-orange-700"
                >
                    {{ date }}
                </p>
                <p v-if="brow" class="pill border-orange-300 bg-orange-300/50">
                    {{ brow }}
                </p>
                <component
                    :is="titleLevel"
                    class="mb-2 text-3xl leading-tight font-bold"
                >
                    {{ title }}
                </component>
                <p v-if="subtitle" class="max-w-lg">
                    {{ subtitle }}
                </p>
                <div class="mt-8 flex flex-col items-start gap-8 sm:flex-row">
                    <btn-join-today
                        class="flex items-center justify-center self-start rounded bg-white px-4 py-2 whitespace-nowrap text-orange-500 transition-colors hover:bg-orange-800 hover:text-white"
                    />
                    <total-reviews
                        class="text-[0.9em] italic"
                        stars-classes="text-yellow-200 not-italic"
                    />
                </div>
            </div>
            <div
                class="relative col-span-full mt-8 xl:col-span-5 xl:aspect-578/361"
            >
                <embla-carousel ref="emblaRef">
                    <template #carousel-items>
                        <single-storyblok-picture
                            v-for="item in media"
                            :key="item.id"
                            v-gsap.from="{ opacity: 0, x: 20 }"
                            class="embla__slide basis-full overflow-clip rounded-lg"
                            :url="item.filename"
                            :alt="item.alt ?? ''"
                            :sizes="[
                                { dimensions: '578x361', from: '1078px' },
                                { dimensions: '800x450', from: '400px' },
                                { dimensions: '500x400', from: '1px' }
                            ]"
                            :focus="item.focus"
                        />
                    </template>
                </embla-carousel>
                <embla-carousel-external-controls
                    class="absolute right-4 bottom-4 flex w-20"
                    :next-disabled="!canScrollNext"
                    :prev-disabled="!canScrollPrev"
                    @scroll="handleScrollClick"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import EmblaCarousel from '@/components/Molecules/EmblaCarousel.vue'
import type { MultiassetStoryblok } from '~/types/storyblok-component-types'

interface Props {
    title: string
    titleLevel?: string
    subtitle?: string
    brow?: string
    media: MultiassetStoryblok
    date?: string | null
}

const emblaRef: Ref<InstanceType<typeof EmblaCarousel> | null> = ref(null)
const { canScrollNext, canScrollPrev, handleScrollClick } =
    useEternalEmblaCarouselControls(emblaRef)

defineProps<Props>()
</script>
