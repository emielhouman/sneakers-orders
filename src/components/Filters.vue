<script setup>
const props = defineProps({
  statuses: Array,
  selectedFilter: String,
  searchQuery: String,
  onFilterChange: Function,
  onSearchChange: Function,
});

const setFilter = (status) => {
  console.log('Filter changed to:', status);
  props.onFilterChange(status);
};

const setSearchQuery = (event) => {
  const value = event.target.value;
  console.log('Search query changed to:', value);
  props.onSearchChange(value);
};
</script>

<template>
  <div class="filters">
    <div class="status-filter">
      <span
        v-for="status in ['', ...statuses]"
        :key="status || 'all-orders'"
        :class="{ active: selectedFilter === status }"
        class="status-tab"
        @click="setFilter(status)"
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

.status-filter {
  display: flex;
  gap: 20px;
}

.status-tab {
  cursor: pointer;
  padding: 0 8px;
  color: #888;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  border-bottom: 2px solid transparent;
}

.status-tab.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

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