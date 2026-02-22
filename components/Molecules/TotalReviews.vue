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
            class="relative inline-flex items-center justify-start gap-1.5"
        >
            <div class="relative">
                <Icon
                    v-for="i in 5"
                    :key="i"
                    name="i-mdi-star-outline"
                    size="20"
                />
                <div class="absolute inset-0 z-10">
                    <Icon
                        v-for="i in 4"
                        :key="i"
                        name="i-mdi-star"
                        size="20"
                        :class="starsClasses"
                    />
                    <Icon
                        name="i-mdi-star-half"
                        size="20"
                        :class="starsClasses"
                    />
                </div>
            </div>
            <span
                v-if="totalReviews && rating && isHomePage"
                class="font-sans text-sm text-white lining-nums"
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

const isHomePage = computed(() => {
    return useRoute().path === '/'
})
</script>
