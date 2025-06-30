<template>
    <div
        v-gsap.whenVisible.from="{ opacity: 0, x: -32 }"
        class="container-px py-32"
    >
        <div v-if="reviewsGoogle" ref="containerEl" class="container">
            <div class="mb-16 flex flex-col lg:flex-row lg:justify-between">
                <h2 v-gsap.animateText class="h2">Google Reviews</h2>
                <p class="mb-8">
                    {{ reviewsGoogle.place_info.rating }} stars from
                    {{ reviewsGoogle.place_info.reviews }} reviews
                </p>
            </div>

            <div
                class="3xl:px-0 relative left-1/2 w-screen -translate-x-1/2 overflow-x-auto"
            >
                <div
                    class="flex min-w-max gap-8"
                    :style="{ paddingLeft: dynamicPadding + 'px' }"
                >
                    <div
                        v-for="review in reviewsGoogle.reviews"
                        :key="review.review_id"
                        class="review flex w-80 shrink-0 flex-col gap-2"
                    >
                        <div class="mb-4 flex items-center gap-4">
                            <h3 class="font-bold">{{ review.user?.name }}</h3>
                        </div>
                        <p>
                            Date:
                            {{ dayjs(review.iso_date).format('D MMM YYYY') }}
                        </p>
                        <div class="mb-2 flex items-center">
                            <Icon
                                v-for="(filled, i) in getStars(review.rating)"
                                :key="i"
                                name="material-symbols:star-rounded"
                                class="text-yellow-400"
                            />
                        </div>
                        <p>{{ truncate(review.snippet, 160) }}</p>
                        <a :href="review.link" target="_blank">
                            View on Google
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

const storyblokStore = useStoryblokStore()

const reviewsGoogle: ComputedRef<any> = computed(() => {
    return storyblokStore.siteOptions?.reviewsGoogle
})

const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating))
}

const { truncate } = useStringUtils()

const dynamicPadding = ref(0)
const containerEl = ref<HTMLElement | null>(null)

const updatePadding = (): void => {
    if (containerEl.value) {
        const windowWidth = window.innerWidth
        const padding = containerEl.value.clientWidth
        dynamicPadding.value = (windowWidth - padding) / 2
    }
}

onMounted(() => {
    updatePadding()
    window.addEventListener('resize', updatePadding)
})

onUnmounted(() => {
    window.removeEventListener('resize', updatePadding)
})
</script>
