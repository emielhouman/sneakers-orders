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

// Go back to the previous page
const goBack = () => {
  router.back(); // Navigate to the previous page
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
      <!-- Header Section -->
      <div class="go-back-container">
        <button class="go-back-button" @click="goBack">Go Back</button>
      </div>
      <div class="order-header">
        <h1>Order #{{ order._id }}</h1>
        <button class="delete-button" @click="deleteOrder">Delete Order</button>
      </div>
  
      <!-- Layout Container -->
      <div class="layout-container">
        <!-- Image Section -->
        <div class="image-container">
          <img :src="order.image" alt="Product Image" class="product-image" />
        </div>
  
        <!-- Details Section -->
        <div class="details-container">
          <!-- Order Details -->
          <section class="order-section">
            <h2 class="section-title">Order Details</h2>
            <div class="order-info-grid">
              <p><strong>Order Date:</strong> {{ order.date || "N/A" }}</p>
              <p><strong>Status:</strong> <span class="status-indicator">{{ order.status }}</span></p>
              <p><strong>Type:</strong> {{ order.type || "N/A" }}</p>
              <p><strong>Size:</strong> {{ order.size }}</p>
              <p><strong>Quantity:</strong> {{ order.quantity }}</p>
              <p><strong>Price:</strong> €{{ (order.price * order.quantity).toFixed(2) }}</p>
            </div>
            <div>
              <p><strong>Sneaker:</strong> {{ order.sneaker }}</p>
              <p><strong>Textures:</strong> {{ order.texture }}</p>
              <p><strong>Colors:</strong> {{ order.color }}</p>
            </div>
          </section>
  
          <!-- Customer Details -->
          <section class="customer-section">
            <div class="customer-details">
              <h2 class="section-title">Customer</h2>
              <p><strong>First Name:</strong> {{ order.firstName }}</p>
              <p><strong>Last Name:</strong> {{ order.lastName }}</p>
              <p><strong>Email:</strong> {{ order.email }}</p>
              <p><strong>Phone:</strong> {{ order.phone }}</p>
            </div>
            <div class="shipping-details">
              <h2 class="section-title">Shipping Address</h2>
              <p>{{ order.shippingAddress || "N/A" }}</p>
            </div>
            <div class="payment-details">
              <h2 class="section-title">Payment Method</h2>
              <p>Visa **** **** **** {{ order.paymentLast4 || "N/A" }}</p>
              <p>Expires {{ order.paymentExpiry || "N/A" }}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  
    <div v-else>
      <p>Loading order details...</p>
    </div>
  </template>

<style scoped>
/* General Styling */
.order-detail {
  font-family: 'Arial', sans-serif;
  width: 100%;
  height: 100vh;
  padding: 40px;
  color: #333;
  background-color: #f7f9fc;
  box-sizing: border-box;
  overflow-y: auto;
}

/* Header Section */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.order-header h1 {
  font-size: 28px;
  font-weight: bold;
  color: #1b263b;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #cc0000;
}

/* Go Back Button */
.go-back-container {
  margin-bottom: 20px;
}

.go-back-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.go-back-button:hover {
  background-color: #0056b3;
}

/* Layout Sections */
.layout-container {
  display: flex;
  gap: 40px; /* Spacing between image and details */
  align-items: flex-start;
}

/* Image Section */
.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  max-width: 250px;
  max-height: 250px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Details Section */
.details-container {
  flex: 2;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #1b263b;
  margin-bottom: 15px;
}

.order-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.order-info-grid p {
  font-size: 16px;
}

/* Customer Details, Shipping, and Payment */
.customer-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.customer-details,
.shipping-details,
.payment-details {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.customer-details p,
.shipping-details p,
.payment-details p {
  margin: 10px 0;
  font-size: 16px;
}

.status-indicator {
  font-weight: bold;
  color: #28a745;
}

.customer-details:hover,
.shipping-details:hover,
.payment-details:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>