import { createApp } from "vue";
import { createPinia } from "pinia";
import VeeValidatePlugin from "./includes/validation";
import "./index.css";
import "./assets/main.css";
import App from "./App.vue";
import { auth } from "./includes/firebase";

let app: any;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(VeeValidatePlugin);

    app.mount("#app");
  }
});
