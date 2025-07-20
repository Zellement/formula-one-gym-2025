import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
    /**
     * State
     **/
    const showMobileNav: Ref<boolean> = ref(false)
    const animationsDisabled: Ref<boolean> = ref(false)
    const heroHeight: Ref<number> = ref(0)

    const showStudentModal: Ref<boolean> = ref(false)

    /**
     * Getters
     **/

    /**
     * Actions
     **/
    const toggleShowMobileNav = (visible?: boolean) => {
        if (visible) {
            showMobileNav.value = visible
            return
        }
        showMobileNav.value = !showMobileNav.value
    }

    const toggleAnimationsDisabled = (visible?: boolean) => {
        if (visible) {
            animationsDisabled.value = visible
            return
        }
        animationsDisabled.value = !animationsDisabled.value
    }

    const toggleStudentModal = (visible?: boolean) => {
        if (visible) {
            showStudentModal.value = visible
            return
        }
        showStudentModal.value = !showStudentModal.value
    }

    /**
     * Return
     **/
    return {
        showMobileNav,
        animationsDisabled,
        heroHeight,
        showStudentModal,
        toggleShowMobileNav,
        toggleAnimationsDisabled,
        toggleStudentModal
    }
})
