import Vue from 'vue'
import App from './App.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import Modal from "@burhanahmeed/vue-modal-2";

Vue.config.productionTip = false
Vue.component('VueSlider', VueSlider)
Vue.use(Modal);

new Vue({
  render: h => h(App),
}).$mount('#app')
