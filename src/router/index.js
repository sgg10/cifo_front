import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/index.vue";
import store from "../store";

Vue.use(VueRouter);

const routerConfig = [
  { path: "/", name: "Home", meta: { requireAuth: true } },
  { path: "/about", name: "About", meta: { requireAuth: true } },
  { path: "/login", name: "Login" },
  { path: "/register", name: "Register" },
  { path: "/verify", name: "Verify" },
  { path: "/verify/:token", name: "Verify" }
];

const routes = routerConfig.map(r => {
  return {
    ...r,
    component: () =>
      import(/* webpackChunkName: "[request]" */ `@/views/${r.name}/index.vue`)
  };
});

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requireAuth)) {
    if (!store.state.auth.user) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
