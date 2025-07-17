<template>
    <div class="relative h-full xl:flex-grow">
        <!-- Slides -->
        <div
            ref="emblaRef"
            class="embla relative max-h-[inherit]"
            :class="{ 'embla--overflow': overflow }"
        >
            <div class="embla__container" :class="wrapperClasses">
                <slot name="carousel-items"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'
import type { EmblaOptionsType } from 'embla-carousel'

/**
 * Types, interfaces, props & state
 */
interface Props {
    // Booleans
    overflow?: boolean
    // Strings
    wrapperClasses?: string
    // Embla & Storyblok specific
    options?: EmblaOptionsType
}

const props = withDefaults(defineProps<Props>(), {
    // Booleans
    overflow: false,
    // Strings
    wrapperClasses: '',
    // Embla & Storyblok specific
    options: undefined
})

/**
 * Embla Options & API
 */

const [emblaRef, emblaApi] = emblaCarouselVue(props.options)
defineExpose({ emblaApi })

/**
 * Lifecycle hooks
 */
onMounted(() => {
    if (!emblaApi.value) return
    emblaApi.value.slideNodes()
})

onUnmounted(() => {
    if (emblaApi.value) {
        emblaApi.value.destroy()
    }
})
</script>
