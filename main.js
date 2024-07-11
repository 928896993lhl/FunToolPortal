import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  // 挂载到全局配置
  // 新建音乐对象挂载到原型上
  const innerAudioContext = uni.createInnerAudioContext();
  // 音乐播放报错监听
  innerAudioContext.onError((res) => {
    console.log("音乐播放报错监听", res);
  });
  // 音乐加载中监听
  innerAudioContext.onWaiting((res) => {
    console.log("音乐加载中监听", res);
  });
  app.config.globalProperties.$AudioContext = innerAudioContext;
  return {
    app
  }
}
// #endif