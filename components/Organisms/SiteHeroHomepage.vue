<template>
    <div
        class="site-hero relative grid min-h-svh grid-cols-1 grid-rows-1 overflow-clip text-white lg:h-svh"
    >
        <div
            class="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-black/20"
        />
        <div class="col-span-full col-start-1 row-start-1">
            <embla-carousel ref="emblaRef">
                <template #carousel-items>
                    <template v-for="item in media">
                        <single-storyblok-picture
                            v-if="item.filename"
                            :key="item.id"
                            class="embla__slide basis-full"
                            :url="item.filename"
                            :alt="item.alt ?? ''"
                            :sizes="[
                                { dimensions: '1700x1300', from: '1000px' },
                                { dimensions: '1300x1000', from: '800px' },
                                { dimensions: '1000x800', from: '700px' },
                                { dimensions: '700x700', from: '400px' },
                                { dimensions: '400x700', from: '1px' }
                            ]"
                            :focus="item.focus"
                        />
                    </template>
                </template>
            </embla-carousel>
        </div>
        <div
            class="container-px relative z-10 col-span-full col-start-1 row-start-1 container flex h-full w-full flex-col items-start justify-end gap-4 pt-32 pb-12 text-white xl:flex-row xl:items-end xl:justify-between"
        >
            <div
                v-gsap.stagger.from="{ opacity: 0, x: -40 }"
                class="flex flex-col items-start gap-3"
            >
                <p v-if="brow" class="pill border-white/40 bg-black/60">
                    {{ brow }}
                </p>
                <p v-if="title" class="text-3xl font-bold">
                    {{ title }}
                </p>
                <p v-if="subtitle" class="max-w-[750px]">
                    {{ subtitle }}
                </p>
                <div
                    class="mt-4 mr-auto flex flex-col items-center justify-center gap-4 rounded-lg bg-black p-2 sm:flex-row"
                >
                    <btn-join-today class="btn w-full text-center" />
                    <span v-if="membershipsFrom" class="shrink-0">
                        Membership just
                        <span class="text-orange-500">
                            {{ membershipsFrom }}
                        </span>
                    </span>
                </div>
            </div>
            <div
                class="flex w-full flex-col justify-start gap-4 xl:w-auto xl:flex-row"
            >
                <total-reviews
                    class="flex w-full max-w-56 flex-col text-left xl:items-end xl:justify-end xl:text-right"
                    stars-classes="text-orange-500"
                />
                <embla-carousel-external-controls
                    class="order-last flex w-20 xl:order-first xl:mt-auto"
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
    subtitle?: string
    brow?: string
    media: MultiassetStoryblok
}

const storyblokStore = useStoryblokStore()

const membershipsFrom: ComputedRef<string | null> = computed(() => {
    return storyblokStore.siteOptions?.membershipsFrom || null
})

const emblaRef: Ref<InstanceType<typeof EmblaCarousel> | null> = ref(null)
const { canScrollNext, canScrollPrev, handleScrollClick } =
    useEternalEmblaCarouselControls(emblaRef)

defineProps<Props>()
</script>
