import { createRouter, createWebHistory } from 'vue-router';

import ProductsList from './pages/ProductsList.vue';
import UserCart from './pages/UserCart.vue';
import ShopAdmin from './pages/ShopAdmin.vue';
import ProductPage from './pages/ProductPage.vue';
import OrderPage from './pages/OrderPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/products', component: ProductsList, props: true },
    { path: '/products/:id', component: ProductPage, props: true, },
    { path: '/cart', component: UserCart },
    { path: '/admin', component: ShopAdmin },
    { path: '/order', component: OrderPage },
  ]
});

export default router;