<script setup>
const props = defineProps({
  paymentLast4: String,
  paymentExpiry: String,
});
</script>

<template>
  <div class="payment-details">
    <h2 class="section-title">Payment Method</h2>
    <!-- Display the last 4 digits of the card and the expiration date -->
    <p>Visa **** **** **** {{ paymentLast4 || "N/A" }}</p>
    <p>Expires {{ paymentExpiry || "N/A" }}</p>
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