import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    authModalShow: false,
    userLoggedIn: false,
  }),
  actions: {
    toggleAuthModalShow() {
      this.authModalShow = !this.authModalShow;
    },
    toggleAuth() {
      this.userLoggedIn = !this.userLoggedIn;
    },
    async register(values: any) {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      await usersCollection.doc(userCredentials.user?.uid).set({
        name: values.name,
        email: values.email,
        country: values.country,
        age: values.age,
      });
      await userCredentials.user?.updateProfile({
        displayName: values.name,
      });
      this.userLoggedIn = !this.userLoggedIn;
    },
    initLogin() {
      const user = auth.currentUser;
      if (user) {
        this.userLoggedIn = !this.userLoggedIn;
      }
    },
    async login(values: any) {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      this.userLoggedIn = true;
    },
    async signout() {
      await auth.signOut();
      this.userLoggedIn = false;
    },
  },
});
