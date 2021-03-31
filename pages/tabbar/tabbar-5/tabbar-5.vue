<template>
	<view class="content">
		<view class="info-col uni-row uni-flex">
			<image class="flex-item logo-image mr10" src="../../../static/img/release.png" shape="circle"></image>
			<view class="flex-item uni-flex-1">
				<p>姓名 职位</p>
				<p>手机号</p>
			</view>
		</view>
		
		<view class="archives-col"></view>
		<view class="archives-col work-col">
			
		</view>
		
		<uni-list class="width-100">
			<uni-list-item thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"  title="歌手列表" link to="/pages/detail/addressList/index"></uni-list-item>
			<uni-list-item thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"  title="地址管理" link to="/pages/detail/sign/sign" ></uni-list-item>
			<uni-list-item thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"  title="缓存" link clickable  @click="onSessionClick" ></uni-list-item>
			<uni-list-item thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"  title="技术支持" link ></uni-list-item>
			<uni-list-item thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" title="相机" clickable  @click="onClick" link ></uni-list-item>
			<uni-list-item thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" title="优惠券" link to="/pages/detail/coupon/coupon"></uni-list-item>
		</uni-list>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warning" title="确定清空缓存？" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="messagePopup" type="message">
			<uni-popup-message message="已经是最新版" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="scanPopup" type="dialog">
			<uni-popup-dialog mode="base" type="warning" title="扫码成功" :content="dialogCon" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				dialogCon: null
			}
		},
		onLoad() {

		},
		methods: {
			onSessionClick(){
				console.log('123')
				this.$refs.popup.open()
			},
			onClick(){
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
			close(done){
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done,value){
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
	@import "../../../uni.scss";
	
	.width-100{
		width: 100%
	}
	
	.uni-flex{
		display: flex;
	}
	
	.content{
		background-color: #eaedf3;
	}
	.info-col{
		// position: relative;
		width: 100%;
		padding: 20rpx;
		background-color: #FFFFFF;
		height: 100rpx;
	}
	.logo-image{
		// position: absolute;
		// top: -50rpx;
		// left: 15rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: $uni-border-radius-circle;
	}
	.archives-col{
		width: 90%;
		margin-left: 5%;
		height: 342rpx;
		background-color: #FFFFFF;
		margin-top: $uni-spacing-col-lg;
		margin-bottom: $uni-spacing-col-lg;
	}
	.work-col{
		margin-top: 0;
	}
</style>
