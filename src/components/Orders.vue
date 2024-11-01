<script setup>

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul>
    <li v-for="order in orders">
      {{ order.name }}
      {{ order.size }}
      {{ order.color }}
    </li>
  </ul>
</template>

<style scoped>

</style>
