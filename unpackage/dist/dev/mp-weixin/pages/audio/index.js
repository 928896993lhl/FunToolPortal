"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      timer: null,
      currentTitle: "未完成之前",
      currentIndex: 0,
      paused: true,
      isMove: false,
      playInfo: {
        progressWidth: 2,
        // 滚动条
        currentTime: 0,
        // 当前音乐时间s
        currentValue: "00:00",
        // 转换成时间展示
        duration: 0,
        // 当前音乐总时间s
        durationValue: "00:00"
        // 总时间转换展示 
      },
      audioList: [
        {
          title: "未完成之前",
          src: "https://music.163.com/song/media/outer/url?id=1453946527.mp3",
          id: 1453946527
        },
        {
          title: "鲜花",
          src: "https://music.163.com/song/media/outer/url?id=2086327879.mp3",
          id: 2086327879
        },
        {
          title: "水星记",
          src: "https://music.163.com/song/media/outer/url?id=441491828.mp3",
          id: 441491828
        },
        {
          title: "人生有时候懂得放弃",
          src: "https://music.163.com/song/media/outer/url?id=2139388989.mp3",
          id: 2139388989
        },
        {
          title: "精卫",
          src: "https://music.163.com/song/media/outer/url?id=1951069525.mp3",
          id: 1951069525
        }
      ],
      progressParentWidth: 0
    };
  },
  onLoad() {
    this.$AudioContext.playbackRate = 1;
    if (this.audioList.length) {
      this.$AudioContext.src = this.audioList[this.currentIndex].src;
      this.currentTitle = this.audioList[this.currentIndex].title;
      this.setPlayInfo();
    }
    this.$AudioContext.onPlay((e) => {
      this.setPlayInfo();
    });
    this.$AudioContext.onEnded((e) => {
      this.hanleAudioChange();
    });
  },
  onShow() {
    this.$nextTick(async () => {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".music-progress-bar").boundingClientRect((data) => {
        this.progressParentWidth = data ? Math.floor(data.width) : 0;
      }).exec();
    });
  },
  onUnload() {
    this.$AudioContext.offPlay();
    this.$AudioContext.offPlay();
  },
  methods: {
    // 进度条点击事件
    progressClick(event) {
      const {
        x
      } = event.detail;
      const progressWidth = Math.floor(x / this.progressParentWidth * 100);
      this.playInfo.progressWidth = progressWidth > 100 ? 100 : progressWidth;
      console.log("event", event);
      this.progressMouseDown();
    },
    // 音乐进度条移动监听
    progressMouseMove(event) {
      if (!this.$AudioContext.src) {
        return;
      }
      this.isMove = true;
      const {
        pageX
      } = event.changedTouches[0];
      const progressWidth = Math.floor(pageX / this.progressParentWidth * 100);
      this.playInfo.progressWidth = progressWidth > 100 ? 100 : progressWidth;
    },
    // 音乐进度条停止监听
    progressMouseDown(event) {
      this.isMove = false;
      const currentTime = Math.floor(this.$AudioContext.duration * (this.playInfo.progressWidth / 100));
      this.$AudioContext.seek(currentTime);
      this.setPlayInfo();
      if (!this.$AudioContext.paused) {
        this.$AudioContext.pause();
      }
      this.handlePlay();
    },
    // 音乐播放
    handlePlay() {
      this.$AudioContext.paused ? this.$AudioContext.play() : this.$AudioContext.pause();
      this.paused = this.$AudioContext.paused;
      this.recursionDeep();
    },
    // 选择目标音乐播放
    handleCurrentAudio(index) {
      this.currentIndex = index;
      this.currentTitle = this.audioList[index].title;
      this.$AudioContext.stop();
      this.$AudioContext.src = this.audioList[index].src;
      this.handlePlay();
    },
    // 递归循环获取最新音乐进度信息
    recursionDeep() {
      clearTimeout(this.timer);
      if (this.paused) {
        return;
      }
      this.timer = setTimeout(() => {
        if (!this.isMove) {
          this.setPlayInfo();
          this.recursionDeep();
        }
      }, 500);
    },
    // 秒转换为分钟
    secondsToMinutesWithSeconds(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
    },
    // 补零
    padZero(number, length = 2) {
      var str = "" + number;
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    },
    // 设置播放对象
    setPlayInfo() {
      const currentTime = this.$AudioContext.currentTime || 0;
      const duration = this.$AudioContext.duration || 0;
      const progressWidth = duration === 0 ? "2" : Math.floor(currentTime / duration * 100);
      const currentValue = this.secondsToMinutesWithSeconds(currentTime);
      const durationValue = this.secondsToMinutesWithSeconds(duration);
      this.playInfo = {
        currentTime,
        duration,
        progressWidth,
        currentValue,
        durationValue
      };
    },
    // 切换歌曲
    hanleAudioChange(type = "next") {
      if (type === "pre") {
        this.currentIndex = this.currentIndex === 0 ? this.audioList.length - 1 : this.currentIndex - 1;
      } else {
        this.currentIndex = this.currentIndex === this.audioList.length - 1 ? 0 : this.currentIndex + 1;
      }
      this.$AudioContext.src = this.audioList[this.currentIndex].src;
      this.currentTitle = this.audioList[this.currentIndex].title;
      this.handlePlay();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.audioList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.n($data.currentIndex === index ? "line_box bgc_line" : "line_box"),
        c: item.id,
        d: common_vendor.o(($event) => $options.handleCurrentAudio(index), item.id)
      };
    }),
    b: common_vendor.t($data.currentTitle),
    c: $data.currentTitle,
    d: $data.playInfo.progressWidth + "%",
    e: common_vendor.o((...args) => $options.progressMouseMove && $options.progressMouseMove(...args)),
    f: common_vendor.o((...args) => $options.progressMouseDown && $options.progressMouseDown(...args)),
    g: common_vendor.o((...args) => $options.progressClick && $options.progressClick(...args)),
    h: common_vendor.t($data.playInfo.currentValue),
    i: common_vendor.t($data.playInfo.durationValue),
    j: common_vendor.o(($event) => $options.hanleAudioChange("pre")),
    k: common_vendor.t($data.paused ? "播放" : "暂停"),
    l: common_vendor.o((...args) => $options.handlePlay && $options.handlePlay(...args)),
    m: common_vendor.o(($event) => $options.hanleAudioChange("next"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
