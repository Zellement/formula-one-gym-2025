<script setup>
defineProps({ blok: Object })
</script>

<template>
    <div class="bg-red-500">
        <span>{{ blok.name }}</span>
    </div>
</template>
