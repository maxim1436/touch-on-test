<template>
    <form @submit.prevent="addContact">
      <input type="text" v-model="newContact.name" placeholder="Имя" required />
      <input type="email" v-model="newContact.email" placeholder="Email" required />
      <input type="tel" v-model="newContact.phone" placeholder="Телефон" required />
      <button type="submit">Добавить контакт</button>
    </form>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { ContactFormData } from '@/types/types';

const newContact = ref({
  name: '',
  email: '',
  phone: ''
});

const emit = defineEmits<{
    (e: 'add-contact', value: ContactFormData): void
}>();

const addContact = () => {
    emit('add-contact', newContact.value );
    newContact.value.name = '';
    newContact.value.email = '';
    newContact.value.phone = '';
};
</script>

<style lang="css" scoped>
</style>