import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// BootstrapVue
import "./plugins/BootstrapVue";
// Vue Font-Awesome
import "./plugins/fontAwesome";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  methods: {
    init() {
      store.dispatch("auth/refreshToken", null, { root: true });
    }
  },
  beforeMount() {
    this.init();
  },
  render: h => h(App)
}).$mount("#app");
