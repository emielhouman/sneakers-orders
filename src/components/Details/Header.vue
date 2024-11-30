<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  orderId: String,
  deleteOrder: Function,
});

const router = useRouter();
const goBack = () => {
  router.back();
};
</script>

<template>
    <div class="order-header">
      <button class="go-back-button" @click="goBack">Go Back</button>
      <h1>Order #{{ orderId }}</h1>
      <button class="delete-button" @click="deleteOrder">Delete Order</button>
    </div>
  </template>

  <style scoped>
    .order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 25px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-header h1 {
  font-size: 20px;
  font-weight: 600;
  color: #1b263b;
}

button {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
}

.go-back-button {
  background-color: #007bff;
  color: #fff;
}

.go-back-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #ff4d4d;
  color: #fff;
}

.delete-button:hover {
  background-color: #cc0000;
}

  </style>
  

