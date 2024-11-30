<script setup>
const props = defineProps(['statuses', 'selectedFilter', 'searchQuery']);
const emit = defineEmits(['update:selectedFilter', 'update:searchQuery']);

const setFilter = (status) => emit('update:selectedFilter', status);
const setSearchQuery = (event) => emit('update:searchQuery', event.target.value);
</script>

<template>
  <div class="filters">
    <div class="status-filter">
      <span
        v-for="status in ['', ...statuses]"
        :key="status || 'all-orders'"
        :class="{ active: selectedFilter === status }"
        @click="setFilter(status)"
        class="status-tab"
      >
        {{ status || 'All Orders' }}
      </span>
    </div>
    <input
      type="text"
      :value="searchQuery"
      @input="setSearchQuery"
      placeholder="Search"
      class="search-input"
    />
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
}

/* Status Filter Styles */
.status-filter {
  display: flex;
  gap: 20px;
  font-size: 14px;
  height: 40px;
  align-items: center;
  border-bottom: 2px solid transparent; /* Prevent layout shifts */
}

.status-tab {
  color: #888;
  cursor: pointer;
  padding: 0 8px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border-bottom: 2px solid transparent;
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

.status-tab.active {
  color: #007bff;
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}

/* Search Input Styles */
.search-input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>