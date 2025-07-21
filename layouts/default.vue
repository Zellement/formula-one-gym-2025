<template>
    <div class="layout">
        <site-header />
        <GSAPTransition>
            <site-mobile-nav v-if="showMobileNav" />
        </GSAPTransition>
        <GSAPTransition>
            <modal-student-offer v-if="showStudentModal" />
        </GSAPTransition>
        <GSAPTransition>
            <modal-induction v-if="showInductionModal" />
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

const showStudentModal: ComputedRef<boolean> = computed(() => {
    return uiStore.showStudentModal
})

const showInductionModal: ComputedRef<boolean> = computed(() => {
    return uiStore.showInductionModal
})

const isAnyModalActive: ComputedRef<boolean> = computed(() => {
    return (
        showMobileNav.value ||
        showStudentModal.value ||
        showInductionModal.value
    )
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
