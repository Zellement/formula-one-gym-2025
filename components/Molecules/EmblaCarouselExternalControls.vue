<template>
    <div
        v-if="!(nextDisabled && prevDisabled)"
        class="flex items-center justify-between gap-1.5 text-white"
    >
        <button
            aria-label="Previous Slide"
            :disabled="prevDisabled"
            :class="btnClasses"
            class="cursor-pointer bg-black/40 p-1 leading-none transition-colors hover:scale-110 hover:bg-black/70 hover:text-white disabled:pointer-events-none disabled:opacity-40 disabled:hover:bg-black/40"
            @click.prevent="handleClick('Prev')"
        >
            <Icon
                size="30"
                name="material-symbols-light:arrow-forward-ios"
                class="m-auto -rotate-180"
            />
        </button>
        <button
            aria-label="Next Slide"
            :disabled="nextDisabled"
            :class="btnClasses"
            class=":not:disabled:hover:scale-110 cursor-pointer bg-black/40 p-1 leading-none transition-colors hover:bg-black/70 hover:text-white disabled:pointer-events-none disabled:opacity-40 disabled:hover:bg-black/40"
            @click.prevent="handleClick('Next')"
        >
            <Icon
                size="30"
                name="material-symbols-light:arrow-forward-ios"
                class="m-auto"
            />
        </button>
    </div>
</template>

<script setup lang="ts">
interface Props {
    nextDisabled?: boolean
    prevDisabled?: boolean
    btnClasses?: string
}

/**
 * Composables
 */

/**
 * Props / Data
 */

defineProps<Props>()
const emit = defineEmits<{
    (e: 'scroll', direction: 'Next' | 'Prev'): void
}>()

/**
 * Functions
 */

const handleClick = (direction: 'Next' | 'Prev'): void => {
    emit('scroll', direction)
}
</script>
