export default defineNuxtRouteMiddleware(() => {
    const uiStore = useUiStore()

    uiStore.showMobileNav = false
})
