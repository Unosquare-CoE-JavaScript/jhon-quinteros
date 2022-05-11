import { createApp } from "vue";

import App from "./App.vue";

const app = createApp(App);

const vm: any = app.mount("#app");

setTimeout(() => {
  vm.firstName = "Luis";
}, 2000);
