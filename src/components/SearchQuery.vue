<template>
    <h2>Поиск контактов</h2>
    <input type="text" @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :value="modelValue" placeholder="Поиск по имени" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
    modelValue: {
        type: String,
    }
});

</script>

<style lang="css" scoped></style>