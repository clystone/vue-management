import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';   // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

import axios1 from './config/axiosConfig';
Vue.prototype.$axios = axios1;

Vue.use(ElementUI);

// router.beforeEach((to, from, next) => {
//     //NProgress.start();
//     if (to.path == '/login') {
//         sessionStorage.removeItem('token');
//     }
//     let token = sessionStorage.getItem('token');
//     if (!token && to.path != '/login' && to.path != '/404') {
//         next({ path: '/login' })
//     } else {
//         next()
//     }
// })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
