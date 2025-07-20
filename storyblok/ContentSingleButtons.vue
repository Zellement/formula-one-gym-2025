<template>
    <div
        v-editable="blok"
        v-gsap.delay-200.stagger.once.whenVisible.from="{
            opacity: 0,
            y: 10
        }"
        class="flex flex-wrap gap-4"
    >
        <template v-for="link in blok.links" :key="link._uid">
            <btn-launch-induction-modal
                v-if="link.launchInductionModal"
                :class="link.buttonStyle"
            />
            <single-button-link
                v-else-if="getLinkUrl(link)"
                :to="getLinkUrl(link)"
                :class="link.buttonStyle"
            >
                {{ getLinkName(link) }}
            </single-button-link>
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { ContentRichTextStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: ContentRichTextStoryblok }>()

const { getLinkUrl, getLinkName } = useStoryblokUtils()
</script>
