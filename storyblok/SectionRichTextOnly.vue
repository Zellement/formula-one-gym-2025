<template>
    <section v-editable="blok" :class="blok.backgroundStyle">
        <div class="container-px container">
            <div class="grid-layout @container pb-4">
                <rich-text
                    class="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4"
                    :content="blok.content"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { SectionRichTextOnlyStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: SectionRichTextOnlyStoryblok }>()
</script>
