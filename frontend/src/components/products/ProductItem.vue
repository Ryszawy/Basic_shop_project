<template>
  <li class="item" v-if="hasCategories">
    <div class="card" style="width: 30rem;">
      <h2>{{ title }}</h2>
      <div class="card-body">
        <div class="buttons-control">
          <h5 class="card-title">{{ price }}$</h5>
          <h5 class="card-title">{{ weight }}g</h5>
        </div>
        <div class="desc">
          <p class="card-text">Description: {{ description }}</p>
          <p class="card-text">{{ findCategory }}</p>
        </div>
        <div class="buttons-control">
          <RouterLink :to="servicePointDetailsLink" class="btn btn-outline-dark">
            Details
          </RouterLink>
        <button class="btn btn-outline-dark" @click="addToCart">Add to Cart</button>
      </div>
      </div>
    </div>
  </li>
</template>

<script>
import axios from 'axios';

export default {
  inject: ['addProductToCart'],
  props: ['id', 'title', 'price', 'description', 'weight', 'category'],
  data() {
    return {
      categories: [],
    }
  },
  methods: {
    addToCart() {
      this.addProductToCart({
        id: this.id,
        title: this.title,
        price: this.price,
      });
    },
    getCategories() {
      axios.get('http://localhost:8080/shop_api/categories')
        .then((response) => {
          this.categories = response.data;
        });
    },
  },
  computed: {
    servicePointDetailsLink() {
      return this.$route.path + '/' + this.id;
    },
    hasCategories() {
      return this.categories && this.categories.length;
    },
    findCategory() {
      const result = this.categories.find(category => 
        category.id === this.category );
      return result.category_name;
    },
  },
  created() {
    this.getCategories();
  }
};
</script>

<style scoped>
.item {
  display: flex;
  justify-content: center;
}

.buttons-control {
  display: flex;
  justify-content: space-around;
}

.desc {
  text-align: center;
  margin-bottom: 10px;
}

h2 {
  text-align: center;
}
</style>