<template>
	<view>
		<view class="top-wrap"></view>
		<view class="song-wrap">
			<view class="all-wrap">
				
			</view>
			<SongList :list="list" :showImage="false" />
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
			
			const data2 = await this.$fetch.get('/playlist/detail', {id: 637659815})
			console.log('data2===', data2)
			const trackIds = data2.playlist.trackIds
			let arr = []
			trackIds.map(v => {
				arr.push(v.id)
			})
			
			const data3 = await this.$fetch.get('/song/detail', {ids: arr.join(',')})
			console.log('data3===', data3)
			this.list = data3.songs
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.top-wrap{
		width: 96%;
		margin: 0 auto;
		height: 200rpx;
		background-color: rgba($color: #000000, $alpha: .1);
	}
</style>
