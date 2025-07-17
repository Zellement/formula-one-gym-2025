import type { EmblaCarousel } from '#components'
import type { EmblaCarouselType } from 'embla-carousel'

export function useEternalEmblaCarouselControls(
    emblaRef: Ref<InstanceType<typeof EmblaCarousel> | null>,
    { scrollSlides }: { scrollSlides: number | 'allInView' } = {
        scrollSlides: 1
    }
) {
    const { debounce } = useHelpers()

    const currentIndex: Ref<number> = ref(0)
    const slidesInView: Ref<number> = ref(0)
    const canScrollPrev: Ref<boolean> = ref(false)
    const canScrollNext: Ref<boolean> = ref(true)

    const handleScrollClick = (direction: 'Next' | 'Prev'): void => {
        if (!emblaRef.value) return
        const scrollCount =
            scrollSlides === 'allInView' ? slidesInView.value : scrollSlides

        let scrollTo: number

        if (direction === 'Next') {
            scrollTo = currentIndex.value + scrollCount
        } else {
            scrollTo = currentIndex.value - scrollCount
        }

        emblaRef.value.emblaApi?.scrollTo(scrollTo)
    }

    const setCanScroll = (): void => {
        canScrollPrev.value = emblaRef.value?.emblaApi?.canScrollPrev() ?? false
        canScrollNext.value = emblaRef.value?.emblaApi?.canScrollNext() ?? false
    }

    const resetState = (): void => {
        currentIndex.value = 0

        canScrollPrev.value = false
        canScrollNext.value = true
    }

    const updateCurrentIndex = (): void => {
        currentIndex.value = emblaRef.value!.emblaApi?.selectedScrollSnap() ?? 0

        setCanScroll()
    }

    const setSlidesInView = (emblaApi: EmblaCarouselType): void => {
        const container = emblaApi.containerNode()
        const slides = emblaApi.slideNodes()
        const slidesInViewIds = emblaApi.slidesInView()

        if (!container || slides.length === 0 || slidesInViewIds.length === 0)
            return

        const { scrollWidth, offsetWidth } = container

        // Calculate gap between slides
        const totalSlidesWidth = slides.reduce(
            (acc, slide) => acc + slide.offsetWidth,
            0
        )
        const gap = (scrollWidth - totalSlidesWidth) / slides.length

        // Get the visible slides
        const visibleSlides = slides.slice(
            slidesInViewIds[0],
            slidesInViewIds[slidesInViewIds.length - 1] + 1
        )

        // Calculate total width of visible slides
        const visibleSlidesWidth =
            visibleSlides.reduce((acc, slide) => acc + slide.offsetWidth, 0) +
            gap * slidesInViewIds.length

        // Adjust slides in view count
        slidesInView.value =
            (visibleSlidesWidth >= offsetWidth
                ? slidesInViewIds.length - 1
                : slidesInViewIds.length) || 1
    }

    const debouncedSetSlidesInView = debounce(setSlidesInView, 200)

    const setEmblaListeners = (): void => {
        emblaRef.value?.emblaApi?.on('select', () => {
            updateCurrentIndex()
        })

        emblaRef.value?.emblaApi?.on('resize', () => {
            updateCurrentIndex()
        })

        if (scrollSlides === 'allInView')
            emblaRef.value?.emblaApi?.on('slidesInView', (emblaApi) =>
                debouncedSetSlidesInView(emblaApi)
            )

        emblaRef.value?.emblaApi?.on('init', () => {
            setCanScroll()
        })
    }

    watch(
        emblaRef,
        () => {
            if (emblaRef.value) {
                setEmblaListeners()
                if (scrollSlides === 'allInView')
                    emblaRef.value.emblaApi?.reInit({ align: 'start' })
            } else {
                resetState()
            }
        },
        { immediate: true }
    )

    return {
        canScrollPrev,
        canScrollNext,
        handleScrollClick,
        currentIndex
    }
}
