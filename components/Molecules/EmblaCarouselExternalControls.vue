<template>
    <div
        v-if="!(nextDisabled && prevDisabled)"
        class="flex items-center justify-between gap-1.5"
    >
        <button
            aria-label="Previous Slide"
            :disabled="prevDisabled"
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
