<template>
    <header
        role="banner"
        :class="headerClasses"
        class="fixed top-0 right-0 left-0 z-50 w-full text-white transition-transform duration-500"
    >
        <div
            v-if="siteOptions?.enableStudentOffer"
            class="flex bg-gradient-to-br from-teal-500 to-teal-600"
        >
            <div
                class="container flex items-center justify-center gap-4 container-px py-2"
            >
                <span class="text-white">
                    {{ siteOptions.topBarText }}
                </span>
                <span v-if="isDesktop" class="text-white">
                    {{ siteOptions.topBarTextAdded }}
                </span>
                <button
                    class="btn btn--student whitespace-nowrap"
                    @click="uiStore.toggleStudentModal(true)"
                >
                    {{ siteOptions.topBarButtonText }}
                </button>
            </div>
        </div>
        <div class="container grid-layout container-px pt-2 xl:pt-4">
            <div class="relative col-span-full flex w-full gap-2">
                <site-brand
                    class="mr-auto max-w-40 shrink-0 py-2 xl:max-w-48"
                    :class="siteBrandColour"
                />
                <site-nav
                    v-if="isDesktop"
                    ul-classes="bg-white flex items-center 2xl:text-base 3xl:gap-5 xl:text-sm gap-3 text-black rounded-lg px-4"
                />
                <div
                    class="col-span-4 col-start-9 row-start-1 flex justify-end gap-2"
                >
                    <button
                        class="flex items-center justify-center gap-1 rounded-lg bg-white px-4 text-black xl:hidden"
                        aria-label="Open mobile navigation"
                        @click="uiStore.toggleShowMobileNav(true)"
                    >
                        Menu
                        <Icon
                            name="material-symbols-light:menu-rounded"
                            class="h-10 w-10"
                            size="24"
                        />
                    </button>
                    <div class="hidden rounded-lg bg-white p-2 xs:flex">
                        <btn-join-today
                            class="flex items-center justify-center rounded bg-orange-500 px-4 py-2 whitespace-nowrap text-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import type { MetaSiteOptionsStoryblok } from '~/types/storyblok-component-types'

/* --------------------------
// Interfaces and types
-------------------------- */
interface State {
    showHeader: boolean
    darkenLogo: boolean
    lastScrollPosition: number
    scrollOffset: number
}

/* --------------------------
// States, stores and props
-------------------------- */
const uiStore = useUiStore()
const storyblokStore = useStoryblokStore()

const state: State = reactive({
    showHeader: true,
    darkenLogo: false,
    lastScrollPosition: 0,
    scrollOffset: 40
})

const viewport = useViewport()

/* --------------------------
// Computed
-------------------------- */

const isDesktop: ComputedRef<boolean> = computed(() => {
    return viewport.isGreaterOrEquals('xl')
})

const headerClasses: ComputedRef<string> = computed(() => {
    return state.showHeader ? 'translate-y-0' : '-translate-y-full'
})

const siteBrandColour: ComputedRef<string> = computed(() => {
    return state.darkenLogo ? 'text-black' : 'text-white'
})

const siteOptions: ComputedRef<MetaSiteOptionsStoryblok | null> = computed(
    () => {
        return storyblokStore.siteOptions
    }
)

/* --------------------------
// Methods
-------------------------- */
const onScroll = (): void => {
    if (window.scrollY < 0) {
        return
    }
    if (
        Math.abs(window.scrollY - state.lastScrollPosition) < state.scrollOffset
    ) {
        return
    }
    if (window.scrollY > uiStore.heroHeight) {
        state.darkenLogo = true
    } else {
        state.darkenLogo = false
    }
    state.showHeader = window.scrollY < state.lastScrollPosition
    state.lastScrollPosition = window.scrollY
}

/* --------------------------
// Hooks and composables
-------------------------- */
onMounted((): void => {
    state.lastScrollPosition = window.scrollY
    window.addEventListener('scroll', onScroll)
})
</script>
