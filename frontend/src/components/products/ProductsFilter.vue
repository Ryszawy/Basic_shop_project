<template>
  <div v-if="hasCategories" class="mt-3">
    <h1>Search for product</h1>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Type product name..." aria-label="Type product name..."
        aria-describedby="basic-addon1" v-model="productName">
    </div>
    <div class="input-group mb-3">
      <input type="number" class="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" 
      v-model.number="price">
    </div>
    <select class="form-select" aria-label="Default select example" v-model="pickedCategory">
      <option value="" selected disabled hidden>Choose category</option>
      <option v-for="category in categories" :key=category.id :value="category.id">
        {{ category.category_name }}
      </option>
    </select>
    <div class="button-control mt-3">
      <button type="button" class="btn btn-outline-dark" @click="search">Search</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  emits: ['search'],
  data() {
    return {
      categories: [],
      productName: '',
      price: '',
      pickedCategory: '',
    }
  },
  methods: {
    getCategories() {
      axios.get('http://localhost:8080/shop_api/categories')
        .then((response) => {
          this.categories = response.data;
        });
    },
    search() {
      this.$emit('search', {
        name: this.productName,
        price: this.price,
        category: this.pickedCategory,
      });
      this.pickedCategory = '';
      this.price = '',
      this.productName = '';
    }
  },
  computed: {
    hasCategories() {
      return this.categories && this.categories.length;
    }
  },
  created() {
    this.getCategories();
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

.button-control {
  text-align: center;
}
</style>