<template>
	<view>
		<uni-easyinput suffixIcon="search" v-model="searchValue" placeholder="查询喜欢的UP或者作品~" @iconClick="search">
			<template #right>
				<view><uni-data-select v-model="searchType" :localdata="searchTypes"
						placeholder="查询类型"></uni-data-select></view>
			</template>
		</uni-easyinput>
		<view class="tag-box">
			<uni-tag text="标签"></uni-tag>
			<uni-tag text="标签" type="error" :circle="true"></uni-tag>
			<uni-tag text="标签"></uni-tag>
		</view>
		<view v-if="resultAuthFlag">
			<uni-list v-for="(item, index) in resultAuth" :key="item.auth_uuid">
				<uni-list-item :title="item.name" :note="`来源平台：${item.platform}`" :rightText="`收藏数：${item.like_num}`"
					:thumb="item.img_url">
				</uni-list-item>
			</uni-list>
		</view>
		<view v-if="resultVideoFlag">
			<uni-list>
				<uni-list-item v-for="(item, index) in resultVideo" :key="item.video_uuid">

					<image :src="item.img_url" class="video-image" />
					<view class="video-details">
						<text class="video-title">{{ item.title }}</text>
						<text class="video-auth">作者名: {{ item.auth_name }}</text>
						<text class="video-desc">简介: {{ item.desc }}</text>
						<text class="video-platform">来源平台: {{ item.platform }}</text>
						<text class="video-likes">收藏数: {{ item.like_num }}</text>
					</view>

				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
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
				resultVideo: []
			}
		},
		onLoad() {

		},
		methods: {
			search() {
				console.log('Search value:', this.searchValue);
				console.log('searchType:', this.searchType);
				if (this.searchType == '0') {
					this.resultAuth.push({
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
					});
					this.resultAuthFlag = true;
					this.resultVideoFlag = false;
				}
				if (this.searchType == '1') {
					this.resultVideo.push({
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
					});
					this.resultVideoFlag = true;
					this.resultAuthFlag = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 30px;
		height: 30px;
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
	.tag-box {
		margin: 10px;
	}
</style>