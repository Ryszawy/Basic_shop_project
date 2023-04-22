import { createApp } from 'vue';

import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import router from './router.js';
import App from './App.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';


const app = createApp(App)

app.use(router);

app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);

app.mount('#app');