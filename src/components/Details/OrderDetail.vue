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
      </div>
      <div v-if="order.sneakerConfigs && order.sneakerConfigs.length">
      <h3 class="section-subtitle">Sneaker Configurations</h3>
      <div v-for="(config, index) in order.sneakerConfigs" :key="index" class="config-details">
        <div v-for="(part, partName) in config" :key="partName" class="part-detail">
          <p><strong>Part:</strong> {{ part.name }}</p>
          <p><strong>Color:</strong> <span :style="{ color: part.color }">{{ part.colorName || "N/A" }}</span></p>
          <p><strong>Texture:</strong> {{ part.textureName || "No texture selected" }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No sneaker configurations available.</p>
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

.config-details {
  display: flex;
  flex-wrap: wrap; /* Allows wrapping if there are too many items */
  gap: 20px;       /* Spacing between the parts */
  margin-top: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.part-detail {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-width: 200px; /* Ensure each part detail has a minimum width */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.part-detail p {
  margin: 5px 0;
  font-size: 14px;
}

.section-subtitle {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}


</style>