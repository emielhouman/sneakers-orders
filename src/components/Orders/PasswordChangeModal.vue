<script setup>
import { ref } from 'vue';
const props = defineProps(['isVisible']);
const emits = defineEmits(['close', 'passwordChanged']);

const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const handlePasswordChange = () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }
  emits('passwordChanged', newPassword.value);
  closeModal();
};

const closeModal = () => {
  emits('close');
};
</script>

<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Change Password</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <label for="newPassword">New Password</label>
        <input id="newPassword" type="password" v-model="newPassword" placeholder="Enter new password" />
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" v-model="confirmPassword" placeholder="Confirm new password" />
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
      <div class="modal-footer">
        <button class="button-primary" @click="handlePasswordChange">Change Password</button>
        <button class="button-secondary" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modal Overlay */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Content */
.modal-content {
  background: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 20px;
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