<template>
    <div v-editable="blok" class="flex flex-col">
        <site-hero
            :title="blok.primary || storyName"
            :title-level="blok.title_level || 'p'"
            :subtitle="blok.secondary"
            :brow="blok.brow"
            :media="blok.media || []"
        />
        <div
            v-if="route.path === '/help-advice/'"
            class="grid-layout container-px container mt-20"
        >
            <nuxt-link
                v-for="post in posts?.data.stories"
                :key="post.id"
                :to="`/help-advice/${post.slug}`"
                class="col-span-full grid grid-cols-1 grid-rows-1 bg-red-100 sm:col-span-6 md:col-span-4 xl:col-span-3"
            >
                <div class="col-start-1 row-start-1">
                    <single-storyblok-picture
                        v-if="post.content.media?.[0].filename"
                        :url="post.content.media?.[0].filename"
                        :alt="post.content.media?.[0].alt ?? ''"
                        :sizes="[
                            { dimensions: '500x666', from: '700px' },
                            { dimensions: '600x400', from: '1px' }
                        ]"
                        :focus="post.content.media?.[0].focus"
                        class="h-full w-full object-cover"
                    />
                </div>

                <div
                    class="relative col-start-1 row-start-1 mt-auto flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 p-6 text-white"
                >
                    <h2 class="text-lg font-bold">{{ post.name }}</h2>
                    <p class="">
                        {{ post.content.excerpt }}
                    </p>
                </div>
            </nuxt-link>
        </div>
        <template v-else>
            <storyblok-component
                v-for="nestedBlok in blok.body"
                :key="nestedBlok._uid"
                :blok="nestedBlok"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import type { TemplatePageStoryblok } from '~/types/storyblok-component-types'

defineProps<{ blok: TemplatePageStoryblok; storyName: string }>()

const route = useRoute()

const { data: posts } = await useAsyncData('posts', () =>
    useStoryblokApi().get('cdn/stories', {
        starts_with: 'help-advice/',
        version: 'published',
        resolve_links: 'story',
        is_startpage: false,
        sort_by: 'first_published_at:desc'
    })
)
</script>
