import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// BootstrapVue
import './plugins/BootstrapVue'
// Vue Font-Awesome
import './plugins/fontAwesome'
// Axios
import './plugins/axiosVue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
