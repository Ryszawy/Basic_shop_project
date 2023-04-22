<template>
  <section>
    <h2>Your Cart</h2>
    <h3>Total Amount: <base-badge mode="elegant">${{ cartTotal }}</base-badge></h3>
    <ul>
      <cart-item
        v-for="item in cart.items"
        :key="item.productId"
        :prod-id="item.productId"
        :title="item.title"
        :price="item.price"
        :qty="item.qty"
      ></cart-item>
    </ul>
    <div v-if="cartTotal == 0" class="alert alert-danger mt-5 text" role="alert" id="empty">
      Cart is empty.
    </div>
    <div v-if="cartTotal > 0" class="button-control">
      <RouterLink 
        to="/order" 
        class="btn btn-outline-dark"
        >Order products
      </RouterLink>
    </div>
  </section>
</template>

<script>
import CartItem from '../components/cart/CartItem.vue';

export default {
  inject: ['cart'],
  components: {
    CartItem,
  },
  computed: {
    cartTotal() {
      return this.cart.total.toFixed(2);
    },
  },
};
</script>

<style scoped>
.button-control {
  text-align: center;
}
section {
  margin: 2rem auto;
  max-width: 40rem;
}

h2 {
  color: #292929;
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
}

h3 {
 text-align: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.text {
  text-align: center;
}
</style>