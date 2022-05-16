import { defineStore } from "pinia";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    authModalShow: false,
  }),
  actions: {
    toggleAuthModalShow() {
      this.authModalShow = !this.authModalShow;
    }
  },
});
