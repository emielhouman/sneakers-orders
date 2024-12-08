<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  orders: Array,
});

const emit = defineEmits(['update', 'delete']);

const shortenName = (firstname, lastname) => {
  if (!firstname || !lastname) return "N/A";
  return `${firstname.charAt(0).toUpperCase()}. ${lastname}`;
};

// Method to get the color class for the status
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

const updateStatus = (orderId, newStatus) => {
  emit('update', { orderId, newStatus });
};

const deleteOrder = (orderId) => {
  emit('delete', orderId);
};
</script>

<template>
  <table class="order-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Sneaker</th>
        <th>Name</th>
        <th>Email</th>
        <th>Amount</th>
        <th>Size</th>
        <th>Price</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="order in orders"
        :key="order._id"
        @click="$router.push(`/orders/${order._id}`)"
        class="clickable-row"
      >
        <td>{{ order._id }}</td>
        <td>{{ order.sneaker }}</td>
        <td>{{ shortenName(order.firstname, order.lastname) }}</td>
        <td>{{ order.email }}</td>
        <td>{{ order.amount }}</td>
        <td>{{ order.size }}</td>
        <td>€{{ (order.price * order.amount) }}</td>
        <td>
          <select
            v-model="order.status"
            @change="updateStatus(order._id, order.status)"
            @click.stop
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
          <span :class="['status-circle', getStatusColor(order.status)]"></span>
        </td>
        <td>
          <button @click.stop="deleteOrder(order._id)" class="delete-button">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
/* Order Table Styles */
.order-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.order-table thead {
  background-color: #007bff; /* Deep Navy */
  color: #fff;
}

tbody tr {
  transition: background-color 0.3s ease;
  cursor: pointer;
}

tbody tr:hover {
  background-color: #f1f7ff; /* Subtle hover effect */
}

.order-table th,
.order-table td {
  padding: 12px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
}


.order-table td:last-child {
  text-align: center;
}

/* Status Dropdown */
select {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  margin-right: 8px;
}

/* Status Circles */
.status-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.status-circle-pending {
  background-color: grey; /* Pending */
}

.status-circle-shipped {
  background-color: #ffa500; /* Shipped */
}

.status-circle-cancelled {
  background-color: #ff4d4d; /* Cancelled */
}

.status-circle-completed {
  background-color: #28a745; /* Completed */
}

/* Delete Button */
.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #cc0000; /* Hover effect */
}
</style>