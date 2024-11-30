<script setup>
const props = defineProps(['totalOrders', 'totalPrices']);
</script>

<template>
  <header class="order-header">
    <h1>O R D E R S</h1>
    <div class="live-counters">
      <p>Total Orders: <strong>{{ totalOrders }}</strong></p>
      <p>Total Prices: <strong>€{{ totalPrices.toFixed(2) }}</strong></p>
    </div>
  </header>
</template>

<style scoped>
/* Header Container */
.order-header {
  font-family: 'Arial', sans-serif;
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f7f9fc;
  color: #1b263b; /* Deep Navy */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Header Title */
.order-header h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #007bff; /* Blue accent */
}

/* Live Counters Styling */
.live-counters {
  display: flex;
  justify-content: center;
  gap: 40px;
  font-size: 16px;
  color: #333;
}

.live-counters p {
  margin: 0;
}

.live-counters strong {
  color: #1b263b; /* Deep Navy */
}
</style>