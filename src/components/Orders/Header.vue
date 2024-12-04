<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PasswordChangeModal from './PasswordChangeModal.vue';

const props = defineProps(['totalOrders', 'totalPrices']);
const router = useRouter();

const isModalVisible = ref(false);

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value;
  console.log('Modal visibility:', isModalVisible.value);
};

const handlePasswordChange = (newPassword) => {
  console.log('Password updated:', newPassword);
  // Perform additional actions if needed
};

const handleUserLogout = () => {
  localStorage.removeItem('authToken');
  router.push('/login');
};

</script>

<template>
  <header class="header">
    <div class="header-left">
      <h1>O R D E R S</h1>
      <div>
        <p>Total Orders: <strong>{{ totalOrders }}</strong></p>
        <p>Total Prices: <strong>€{{ totalPrices.toFixed(2) }}</strong></p>
      </div>
    </div>
    <div class="header-right">
      <!-- Change Password Icon -->
      <div @click="toggleModal" class="change-password-wrapper">
  <i class="fa fa-key change-password-icon"></i>
</div>
      <!-- Logout Button -->
      <button class="logout-button" @click="handleUserLogout">Logout</button>
    </div>
  </header>
    <!-- Include PasswordChangeModal -->
    <PasswordChangeModal
  :isVisible="isModalVisible"
  @close="toggleModal"
  @passwordChanged="handlePasswordChange"
/>
</template>

<style scoped>
/* Header Container */
.header {
  display: flex;
  justify-content: space-between; /* Space between left and right sections */
  align-items: center; /* Vertically align items */
  padding: 18px;
  margin-bottom: 20px;
  color: #1b263b; /* Deep Navy */

}

/* Header Title and Stats */
.header-left {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header-left h1 {
  font-size: 24px;
  font-weight: bold;
  color: #007bff; /* Blue accent */
  margin: 0;
}

.live-counters {
  display: flex;
  gap: 20px;
}

.live-counters p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.live-counters strong {
  color: #1b263b; /* Deep Navy */
}

/* Logout Button Styling */
.logout-button {
  background-color: #6c757d; /* Red background */
  color: #fff; /* White text */
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  padding: 8px 15px; /* Button padding */
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  align-self: flex-start; /* Align button to the top-right */
}

/* Hover effect */
.logout-button:hover {
  background-color: #5a6268; /* Darker red on hover */
  transform: scale(1.05); /* Slightly larger */
}

/* Active button effect */
.logout-button:active {
  background-color: #495057; /* Even darker red */
  transform: scale(0.98); /* Slightly smaller */
}

/* Focus state for accessibility */
.logout-button:focus {
  outline: 2px solid #0056b3; /* Blue outline for focus */
  outline-offset: 2px;
}

.change-password-icon {
  font-size: 20px;
  margin-right: 15px;
  color: #007bff;
  cursor: pointer; /* Make sure it's clickable */
  transition: color 0.3s ease, transform 0.2s ease;
}

.change-password-icon:hover {
  color: #0056b3; /* Darker blue on hover */
  transform: scale(1.2); /* Slightly larger */
}
.change-password-wrapper {
  display: inline-block;
  cursor: pointer;
}
.change-password-icon:active {
  color: #003d80; /* Even darker blue */
  transform: scale(0.95); /* Slightly smaller */
}


</style>