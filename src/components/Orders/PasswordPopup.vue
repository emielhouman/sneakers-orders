<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { getEmailFromToken } from '../../auth';

const props = defineProps({ isVisible: Boolean });
const emits = defineEmits(['closePopup', 'passwordUpdate']);

const email = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const passwordUpdate = () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'The passwords do not match.';
    return;
  }
  email.value = getEmailFromToken();
  emits('passwordUpdate', email.value, newPassword.value);
  closePopup();
};

const closePopup = () => {
  emits('closePopup');
};
</script>

<template>
  <div v-if="isVisible" class="popup__container">
    <div class="popup__content">
      <div class="modal-header">
        <h2>Change Password</h2>
        <button class="close-button" @click="closePopup">&times;</button>
      </div>
      <div class="modal-body">
        <label for="password">New Password</label>
        <input id="password" type="password" v-model="newPassword" placeholder="Enter new password" />
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" v-model="confirmPassword" placeholder="Confirm new password" />
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
      <div class="modal-footer">
        <button class="button-primary" @click="passwordUpdate">Change Password</button>
        <button class="button-secondary" @click="closePopup">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Popup Container */
.popup__container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(.15rem);
  -webkit-backdrop-filter: blur(.15rem);
  z-index: 999;
}

/* Popup Content */
.popup__content {
  background: #fff;
  border-radius: .5rem;
  width: 85%;
  max-width: 35rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.modal-header h2 {
  font-size: 20px;
  margin: 0;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #333;
}

/* Modal Body */
.modal-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal-body label {
  font-size: 14px;
  color: #555;
}

.modal-body input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.2s ease;
}

.modal-body input:focus {
  border-color: #007bff;
}

.error-message {
  font-size: 12px;
  color: #d9534f;
  margin-top: -10px;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.button-primary {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.button-primary:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.button-secondary {
  background-color: #6c757d;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.button-secondary:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}
</style>