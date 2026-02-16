<template>
    <div class="gap-2">
        <p>
            Recommended by
            <span class="font-bold" :class="starsClasses">hundreds</span>
            of happy members!
        </p>
        <div
            v-gsap.stagger.delay-800.from="{
                opacity: 0,
                x: -20
            }"
            class="text-copper-500 inline-flex items-center justify-start gap-1.5"
        >
            <Icon
                v-for="i in 5"
                :key="i"
                name="ic:outline-star"
                size="20"
                :class="starsClasses"
            />

            <span
                v-if="totalReviews && rating"
                class="font-sans text-sm text-white"
                :class="starsClasses"
            >
                <span class="text-[1.2em]">{{ rating }}</span>
                ({{ totalReviews }})
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    starsClasses?: string
}

defineProps<Props>()

const storyblokStore = useStoryblokStore()

const totalReviews: ComputedRef<number | null> = computed(() => {
    return (
        storyblokStore?.siteOptions?.reviewsGoogle?.place_info?.reviews || null
    )
})

const rating: ComputedRef<number | null> = computed(() => {
    return (
        storyblokStore?.siteOptions?.reviewsGoogle?.place_info?.rating || null
    )
})
</script>
