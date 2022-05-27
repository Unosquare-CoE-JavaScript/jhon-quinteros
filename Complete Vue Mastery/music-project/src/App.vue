<script lang="ts">
import AppHeader from "./components/Header.vue";
import AuthModal from "./components/Auth.vue";
import AppPlayer from "./components/player.vue";
import { useMainStore } from "./stores/main";

export default {
  name: "App",
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
  created() {
    this.store.initLogin();
  },
};
</script>

<template>
  <AppHeader />
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" mode="out-in"></component>
    </transition>
  </router-view>
  <AppPlayer />
  <AuthModal />
</template>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
