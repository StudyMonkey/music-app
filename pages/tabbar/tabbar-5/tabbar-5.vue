<template>
	<view class="content">
		<view class="info-wrap">
			<view class="info-wrap">
				<image class="logo-image mr10" :src="userInfo.avatarUrl" shape="circle"></image>
				<view class="info-text">
					<p>{{ userInfo.nickname }}</p>
					<!-- <p>手机号</p> -->
				</view>
				<uni-icons :size="16" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
			</view>
		</view>
		<view class="tool-wrap"></view>

		<view class="favorite-wrap">
			<uni-list bgColor="" :border="false" class="width-100">
				<uni-list-item clickable @click="handleFavorite(item)" :note="item.trackCount + '首'"
					v-for="(item,index) in favorList" :key="index" bgColor="inherit" :border="false" thumbSize="lg"
					:ellipsis="1" titleColor="#ffffff" :thumb="item.coverImgUrl" :title="item.name"></uni-list-item>
			</uni-list>
		</view>

		<view ref="navWrap" :class="[ navStick ? 'stick' : '', 'nav']">
			<view v-for="(item,navIndex) in tabList" :key="navIndex" class="nav-list"
				:class="currentNav==navIndex? 'ac':''" @tap="handleNavClick(navIndex)">{{item}}</view>
		</view>

		<view id="createWrap" class="create-wrap mb20">
			<view class="create-text">创建歌单({{playList.length}}个)</view>
			<uni-list bgColor="" :border="false" class="width-100">
				<uni-list-item clickable @click="handleFavorite(item)" :note="item.trackCount + '首'"
					v-for="(item,index) in playList" :key="index" bgColor="inherit" :border="false" thumbSize="lg"
					:ellipsis="1" titleColor="#ffffff" :thumb="item.coverImgUrl" :title="item.name"></uni-list-item>
			</uni-list>
		</view>

		<view id="collectWrap" class="create-wrap mb20">
			<view class="create-text">收藏歌单({{collectList.length}}个)</view>
			<uni-list bgColor="" :border="false" class="width-100">
				<uni-list-item clickable @click="handleFavorite(item)" v-for="(item,index) in collectList" :key="index"
					:note="item.trackCount + '首'" bgColor="inherit" :border="false" thumbSize="lg" :ellipsis="1"
					titleColor="#ffffff" :thumb="item.coverImgUrl" :title="item.name"></uni-list-item>
			</uni-list>
		</view>

		<view id="helperWrap" class="create-wrap">
			<view class="create-text">歌单助手 </view>
			<view style="height: 240rpx;"></view>
		</view>

		<!-- 		<uni-list :border="false" class="width-100">
			<uni-list-item :border="false"
				thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				title="歌手列表" link to="/pages/detail/addressList/index"></uni-list-item>

			<uni-list-item :border="false"
				thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				title="地址管理" link to="/pages/detail/sign/sign"></uni-list-item>
			<uni-list-item :border="false"
				thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				title="缓存" link clickable @click="onSessionClick"></uni-list-item>
			<uni-list-item :border="false"
				thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				title="技术支持" link></uni-list-item>
			<uni-list-item :border="false"
				thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				title="相机" clickable @click="onClick" link></uni-list-item>
			<uni-list-item :border="false"
				thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				title="优惠券" link to="/pages/detail/coupon/coupon"></uni-list-item>
		</uni-list>

		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warning" title="确定清空缓存？" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="messagePopup" type="message">
			<uni-popup-message message="已经是最新版" :duration="2000"></uni-popup-message>
		</uni-popup> -->
		<uni-popup ref="scanPopup" type="dialog">
			<uni-popup-dialog mode="base" type="warning" title="扫码成功" :content="dialogCon" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { throttle } from '@/common/util.js'
	export default {
		data() {
			return {
				navStick: false,
				topList: ['info-wrap', 'tool-wrap', 'favorite-wrap', 'nav-wrap', 'create-wrap'],
				tabList: ['创建歌单', '收藏歌单', '歌单助手'],
				currentNav: 0,
				title: 'Hello',
				dialogCon: null,
				userInfo: {},
				favorList: [],
				playList: [],
				collectList: [],
				createTop: 0,
				collectTop: 0,
				windowTop: 0
			}
		},
		async onLoad() {
			const data = await this.$fetch.get('/user/detail', {
				uid: '442573633'
			})
			this.userInfo = Object.assign({}, data.profile)
			// console.log('userInfo==', this.userInfo)

			// 获取用户歌单
			const data2 = await this.$fetch.get('/user/playlist', {
				uid: 442573633
			})
			// console.log('data2===', data2)
			const {
				playlist
			} = data2
			this.favorList = playlist.splice(0, 1)
			this.playList = playlist.splice(0, 8)
			this.collectList = playlist.splice(0, playlist.length - 1)



			this.$nextTick(() => {
				const query = uni.createSelectorQuery();
				query.in(this).select('#createWrap').boundingClientRect(data => {
					console.log("节点离页面顶部的距离为" + data.top);
					this.createTop = data.top
				}).exec();
				
				query.in(this).select('#collectWrap').boundingClientRect(data => {
					this.collectTop = data.top
				}).exec();
				
				query.in(this).select('#helperWrap').boundingClientRect(data => {
					this.windowTop = data.top
				}).exec();


			})

		},
		// 页面滚动事件
		onPageScroll: throttle(function(e) {
			console.log('e====', e.scrollTop)
			this.handleScrollTop(e.scrollTop)
		}),
		methods: {
			handleScrollTop(top){
				if (top >= (this.createTop - 50)) {
					this.navStick = true
				} else {
					this.navStick = false
				}
			},
			// tab 点击切换滚动相应位置
			handleNavClick(index) {
				this.currentNav = index
				switch (index) {
					case 0:
						uni.pageScrollTo({
							scrollTop: this.createTop - 50
						})
						break;
					case 1:
						uni.pageScrollTo({
							scrollTop: this.collectTop - 50
						})
						break;
					default:
						uni.pageScrollTo({
							scrollTop: this.windowTop
						})
						break;
				}
			},
			// 跳转歌曲列表页面
			handleFavorite(item) {
				uni.navigateTo({
					url: '/pages/detail/favorite/favorite?id=' + item.id + '&name=' + item.name
				})
			},
			onSessionClick() {
				this.$refs.popup.open()
			},
			onClick() {
				uni.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						console.log('条码类型', res.scanType)
						console.log('条码内容', res.result)
						this.$refs.scanPopup.open()
						this.dialogCon = res.result
					}
				})
				// 调用接口判断版本
				// this.$refs.messagePopup.open()
				// console.log('123')
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done, value) {
				// 输入框的值
				console.log('ok', value)
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				// ...
				done()
			}
		}
	}
</script>

<style lang="scss">
	// @import "../../../uni.scss";

	page{
		height: 100%;
	}
	.content {
		background-color: #942125;
	}

	.width-100 {
		width: 100%
	}

	.tool-wrap {
		width: 96%;
		margin: 0 auto;
		height: 240rpx;
		background-color: rgba($color: #ffffff, $alpha: .1);
	}

	.favorite-wrap {
		width: 96%;
		// height: 200rpx;
		border-radius: 6px;
		background-color: rgba($color: $uni-bg-color, $alpha: .1);
		margin: 20rpx auto;

		.favorite-wrap-second {
			display: flex;
			padding: 16px;

			.uni-list-item__content-title {
				color: #FFFFFF;
			}

			.favorite-wrap-image {
				width: $uni-img-size-lg;
				height: $uni-img-size-lg;
				border-radius: $uni-border-radius-lg;
				margin-right: $uni-spacing-row-base;
			}
		}
	}

	.info-wrap {
		width: 96%;
		margin: 0 auto;

		.info-wrap {
			padding: 20rpx;
			display: flex;

			.info-text {
				color: $uni-text-color-inverse;
			}

			.uni-icon-wrapper {
				margin-left: auto;
				line-height: 100rpx;
			}
		}
	}

	.create-wrap {
		width: 90%;
		margin: 0 auto;
		border-radius: $uni-border-radius-lg;
		padding: 3%;
		background-color: rgba($color: $uni-bg-color, $alpha: .1);
		.create-text {
			color: $uni-text-color-inverse;
			height: 20px;
			line-height: 20px;
			margin-bottom: $uni-spacing-col-base;
		}
	}

	.logo-image {
		// position: absolute;
		// top: -50rpx;
		// left: 15rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: $uni-border-radius-circle;
		border: 2px solid #FFFFFF;
	}

	.stick {
		position: sticky !important;
		background-color: rgba($color: #9f403d, $alpha: 1);
	}

	.nav {
		// display: flex;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		position: -webkit-sticky;
		/* #endif */
		// position: relative;
		top: var(--window-top);
		z-index: 99;
		flex-direction: row;

		.nav-list {
			flex: 1;
			text-align: center;
			color: $uni-text-color-grey;
			height: 100rpx;
			line-height: 100rpx;

			&.ac {
				color: $uni-text-color-inverse;
				position: relative;

				&::after {}
			}

			&.ac::after {
				position: absolute;
				width: 50rpx;
				height: 10rpx;
				background-color: #ffc8c9;
				border-radius: 6px;
			}
		}

	}
</style>
