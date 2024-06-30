<template>
	<view>
		<!-- 搜索部分 -->
		<uni-easyinput suffixIcon="search" v-model="searchValue" placeholder="查询喜欢的UP或者作品~" @iconClick="search">
			<template #right>
				<view><uni-data-select v-model="searchType" :localdata="searchTypes"
						placeholder="查询类型"></uni-data-select></view>
			</template>
		</uni-easyinput>
		<!-- 选择UP标签部分 -->
		<view class="tag-box">
			<uni-tag v-for="item in authList" :key="item.auth_uuid" :circle="true" :text="item.name" :inverted="true"
				type="primary" @click="deleteAuth(item)"></uni-tag>
		</view>
		<!-- 展示UP搜索结果部分 -->
		<view v-if="resultAuthFlag">
			<uni-list v-for="(item, index) in resultAuth" :key="item.auth_uuid">
				<uni-list-item :title="item.name" :note="`来源平台：${item.platform}`" :rightText="`收藏数：${item.like_num}`"
					:thumb="item.img_url" clickable @click="selectAuth(item)">
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 展示作品搜索结果部分 -->
		<view v-if="resultVideoFlag">
			<uni-list v-for="(item, index) in resultVideo" :key="item.video_uuid">
				<uni-list-item :title="item.title" :note="`${item.platform}.${item.auth_name}`"
					:rightText="`收藏数：${item.like_num}`" :thumb="item.img_url" thumb-size="lg">
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
				resultVideo: [],
				authList: []
			}
		},
		onLoad() {

		},
		methods: {
			search() {
				if (this.searchType == '0') {
					//测试内容，需要修改为调用接口的返回
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
				if (this.searchType == '1') {
					//测试内容，需要修改为调用接口的返回
					this.resultVideo = [{
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
				//点击列表中的结果，可以添加对应的UP标签
				this.authList.push({
					"name": item.name,
					"auth_uuid": item.auth_uuid
				})
			},
			deleteAuth(item) {
				//点击即可删除对应的UP标签
				let idToDelete = item.auth_uuid;
				this.authList = this.authList.filter(obj => obj.auth_uuid !== idToDelete);
			}
		}
	}
</script>

<style lang="scss">
	.tag-box {
		margin: 10px;
	}

	.uni-tag {
		margin-right: 10px;
	}
</style>