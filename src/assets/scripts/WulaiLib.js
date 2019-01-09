import _ from 'lodash'

// 常量
const constants = {};

// 工具方法
const privateUtils = {
  generateUUID: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random()*16 | 0,
        v = c==='x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
};

export default {
  constants,
  privateUtils
}
