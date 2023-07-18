import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// plugin prime vue
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(store);
app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.mount("#app");
