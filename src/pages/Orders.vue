<script setup>
import { ref, computed, onMounted } from 'vue';
import Filters from '../components/Orders/Filters.vue';
import Header from '../components/Orders/Header.vue';
import OrdersTable from '../components/Orders/OrdersTable.vue';

const orders = ref([]);
const selectedFilter = ref('');
const searchBar = ref('');
const statuses = ['Pending', 'Shipped', 'Cancelled', 'Completed'];

const totalOrders = computed(() => orders.value.reduce((sum, order) => sum + order.amount, 0));
const totalPrices = computed(() => orders.value.reduce((sum, order) => sum + order.amount * order.price, 0));

// Get orders from the API
const getOrders = async () => {
  try {
    const response = await fetch('https://sneakers-api-ouat.onrender.com/api/v1/orders');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    orders.value = data.data.orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    orders.value = [];
  }
};

onMounted(getOrders);

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchBar.value.toLowerCase()) ||
      order.firstname.toLowerCase().includes(searchBar.value.toLowerCase()) ||
      order.lastname.toLowerCase().includes(searchBar.value.toLowerCase()) ||
      order.email.toLowerCase().includes(searchBar.value.toLowerCase());

    const matchesFilter = !selectedFilter.value || order.status === selectedFilter.value;
    return matchesSearch && matchesFilter;
  });
});

const updateStatus = async (order) => {
  try {
    const response = await fetch(`https://sneakers-api-ouat.onrender.com/api/v1/orders/${order.orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: { status: order.newStatus }}),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};

const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`https://sneakers-api-ouat.onrender.com/api/v1/orders/${orderId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Verwijder de order lokaal als de API-verwijdering succesvol is
    orders.value = orders.value.filter((order) => order._id !== orderId);
  } catch (error) {
    console.error('Error deleting order:', error);
  }
};

const handleSearchChange = (query) => {
  searchBar.value = query;
};

const handleFilterChange = (filter) => {
  selectedFilter.value = filter;
};
</script>

<template>
  <div class="orders-page">
    <Header :totalOrders="totalOrders" :totalPrices="totalPrices" />
    <Filters
      :statuses="statuses"
      :selectedFilter="selectedFilter"
      :searchBar="searchBar"
      :onFilterChange="handleFilterChange"
      :onSearchChange="handleSearchChange"
    />
    <OrdersTable
      :orders="filteredOrders"
      @update="updateStatus"
      @delete="deleteOrder"
    />
  </div>
</template>

<style scoped>
/* Page Container */
.orders-page {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f7f9fc; /* Light background */
  max-width: 100%; /* Full page width */
  height: 100vh; /* Full viewport height */
  box-sizing: border-box; /* Include padding in dimensions */
  overflow-y: auto; /* Allow scrolling for overflow */
}

/* Global Styling */
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #1b263b; /* Deep Navy */
}

p {
  font-size: 14px;
  color: #333; /* Neutral text color */
}


</style>