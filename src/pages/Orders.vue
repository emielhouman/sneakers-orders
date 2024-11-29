<script setup>
import { ref, computed, onMounted } from 'vue';

const orders = ref([]);
const totalOrders = ref(0); // Live counter for total orders
const searchQuery = ref('');
const selectedFilter = ref(''); // Default is no filter (show all)
const statuses = ['Pending', 'Shipped', 'Cancelled', 'Completed'];

// Function to fetch orders from the API
const fetchOrders = async () => {
  try {
    const response = await fetch('https://sneakers-api-ouat.onrender.com/api/v1/orders');
    const data = await response.json();
    orders.value = data.data.orders.map((order) => ({
      ...order,
      status: order.status || 'Pending', // Default status to 'Pending'
      texture: order.texture || 'N/A', // Default texture if missing
      image: order.image || '', // Default empty image if missing
    }));
    totalOrders.value = orders.value.length; // Update total orders
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

// Automatically fetch data on component mount and periodically
onMounted(() => {
  fetchOrders();

  // Optional polling to refresh data periodically (e.g., every 10 seconds)
  setInterval(() => {
    fetchOrders();
  }, 10000); // Adjust the interval as needed
});

// Filtered and searched orders
const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.size.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.color.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.texture.toLowerCase().includes(searchQuery.value.toLowerCase());


    const matchesFilter = selectedFilter.value
      ? order.status === selectedFilter.value
      : true;

    return matchesSearch && matchesFilter;
  });
});

// Handle status updates
const updateStatus = (order, newStatus) => {
  order.status = newStatus;
  console.log(`Order ${order._id} status updated to: ${newStatus}`);
};

// Delete an order
const deleteOrder = async (orderId) => {
  try {
    await fetch(`https://sneakers-api-ouat.onrender.com/api/v1/orders/${orderId}`, {
      method: 'DELETE',
    });
    orders.value = orders.value.filter((order) => order._id !== orderId);
    totalOrders.value -= 1; // Decrement the total order counter
    console.log(`Order ${orderId} has been deleted`);
  } catch (error) {
    console.error(`Failed to delete order ${orderId}:`, error);
  }
};

// Get the color class for the status
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'status-circle-pending';
    case 'Shipped':
      return 'status-circle-shipped';
    case 'Cancelled':
      return 'status-circle-cancelled';
    case 'Completed':
      return 'status-circle-completed';
    default:
      return '';
  }
};
</script>

<template>
  <div class="order-page">
    <h1>O R D E R S</h1>

    <!-- Live Counter -->
    <div class="live-counter">
      <p>Total Orders: <strong>{{ totalOrders }}</strong></p>
    </div>

    <!-- Search and Filter -->
    <div class="filter-search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by Order ID, Name, Size, Color, etc."
        class="search-input"
      />
      <select v-model="selectedFilter" class="filter-dropdown">
        <option value="">All Statuses</option>
        <option v-for="status in statuses" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>

    <!-- Orders Table -->
    <div class="order-table">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Size</th>
            <th>Color</th>
            <th>Texture</th>
            <th>Image</th>
            <th>Order Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order._id">
            <td>{{ order._id }}</td>
            <td>{{ order.name }}</td>
            <td>{{ order.size }}</td>
            <td>{{ order.color }}</td>
            <td>{{ order.texture }}</td>
            <td>
              <img v-if="order.image" :src="order.image" alt="Order Image" class="order-image" />
              <span v-else>No Image</span>
            </td>
            <td>
              <div class="status-container">
                <select
                  v-model="order.status"
                  @change="updateStatus(order, order.status)"
                  class="status-dropdown"
                >
                  <option v-for="status in statuses" :key="status" :value="status">
                    {{ status }}
                  </option>
                </select>
                <span :class="getStatusColor(order.status)" class="status-circle"></span>
              </div>
            </td>
            <td>
              <button class="delete-button" @click="deleteOrder(order._id)">Delete</button>
            </td>
          </tr>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="8" class="empty-state">No matching orders found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  



<style scoped>
/* Page container */
.order-page {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
  max-width: 100%;
}

/* Page header */
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* Filter and search container */
.filter-search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.filter-dropdown {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Table container */
.order-table {
  max-width: 100%;
  overflow-x: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

thead {
  background-color: #007bff;
  color: #fff;
}

thead th {
  padding: 12px;
  text-align: left;
  font-weight: bold;
}

tbody td {
  padding: 10px;
  text-align: left;
  color: #555;
}

tbody tr {
  border-bottom: 1px solid #ddd;
}

tbody tr:last-child {
  border-bottom: none;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 20px;
  color: #888;
  font-style: italic;
}

/* Status container */
.status-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-dropdown {
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.status-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

/* Status colors */
.status-circle-pending {
  background-color: #808080; /* Grey */
}

.status-circle-shipped {
  background-color: #ffa500; /* Orange */
}

.status-circle-cancelled {
  background-color: #ff4d4d; /* Red */
}

.status-circle-completed {
  background-color: #28a745; /* Green */
}

/* Live Counter Styling */
.live-counter {
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.live-counter strong {
  color: #007bff;
}

/* Delete Button */
.delete-button {
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #cc0000;
}

/* Image styling for the table */
.order-image {
  width: 50px;
  height: 50px;
  object-fit: cover; /* Ensures the image retains its aspect ratio */
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>