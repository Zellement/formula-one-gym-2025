<template>
    <div>
        <p class="font-bold">Discounted Parking</p>
        <ul class="w-full">
            <li
                v-for="item in discountedParking"
                :key="item.uid"
                class="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-2"
            >
                <span> {{ item.time }}</span>
                <span> {{ item.cost }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import type { DataDiscountedParkingOptionStoryblok } from '~/types/storyblok-component-types'

const storyblokStore = useStoryblokStore()

const discountedParking: ComputedRef<DataDiscountedParkingOptionStoryblok[]> =
    computed(() => {
        return storyblokStore.siteOptions?.discountedParking || []
    })
</script>
