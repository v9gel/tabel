import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/ru-RU";
import Storage from 'vue-web-storage';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(Storage, {
  prefix: 'your_app_slug_',// default `app_`
  drivers: ['session','local'], // default 'local'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
