import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.mount('#app');
console.log(123, import.meta.env);
