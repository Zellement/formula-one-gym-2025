<template>
    <button @click.prevent="uiStore.toggleInductionModal(true)">
        Book your free induction
    </button>
</template>

<script lang="ts" setup>
const uiStore = useUiStore()
</script>
