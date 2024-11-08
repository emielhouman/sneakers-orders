<script setup>
import { ref, onMounted } from 'vue';

const orders = ref([]);

onMounted(() => {
  fetch('https://sneakers-api-ouat.onrender.com/api/v1/orders')
    .then(response => response.json())
    .then((data) => {
      orders.value = data.data.orders;
    });
});
</script>

<template>
  <div>
    <h1>Orders</h1>
    <ul>
      <li v-for="order in orders" :key="order.id">
        {{ order.name }} - {{ order.size }} - {{ order.color }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>