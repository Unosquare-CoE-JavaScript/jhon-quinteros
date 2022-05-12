import { createApp } from "vue";

import App from "./App.vue";

const app = createApp(App);

export default app.component("hello-component", {
  name: "hello-component",
  data() {
    return {
      message: "Hello world",
    };
  },
  template: `<h1>{{message}}</h1>`,
});

const vm: any = app.mount("#app");

setTimeout(() => {
  vm.firstName = "Luis";
}, 2000);
