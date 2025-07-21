<template>
    <div v-editable="blok" class="flex flex-col">
        <site-hero
            :title="blok.primary || storyName"
            :title-level="blok.primaryLevel?.toString() || 'p'"
            :subtitle="blok.secondary"
            :brow="blok.brow"
            :media="blok.media || []"
            :date="
                isHelpAdviceArticle && firstPublishedAt
                    ? new Date(firstPublishedAt).toLocaleDateString()
                    : null
            "
        />
        <div
            v-if="route.path === '/help-advice/'"
            v-gsap.delay-200.stagger.once.whenVisible.from="{
                opacity: 0,
                y: 10
            }"
            class="grid-layout container-px container mt-20"
        >
            <nuxt-link
                v-for="post in posts?.data?.value?.data?.stories"
                :key="post.id"
                :to="`/help-advice/${post.slug}`"
                class="group bg-ecru-500 col-span-full grid grid-cols-1 grid-rows-1 text-white transition-colors hover:text-orange-500 sm:col-span-6 md:col-span-4 xl:col-span-3"
            >
                <div class="col-start-1 row-start-1 overflow-clip">
                    <single-storyblok-picture
                        v-if="post.content.media?.[0].filename"
                        :url="post.content.media?.[0].filename"
                        :alt="post.content.media?.[0].alt ?? ''"
                        :sizes="[
                            { dimensions: '500x666', from: '700px' },
                            { dimensions: '600x400', from: '1px' }
                        ]"
                        :focus="post.content.media?.[0].focus"
                        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div
                    class="relative col-start-1 row-start-1 mt-auto flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 p-6"
                >
                    <h2 class="text-lg font-bold">{{ post.name }}</h2>
                    <p class="">
                        {{
                            new Date(
                                post.first_published_at
                            ).toLocaleDateString()
                        }}
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

defineProps<{
    blok: TemplatePageStoryblok
    storyName: string
    firstPublishedAt: string | null
}>()

const route = useRoute()
const posts = route.path === '/help-advice/' ? useHelpAdviceUtils() : null

const isHelpAdviceArticle: ComputedRef<boolean> = computed(() => {
    return route.path.startsWith('/help-advice/')
})
</script>
