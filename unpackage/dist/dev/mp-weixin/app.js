"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/search/index.js";
  "./pages/audio/index.js";
  "./pages/collection/index.js";
  "./pages/profile/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const innerAudioContext = common_vendor.index.createInnerAudioContext();
  innerAudioContext.onError((res) => {
    console.log("音乐播放报错监听", res);
  });
  innerAudioContext.onWaiting((res) => {
    console.log("音乐加载中监听", res);
  });
  app.config.globalProperties.$AudioContext = innerAudioContext;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
