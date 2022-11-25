import { createApp } from 'vue'
import 'reset-css';
import '@/assets/styles/style.css'
import App from './App.vue'

import axios from 'axios';
import VueAxios from 'vue-axios';
import pinia from '@/plugins/store';
import router from '@/plugins/router';

import useStore from '@/store';

createApp(App).use(VueAxios, axios).use(pinia).use(router).mount('#app')

await useStore().fetchCategories();