<script setup>
const props = defineProps({
  shippingAddress: String,
});
</script>

<template>
    <div class="shipping-details">
      <h2 class="section-title">Shipping Address</h2>
      <p>{{ shippingAddress || "N/A" }}</p>
    </div>
  </template>

<style scoped>
.shipping-details, .payment-details {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.payment-details p {
  font-size: 14px;
  color: #555;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 16px;
  font-weight: 600;
}

button:hover {
  background-color: #0056b3;
}
</style>