<template>
    <div class="bg-ecru-500 fixed inset-0 z-[999] flex">
        <div class="container-px h-full w-full overflow-y-auto">
            <div class="flex w-full flex-col py-2">
                <button
                    class="ml-auto flex items-center justify-center gap-1 rounded-lg bg-white px-4 py-3 text-black"
                    aria-label="Close mobile navigation"
                    @click="uiStore.toggleShowMobileNav(false)"
                >
                    Close
                    <Icon
                        name="material-symbols-light:cancel"
                        class="h-10 w-10"
                        size="24"
                    />
                </button>
                <site-nav
                    v-gsap.from="{ opacity: 0, x: 40 }"
                    class="text-lg"
                    ul-classes="gap-3 flex flex-col"
                />
                <btn-join-today
                    class="mt-8 flex items-center justify-center self-start rounded-lg bg-orange-500 px-4 py-2 text-lg whitespace-nowrap text-white"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const uiStore = useUiStore()
</script>
