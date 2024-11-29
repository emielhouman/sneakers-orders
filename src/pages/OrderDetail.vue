<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // Access the route parameters
const router = useRouter(); // For navigation
const orderId = route.params.id; // Get the order ID from the route
const order = ref(null); // Store the order data

// Fetch the order data
const fetchOrder = async () => {
  try {
    const response = await fetch(`https://sneakers-api-ouat.onrender.com/api/v1/orders/${orderId}`);
    const data = await response.json();
    order.value = data.data.order; // Extract and assign the actual order data
  } catch (error) {
    console.error('Error fetching order:', error);
    router.push('/'); // Redirect to the orders page if there's an error
  }
};

onMounted(() => {
  fetchOrder();
});

// Delete the order
const deleteOrder = async () => {
  try {
    await fetch(`https://sneakers-api-ouat.onrender.com/api/v1/orders/${orderId}`, {
      method: 'DELETE',
    });
    console.log(`Order ${orderId} deleted`);
    router.push('/'); // Redirect to the orders page after deletion
  } catch (error) {
    console.error('Failed to delete order:', error);
  }
};
</script>

<template>
    <div v-if="order" class="order-detail">
      <h1>Order Details</h1>
      <p><strong>ID:</strong> {{ order._id }}</p>
      <p><strong>Sneaker:</strong> {{ order.sneaker }}</p>
      <p><strong>Size:</strong> {{ order.size }}</p>
      <p><strong>First Name:</strong> {{ order.firstName }}</p>
      <p><strong>Last Name:</strong> {{ order.lastName }}</p>
      <p><strong>Email:</strong> {{ order.email }}</p>
      <p><strong>Phone Number:</strong> {{ order.phone }}</p>
      <p><strong>Quantity:</strong> {{ order.quantity }}</p>
      <p><strong>Price:</strong> €{{ (order.price * order.quantity).toFixed(2) }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
      <p><strong>Shipping Address:</strong> {{ order.shippingAddress }}</p>
      <p><strong>Textures:</strong>{{ order.texture }}</p>
      <p><strong>Colors:</strong>{{ order.color }}</p>
    
      <div v-if="order.image">
        <p><strong>Image:</strong></p>
        <img :src="order.image" alt="Sneaker Image" class="order-image" />
      </div>
      <button class="delete-button" @click="deleteOrder">Delete Order</button>
    </div>
    <div v-else>
      <p>Loading order details...</p>
    </div>
  </template>

<style scoped>
.order-detail {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.order-detail h1 {
  text-align: center;
  margin-bottom: 20px;
}

.order-detail p {
  margin: 10px 0;
}

.order-detail ul {
  margin: 10px 0;
  padding-left: 20px;
}

.order-detail img {
  max-width: 100%;
  margin-top: 10px;
  border-radius: 8px;
}

.delete-button {
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #cc0000;
}
</style>