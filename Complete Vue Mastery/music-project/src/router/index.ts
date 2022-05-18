import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import About from "@/views/AboutView.vue";
import Manage from "@/views/ManageView.vue";
import { useMainStore } from "./../stores/main";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/manage-music",
    name: "manage",
    component: Manage,
    meta: {
      requiresAuth: true,
    },
    /*beforeEach: (to: any, from: any, next: any) => { next();}*/
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    path: "/:cathAll(.*)*",
    redirect: { name: "home" },
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  const store = useMainStore();

  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
