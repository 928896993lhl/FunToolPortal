<template>
	<view class="content">
		<scroll-view class="main-container" scroll-y>
			<view class="line_box" :class="currentIndex === index ? 'line_box bgc_line' : 'line_box'"
				v-for="(item, index) in audioList" :key="item.id" @click="handleCurrentAudio(index)">
				{{item.title}}
			</view>
		</scroll-view>
		<view class="audio_box">
			<view class="current_title" v-show="currentTitle">
				当前播放歌曲：{{currentTitle}}
			</view>

			<view class="music-progress-bar" @click="progressClick">
				<view class="progress-bar-line" :style="{width: playInfo.progressWidth + '%'}"
					@touchmove="progressMouseMove" @touchend="progressMouseDown"></view>
			</view>
			<view class="show_time">
				<view>{{playInfo.currentValue}}</view>
				<view>{{playInfo.durationValue}}</view>
			</view>
			<view class="audio_control">
				<view @click="hanleAudioChange('pre')">上一首</view>
				<view @click="handlePlay">{{ paused ? '播放' : '暂停'}}</view>
				<view @click="hanleAudioChange('next')">下一首</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				currentTitle: '未完成之前',
				currentIndex: 0,
				paused: true,
				isMove: false,
				playInfo: {
					progressWidth: 2, // 滚动条
					currentTime: 0, // 当前音乐时间s
					currentValue: '00:00', // 转换成时间展示
					duration: 0, // 当前音乐总时间s
					durationValue: '00:00', // 总时间转换展示 
				},
				audioList: [{
						title: '未完成之前',
						src: 'https://music.163.com/song/media/outer/url?id=1453946527.mp3',
						id: 1453946527,
					},
					{
						title: '鲜花',
						src: 'https://music.163.com/song/media/outer/url?id=2086327879.mp3',
						id: 2086327879,
					},
					{
						title: '水星记',
						src: 'https://music.163.com/song/media/outer/url?id=441491828.mp3',
						id: 441491828,
					},
					{
						title: '人生有时候懂得放弃',
						src: 'https://music.163.com/song/media/outer/url?id=2139388989.mp3',
						id: 2139388989,
					},
					{
						title: '精卫',
						src: 'https://music.163.com/song/media/outer/url?id=1951069525.mp3',
						id: 1951069525,
					},
				],
				progressParentWidth: 0,
			}
		},
		onLoad() {
			this.$AudioContext.playbackRate = 1;
			if (this.audioList.length) {
				this.$AudioContext.src = this.audioList[this.currentIndex].src;
				this.currentTitle = this.audioList[this.currentIndex].title;
				this.setPlayInfo();
			}
			this.$AudioContext.onPlay((e) => {
				// 开始播放获取音乐信息
				this.setPlayInfo();
			});
			this.$AudioContext.onEnded((e) => {
				// 结束播放去播放下一首
				this.hanleAudioChange();
			});
		},
		onShow() {
			this.$nextTick(async () => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.music-progress-bar').boundingClientRect(data => {
					this.progressParentWidth = data ? Math.floor(data.width) : 0;
				}).exec();
			});

		},
		onUnload() {
			// 卸载时关闭监听
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
				// 先停止当前音乐
				this.$AudioContext.stop();
				// 更换播放地址
				this.$AudioContext.src = this.audioList[index].src;
				// 播放音乐
				this.handlePlay();
			},
			// 递归循环获取最新音乐进度信息
			recursionDeep() {
				clearTimeout(this.timer);
				if (this.paused) {
					return
				};
				this.timer = setTimeout(() => {
					if (!this.isMove) {
						this.setPlayInfo();
						this.recursionDeep();
					}
				}, 500)
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
				const progressWidth = duration === 0 ? '2' : Math.floor((currentTime / duration) * 100);
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
			hanleAudioChange(type = 'next') {
				if (type === 'pre') {
					this.currentIndex = this.currentIndex === 0 ? this.audioList.length - 1 : this.currentIndex - 1;
				} else {
					this.currentIndex = this.currentIndex === this.audioList.length - 1 ? 0 : this.currentIndex + 1;
				};
				this.$AudioContext.src = this.audioList[this.currentIndex].src;
				this.currentTitle = this.audioList[this.currentIndex].title;
				// 播放歌曲
				this.handlePlay();
			},
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		height: calc(100vh - 44px - env(safe-area-inset-top));
		background-color: #1A262D;
		color: #fff;
	}

	.main-container {
		width: 100vw;
		height: 46vh;
	}

	.line_box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 92%;
		height: 60px;
		border-radius: 8px;
		margin: 10px auto;
		border: 2px solid #eee;
		background-color: aquamarine;
		color: #333;
		font-weight: bold;
	}

	.audio_control {
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #333;
		margin-top: 40px;
	}

	.audio_control view {
		width: 100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		background: #edeeab;
		border: 1px solid #eee;
		border-radius: 6px;
	}

	.audio_box {
		width: 90%;

		margin: 30px auto;
	}

	.current_title {
		margin-bottom: 20px;
		font-weight: bold;
		font-size: 18px;
	}

	.bgc_line {
		background-color: #e1964b;
	}

	.show_time {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 12rpx;
	}

	.music-progress-bar {
		position: relative;
		width: 100%;
		height: 6rpx;
		border-radius: 6rpx;
		background-color: #f3e7d9;
	}

	.progress-bar-line {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 2%;
		height: 100%;
		border-radius: 6rpx;
		background-color: #e1964b;
	}


	.progress-bar-line::after {
		content: "";
		display: inline-block;
		position: absolute;
		right: 0%;
		top: 50%;
		transform: translateY(-50%);
		width: 20rpx;
		height: 20rpx;
		background-color: #fff;
		border-radius: 50%;
	}
</style>