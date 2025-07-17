<template>
    <div class="grid h-screen grid-cols-1 grid-rows-1 overflow-clip text-white">
        <div class="col-span-full col-start-1 row-start-1">
            <embla-carousel ref="emblaRef">
                <template #carousel-items>
                    <single-storyblok-picture
                        v-for="item in media"
                        :key="item.id"
                        class="embla__slide basis-full"
                        :url="item.filename"
                        :alt="item.alt ?? ''"
                        :dimensions="[
                            '1700x1300',
                            '1300x1000',
                            '1000x800',
                            '700x700',
                            '400x1000'
                        ]"
                    >
                        {{ item }}
                    </single-storyblok-picture>
                </template>
            </embla-carousel>
        </div>
        <div
            class="container-px relative col-span-full col-start-1 row-start-1 container flex h-full flex-col justify-end bg-gradient-to-t from-black/40 via-black/20 pb-8 text-white"
        >
            <p v-if="title" class="text-3xl font-bold">
                {{ title }}
            </p>

            <embla-carousel-external-controls
                class="absolute right-4 bottom-8 flex w-20"
                :next-disabled="!canScrollNext"
                :prev-disabled="!canScrollPrev"
                @scroll="handleScrollClick"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import EmblaCarousel from '@/components/Molecules/EmblaCarousel.vue'
import type { MultiassetStoryblok } from '~/types/storyblok-component-types'

interface Props {
    title?: string
    subTitle?: string
    media: MultiassetStoryblok
}

const emblaRef: Ref<InstanceType<typeof EmblaCarousel> | null> = ref(null)
const { canScrollNext, canScrollPrev, handleScrollClick } =
    useEternalEmblaCarouselControls(emblaRef)

defineProps<Props>()
</script>
