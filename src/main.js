// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false


axios.defaults.baseURL = _config.server;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;

// 去掉票号后13位
Vue.filter('newCode',function(value){
    return value = value.slice(0,-13);
});

//安卓端支付成功回调
window.onPaySuccess = Vue.prototype.onPaySuccess = function () {};

//安卓端支付失败回调
window.onPayCancel = Vue.prototype.onPayCancel = function () {};

//安卓端兑奖成功回调
window.onDjSuccess = Vue.prototype.onDjSuccess = function () {};

//安卓端兑奖失败回调
window.onPayCancel = Vue.prototype.onPayCancel = function () {};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
