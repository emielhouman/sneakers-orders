<script setup>
import { ref, computed, onMounted } from 'vue';
import Filters from '../components/Orders/Filters.vue';
import Header from '../components/Orders/Header.vue';
import OrderTable from '../components/Orders/Ordertable.vue';

const orders = ref([]);
const statuses = ['Pending', 'Shipped', 'Cancelled', 'Completed'];
const selectedFilter = ref('');
const searchQuery = ref('');

const totalOrders = computed(() => orders.value.length);
const totalPrices = computed(() =>
  orders.value.reduce((sum, order) => sum + order.price * order.quantity, 0)
);

// Fetch orders
const fetchOrders = async () => {
  try {
    const response = await fetch('https://sneakers-api-ouat.onrender.com/api/v1/orders');
    const data = await response.json();
    orders.value = data.data.orders.map((order) => ({
      ...order,
      status: order.status || 'Pending',
      name: order.name || 'N/A',
      email: order.email || 'N/A',
      sneaker: order.sneaker || 'N/A',
      size: order.size || 'N/A',
      quantity: order.quantity || 1,
      price: order.price || 0,
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

onMounted(fetchOrders);

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesFilter = !selectedFilter.value || order.status === selectedFilter.value;

    return matchesSearch && matchesFilter;
  });
});

const updateStatus = ({ id, newStatus }) => {
  const order = orders.value.find((order) => order._id === id);
  if (order) order.status = newStatus;
};

const deleteOrder = (orderId) => {
  orders.value = orders.value.filter((order) => order._id !== orderId);
};

// Callback handlers
const handleFilterChange = (filter) => {
  console.log('Selected filter:', filter);
  selectedFilter.value = filter;
};

const handleSearchChange = (query) => {
  console.log('Search query:', query);
  searchQuery.value = query;
};
</script>

<template>
  <div class="orders-page">
    <Header :totalOrders="totalOrders" :totalPrices="totalPrices" />
    <Filters
      :statuses="statuses"
      :selectedFilter="selectedFilter"
      :searchQuery="searchQuery"
      :onFilterChange="handleFilterChange"
      :onSearchChange="handleSearchChange"
    />
    <OrderTable
      :orders="filteredOrders"
      @update:status="updateStatus"
      @delete-order="deleteOrder"
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