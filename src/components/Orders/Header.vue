<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import resetPasswordIcon from '../../assets/reset-pwd.png';
import PasswordPopup from './PasswordPopup.vue';

const router = useRouter();
const props = defineProps({totalOrders: Number, totalPrices: Number });

const isPopupVisible = ref(false);

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value;
};

const handlePasswordUpdate = async (email, newPassword) => {
  try {
    const response = await fetch('https://sneakers-api-ouat.onrender.com/api/v1/users/password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // JWT token voor authenticatie
      },
      body: JSON.stringify({ user: { email, newPassword } }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating password:', error);
  }
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
        <p>Total Prices: <strong>€{{ totalPrices }}</strong></p>
      </div>
    </div>
    <div class="header-right">
      <!-- Change Password Icon -->
      <div @click="togglePopup" class="change-pwd-wrapper">
        <img :src="resetPasswordIcon" alt="Change Password" class="change-pwd-icon" />
      </div>
      <!-- Logout Button -->
      <button class="logout-button" @click="handleUserLogout">Logout</button>
    </div>
  </header>
  <!-- Password Popup -->
  <PasswordPopup
  :isVisible="isPopupVisible"
  @closePopup="togglePopup"
  @passwordUpdate="handlePasswordUpdate" 
  />
</template>

<style scoped>
/* Header Container */
.header {
  border-radius: 5px;
  display: flex;
  justify-content: space-between; /* Space between left and right sections */
  align-items: center; /* Vertically align items */
  padding: 18px;
  margin-bottom: 20px;
  color: #1b263b; /* Deep Navy */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

/* Header Title and Stats */
.header-left {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #000;
}

.header-left h1 {
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin: 0;
}

.live-counters {
  display: flex;
  gap: 20px;
  

}

.live-counters p {
  margin: 0;
  font-size: 14px;
  
}

/* Logout Button Styling */
.logout-button {
  background-color: #69FF47 ; /* Red background */
  color: #000; /* White text */
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
  background-color: #28a745; /* Darker red on hover */
  transform: scale(1.05); /* Slightly larger */
}

/* Active button effect */
.logout-button:active {
  background-color: #28a745; /* Even darker red */
  transform: scale(0.98); /* Slightly smaller */
}

/* Focus state for accessibility */
.logout-button:focus {
  outline: 2px solid #0056b3; /* Blue outline for focus */
  outline-offset: 2px;
}

.header-right {
  display: flex;
  gap: 25px;
}

.change-pwd-icon {
  width: 35px;
  height: 35px;
}

.change-pwd-wrapper {
  display: inline-block;
  cursor: pointer;
}
</style>