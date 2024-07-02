"use strict";
const common_vendor = require("../common/vendor.js");
const base_url = "http://localhost:8080";
const request = (params) => {
  let url = params.url;
  let method = params.method || "get";
  let data = params.data || {};
  let header = {};
  if (method == "post") {
    header = {
      "Content-Type": "application/json"
    };
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: base_url + url,
      method,
      header,
      data,
      success(response) {
        const res = response;
        console.log(res.statusCode);
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          common_vendor.index.clearStorageSync();
          switch (res.statusCode) {
            case 401:
              common_vendor.index.showModal({
                title: "提示",
                content: "请登录",
                showCancel: false,
                success(res2) {
                  setTimeout(() => {
                    common_vendor.index.navigateTo({
                      url: "/pages/login/index"
                    });
                  }, 1e3);
                }
              });
              break;
            case 404:
              common_vendor.index.showToast({
                title: "请求地址不存在...",
                duration: 2e3
              });
              break;
            default:
              common_vendor.index.showToast({
                title: "请重试...",
                duration: 2e3
              });
              break;
          }
        }
      },
      fail(err) {
        console.log(err);
        if (err.errMsg.indexOf("request:fail") !== -1) {
          common_vendor.wx$1.showToast({
            title: "网络异常",
            icon: "error",
            duration: 2e3
          });
        } else {
          common_vendor.wx$1.showToast({
            title: "未知异常",
            duration: 2e3
          });
        }
        reject(err);
      },
      complete() {
        common_vendor.index.hideLoading();
        common_vendor.index.hideToast();
      }
    });
  }).catch((e) => {
  });
};
exports.request = request;
