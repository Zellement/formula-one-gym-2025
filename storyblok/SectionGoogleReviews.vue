<template>
    <section v-if="reviewsGoogle?.reviews" v-editable="blok" class="relative">
        <single-storyblok-picture
            v-if="storyblokStore?.siteOptions?.googleReviewsLogo?.filename"
            v-gsap.from="{ opacity: 0, x: 20 }"
            class="mx-auto mb-8 w-full max-w-40"
            :url="storyblokStore?.siteOptions?.googleReviewsLogo?.filename"
            alt="Google Reviews Logo"
            :sizes="[{ dimensions: '300x0', from: '1px' }]"
            hide-spinner
        />
        <embla-carousel ref="emblaRef" class="">
            <template #carousel-items>
                <template
                    v-for="review in reviewsGoogle?.reviews"
                    :key="review?.review_id"
                >
                    <div
                        v-if="review.rating >= 4 && review.snippet"
                        class="flex shrink-0 basis-full flex-col gap-2 rounded-xl border border-ecru-500 p-4 md:mx-4 md:basis-[320px] xl:mx-8"
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
                            v-gsap.whenVisible.once.from="{
                                opacity: 0,
                                x: -20
                            }"
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
                            <div class="flex items-center gap-2">
                                <img
                                    v-if="review.user?.thumbnail"
                                    :src="review.user.thumbnail"
                                    loading="lazy"
                                    alt="User thumbnail"
                                    class="size-8 rounded-full object-cover"
                                />
                                <div
                                    v-else
                                    class="rounded-fullsize-8 bg-gray-200 p-1"
                                >
                                    <Icon
                                        name="ic:round-account-circle"
                                        size="30"
                                        class="text-gray-500"
                                    />
                                </div>
                                <h3 class="font-bold">
                                    {{ review.user?.name }}
                                </h3>
                            </div>
                            <p>
                                Date:
                                {{
                                    dayjs(review.iso_date_of_last_edit).format(
                                        'D MMM YYYY'
                                    )
                                }}
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
            </template>
        </embla-carousel>
        <embla-carousel-external-controls
            class="absolute right-0 bottom-0 flex -translate-y-4 lg:w-full xl:top-1/2 xl:-translate-y-1/2"
            :next-disabled="!canScrollNext"
            :prev-disabled="!canScrollPrev"
            btn-classes="bg-white p-2 border leading-none border-ecru-500 text-black"
            @scroll="handleScrollClick"
        />
    </section>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import EmblaCarousel from '@/components/Molecules/EmblaCarousel.vue'
import type { SectionGoogleReviewsStoryblok } from '~/types/storyblok-component-types'

const storyblokStore = useStoryblokStore()

defineProps<{ blok: SectionGoogleReviewsStoryblok }>()

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
