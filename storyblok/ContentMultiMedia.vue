<template>
    <div class="relative flex grow overflow-clip rounded-lg">
        <embla-carousel ref="emblaRef">
            <template #carousel-items>
                <single-storyblok-picture
                    v-for="item in blok.media"
                    :key="item.id"
                    v-gsap.from="{ opacity: 0, x: 20 }"
                    class="embla__slide basis-full"
                    :url="item.filename"
                    :alt="item.alt ?? ''"
                    :sizes="[
                        { dimensions: '700x550', from: '700px' },
                        { dimensions: '600x450', from: '400px' },
                        { dimensions: '400x400', from: '1px' }
                    ]"
                    :focus="item.focus"
                />
            </template> </embla-carousel
        ><embla-carousel-external-controls
            class="absolute right-4 bottom-4 flex w-20"
            :next-disabled="!canScrollNext"
            :prev-disabled="!canScrollPrev"
            @scroll="handleScrollClick"
        />
    </div>
</template>

<script lang="ts" setup>
import EmblaCarousel from '@/components/Molecules/EmblaCarousel.vue'
import type { ContentMultiMediaStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: ContentMultiMediaStoryblok }>()
const emblaRef: Ref<InstanceType<typeof EmblaCarousel> | null> = ref(null)
const { canScrollNext, canScrollPrev, handleScrollClick } =
    useEternalEmblaCarouselControls(emblaRef)
</script>
