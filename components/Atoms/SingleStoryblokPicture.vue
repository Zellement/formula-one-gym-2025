<template>
    <div class="relative h-full">
        <icon
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
                :loading="lazyLoading"
                class="relative h-full w-full"
            />
        </picture>
    </div>
</template>
<script lang="ts" setup>
/**
 * SingleStoryblokPicture.vue
 *
 * Renders a responsive <picture> element for Storyblok images, supporting multiple breakpoints and optional focal point.
 *
 * @component
 * @prop {string} url - The base URL of the image.
 * @prop {string} alt - The alt text for the image.
 * @prop {string[]} dimensions - Array of image sizes in 'widthxheight' format (e.g., ['1600x800', '1200x800']).
 *   The first item is the largest, the last is the smallest. Breakpoints are automatically calculated.
 * @prop {'lazy'|'eager'} [loading='lazy'] - The loading strategy for the image.
 * @prop {boolean} [hideSpinner] - If true, hides the loading spinner. Good for logos that are transparent.
 * @prop {string|null} [focus] - Optional focal point for the image, passed as a string (e.g., 'center,top').
 *
 * @example
 * <single-storyblok-picture
 *   :url="image.filename"
 *   :alt="image.alt"
 *   :focus="image.focus"
 *   :dimensions="['1600x800', '1200x800', '800x700', '500x700', '450x700']" // Always largest width to smallest
 * />
 */

interface Props {
    url: string
    alt: string
    dimensions: string[]
    loading?: LazyLoadingOptions
    hideSpinner?: boolean
    focus?: string | null
}

type LazyLoadingOptions = 'lazy' | 'eager'

interface Sizes {
    dimensions: string
    from: string
}

const props = defineProps<Props>()

const orderedDimensions = computed(() => {
    // Ensure dimensions are sorted from largest to smallest
    return [...props.dimensions].sort((a, b) => {
        const [widthA] = a.split('x').map(Number)
        const [widthB] = b.split('x').map(Number)
        return widthB - widthA // Sort descending
    })
})

/**
 * Computes the responsive sizes array from the dimensions prop.
 * Each size's `from` is set to the width of the next size, except the last which is '1px'.
 */
const sizes: ComputedRef<Sizes[]> = computed(() => {
    return orderedDimensions.value.map((dim, i, arr) => ({
        dimensions: dim,
        from: i === arr.length - 1 ? '1px' : arr[i + 1].split('x')[0] + 'px'
    }))
})

/**
 * Computes the loading attribute for the <img> tag.
 */
const lazyLoading: ComputedRef<LazyLoadingOptions> = computed(() => {
    return props.loading ?? 'lazy'
})

/**
 * Returns the image path for a given size, including optional focal point.
 */
const getImagePath = (size: Sizes): string => {
    if (props.focus) {
        return `${props.url}/m/${size.dimensions}/filters:format(webp):focal(${props.focus})`
    }
    return `${props.url}/m/${size.dimensions}/filters:format(webp)`
}
</script>
