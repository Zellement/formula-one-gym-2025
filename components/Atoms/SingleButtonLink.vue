<template>
    <nuxt-link
        v-if="isLink"
        :to="generateLink"
        :external="isExternalLink"
        :target="target"
        :active-class="activeClass"
    >
        <slot />
        <icon
            v-if="icon"
            :size="iconSize ?? 16"
            :name="icon"
            :class="iconClasses"
        />
    </nuxt-link>

    <button v-else type="button">
        <slot />
        <icon
            v-if="icon"
            :size="iconSize ?? 16"
            :name="icon"
            :class="iconClasses"
        />
    </button>
</template>

<script setup lang="ts">
/*---------------------
Props
---------------------*/
interface Props {
    external?: boolean
    to?: string
    icon: string
    iconSize?: number
    iconClasses?: string | string[]
    activeClass?: string
}

const props = withDefaults(defineProps<Partial<Props>>(), {
    external: false
})

/*---------------------
Computed
---------------------*/

const isLink: ComputedRef<boolean> = computed(
    () => !!props.to && props.to !== '#' && props.to !== ''
)

const isExternalLink: ComputedRef<boolean> = computed(() => {
    return isLink.value && props.external
})

const isTelOrEmailProtocol: ComputedRef<boolean> = computed(() => {
    const url = props.to || ''
    return url.startsWith('mailto:') || url.startsWith('tel:')
})

const target: ComputedRef<string> = computed(() => {
    const isExternal = isExternalLink.value && !isTelOrEmailProtocol.value
    return isExternal ? '_blank' : '_self'
})

const generateLink: ComputedRef<string | undefined> = computed(() => {
    if (!isLink.value) return undefined
    if (!props.to) return undefined
    if (props.external) return props.to
    if (
        props.to.startsWith('#') ||
        props.to.startsWith('?') ||
        isTelOrEmailProtocol.value
    )
        return props.to
    return props.to
})
</script>
