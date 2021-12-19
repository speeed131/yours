import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import "./index.css";
import "primevue/resources/themes/tailwind-light/theme.css";
// import "primevue/resources/themes/saga-orange/theme.css";
// import "primevue/resources/themes/mdc-light-deeppurple/theme.css";
// import "primevue/resources/themes/lara-light-purple/theme.css";
// import "primevue/resources/themes/lara-light-teal/theme.css";

import "primevue/resources/primevue.min.css"; // ベース
import "primeicons/primeicons.css"; // アイコン
import "/node_modules/primeflex/primeflex.css"; // primeflex

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./variables.css";

createApp(App).use(store).use(router).use(PrimeVue).mount("#app");
