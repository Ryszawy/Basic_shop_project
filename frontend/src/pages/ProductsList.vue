<template>
  <div v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <div v-else-if="!isLoading">
    <section>
      <products-filter @search="setData"></products-filter>
      <div class="control">
        <button type="button" class="btn btn-outline-dark mt-4" @click="showAll()">Show all products</button>
      </div>
    </section>
    <section>
      <ul v-if="hasProducts">
        <product-item v-for="prod in products" :key="prod.id" :id="prod.id" :title="prod.product_name"
          :price="prod.price" :description="prod.description" :weight="prod.weight" :category="prod.category_id">
        </product-item>
      </ul>
      <div v-else class="alert alert-danger mt-5" role="alert" id="empty">
        There is no products
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import ProductItem from '../components/products/ProductItem.vue';
import ProductsFilter from '../components/products/ProductsFilter.vue';

export default {
  components: {
    ProductItem,
    ProductsFilter,
  },
  data() {
    return {
      products: [],
      searchData: null,
      isLoading: false,
    }
  },
  computed: {
    hasProducts() {
      return !this.isLoading && this.products && this.products.length;
    },
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      axios.get('http://localhost:8080/shop_api/products')
        .then((response) => {
          this.products = response.data;
          this.isLoading = false;
        });
    },
    setData(data) {
      this.searchData = data;
      const display = this.products.filter(product => {

        let priceTo = false;
        let category = false;
        const name = product.product_name.toLowerCase().includes(data.name.toLowerCase());

        if (product.price <= data.price) {
          priceTo = true;
        } else if (!data.price) {
          priceTo = true;
        }

        if (product.category_id === data.category) {
          category = true;
        } else if (!data.category) {
          category = true;
        }

        return name && priceTo && category;
      });
      this.products = display;
    },
    showAll() {
      this.getProducts();
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 40rem;
}

#empty {
  text-align: center;
}

.control {
  text-align: center;
}
</style>