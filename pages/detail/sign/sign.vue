<template>
	<view>
		<template v-if="list.length > 0">
		</template>
		<template v-else>
			暂无数据
		</template>
		<view class="btn-wrap">
			<button class="btn" type="default" @click="handleAddress">添加地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			handleAddress(){
				uni.navigateTo({
					url: '/pages/detail/sign/addAddress/addAddress'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../uni.scss";
	
	.btn-wrap{
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: $uni-bg-color;
		height: 100rpx;
		.btn{
			width: 90%;
		}
	}
</style>
