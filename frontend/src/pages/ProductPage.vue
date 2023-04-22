<template>
  <div v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <div  v-else-if="!isLoading" class="container">
    <div class="p-2 mt-3 border rounded row">
      <div class="col item">
        <div class="row m-3">
          <label>Product Name</label>
          <span>{{ name }}</span>
        </div>
        <div class="row m-3">
          <label>Product price</label>
          <span>{{ price }}$</span>
        </div>
        <div class="row m-3">
          <label>Product weight</label>
          <span>{{ weight }}g</span>
        </div>
        <div class="row m-3">
          <label>Description</label>
          <span>{{ desc }}</span>
        </div>
      </div>
      <div class="buttons-control row">
        <div class="col">
          <RouterLink to="/" class="btn btn-outline-dark">
            Back to browse
          </RouterLink>
        </div>
        <div class="col add">
          <button 
            type="button" 
            class="btn btn-outline-dark"  
            @click="addToCart"
            >Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  inject: ['addProductToCart'],
  data() {
    return {
      product: {},
      isLoading: false,
    }
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      axios.get(`http://localhost:8080/shop_api/products/${this.$props.id}`)
        .then((response) => {
          this.product = response.data;
          this.isLoading = false;
        });
    },
    addToCart() {
      this.addProductToCart({
        id: this.product.id,
        title: this.product.product_name,
        price: this.product.price,
      });
    },
  },
  computed: {
    name() {
      return this.product.product_name;
    },
    price() {
      return this.product.price;
    },
    desc() {
      return this.product.description;
    },
    weight() {
      return this.product.weight;
    },
  },
  created() {
    this.getProduct();
  }
}
</script>

<style scoped>
label {
  font-weight: bold;
}

.buttons-control {
  display: flex;
  justify-content: center;
}

.item {
  text-align: center;
}

.add {
  display: flex;
  justify-content: flex-end;
}
</style>