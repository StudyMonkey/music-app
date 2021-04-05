<template>
	<view class="content">
		页面 - 4
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		async onLoad() {
			const data1 = await this.$fetch.get('/login/cellphone', {phone: 15773113600, password: 'aXM1838851640.'})
			uni.setStorageSync('token', data1.token)
			
			// const data3 = await this.$fetch.get('/login/status')
			
			const data = await this.$fetch.get('/hot/topic', {limit: 30, offset: -1})
			console.log('data===', data)
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
