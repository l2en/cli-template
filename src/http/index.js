/**
 * params: {
 *  serverType: enum BASE_URL,
 *  params: object,  // params对象参数，会被拼接到query
 *  data: object  // data对象参数，会在body中传参
 * }
 */
 import axios from 'axios';
 import qs from 'qs';
 import { SERVER_MAP,
   BASE_URL_UAT,
   BASE_URL_PROD,
   ERROR_TYPE
 } from './constants';
 
 
 const isDev = process.env.NODE_ENV === "development";
 const isUat = document.domain.indexOf('lenovouat') > -1;
 
 // axios.defaults.timeout = 15000; // 设置请求超时时间和域名
 axios.defaults.withCredentials = true; // 允许跨域时携带cookie
 
 
 // http request 拦截器
 axios.interceptors.request.use(
   (config) => {
     let serverType = config.serverType || SERVER_MAP.order;
     // dev
     if(isDev) {
       config.url  = config.url.startsWith('/') ? `/${serverType}${config.url}` : `/${serverType}/${config.url}`;
     }
     
     // prod or uat
     if(!isDev) {
       if(isUat) {
         config.url  = config.url.startsWith('/') ? `${BASE_URL_UAT[serverType]}${config.url}` : `${BASE_URL_UAT[serverType]}/${config.url}`;
       } else {
         config.url  = config.url.startsWith('/') ? `${BASE_URL_PROD[serverType]}${config.url}` : `${BASE_URL_PROD[serverType]}/${config.url}`;
       }
     }
 
     return config;
   },
   (err) => Promise.reject(err)
 );
 
 /**
  * 统一错误对象
  * {
  *    msg: '成功', // 状态描述
  *    code: 0, // 状态码
  *    ...
  * } 
  *
  */
 const responseAdapter = ({data}, config) => {
   let res = {};
   // 订单服务。success标识成功与否 true:成功 false:失败
   if(config.serverType == SERVER_MAP.order) {
     if(data?.success) { // 成功
       res = data?.t || {};
     } else {
       const { resultMsg, resultCode, ...rest } = data;
 
       const _data = {
         ...rest,
         msg: resultMsg,
         code: resultCode
       }
 
       return Promise.reject(_data);
     }
   }
 
   // 会员服务。 ret标识成功与否。 0:成功 1:失败
   if(config.serverType == SERVER_MAP.member) {
     if(data?.ret == 0) { // 成功
       res = data?.data || {};
     } else {
       const { ret, msg, ...rest } = data;
 
       const _data = {
         ...rest,
         msg,
         code: ret
       }
       return Promise.reject(_data);
     }
   }
 
   return res;
 }
 
 
 /**
  * 封装get方法
  * @param url
  * @param config
  * @returns {Promise}
  */
 function get(url, config) {
   return new Promise((resolve, reject) => {
     axios
       .get(url, {
         ...config,
         // 手动将数组序列化的模式设置为repeat
         paramsSerializer(params) {
           return qs.stringify(params, { arrayFormat: 'repeat' });
         },
       })
       .then((response) => {
         let data = responseAdapter(response, config);
         resolve(data);
       }).catch(err => {
         reject({...err, FE_ERROR_TYPE: ERROR_TYPE.NOT_BIZ});
       })
   });
 }
 /**
  * 封装post请求
  * @param url
  * @param data
  * @returns {Promise}
  */
 function post(url, config) {
   const { data, ...rest } = config || {};
   return new Promise((resolve, reject) => {
     axios.post(url, data, { ...rest }).then(
       (response) => {
         let responseData = responseAdapter(response, config);
         resolve(responseData);
       }
     ).catch(err => {
       reject({...err, FE_ERROR_TYPE: ERROR_TYPE.NOT_BIZ});
     })
   });
 }
 
 /**
  * 封装patch请求
  * @param url
  * @param config
  * @returns {Promise}
  */
 function patch(url, config) {
   const { data, ...rest } = config || {};
 
   return new Promise((resolve, reject) => {
     axios.patch(url, data, { ...rest }).then(
       (response) => {
         let responseData = responseAdapter(response, config);
         resolve(responseData);
       }
     ).catch(err => {
       reject({...err, FE_ERROR_TYPE: ERROR_TYPE.NOT_BIZ});
     })
   });
 }
 
 /**
  * 封装put请求
  * @param url
  * @param config
  * @returns {Promise}
  */
 function put(url, config) {
   const { data, ...rest } = config || {};
   return new Promise((resolve, reject) => {
     axios
       .put(url, data, {
         ...rest,
         // 手动将数组序列化的模式设置为repeat
         paramsSerializer(params) {
           return qs.stringify(params, { arrayFormat: 'repeat' });
         },
       })
       .then(
         (response) => {
           let responseData = responseAdapter(response, config);
           resolve(responseData);
         }
       ).catch(err => {
         reject({...err, FE_ERROR_TYPE: ERROR_TYPE.NOT_BIZ});
       })
   });
 }
 
 /**
  * 封装delete请求
  * @param url
  * @param config
  * @returns {Promise}
  */
 function del(url, config) {
   return new Promise((resolve, reject) => {
     axios
       .delete(url, { ...config })
       .then((response) => {
         let responseData = responseAdapter(response, config);
         resolve(responseData);
       }).catch(err => {
         reject({...err, FE_ERROR_TYPE: ERROR_TYPE.NOT_BIZ});
       })
   });
 }
 
 // 开放接口
 export { get, post, put, patch, del };
 export default axios;
 