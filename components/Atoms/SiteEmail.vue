<template>
    <nuxt-link
        :to="`mailto:${email}`"
        external
        class="flex items-center gap-1 underline-offset-1 hover:underline"
    >
        <Icon name="basil:envelope-solid" /> {{ email }}
    </nuxt-link>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const email: ComputedRef<string> = computed(() => {
    return storyblokStore.siteOptions?.email || ''
})
</script>
