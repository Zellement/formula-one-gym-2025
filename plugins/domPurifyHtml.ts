import DOMPurify from 'isomorphic-dompurify'
import type { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp): void => {
    nuxtApp.vueApp.directive('dompurify-html', {
        beforeMount(el: HTMLElement, binding: DirectiveBinding): void {
            // Don't run on hydration so we can keep the HTML from the server
            if (nuxtApp.isHydrating) return
            // Sanitise the html on the client
            el.innerHTML = DOMPurify.sanitize(binding.value)
        },
        getSSRProps(binding: DirectiveBinding): { innerHTML: string } {
            // Sanitise the html on the server
            return {
                innerHTML: DOMPurify.sanitize(binding.value)
            }
        }
    })
})
