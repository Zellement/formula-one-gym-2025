<template>
    <nav v-if="navigation" class="text-sm font-extrabold">
        <ul class="my-auto lg:mr-4" :class="ulClasses">
            <li
                v-for="navItem in navigation"
                :key="navItem._uid"
                class="group relative"
            >
                <nuxt-link
                    :to="getLinkUrl(navItem)"
                    @click="uiStore.toggleShowMobileNav(false)"
                >
                    {{ getLinkName(navItem) }}
                </nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
const uiStore = useUiStore()

defineProps<{
    ulClasses?: string
}>()

const storyblokStore = useStoryblokStore()

const { getLinkUrl, getLinkName } = useStoryblokUtils()

const navigation = computed(() => {
    return storyblokStore.siteOptions?.navigation || []
})
</script>
