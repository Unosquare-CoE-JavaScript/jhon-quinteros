import { createApp } from "vue";
import { createPinia } from "pinia";
import VeeValidatePlugin from "./includes/validation";
import "./index.css";
import "./assets/main.css";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.use(VeeValidatePlugin);

app.mount("#app");
