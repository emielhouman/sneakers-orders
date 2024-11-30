<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from './Header.vue';
import ProductImage from './ProductImage.vue';
import OrderDetail from './OrderDetail.vue';
import CustomerDetail from './CustomerDetail.vue';
import ShippingDetail from './ShippinDetail.vue';
import PaymentDetail from './paymentDetail.vue';

const route = useRoute();
const router = useRouter();
const orderId = route.params.id;
const order = ref(null);

const fetchOrder = async () => {
  try {
    const response = await fetch(`https://sneakers-api-ouat.onrender.com/api/v1/orders/${orderId}`);
    const data = await response.json();
    order.value = data.data.order;
  } catch (error) {
    console.error('Error fetching order:', error);
    router.push('/');
  }
};

const deleteOrder = async () => {
  if (confirm('Are you sure you want to delete this order?')) {
    try {
      await fetch(`https://sneakers-api-ouat.onrender.com/api/v1/orders/${orderId}`, {
        method: 'DELETE',
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  }
};

onMounted(fetchOrder);
</script>

<template>
    <div v-if="order" class="order-detail">
      <Header :orderId="order._id" :deleteOrder="deleteOrder" />
      <div class="layout-container">
        <ProductImage :imageSrc="order.image" />
        <div class="details-container">
          <OrderDetail :order="order" />
          <div class="customer-section">
            <CustomerDetail :customer="order" />
            <ShippingDetail :shippingAddress="order.shippingAddress" />
            <PaymentDetail
              :paymentLast4="order.paymentLast4"
              :paymentExpiry="order.paymentExpiry"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading order details...</p>
    </div>
  </template>

<style scoped>
.order-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.layout-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.customer-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.status-indicator {
  font-weight: 700;
  color: #28a745;
}
</style>