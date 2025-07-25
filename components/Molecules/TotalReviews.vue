<template>
    <div class="gap-2">
        <p>
            Recommended by
            <span class="font-bold" :class="starsClasses">hundreds</span>
            of happy members!
        </p>
        <div class="grid grid-cols-1 grid-rows-1">
            <div
                v-gsap.stagger.delay-800.from="{
                    opacity: 0,
                    x: -20
                }"
                class="text-copper-500 col-span-full col-start-1 row-span-full row-start-1 inline-flex w-auto gap-1.5"
            >
                <Icon
                    v-for="i in 5"
                    :key="i"
                    name="ic:outline-star"
                    size="20"
                    :class="starsClasses"
                />
            </div>
            <!-- <div
                class="stars-wrapper text-copper-500 col-span-full col-start-1 row-span-full row-start-1 inline-flex w-auto gap-1.5"
            >
                <Icon
                    v-for="i in 5"
                    :key="i"
                    name="ic:outline-star"
                    size="20"
                    class="text-orange-500"
                />
            </div> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    starsClasses?: string
}

defineProps<Props>()
// const storyblokStore = useStoryblokStore()

// const reviewData = computed(() => {
//     return storyblokStore.siteOptions?.reviewsGoogle || []
// })

// const ratingPercentage: ComputedRef<string> = computed(() => {
//     return `${(Number(reviewData.value.place_info?.rating) / 5) * 100}%`
// })
</script>
<!-- <style scoped>
.stars-wrapper {
    clip-path: polygon(
        0 0,
        v-bind(ratingPercentage) 0,
        v-bind(ratingPercentage) 100%,
        0% 100%
    );
}
</style> -->
