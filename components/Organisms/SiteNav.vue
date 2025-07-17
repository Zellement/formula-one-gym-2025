<template>
    <nav v-if="navigation" class="flex">
        <ul
            class="my-auto rounded-lg lg:ml-auto lg:bg-white lg:p-4 lg:text-black"
            :class="ulClasses"
        >
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
