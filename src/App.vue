<script setup>
import Orders from './components/Orders.vue';
import {reactive, onMounted} from 'vue';

const orders = reactive([]);

onMounted(() => {
  fetch('https://sneakers-api-ouat.onrender.com/api/v1/orders')
    .then(response => response.json())
    .then((data) => {
      orders.push(...data.data.orders);
    });
});
</script>

<template>
    <div>
        <h1>Orders</h1>
        <Orders :orders="orders"/>
    </div>
</template>

<style scoped>

</style>
