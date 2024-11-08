<template>
  <div v-if="!isPageLoading" class="container">
    <div :class="{ 'disabled': isUpdateWindowOpen }">
      <h1>Управление контактами</h1>
      <add-contact-form @add-contact="addContact" />
      <search-query v-model="searchQuery" />
      <contact-list :contactList="filteredContacts" @update-contact="updateContact" @delete-contact="deleteContact" />
    </div>
    <div v-if="isUpdateWindowOpen" class="modal-window-update">
      <update-contact-form :oldContact="updatingContact" @close="isUpdateWindowOpen = false"
        @update-contact="confirmChanges" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import ContactList from './components/ContactList.vue';
import SearchQuery from './components/SearchQuery.vue';
import AddContactForm from './components/AddContactForm.vue';
import UpdateContactForm from './components/UpdateContactForm.vue';
import { listContacts } from './api/contacts.api';
import { ContactFormData } from './types/types';

const contacts = ref();
const searchQuery = ref('');
const isUpdateWindowOpen = ref(false);
const updatingContact = ref();
const isPageLoading = ref(true);

const filteredContacts = computed(() => {
  return contacts.value.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const addContact = (newContact: ContactFormData) => {
  if (newContact.name.trim() && newContact.email.trim() && newContact.phone.trim()) {
    contacts.value.push({ id: `${Math.random()}`, ...newContact });
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
  }
};

const updateContact = (id: string) => {
  isUpdateWindowOpen.value = true;
  updatingContact.value = contacts.value.find((contact) => contact.id === id);
};

const confirmChanges = () => {
  isUpdateWindowOpen.value = false;
  localStorage.setItem('contacts', JSON.stringify(contacts.value));
};

const deleteContact = (id: string) => {
  contacts.value = contacts.value.filter((contact) => contact.id !== id);
  localStorage.setItem('contacts', JSON.stringify(contacts.value));
};

onBeforeMount(async () => {
  isPageLoading.value = true;

  const storage = localStorage.getItem('contacts');
  if (storage) {
    contacts.value = JSON.parse(storage);
  } else {
    contacts.value = await listContacts();
  }

  isPageLoading.value = false;
})
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.modal-window-update {
  display: flex;
  justify-content: center;
  align-items: center;
}

.disabled {
  pointer-events: none;
  opacity: 0.1;
}

.container {
  width: 50%;
  margin: auto;
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background-color: #218838;
}
</style>