<script setup>
const props = defineProps({
  order: Object,
});
</script>

<template>
    <section class="order-section">
      <h2 class="section-title">Order Details</h2>
      <div class="order-info-grid">
        <p><strong>Order Date:</strong> {{ order.date || "N/A" }}</p>
        <p><strong>Status:</strong> <span class="status-indicator">{{ order.status }}</span></p>
        <p><strong>Size:</strong> {{ order.size }}</p>
        <p><strong>Quantity:</strong> {{ order.amount }}</p>
        <p><strong>Price:</strong> €{{ (order.price * order.amount).toFixed(2) }}</p>
      </div>
      <div>
        <p><strong>Sneaker:</strong> {{ order.sneaker }}</p>
        <p><strong>Textures:</strong> {{ order.texture }}</p>
        <p><strong>Colors:</strong> {{ order.color }}</p>
      </div>
    </section>
  </template>

<style scoped>
.order-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.order-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

p {
  margin-bottom: 8px;
  font-size: 14px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
}


</style>