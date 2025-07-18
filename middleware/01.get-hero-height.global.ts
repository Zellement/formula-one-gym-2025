export default defineNuxtRouteMiddleware(() => {
    if (!import.meta.client) return
    if (!document) return

    const siteHero = document.querySelector('.site-hero')

    if (!siteHero) return

    const uiStore = useUiStore()
    uiStore.heroHeight = (siteHero as HTMLElement).offsetHeight
})
