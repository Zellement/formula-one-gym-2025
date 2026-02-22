<template>
    <div class="mt-8 flex p-4 duration-1000 hover:opacity-100 lg:p-10">
        <footer
            role="contentinfo"
            class="relative z-10 w-full transition-transform duration-500"
        >
            <div
                class="flex w-full flex-col overflow-clip rounded-xl lg:flex-row"
            >
                <div
                    class="@container flex w-full flex-col gap-8 bg-linear-to-b from-orange-500 via-pizazz-500 to-blaze-orange-500 p-6 text-white xl:gap-4"
                >
                    <div class="grid gap-4 @sm:grid-cols-2">
                        <div class="flex flex-col gap-1 leading-tight">
                            <site-telephone />
                            <site-email />
                            <p class="flex items-center gap-1">
                                <span>&copy;</span> <span>{{ date }}</span>
                                Formula One Gym
                            </p>
                        </div>

                        <discounted-parking />
                    </div>
                    <site-brand class="mt-auto block max-w-48" />

                    <p class="text-sm">
                        Development by
                        <nuxt-link
                            to="https://www.zellement.com"
                            external
                            class="hover:underline"
                            target="_blank"
                        >
                            Zellement
                        </nuxt-link>
                        | Design by
                        <nuxt-link
                            to="https://www.georgewood.me/"
                            external
                            class="hover:underline"
                            target="_blank"
                        >
                            George Wood
                        </nuxt-link>
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script lang="ts" setup>
const date: ComputedRef<number> = computed(() => {
    return new Date().getFullYear()
})
</script>
