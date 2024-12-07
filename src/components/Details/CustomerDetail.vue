<script setup>
const props = defineProps({
  customer: Object,
});
</script>

<template>
    <div class="customer-details">
      <h2 class="section-title">Customer</h2>
      <p><strong>First Name:</strong> {{ customer.firstname }}</p>
      <p><strong>Last Name:</strong> {{ customer.lastname }}</p>
      <p><strong>Email:</strong> {{ customer.email }}</p>
      <p><strong>Phone:</strong> {{ customer.telephone }}</p>
    </div>
  </template>

<style scoped>
.customer-details {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.customer-details p {
  font-size: 14px;
  color: #555;
}
</style>