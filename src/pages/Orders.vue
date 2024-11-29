<script setup>
import { ref, computed, onMounted } from 'vue';


const orders = ref([]);
const totalOrders = computed(() => orders.value.length); // Total orders count
const totalPrices = computed(() =>
  orders.value.reduce((sum, order) => sum + order.price * order.quantity, 0)
); // Total price computation
const searchQuery = ref('');
const selectedFilter = ref(''); // Tracks the selected filter, empty means "All Orders"
const statuses = ['Pending', 'Shipped', 'Cancelled', 'Completed'];
const tabsRef = ref(null); // Reference to the parent container of the tabs

// Format as euros
const formatEuro = (amount) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(amount);

  const formatName = (fullName) => {
  if (!fullName) return 'N/A'; // Handle empty names
  const [firstName, lastName] = fullName.split(' '); // Split into first and last name
  if (!firstName || !lastName) return fullName; // If name is incomplete, return as is
  return `${firstName[0].toUpperCase()}. ${lastName}`; // Format as "J. Doe"
};


// Fetch orders from the API
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

onMounted(() => {
  fetchOrders();
  selectedFilter.value = ''; // Default to "All Orders"

  // Wait for the DOM to be updated, then add the "active" class to "All Orders"
  setTimeout(() => {
    const tabs = tabsRef.value.querySelectorAll('.status-tab');
    if (tabs.length > 0) {
      tabs[0].classList.add('active'); // Assuming "All Orders" is the first tab
    }
  }, 0);
});

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchQuery.value?.toLowerCase() || '') ||
      order.name.toLowerCase().includes(searchQuery.value?.toLowerCase() || '') ||
      order.email.toLowerCase().includes(searchQuery.value?.toLowerCase() || '') ||
      order.size.toLowerCase().includes(searchQuery.value?.toLowerCase() || '') ||
      order.sneaker.toLowerCase().includes(searchQuery.value?.toLowerCase() || '');

    const matchesFilter = !selectedFilter.value || order.status === selectedFilter.value;

    return matchesSearch && matchesFilter;
  });
});

const setActiveTab = (event, status) => {
  const tabs = tabsRef.value.querySelectorAll('.status-tab');
  tabs.forEach((tab) => tab.classList.remove('active'));
  event.target.classList.add('active');
  selectedFilter.value = status;
};

const updateStatus = (order, newStatus) => {
  // Update the order's status locally
  order.status = newStatus;

  // Log or handle the update (e.g., make an API call to persist the change)
  console.log(`Order ${order._id} status updated to: ${newStatus}`);
};

// Delete order
const deleteOrder = async (orderId) => {
  try {
    await fetch(`https://sneakers-api-ouat.onrender.com/api/v1/orders/${orderId}`, {
      method: 'DELETE',
    });
    orders.value = orders.value.filter((order) => order._id !== orderId);
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
    <div class="live-counters">
      <p>Total Orders: <strong>{{ totalOrders }}</strong></p>
      <p>Total Prices: <strong>{{ formatEuro(totalPrices) }}</strong></p>
    </div>
    <div class="filter-container">
      <div class="status-filter" ref="tabsRef">
  <span
    v-for="status in ['', ...statuses]"
    :key="status || 'all-orders'"
    class="status-tab"
    @click="setActiveTab($event, status)"
  >
    {{ status || 'All Orders' }}
  </span>
</div>
     <!-- Search Filter -->
  <input
    v-model="searchQuery"
    type="text"
    placeholder="Search "
    class="search-input"
  />
</div>
   
    <div class="order-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sneaker</th>
            <th>Name</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order._id">
            <td><router-link :to="`/orders/${order._id}`" class="id-link">{{ order._id }}</router-link></td>
            <td>{{ order.sneaker }}</td>
            <td>{{ formatName(order.name) }}</td>
            <td>{{ order.email }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.size }}</td>
            <td>{{ formatEuro(order.price * order.quantity) }}</td>
            <td>
  <select
    v-model="order.status"
    @change="(event) => updateStatus(order, event.target.value)"
    class="status-dropdown"
  >
    <option v-for="status in statuses" :key="status" :value="status">
      {{ status }}
    </option>
  </select>
  <span :class="getStatusColor(order.status)" class="status-circle"></span>
</td>
            <td>
              <button class="delete-button" @click="deleteOrder(order._id)">Delete</button>
            </td>
          </tr>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="9" class="empty-state">No matching orders found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  



<style scoped>

.order-page {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f7f9fc;
  max-width: 100%;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #1b263b; 
}


.order-table {
  max-width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
}

thead {
  background-color: #007bff; 
  color: #fff;
}

thead th {
  padding: 16px;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}

tbody tr {
  border-bottom: 1px solid #ddd;
}

tbody td {
  padding: 12px;
  font-size: 14px;
  color: #333;
}

tbody tr:hover {
  background-color: #f1f7ff; 
}

tbody tr:last-child {
  border-bottom: none;
}



.status-dropdown {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

.status-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 8px;
}

.status-circle-pending {
  background-color: grey; 
}

.status-circle-shipped {
  background-color: #ffa500; 
}

.status-circle-cancelled {
  background-color: #ff4d4d; 
}

.status-circle-completed {
  background-color: #28a745; 
}

/* Live Counter */
.live-counters {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.live-counters strong {
  color: #1b263b; 
}

/* Delete Button */
.delete-button {
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 8px 12px;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #cc0000;
}
/* Parent container for statuses and search filter */
.filter-container {
  display: flex;
  justify-content: space-between; /* Space between statuses and search bar */
  align-items: center; /* Align both elements vertically */
  margin-bottom: 20px; /* Spacing from other sections */
  gap: 20px; /* Add spacing between elements */
}

/* Status Filter Styles */
.status-filter {
  display: flex;
  gap: 20px; /* Spacing between status tabs */
  font-size: 14px;
  height: 40px; /* Match height of search bar */
  align-items: center;
  border-bottom: 2px solid transparent; /* Prevent layout shifts */
}

/* Search Input Styles */
.search-input {
  width: 300px; /* Fixed width */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  align-self: flex-start; /* Align search input to the top of its container */
}

.status-tab {
  color: #888;
  cursor: pointer;
  padding: 0 8px; 
  height: 30px;
  line-height: 30px; 
  display: inline-block;
  border-bottom: 2px solid transparent;
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

.status-tab.active {
  color: #007bff; 
  font-weight: bold;
  border-bottom: 2px solid #007bff; 
}




.id-link {
  color: #007bff;
  text-decoration: none;
}

.id-link:hover {
  font-weight: bold;
  text-decoration: underline;
  transition: color 0.2s ease, font-weight 0.2s ease;
}
</style>