import axios from 'axios';
import qs from 'qs';
import {url} from './url';

axios.defaults.timeout = 10000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头

// const url1 = 'http://192.168.2.117:8080';
// const url = 'https://shifu.jack-kwan.com';
// axios.defaults.baseURL = url1;

//(添加请求拦截器)
axios.interceptors.request.use((config) => {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers.token = token;
    }
    return config;
},(error) =>{
    // _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事
    if(res.data.info == 1){
        console.log(res.data.msg);
    }
    return res;
}, (error) => {
    console.log("网络异常", 'fail');

});

export default axios

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//返回一个Promise(发送post请求)
// export function fetch(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, params)
//             .then(response => {
//                 resolve(response.data);
//             }, err => {
//                 reject(err);
//             })
//             .catch((error) => {
//                 reject(error)
//             })
//     })
// }
