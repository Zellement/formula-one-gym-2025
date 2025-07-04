<template>
    <figure v-if="imgData.url" :class="['relative overflow-clip', fitClasses]">
        <component
            :is="enableParallax ? Parallaxy : 'div'"
            class="h-full w-full"
            :speed="parallaxSpeed"
            :animate="animateParallax"
            :disabled="!enableParallax"
        >
            <!--placeholder-->
            <transition name="placeholder-image">
                <div
                    v-if="!state.mediaLoaded"
                    class="absolute inset-0 grid h-full w-full grid-cols-1 place-items-center"
                    aria-hidden="true"
                >
                    <nuxt-img
                        :key="`${pictureKey}-placeholder`"
                        :src="imgData.url"
                        alt=""
                        width="32"
                        loading="eager"
                        aria-hidden="true"
                        class="h-full w-full scale-125 transform-gpu object-cover blur-md"
                        densities="1"
                        :provider="provider"
                    />

                    <!--Spinner-->
                    <div
                        class="absolute h-5 w-5 animate-spin rounded-full border-2 border-black/10 border-l-white"
                    />
                </div>
            </transition>
            <nuxt-picture
                ref="image"
                :key="pictureKey"
                :src="imgData.url"
                :alt="imgData.alt"
                :width="imageWidth"
                :height="imageHeight"
                :class="[
                    pictureTransitionClasses,
                    'block transition-opacity duration-200',
                    pictureClassList,
                    fitClasses
                ]"
                :sizes="srcSetSizes"
                :loading="loading"
                :preload="preloadImage"
                :provider="provider"
                :modifiers="modifiers"
                @load="mediaLoaded"
            />
        </component>
        <figcaption
            v-if="caption"
            :class="['brow--serif mt-4 block', captionClasses]"
        >
            {{ caption }}
        </figcaption>
    </figure>
</template>

<script lang="ts" setup>
import Parallaxy from '@lucien144/vue3-parallaxy'
import type { NuxtPicture } from '#components'

/* --------------------------
// TS Types & Interfaces
-------------------------- */

interface Props {
    imgData: ImageTypes
    sizes?: string
    parallax?: boolean
    parallaxSpeed?: number
    parallaxPercentage?: number
    loading?: 'lazy' | 'eager'
    preload?: boolean
    caption?: string | null
    pictureClasses?: string | string[]
    fit?: 'cover' | 'contain'
    width?: number | string
    height?: number | string
    fullscreen?: boolean
    captionClasses?: string
}

interface State {
    mediaLoaded: boolean
}

/* --------------------------
// Consts, Props, Refs & State
-------------------------- */
const route = useRoute()
const uiStore = useUiStore()
const attrs = useAttrs()
const viewport = useViewport()
const id = useId()

const props = withDefaults(defineProps<Props>(), {
    parallax: false,
    parallaxSpeed: 1,
    parallaxPercentage: 0.5,
    sizes: '336px 2xs:368px xs:410px sm:480px md:690px lg:878px xl:1024px 2xl:1162px 3xl:1299px max:1520px',
    loading: 'lazy',
    preload: false,
    caption: null,
    pictureClasses: undefined,
    width: undefined,
    height: undefined,
    fit: 'cover',
    layout: 'responsive',
    captionClasses: undefined,
    fullscreen: false
})

const srcSetSizes: ComputedRef<string> = computed(() =>
    props.fullscreen ? props.sizes + ' fullscreen:100vw' : props.sizes
)

const state: State = reactive({
    mediaLoaded: false
})

const image = ref<InstanceType<typeof NuxtPicture> | null | undefined>(null)

const emit = defineEmits<{
    (e: 'loaded'): void
}>()

/* --------------------------
// Computed
-------------------------- */

const modifiers: ComputedRef<{ filters: { focal: string } } | undefined> =
    computed(() => {
        if (provider.value !== 'storyblok') return undefined
        return { filters: { focal: props.imgData.focus ?? '' } }
    })

const pictureKey: ComputedRef<string> = computed(() => {
    return `${route.fullPath}-${props.imgData?.url}-${id}-${viewport.breakpoint.value}`
})

const aspectRatioClass: ComputedRef<string> = computed(() => {
    const classes = [attrs.class].join(' ')

    // Match all aspect-* classes
    const matches = classes.match(/\b(?:[a-z]{2,}:)?aspect-[a-z0-9/-]+\b/g)

    if (!matches) return ''

    // Filter responsive variants
    const responsiveVariants = matches.filter((match) => match.includes(':'))

    // Reverse the responsiveVariants array and iterate through it
    for (const variant of [...responsiveVariants].reverse()) {
        const [screen, ratio] = variant.split(':')
        if (viewport.isGreaterOrEquals(screen)) {
            return ratio // Return the first matching responsive variant (largest)
        }
    }

    // Fallback to the first non-responsive aspect-* class
    return matches.find((match) => !match.includes(':')) || ''
})

//copied from tailwind config
const definedAspectRatios: Record<string, string> = {
    square: '1 / 1',
    video: '16 / 9',
    landscape: '383 / 235',
    '2/3': '2 / 3',
    '5/2': '5 / 2',
    '2/1': '2 / 1',
    '4/5': '4 / 5',
    tall: '390 / 550',
    'unit-img': '345 / 359',
    'social-tall': '360 / 504',
    carousel: '12 / 16'
}

const imageAspectRatio: ComputedRef<{
    width: number | undefined
    height: number | undefined
}> = computed(() => {
    if (!aspectRatioClass.value) return { width: undefined, height: undefined }

    const key: string = aspectRatioClass.value.replace('aspect-', '')
    const ratio: string = definedAspectRatios[key]

    if (!ratio) return { width: undefined, height: undefined }

    return {
        width: parseInt(ratio.split(' / ')[0]),
        height: parseInt(ratio.split(' / ')[1])
    }
})

const imageWidth: ComputedRef<number | string | undefined> = computed(() => {
    return props.width || imageAspectRatio.value.width
})

const imageHeight: ComputedRef<number | string | undefined> = computed(() => {
    return props.height || imageAspectRatio.value.height
})

const animationsDisabled: ComputedRef<boolean> = computed(() => {
    return uiStore.animationsDisabled
})

const pictureClassList: ComputedRef<string> = computed(() => {
    if (Array.isArray(props.pictureClasses)) {
        return props.pictureClasses.join(' ')
    }

    return props.pictureClasses ?? ''
})

const pictureTransitionClasses: ComputedRef<string> = computed(() => {
    return animationsDisabled.value
        ? '!opacity-100'
        : state.mediaLoaded
          ? 'opacity-100'
          : 'opacity-0'
})

const enableParallax: ComputedRef<boolean> = computed(() => {
    return props.parallax && !animationsDisabled.value
})

const provider: ComputedRef<string | undefined> = computed(() => {
    const isStoryblokDomain = props.imgData?.url?.includes('storyblok.com')
    return isStoryblokDomain ? 'storyblok' : undefined
})

const fitClasses: ComputedRef<string> = computed(() => {
    return props.fit === 'cover'
        ? 'object-cover h-full w-full'
        : 'object-contain'
})

const preloadImage: ComputedRef<boolean> = computed(() => {
    return props.preload || props.loading === 'eager'
})

/* --------------------------
// Methods
-------------------------- */

const mediaLoaded = (): void => {
    state.mediaLoaded = true
    emit('loaded')
}

/**
 * Animation function for Parallaxy component that calculates a
 * movement based on the delta value and a percentage.
 * @param delta The current elements position
 * @returns A CSS transform string.
 */
const animateParallax = (delta: number): string => {
    const offset = 1 + props.parallaxPercentage
    const distance = delta * offset
    return `transform: translate3d(0, ${distance}, 0);`
}

onUnmounted(() => {
    // window.removeEventListener('resize', getImageDimensions)
    state.mediaLoaded = false
})
</script>
