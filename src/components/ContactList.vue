<template>
	<h2>Список контактов</h2>
	<ul class="contact-list">
		<transition-group name="list">
			<li v-for="(contact) in contactList" :key="contact.id" class="contact-item">
				<contact-item :contact="contact" />
				<div class="buttons">
					<button @click="updateContact(contact.id)" class="update-button">Редактировать</button>
					<button @click="deleteContact(contact.id)" class="delete-button">Удалить</button>
				</div>
			</li>
		</transition-group>

	</ul>
</template>

<script lang="ts" setup>
import { PropType, defineProps, defineEmits } from 'vue';
import { Contact } from '@/types/types';
import ContactItem from './ContactItem.vue';

defineProps({
	contactList: {
		required: true,
		type: Array as PropType<Contact[]>
	},
});

const emit = defineEmits<{
	(e: 'delete-contact', value: string): void,
	(e: 'update-contact', value: string): void
}>();

const deleteContact = (id: string) => {
	emit('delete-contact', id);
};

const updateContact = (id: string) => {
	emit('update-contact', id);
};

</script>

<style lang="css" scoped>
.contact-list {
	list-style: none;
	padding: 0;
}

.contact-item {
	background: #e9ecef;
	margin: 10px 0;
	padding: 10px;
	display: flex;
	justify-content: space-between;
}

.delete-button {
	background-color: red;
}

.buttons {
	display: flex;
	gap: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>