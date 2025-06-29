<template>
    <div
        class="to-blaze-orange-500 via-pizazz-500 h-80 bg-gradient-to-b from-orange-500 pt-32 text-white"
    >
        <div class="container-px container">
            <h1
                v-gsap.fromInvisible.from="{ translateY: 20, opacity: 0 }"
                class="h1 font-bold"
            >
                This is quite a lot of text.
            </h1>
            <h2
                v-gsap.fromInvisible.from="{ translateY: -10, opacity: 0 }"
                class="h2"
            >
                Some subtext
            </h2>
        </div>
    </div>
</template>

<script lang="ts" setup></script>
