<template>
    <div class="relative h-full">
        <Icon
            v-if="!hideSpinner"
            name="svg-spinners:eclipse"
            class="absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2"
        />

        <picture>
            <source
                v-for="size in sizes"
                :key="size.from"
                type="image/webp"
                :media="`(min-width: ${size.from})`"
                :srcset="getImagePath(size)"
            />
            <img
                :src="`${url}/m/${sizes[0].dimensions}`"
                :alt="alt"
                :loading="loading ?? 'lazy'"
                class="relative h-full w-full"
                :class="imgClasses"
            />
        </picture>
    </div>
</template>

<script lang="ts" setup>
// This component is not stress tested - please proceed with caution

/* --------------------------
// TS Types & Interfaces
-------------------------- */

interface Props {
    url: string
    alt: string
    sizes: Sizes[]
    loading?: 'lazy' | 'eager'
    hideSpinner?: boolean
    focus?: string | null
    imgClasses?: string
}

interface Sizes {
    dimensions: string
    from: string
}

const props = defineProps<Props>()

const getImagePath = (size: Sizes): string => {
    if (props.focus) {
        return `${props.url}/m/${size.dimensions}/filters:format(webp):focal(${props.focus})`
    }
    return `${props.url}/m/${size.dimensions}/filters:format(webp)`
}
</script>
