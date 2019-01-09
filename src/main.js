import Vue from 'vue'
import App from './App.vue'
import {isString, isObject, isBoolean} from 'lodash/lang'
import http, {HTTP_EXCEPTION_STATUS_CODE} from './http'
import WulaiLib from './assets/scripts/WulaiLib'

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.HTTP_EXCEPTION_STATUS_CODE = HTTP_EXCEPTION_STATUS_CODE;

const console = window.console;

window.WulaiLib = WulaiLib;

window.Wulai = function(params) {
  console.log('params:', params);
  if(isObject(params))
  {
    const {pubkey, env, async, autoOpen, fullScreen, userId} = params;
    const sdkProps = {};
    sdkProps.pubkey = isString(pubkey) ? pubkey : '';
    sdkProps.env = env==='dev' ? 'dev' : 'prod';
    sdkProps.async = isBoolean(async) ? async : true;
    sdkProps.autoOpen = isBoolean(autoOpen) ? autoOpen : true;
    sdkProps.fullScreen = isBoolean(fullScreen) ? fullScreen : true;
    sdkProps.userId = isString(userId) ? userId : '';
    if(!sdkProps.userId)
    {
      sdkProps.userId = `randomUserId_${Math.random().toString(36).substr(2)}${new Date().getTime()}`;
    }
    const appElement = document.createElement('div');
    document.body.appendChild(appElement);
    new Vue({
      render: h => h(App, {
        props: {
          ...sdkProps,
        }
      }),
    }).$mount(appElement)
  }
  else
  {
    console.log('参数配置不正确')
  }
};

