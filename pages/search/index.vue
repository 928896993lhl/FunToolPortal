<template>
	<view>
		<!-- 搜索部分 -->
		<uni-easyinput suffixIcon="search" v-model="searchValue" placeholder="查询喜欢的UP或者作品~" @iconClick="search">
			<template #right>
				<view class="right-select"><uni-data-select v-model="searchType" :localdata="searchTypes" :clear="false"
						placeholder="查询类型"></uni-data-select></view>
			</template>
		</uni-easyinput>
		<!-- 选择UP标签部分 -->
		<view class="tag-box">
			<uni-tag v-for="item in authList" :key="item.auth_uuid" :circle="true" :text="item.name" :inverted="true"
				type="success" @click="deleteAuth(item)"></uni-tag>
		</view>
		<!-- 展示UP搜索结果部分 -->
		<view v-if="resultAuthFlag">
			<uni-list v-for="(item, index) in resultAuth" :key="item.auth_uuid">
				<uni-list-item :title="`${item.name}.${item.platform}`" :note="`收藏数：${item.like_num}`"
					:thumb="item.img_url" clickable>
					<template v-slot:footer>
						<button class="mini-btn" type="primary" size="mini" plain="true"
							@click="selectAuth(item)">添加标签</button>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 展示作品搜索结果部分 -->
		<view v-if="resultVideoFlag">
			<uni-list v-for="(item, index) in resultVideo" :key="item.video_uuid">
				<uni-list-item>
					<template v-slot:header>
						<view class="slot-box">
							<image :src="item.img_url" mode="aspectFit"
								style="width: 80px; height: 80px; margin-right: 10px;">
							</image>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view style="font-size: 16px; font-weight: bold; margin-bottom: 5px;" v-html="item.title">
						</view>
						<!-- 简介 -->
						<view style="font-size: 14px; color: #666; margin-bottom: 5px;">
							{{ item.auth_name }}.{{ item.platform }}
						</view>
						<view
							style="font-size: 14px; color: #999; margin-bottom: 5px; justify-content: flex-end; align-items: flex-end;">
							收藏数：{{ item.like_num }}
						</view>
					</template>
				</uni-list-item>
			</uni-list>

		</view>
	</view>
</template>

<script>
	import {
		ciliSearch
	} from "@/api/api.js"

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
			async search() {
				if (this.searchType == '0') {
					try {
						var params = {
							"keyword": this.searchValue,
							"search_type": this.searchType,
							"page_no": 1,
							"page_size": 10 //暂定写死，之后优化应该不需要传
						};
						let res = await ciliSearch(params);
						console.log('res: ', res);
						if (res && res.code == '0') {
							this.resultAuth = res.auth_result;
							this.resultAuthFlag = true;
							this.resultVideoFlag = false;
						}
					} catch (error) {
						console.error('Error:', error);
					}
				}
				if (this.searchType == '1') {
					try {
						var params = {
							"keyword": this.searchValue,
							"search_type": this.searchType,
							"page_no": 1,
							"page_size": 10 //暂定写死，之后优化应该不需要传
						};
						let res = await ciliSearch(params);
						console.log('res: ', res);
						if (res && res.code == '0') {
							this.resultVideo = res.video_result;
							this.resultVideoFlag = true;
							this.resultAuthFlag = false;
						}
					} catch (error) {
						console.error('Error:', error);
					}
				}
			},
			selectAuth(item) {
				//点击列表中的结果，可以添加对应的UP标签，已有标签则不会添加
				if (!this.authList.some(auth => auth.auth_uuid === item.auth_uuid)) {
					this.authList.push({
						"name": item.name,
						"auth_uuid": item.auth_uuid
					})
				}

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
	.keyword {
		color: red;
		/* 设置高亮颜色 */
		font-weight: bold;
		/* 设置高亮字体加粗 */
	}

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

	.mini-btn {
		width: 90px;
		height: 30px;
		padding: 0;
		font-size: 10px;
		line-height: 30px;
		/* 确保文本在按钮内垂直居中 */
	}

	.tag-box {
		margin: 10px;
	}

	.uni-tag {
		margin-right: 10px;
	}

	.right-select {
		width: 100px;
	}
</style>