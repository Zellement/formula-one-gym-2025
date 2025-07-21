import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
    /**
     * State
     **/
    const showMobileNav: Ref<boolean> = ref(false)
    const animationsDisabled: Ref<boolean> = ref(false)
    const heroHeight: Ref<number> = ref(0)

    const showStudentModal: Ref<boolean> = ref(false)
    const showInductionModal: Ref<boolean> = ref(false)

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

    const toggleInductionModal = (visible?: boolean) => {
        if (visible) {
            showInductionModal.value = visible
            return
        }
        showInductionModal.value = !showInductionModal.value
    }

    /**
     * Return
     **/
    return {
        showMobileNav,
        animationsDisabled,
        heroHeight,
        showStudentModal,
        showInductionModal,
        toggleShowMobileNav,
        toggleAnimationsDisabled,
        toggleStudentModal,
        toggleInductionModal
    }
})
