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
                    class="@container flex w-full flex-col gap-8 bg-linear-to-b from-orange-500 via-pizazz-500 to-blaze-orange-500 p-6 text-white lg:w-1/2 xl:gap-4"
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
                <div
                    class="order-first flex w-full bg-gray-100 lg:order-last lg:w-1/2"
                >
                    <iframe
                        title="Map of where we are located"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2403.7207820905182!2d-1.1483069223096876!3d52.95344697217786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c3d5996f7b75%3A0x8531186fa3c1bef3!2sFormula%20One%20Gym!5e0!3m2!1sen!2suk!4v1751053648344!5m2!1sen!2suk"
                        width="100%"
                        height="400"
                        style="border: 0"
                        allowfullscreen="false"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
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
