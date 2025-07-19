<template>
    <div :class="blok.backgroundStyle">
        <div class="container-px container">
            <div class="grid-layout">
                <div
                    class="relative col-span-full overflow-clip rounded-lg lg:col-span-7 lg:col-start-1"
                >
                    <embla-carousel ref="emblaRef">
                        <template #carousel-items>
                            <single-storyblok-picture
                                v-for="item in blok.media"
                                :key="item.id"
                                class="embla__slide basis-full"
                                :url="item.filename"
                                :alt="item.alt ?? ''"
                                :sizes="[
                                    { dimensions: '1000x600', from: '700px' },
                                    { dimensions: '700x700', from: '500px' },
                                    { dimensions: '500x500', from: '1px' }
                                ]"
                            >
                                {{ item }}
                            </single-storyblok-picture>
                        </template>
                    </embla-carousel>
                    <embla-carousel-external-controls
                        class="absolute right-4 bottom-4 flex w-20"
                        :next-disabled="!canScrollNext"
                        :prev-disabled="!canScrollPrev"
                        @scroll="handleScrollClick"
                    />
                </div>
                <div
                    v-gsap.entrance.slide-left.stagger
                    class="col-span-full my-auto flex flex-col gap-4 lg:col-span-5"
                >
                    <StoryblokComponent
                        v-for="nestedBlok in blok.block"
                        :key="nestedBlok._uid"
                        :blok="nestedBlok"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import EmblaCarousel from '@/components/Molecules/EmblaCarousel.vue'
import type { SectionTextWithImageStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionTextWithImageStoryblok }>()

const emblaRef: Ref<InstanceType<typeof EmblaCarousel> | null> = ref(null)
const { canScrollNext, canScrollPrev, handleScrollClick } =
    useEternalEmblaCarouselControls(emblaRef)
</script>
