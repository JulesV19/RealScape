import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import Tres from '@tresjs/core';
import { i18n, setI18nLanguage } from './i18n';
import 'leaflet/dist/leaflet.css';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(Tres);
app.use(i18n);

setI18nLanguage(i18n.global.locale.value);
app.mount('#root');
