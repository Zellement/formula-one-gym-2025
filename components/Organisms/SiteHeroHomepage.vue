<template>
    <div
        class="site-hero grid h-svh grid-cols-1 grid-rows-1 overflow-clip text-white"
    >
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
            v-gsap.stagger.from="{ opacity: 0, x: -40 }"
            class="container-px relative col-span-full col-start-1 row-start-1 container flex h-full flex-col items-start justify-end gap-3 bg-gradient-to-t from-black/40 via-black/20 pb-12 text-white lg:gap-1 xl:pb-8 xl:pb-12"
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
                class="xs:self-start mt-4 flex flex-col items-center gap-4 self-stretch rounded-lg bg-black p-2 sm:flex-row"
            >
                <btn-launch-induction-modal class="btn xs:w-auto w-full" />
                <span v-if="membershipsFrom">
                    Memberships from just
                    <span class="text-orange-500">
                        {{ membershipsFrom }}
                    </span>
                </span>
            </div>

            <embla-carousel-external-controls
                class="xs:bottom-4 absolute right-4 bottom-1 flex w-20"
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
