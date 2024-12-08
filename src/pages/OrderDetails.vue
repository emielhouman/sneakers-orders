<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/Details/Header.vue';
import ProductImage from '../components/Details/ProductImage.vue';
import OrderDetail from '../components/Details/OrderDetail.vue';
import CustomerDetail from '../components/Details/CustomerDetail.vue';
import ShippingDetail from '../components/Details/ShippinDetail.vue';
import PaymentDetail from '../components/Details/paymentDetail.vue';

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

const getPaymentDetails = () => {
  if (order.value && order.value.payment && order.value.payment.length > 0) {
    const payment = order.value.payment[0]; // Assuming the first payment method is the one to display
    const paymentLast4 = payment.cardNumber ? payment.cardNumber.slice(-4) : "N/A";
    const paymentExpiry = payment.expDate || "N/A";
    return { paymentLast4, paymentExpiry };
  }
  return { paymentLast4: "N/A", paymentExpiry: "N/A" };
};

onMounted(fetchOrder);
</script>

<template>
  <div v-if="order" class="order-detail">
    <Header :orderId="order._id" :deleteOrder="deleteOrder" />
    <div class="details-container">
      <div class="sneaker-details">
        <ProductImage :imageSrc="order.image" />
        <OrderDetail :order="order" />
      </div>
      <div class="customer-shipping-details">
        <div class="customer-section">
          <CustomerDetail :customer="order" />
          <ShippingDetail :address="order.address" />
        </div>
        <PaymentDetail
          :paymentLast4="getPaymentDetails().paymentLast4"
          :paymentExpiry="getPaymentDetails().paymentExpiry"
        />
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

.details-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.sneaker-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.customer-shipping-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.customer-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.status-indicator {
  font-weight: 700;
  color: #28a745;
}

/* Responsiveness */
@media (max-width: 1200px) {
  .details-container {
    grid-template-columns: 1fr 1fr;
  }

  .sneaker-details {
    grid-template-columns: 1fr;
  }

  .customer-shipping-details {
    grid-template-columns: 1fr;
  }

  .customer-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .order-detail {
    padding: 15px;
  }

  .details-container {
    grid-template-columns: 1fr;
  }

  .sneaker-details {
    grid-template-columns: 1fr;
  }

  .customer-shipping-details {
    grid-template-columns: 1fr;
  }

  .customer-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .order-detail {
    padding: 10px;
  }

  .details-container {
    grid-template-columns: 1fr;
  }

  .sneaker-details {
    grid-template-columns: 1fr;
  }

  .customer-shipping-details {
    grid-template-columns: 1fr;
  }

  .customer-section {
    grid-template-columns: 1fr;
  }
}
</style>
