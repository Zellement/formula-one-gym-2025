<template>
    <div
        class="site-hero grid h-svh grid-cols-1 grid-rows-1 overflow-clip text-white"
    >
        <div
            class="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-black/20"
        />
        <div class="col-span-full col-start-1 row-start-1">
            <embla-carousel ref="emblaRef">
                <template #carousel-items>
                    <single-storyblok-picture
                        v-for="item in media"
                        :key="item.id"
                        class="embla__slide basis-full"
                        :url="item.filename"
                        :alt="item.alt ?? ''"
                        :sizes="[
                            { dimensions: '1700x1300', from: '1000px' },
                            { dimensions: '1300x1000', from: '800px' },
                            { dimensions: '1000x800', from: '700px' },
                            { dimensions: '700x700', from: '400px' },
                            { dimensions: '400x1000', from: '1px' }
                        ]"
                        :focus="item.focus"
                    />
                </template>
            </embla-carousel>
        </div>
        <div
            class="container-px relative z-10 col-span-full col-start-1 row-start-1 container flex h-full w-full flex-col items-start justify-end gap-4 pb-12 text-white xl:flex-row xl:items-end xl:justify-between"
        >
            <div
                v-gsap.stagger.from="{ opacity: 0, x: -40 }"
                class="flex flex-col items-start gap-3"
            >
                <embla-carousel-external-controls
                    class="flex w-20"
                    :next-disabled="!canScrollNext"
                    :prev-disabled="!canScrollPrev"
                    @scroll="handleScrollClick"
                />
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
                    class="xs:self-start mt-4 flex flex-col items-center gap-4 self-stretch rounded-lg bg-black p-2 sm:flex-row"
                >
                    <btn-join-today class="btn xs:w-auto w-full" />
                    <span v-if="membershipsFrom">
                        Memberships from
                        <span class="text-orange-500">
                            {{ membershipsFrom }}
                        </span>
                    </span>
                </div>
            </div>
            <div class="xs:justify-start flex w-full justify-center xl:w-auto">
                <total-reviews
                    class="xs:justify-start xs:flex-col xs:items-start flex w-full max-w-56 flex-row items-center justify-between text-left xl:items-end xl:text-right"
                    stars-classes="text-orange-500"
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
