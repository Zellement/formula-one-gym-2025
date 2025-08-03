<template>
    <div v-editable="blok" class="@container w-full">
        <ul
            v-gsap.delay-200.stagger.once.whenVisible.from="{
                opacity: 0,
                x: -20
            }"
            class="grid grid-cols-1 @xs:grid-cols-2"
        >
            <li
                v-for="(item, index) in defaultWhyChooseUs"
                :key="index"
                class="flex items-center gap-2"
            >
                <Icon :name="item.icon" size="40" class="text-primary" />
                <span>{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import type {
    AtomIconTitlePairStoryblok,
    ContentWhyChooseUsStoryblok
} from '~/types/storyblok-component-types'

const storyblokStore = useStoryblokStore()

defineProps<{ blok: ContentWhyChooseUsStoryblok }>()

const defaultWhyChooseUs: ComputedRef<AtomIconTitlePairStoryblok[]> = computed(
    () => {
        return storyblokStore.siteOptions?.defaultWhy || []
    }
)
</script>
