<template>
  <div>
    <h1>Order Products</h1>
    <div>
      <ul>
        <order-item v-for="item in cart.items" :key="item.productId" :prod-id="item.productId" :title="item.title"
          :price="item.price" :qty="item.qty">
        </order-item>
      </ul>
    </div>
    <form>
      <label v-if="!userName.isValid">UserName must not be empty.</label>
      <div class="input-group mb-3 control" :class="{ invalid: !userName.isValid }">
        <input type="text" id="userName" v-model.trim="userName.val" @blur="clearValidity('userName')"
          class="form-control" placeholder="User Name" aria-label="User Name" aria-describedby="basic-addon1" />
      </div>
      <label v-if="!email.isValid">Email must not be empty and have @.</label>
      <div class="input-group mb-3" :class="{ invalid: !email.isValid }">
        <input type="text" id="email" v-model.trim="email.val" @blur="clearValidity('email')" class="form-control"
          placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
      </div>
      <label v-if="!phone.isValid">Phone must not be empty and have 9 digits.</label>
      <div class="input-group mb-3" :class="{ invalid: !phone.isValid }">
        <input type="text" id="phone" v-model.trim="phone.val" @blur="clearValidity('phone')" class="form-control"
          placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon1" />
      </div>
      <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
      <div class="button-control" v-if="cartTotal > 0">
        <button type="button" class="btn btn-outline-dark" @click="submitForm()">Order</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import OrderItem from '../components/order/OrderItem.vue';

export default {
  inject: ['cart', 'removeProductFromCart'],
  components: {
    OrderItem,
  },
  data() {
    return {
      userName: {
        val: '',
        isValid: true,
      },
      email: {
        val: '',
        isValid: true,
      },
      phone: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },
  computed: {
    cartTotal() {
      return this.cart.total.toFixed(2);
    },
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.userName.val === '') {
        this.userName.isValid = false;
        this.formIsValid = false;
      }
      if (this.email.val === '' || !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.phone.val === '' || this.phone.val.length < 9) {
        this.phone.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      } 

      this.orderProduct();
    },
    orderProduct() {
      console.log(this.userName.val);
      const items = this.cart.items.map( obj => ({
        product_id: obj.productId,
        quantity: obj.qty,
      }));
      axios.post('http://localhost:8080/shop_api/orders', {
        user_name: this.userName.val,
        email: this.email.val,
        phone_number: this.phone.val,
        order_products: items,
      })
        .then(function (response) {
          console.log(response);
      })
      items.forEach(element => {
        this.removeProductFromCart(element.product_id);
      });
      this.$router.push( { path: '/'} );
    }
  },
};
</script>

<style scoped>

.button-control {
  text-align: center;
}

h1 {
  text-align: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>