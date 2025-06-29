<template>
    <div
        class="to-blaze-orange-500 via-pizazz-500 h-80 bg-gradient-to-b from-orange-500 pt-32 text-white"
    >
        <div class="container-px container">
            <p
                v-if="title"
                v-gsap.fromInvisible.from="{ translateY: 20, opacity: 0 }"
                class="h1 font-bold"
            >
                {{ title }}
            </p>
            <p
                v-if="subTitle"
                v-gsap.fromInvisible.from="{ translateY: -10, opacity: 0 }"
                class="h2"
            >
                Some subtext
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    title?: string
    subTitle?: string
}

defineProps<Props>()
</script>
