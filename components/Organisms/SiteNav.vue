<template>
    <nav v-if="navigation" class="site-nav flex">
        <ul :class="ulClasses">
            <li class="text-center xl:hidden">
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
                class="group relative text-center leading-tight tracking-tight"
            >
                <nuxt-link
                    :to="getLinkUrl(navItem)"
                    class="transition-colors hover:text-orange-600"
                    :class="
                        route.path
                            .replaceAll('/', '')
                            .startsWith(
                                (getLinkUrl(navItem) ?? '').replaceAll('/', '')
                            )
                            ? 'text-orange-600'
                            : ''
                    "
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

const route = useRoute()

const storyblokStore = useStoryblokStore()

const { getLinkUrl, getLinkName } = useStoryblokUtils()

const navigation = computed(() => {
    return storyblokStore.siteOptions?.navigation || []
})
</script>
