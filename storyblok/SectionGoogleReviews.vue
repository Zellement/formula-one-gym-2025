<template>
    <div class="relative py-16 xl:py-24">
        <embla-carousel ref="emblaRef" class="">
            <template #carousel-items>
                <div
                    v-for="review in reviewsGoogle.reviews"
                    :key="review.review_id"
                    class="border-ecru-500 flex shrink-0 basis-full flex-col gap-2 rounded-xl border p-4 md:mx-4 md:basis-[320px] xl:mx-8"
                >
                    <div
                        v-gsap.stagger.from="{ opacity: 0, x: -40 }"
                        class="mb-2 flex items-center gap-0"
                    >
                        <Icon
                            v-for="(filled, i) in getStars(review.rating)"
                            :key="i"
                            name="ic:outline-star"
                            size="30"
                            class="text-orange-500"
                        />
                    </div>
                    <p
                        v-gsap.whenVisible.once.from="{ opacity: 0, x: -20 }"
                        class="mb-4"
                    >
                        {{ truncate(review.snippet, 300) }}
                    </p>
                    <div
                        v-gsap.whenVisible.stagger.once.delay-200.from="{
                            opacity: 0,
                            x: -20
                        }"
                        class="mt-auto flex flex-col gap-1"
                    >
                        <h3 class="font-bold">{{ review.user?.name }}</h3>
                        <p>
                            Date:
                            {{ dayjs(review.iso_date).format('D MMM YYYY') }}
                        </p>
                        <nuxt-link
                            :to="review.link"
                            target="_blank"
                            class="flex items-center gap-1 text-orange-500 hover:underline"
                        >
                            Read review <Icon name="ic:round-open-in-new" />
                        </nuxt-link>
                    </div>
                </div>
            </template>
        </embla-carousel>
        <embla-carousel-external-controls
            class="absolute bottom-0 left-0 flex w-full -translate-y-4 xl:top-1/2 xl:-translate-y-1/2"
            :next-disabled="!canScrollNext"
            :prev-disabled="!canScrollPrev"
            btn-classes="bg-white p-2 border leading-none border-ecru-500 text-black"
            @scroll="handleScrollClick"
        />
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import EmblaCarousel from '@/components/Molecules/EmblaCarousel.vue'

const storyblokStore = useStoryblokStore()

const reviewsGoogle: ComputedRef<any> = computed(() => {
    return storyblokStore.siteOptions?.reviewsGoogle
})

const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating))
}

const { truncate } = useStringUtils()
const emblaRef: Ref<InstanceType<typeof EmblaCarousel> | null> = ref(null)
const { canScrollNext, canScrollPrev, handleScrollClick } =
    useEternalEmblaCarouselControls(emblaRef)
</script>
