<template>
    <div class="flex duration-1000 hover:opacity-100">
        <footer
            role="contentinfo"
            class="relative z-10 w-full transition-transform duration-500"
        >
            <div class="flex flex-col lg:flex-row">
                <div
                    class="to-blaze-orange-500 via-pizazz-500 flex w-full shrink-0 flex-col gap-8 bg-gradient-to-b from-orange-500 p-8 text-white lg:max-w-96"
                >
                    <site-brand class="block max-w-56" />

                    <div class="flex flex-col gap-1 leading-tight">
                        <site-telephone />
                        <site-email />
                    </div>

                    <p class="flex flex-row gap-1">
                        <span>&copy;</span> Formula One Gym
                        <span>{{ date }}</span>
                    </p>

                    <discounted-parking />

                    <p>
                        <nuxt-link
                            to="https://www.zellement.com"
                            external
                            class="hover:underline"
                            target="_blank"
                        >
                            Site by Zellement
                        </nuxt-link>
                    </p>
                </div>
                <div class="flex grow bg-gray-100">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2403.7207820905182!2d-1.1483069223096876!3d52.95344697217786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c3d5996f7b75%3A0x8531186fa3c1bef3!2sFormula%20One%20Gym!5e0!3m2!1sen!2suk!4v1751053648344!5m2!1sen!2suk"
                        width="100%"
                        height="450"
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
