<template>
	<view>
		<view class="top-wrap"></view>
		<view class="song-wrap">
			<view class="info-wrap"></view>
			<view class="all-wrap">播放全部</view>
			<SongList :list="list" :showImage="false" :showLeftText="true" />
		</view>
	</view>
</template>

<script>
	import SongList from '../../../components/SongList.vue'
	export default {
		components: {
			SongList
		},
		data() {
			return {
				list: [],
				userInfo: {}
			}
		},
		async onLoad(options) {
			// 用户id  442573633   歌单 id  637659815
			// const data1 = await this.$fetch.get('/user/account')
			// console.log('data1===', data1)
			uni.setNavigationBarTitle({
				title: options.name
			})
			let id = options.id
			const data2 = await this.$fetch.get('/playlist/detail', {
				id
			})
			console.log('data2===', data2)
			const trackIds = data2.playlist.trackIds
			let arr = []
			trackIds.map(v => {
				arr.push(v.id)
			})

			const data3 = await this.$fetch.get('/song/detail', {
				ids: arr.join(',')
			})
			console.log('data3===', data3)
			this.list = data3.songs
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.info-wrap {
		width: 96%;
		margin: 20rpx auto;
		height: 200rpx;
		background-color: rgba($color: #000000, $alpha: .1);
	}

	.all-wrap {
		padding: 0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: rgba($color: #000000, $alpha: .1);

		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		flex-direction: row;
		margin: 0px;
		border-top: 1px #f9f9f9 solid;
		border-bottom: 1px #f9f9f9 solid;
	}
</style>
