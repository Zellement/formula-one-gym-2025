<template>
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
    >
        <div
            class="@container relative flex max-h-[90svh] w-full max-w-md flex-col gap-3 overflow-y-auto rounded-lg bg-white p-8 shadow-lg"
        >
            <h2 class="pr-20 text-xl font-bold">
                {{ siteOptions?.inductionModalTitle }}
            </h2>
            <p class="whitespace-pre-line text-gray-700">
                {{ siteOptions?.inductionModalText }}
            </p>

            <div>INDUCTION FORM HERE</div>

            <div class="absolute top-2 right-2">
                <button
                    class="btn btn--naked flex items-center gap-1"
                    aria-label="Close mobile navigation"
                    @click="uiStore.toggleInductionModal(false)"
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
