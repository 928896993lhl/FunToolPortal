// 全局请求封装
// const base_url = 'http://funtool.cloud'
const base_url = 'http://localhost:80'
// 需要修改token，和根据实际修改请求头
export default (params) => {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {}
	if (method == "post") {
		header = {
			'Content-Type': 'application/json',
			'token': 'https://www.bilibili.com'
		};
	}
	// 获取本地token,暂时先不做
	if (uni.getStorageSync("token")) {
		// header['Authorization'] = 'Bearer ' + uni.getStorageSync("token");
	} else{
		header['token'] = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MjdjNWEzODJjNzg0MjM5YTliNTMxZDgwZTBjN2NiZCIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTcyMTIyOTkwNCwiZXhwIjoxNzUyNzY1OTA0fQ.AmMdpPZ1JaxGDfyMVu1xLI_roklEvhjckZQ8YsuxxKo';
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			data: data,
			success(response) {
				const res = response
				// 根据返回的状态码做出对应的操作
				//获取成功
				console.log(res.statusCode);
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					uni.clearStorageSync()
					switch (res.statusCode) {
						case 401:
							uni.showModal({
								title: "提示",
								content: "请登录",
								showCancel: false,
								success(res) {
									setTimeout(() => {
										uni.navigateTo({
											url: "/pages/login/index",
										})
									}, 1000);
								},
							});
							break;
						case 404:
							uni.showToast({
								title: '请求地址不存在...',
								duration: 2000,
							})
							break;
						default:
							uni.showToast({
								title: '请重试...',
								duration: 2000,
							})
							break;
					}
				}
			},
			fail(err) {
				console.log(err)
				if (err.errMsg.indexOf('request:fail') !== -1) {
					wx.showToast({
						title: '网络异常',
						icon: "error",
						duration: 2000
					})
				} else {
					wx.showToast({
						title: '未知异常',
						duration: 2000
					})
				}
				reject(err);

			},
			complete() {
				// 不管成功还是失败都会执行
				uni.hideLoading();
				uni.hideToast();
			}
		});
	}).catch((e) => {});
};