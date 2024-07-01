"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      searchValue: "",
      searchType: "1",
      searchTypes: [{
        value: 0,
        text: "搜UP"
      }, {
        value: 1,
        text: "搜作品"
      }],
      resultAuthFlag: false,
      resultVideoFlag: false,
      resultAuth: [],
      resultVideo: [],
      authList: []
    };
  },
  onLoad() {
  },
  methods: {
    async search() {
      if (this.searchType == "0") {
        this.resultAuth = [{
          "name": "Test",
          "auth_uuid": "123456789",
          "img_url": "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          "platform": "BiliBili",
          "like_num": 99
        }, {
          "name": "Test2",
          "auth_uuid": "1234567892",
          "img_url": "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          "platform": "BiliBili",
          "like_num": 999
        }];
        this.resultAuthFlag = true;
        this.resultVideoFlag = false;
      }
      if (this.searchType == "1") {
        this.resultVideo = [{
          "title": '【无损音质】<em class="keyword">周杰伦</em>歌曲精选100首 歌词版纯享 地表最高音质 每一首都是顶级文案 中国流行音乐开拓者JAY',
          "video_uuid": "612255353",
          "img_url": "https://i0.hdslb.com/bfs/archive/b1c79744dcf00a7d40dbbf7a6d27ec4c2d2fbb01.png",
          "auth_name": "无损音乐合集",
          "desc": "【无损音质】周杰伦歌曲精选100首 歌词版纯享 地表最高音质 每一首都是顶级文案 中国流行音乐开拓者JAY",
          "platform": "Bilibili",
          "like_num": 0
        }, {
          "title": "这是一个测试的标题",
          "video_uuid": "BV123456",
          "img_url": "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          "auth_name": "测试的UP名",
          "desc": "这是一个测试的视频简介这是一个测试的视频简介这是一个测试的视频简介",
          "platform": "BiliBili",
          "like_num": 9
        }, {
          "title": "这是一个测试的标题2",
          "video_uuid": "BV1234562",
          "img_url": "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          "auth_name": "测试的UP名2",
          "desc": "这是一个测试的视频简介2这是一个测试的视频简介这是一个测试的视频简介这是一个测试的视频简介这是一个测试的视频简介",
          "platform": "BiliBili",
          "like_num": 91
        }];
        this.resultVideoFlag = true;
        this.resultAuthFlag = false;
      }
    },
    selectAuth(item) {
      if (!this.authList.some((auth) => auth.auth_uuid === item.auth_uuid)) {
        this.authList.push({
          "name": item.name,
          "auth_uuid": item.auth_uuid
        });
      }
    },
    deleteAuth(item) {
      let idToDelete = item.auth_uuid;
      this.authList = this.authList.filter((obj) => obj.auth_uuid !== idToDelete);
    }
  }
};
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_data_select2 + _easycom_uni_easyinput2 + _easycom_uni_tag2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_easyinput + _easycom_uni_tag + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $data.searchType = $event),
    b: common_vendor.p({
      localdata: $data.searchTypes,
      clear: false,
      placeholder: "查询类型",
      modelValue: $data.searchType
    }),
    c: common_vendor.o($options.search),
    d: common_vendor.o(($event) => $data.searchValue = $event),
    e: common_vendor.p({
      suffixIcon: "search",
      placeholder: "查询喜欢的UP或者作品~",
      modelValue: $data.searchValue
    }),
    f: common_vendor.f($data.authList, (item, k0, i0) => {
      return {
        a: item.auth_uuid,
        b: common_vendor.o(($event) => $options.deleteAuth(item), item.auth_uuid),
        c: "617e3d8d-2-" + i0,
        d: common_vendor.p({
          circle: true,
          text: item.name,
          inverted: true,
          type: "success"
        })
      };
    }),
    g: $data.resultAuthFlag
  }, $data.resultAuthFlag ? {
    h: common_vendor.f($data.resultAuth, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.selectAuth(item), item.auth_uuid),
        b: "617e3d8d-4-" + i0 + "," + ("617e3d8d-3-" + i0),
        c: common_vendor.p({
          title: `${item.name}.${item.platform}`,
          note: `收藏数：${item.like_num}`,
          thumb: item.img_url,
          clickable: true
        }),
        d: item.auth_uuid,
        e: "617e3d8d-3-" + i0
      };
    })
  } : {}, {
    i: $data.resultVideoFlag
  }, $data.resultVideoFlag ? {
    j: common_vendor.f($data.resultVideo, (item, index, i0) => {
      return {
        a: item.img_url,
        b: item.title,
        c: common_vendor.t(item.auth_name),
        d: common_vendor.t(item.platform),
        e: common_vendor.t(item.like_num),
        f: "617e3d8d-6-" + i0 + "," + ("617e3d8d-5-" + i0),
        g: item.video_uuid,
        h: "617e3d8d-5-" + i0
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/CodeWork/Code/FunToolPortal/pages/search/index.vue"]]);
wx.createPage(MiniProgramPage);
