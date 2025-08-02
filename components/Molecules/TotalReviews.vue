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
            class="text-copper-500 inline-flex items-start justify-start gap-1.5"
        >
            <Icon
                v-for="i in 5"
                :key="i"
                name="ic:outline-star"
                size="20"
                :class="starsClasses"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    starsClasses?: string
}

defineProps<Props>()
</script>
