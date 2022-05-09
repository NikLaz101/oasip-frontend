<script setup>
defineEmits(["delete"]);
</script>

<template>
    <button @click="$emit('delete')" class="btn m-2">
      Delete
    </button>
</template>

<style scoped></style>
