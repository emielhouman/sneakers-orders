
<script setup>
const props = defineProps({
  imageSrc: String,
});
</script>

<template>
    <div class="image-container">
      <img :src="imageSrc" alt="Product Image" class="product-image" />
    </div>
  </template>

<style scoped>
.image-container {
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>