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
            class="container-px ga-8 relative col-span-full col-start-1 row-start-1 container flex h-full flex-col items-start justify-end bg-gradient-to-t from-black/40 via-black/20 pb-8 text-white xl:pb-12"
        >
            <p
                v-if="brow"
                class="uc-text rounded-full bg-black/60 px-3 py-2 tracking-wider"
            >
                {{ brow }}
            </p>
            <p v-if="title" class="text-3xl font-bold">
                {{ title }}
            </p>
            <p v-if="subtitle" class="max-w-screen-lg">
                {{ subtitle }}
            </p>
            <div
                class="mt-8 flex flex-col items-center gap-4 self-start rounded-lg bg-black p-2 sm:flex-row"
            >
                <btn-launch-induction-modal class="btn" />
                <span v-if="membershipsFrom">
                    Memberships from just
                    <span class="text-orange-500">
                        {{ membershipsFrom }}
                    </span>
                </span>
            </div>

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
    subtitle?: string
    brow: string
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
