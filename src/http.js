import axios from 'axios'
import {isObject} from 'lodash/lang'

// 自定义的http请求异常代码
const EXCEPTION_STATUS_CODE = -404;
const console = window.console;

// 响应拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    // 扶正错误信息，调用时不需要写catch
    console.log('http response error:', error);
    console.log('http response url:', error.request.responseURL);
    return Promise.resolve(error.response)
  }
);

function checkStatus(response)
{
  if(response && (response.status===200 || response.status===304 || response.status===400) && isObject(response.data))
  {
    return response
  }
  // 异常状态下，把错误状态码返回
  return {
    ...response,
    status: EXCEPTION_STATUS_CODE,
    hasException: true
  }
}

export {
  EXCEPTION_STATUS_CODE as HTTP_EXCEPTION_STATUS_CODE
}

export default {
  post(url, data, configs = {}) {
    return axios({
      method: 'post',
      url,
      data,
      timeout: 30000,
      // headers: {
      //   'X-Requested-With': 'XMLHttpRequest',
      //   'Content-Type': 'application/json;charset=UTF-8'
      // },
      ...configs
    }).then(checkStatus)
  },
  get(url, params, configs = {}) {
    return axios({
      method: 'get',
      url,
      params,
      timeout: 30000,
      // headers: {
      //   'X-Requested-With': 'XMLHttpRequest'
      // },
      ...configs
    }).then(checkStatus)
  }
}
