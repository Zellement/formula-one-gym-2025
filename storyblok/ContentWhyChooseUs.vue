<template>
    <div class="@container">
        <ul class="grid grid-cols-1 @xs:grid-cols-2">
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
import type { AtomIconTitlePairStoryblok } from '~/types/storyblok-component-types'

const storyblokStore = useStoryblokStore()

const defaultWhyChooseUs: ComputedRef<AtomIconTitlePairStoryblok[]> = computed(
    () => {
        return storyblokStore.siteOptions?.defaultWhy || []
    }
)
</script>
