<template>
    <div>
        <strong>{{ contact.name }}</strong> - {{ contact.email }} - {{ contact.phone }}
    </div>
</template>

<script lang="ts" setup>

import { PropType, defineProps } from 'vue';
import { Contact } from '@/types/types';

defineProps({
    contact: {
        required: true,
        type: {} as PropType<Contact>
    },
});

</script>

<style lang="css" scoped>

</style>