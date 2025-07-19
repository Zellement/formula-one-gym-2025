<template>
    <nav v-if="navigation" class="site-nav flex">
        <ul :class="ulClasses">
            <li class="xl:hidden">
                <nuxt-link
                    to="/"
                    class="transition-colors hover:text-orange-600"
                >
                    Home
                </nuxt-link>
            </li>
            <li
                v-for="navItem in navigation"
                :key="navItem._uid"
                class="group relative"
            >
                <nuxt-link
                    :to="getLinkUrl(navItem)"
                    class="transition-colors hover:text-orange-600"
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
