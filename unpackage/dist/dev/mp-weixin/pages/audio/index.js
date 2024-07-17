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
      pic: "http://i1.hdslb.com/bfs/archive/e281360e6d36e645dbc1146cb9e7027fbf80f917.jpg",
      audioList: [
        {
          title: "水星记",
          src: "https://music.163.com/song/media/outer/url?id=441491828.mp3",
          id: 441491828
        },
        {
          title: "【最伟大的作品 | 官方MV 】周杰伦 化身时空旅人与艺术家们相遇",
          src: "https://xy112x3x27x19xy.mcdn.bilivideo.cn:8082/v1/resource/765060141_nb3-1-30280.m4s?agrr=0&build=0&buvid=&bvc=vod&bw=39897&cdnid=10197&deadline=1721238886&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=0&nbs=1&nettype=0&og=cos&oi=613737956&orderid=0%2C3&os=bcache&platform=pc&sign=b4ad39&traceid=trOpOaGbsztCRU_0_e_N&uipk=5&uparams=e%2Cuipk%2Cnbs%2Cdeadline%2Cgen%2Cos%2Coi%2Ctrid%2Cmid%2Cplatform%2Cog&upsig=605cfd20df779070b339c585f3707cc0",
          id: 2139388989,
          pic: "http://i1.hdslb.com/bfs/archive/e281360e6d36e645dbc1146cb9e7027fbf80f917.jpg"
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
    a: _ctx.aspectFit,
    b: $data.pic,
    c: common_vendor.o((...args) => _ctx.imageError && _ctx.imageError(...args)),
    d: common_vendor.t($data.currentTitle),
    e: $data.currentTitle,
    f: $data.playInfo.progressWidth + "%",
    g: common_vendor.o((...args) => $options.progressMouseMove && $options.progressMouseMove(...args)),
    h: common_vendor.o((...args) => $options.progressMouseDown && $options.progressMouseDown(...args)),
    i: common_vendor.o((...args) => $options.progressClick && $options.progressClick(...args)),
    j: common_vendor.t($data.playInfo.currentValue),
    k: common_vendor.t($data.playInfo.durationValue),
    l: common_vendor.o(($event) => $options.hanleAudioChange("pre")),
    m: common_vendor.t($data.paused ? "播放" : "暂停"),
    n: common_vendor.o((...args) => $options.handlePlay && $options.handlePlay(...args)),
    o: common_vendor.o(($event) => $options.hanleAudioChange("next")),
    p: common_vendor.f($data.audioList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.n($data.currentIndex === index ? "line_box bgc_line" : "line_box"),
        c: item.id,
        d: common_vendor.o(($event) => $options.handleCurrentAudio(index), item.id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
