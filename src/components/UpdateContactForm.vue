<template>
	<div class="update-contact-form">
		<form @submit.prevent="updateContact">
			<input type="text" v-model="newContact.name" :placeholder="oldContact.name" required />
			<input type="email" v-model="newContact.email" :placeholder="oldContact.email" required />
			<input type="tel" v-model="newContact.phone" :placeholder="oldContact.phone" required />
			<div class="update-form-buttons">
				<button type="submit">Применить</button>
				<button type="button" @click.prevent="closeModal">Отменить</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, PropType, defineProps } from 'vue';
import { Contact } from '@/types/types';

const props = defineProps({
	oldContact: {
		required: true,
		type: Object as PropType<Contact>
	}
});

const newContact = ref({
	name: '',
	email: '',
	phone: ''
});

const emit = defineEmits<{
	(e: 'update-contact', value: Contact): void,
	(e: 'close'): void
}>();

const updateContact = () => {
	emit('update-contact', Object.assign(props.oldContact, { ...newContact.value }));
	newContact.value.name = '';
	newContact.value.email = '';
	newContact.value.phone = '';
};

const closeModal = () => {
	emit('close');
};

</script>

<style lang="css" scoped>
.update-contact-form {
	background: rgb(173, 162, 162);
	border-radius: 5px;
	padding: 1%;
	position: absolute;
	top: 30%;
	width: 700px;
	height: auto;
}

.update-form-buttons {
	display: flex;
	gap: 10px;
}

.update-form-buttons :last-child {
	background-color: red;
}
</style>