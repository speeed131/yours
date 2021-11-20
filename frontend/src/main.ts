import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import "./index.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

createApp(App).use(store).use(router).use(PrimeVue).mount("#app");
