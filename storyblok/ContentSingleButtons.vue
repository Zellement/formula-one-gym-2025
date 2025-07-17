<template>
    <div class="flex flex-wrap gap-4">
        <template v-for="link in blok.links" :key="link._uid">
            <launch-induction-modal-button
                v-if="link.launchInductionModal"
                :class="link.buttonStyle"
            >
                {{ getLinkName(link) }}
            </launch-induction-modal-button>
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
