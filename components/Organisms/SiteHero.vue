<template>
    <div class="site-hero bg-orange-500 pt-32 pb-8 text-white">
        <div class="container-px grid-layout container">
            <div
                v-gsap.stagger.from="{ opacity: 0, x: -40 }"
                class="col-span-full flex flex-col items-start justify-end xl:col-span-7"
            >
                <p v-if="brow" class="pill border-orange-300 bg-orange-300/50">
                    {{ brow }}
                </p>
                <p v-if="title" class="h1 font-bold">
                    {{ title }}
                </p>
                <p v-if="subtitle" class="max-w-screen-lg">
                    {{ subtitle }}
                </p>
            </div>
            <div
                class="relative col-span-full mt-8 xl:col-span-5 xl:aspect-[578/361]"
            >
                <embla-carousel ref="emblaRef">
                    <template #carousel-items>
                        <single-storyblok-picture
                            v-for="item in media"
                            :key="item.id"
                            v-gsap.from="{ opacity: 0, x: 20 }"
                            class="embla__slide basis-full"
                            :url="item.filename"
                            :alt="item.alt ?? ''"
                            :sizes="[
                                { dimensions: '578x361', from: '1078px' },
                                { dimensions: '800x450', from: '400px' },
                                { dimensions: '500x400', from: '1px' }
                            ]"
                        >
                            {{ item }}
                        </single-storyblok-picture>
                    </template> </embla-carousel
                ><embla-carousel-external-controls
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
    title?: string
    subtitle?: string
    brow?: string
    media: MultiassetStoryblok
}

const emblaRef: Ref<InstanceType<typeof EmblaCarousel> | null> = ref(null)
const { canScrollNext, canScrollPrev, handleScrollClick } =
    useEternalEmblaCarouselControls(emblaRef)

defineProps<Props>()
</script>
