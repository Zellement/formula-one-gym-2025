<template>
    <nuxt-link
        :to="`tel:${telephone}`"
        external
        class="flex items-center gap-1 underline-offset-1 hover:underline"
    >
        <Icon name="basil:phone-solid" /> {{ telephone }}
    </nuxt-link>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const telephone: ComputedRef<string> = computed(() => {
    return storyblokStore.siteOptions?.telephone || ''
})
</script>
