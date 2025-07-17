<template>
    <div class="layout">
        <site-header />
        <GSAPTransition>
            <site-mobile-nav v-if="showMobileNav" />
        </GSAPTransition>
        <main>
            <slot />
        </main>
        <site-footer />
    </div>
</template>

<script setup lang="ts">
const uiStore = useUiStore()

const viewport = useViewport()

/* --------------------------
// Computed
-------------------------- */

const showMobileNav: ComputedRef<boolean> = computed(() => {
    return uiStore.showMobileNav && viewport.isLessThan('xl')
})

const isAnyModalActive: ComputedRef<boolean> = computed(() => {
    return uiStore.showMobileNav
})
useHead({
    // Prevent page scrolling when mobile nav is open
    bodyAttrs: {
        class: computed((): string => {
            if (isAnyModalActive.value) return 'overflow-hidden'
            return ''
        })
    }
})
</script>
