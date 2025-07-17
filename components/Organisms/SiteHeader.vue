<template>
    <header
        role="banner"
        :class="headerClasses"
        class="fixed top-0 right-0 left-0 z-50 w-full text-white transition-transform duration-500 lg:py-3 xl:py-6"
    >
        <div class="grid-layout container-px container pt-2">
            <div class="relative col-span-full flex w-full gap-2">
                <site-brand
                    class="mr-auto max-w-40 shrink-0 py-2 xl:max-w-48"
                />
                <site-nav
                    v-if="isDesktop"
                    class="col-span-full row-start-2 mt-8 lg:col-span-10 lg:col-start-2 lg:mt-0 lg:w-full"
                    ul-classes="flex gap-2 flex-col lg:flex-row 2xl:gap-4 lg:justify-end"
                />
                <div
                    class="col-span-4 col-start-9 row-start-1 flex justify-end gap-2"
                >
                    <button
                        class="flex items-center justify-center rounded-lg bg-white px-4 text-black xl:hidden"
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
                    <div class="xs:flex hidden rounded-lg bg-white p-2">
                        <button
                            class="flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 whitespace-nowrap text-white"
                            aria-label="Open mobile navigation"
                            @click="uiStore.toggleShowMobileNav(true)"
                        >
                            Join today
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
/* --------------------------
// Interfaces and types
-------------------------- */
interface State {
    showHeader: boolean
    lastScrollPosition: number
    scrollOffset: number
}

/* --------------------------
// States, stores and props
-------------------------- */
const uiStore = useUiStore()

const state: State = reactive({
    showHeader: true,
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
