import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import VeeValidatePlugin from "./includes/validation";
import "./index.css";
import "./assets/main.css";
import App from "./App.vue";
import { auth } from "./includes/firebase";
import Icon from "./directives/icon";

let app: any;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.directive("icon", Icon);
    app.mount("#app");
  }
});
