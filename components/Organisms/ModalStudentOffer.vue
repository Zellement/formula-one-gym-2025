<template>
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-teal-800/80 p-8"
    >
        <div
            class="@container relative flex max-h-[90svh] w-full max-w-md flex-col gap-3 overflow-y-auto rounded-lg bg-white p-8 shadow-lg"
        >
            <h2 class="pr-20 text-xl font-bold text-teal-800">
                {{ siteOptions?.modalTitle }}
            </h2>
            <p class="text-lg text-teal-500">
                {{ siteOptions?.modalPrice }}
            </p>
            <p class="whitespace-pre-line text-gray-700">
                {{ siteOptions?.modalText }}
            </p>
            <ul class="@sm:grid @sm:grid-cols-2 @sm:gap-2">
                <storyblok-component
                    v-for="(item, index) in siteOptions?.modalList"
                    :key="item._uid || index"
                    :blok="item"
                />
            </ul>
            <btn-join-today
                class="flex items-center justify-center self-start rounded bg-orange-500 px-4 py-2 whitespace-nowrap text-white"
            />
            <div class="absolute top-2 right-2">
                <button
                    class="btn btn--naked flex items-center gap-1"
                    aria-label="Close mobile navigation"
                    @click="uiStore.toggleStudentModal(false)"
                >
                    Close
                    <Icon
                        name="material-symbols-light:cancel"
                        class="h-10 w-10"
                        size="24"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { MetaSiteOptionsStoryblok } from '~/types/storyblok-component-types'

const uiStore = useUiStore()
const storyblokStore = useStoryblokStore()

const siteOptions: ComputedRef<MetaSiteOptionsStoryblok | null> = computed(
    () => {
        return storyblokStore.siteOptions
    }
)
</script>
