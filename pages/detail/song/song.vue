<template>
	<view>
		<SongList :list="list" :showImage="false" :showLeftText="true" />
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
				option: {},
				list: []
			}
		},
		methods: {
			async handleSongDetail(item) {
				console.log('item', item)
				let data = await this.$fetch.get('/song/url?id=' + item.id)
				console.log('date===', data)
			},
			// /artist/top/song?id=6452
			async _requestAwait(id) {
				let data = await this.$fetch.get('/artist/top/song?id=' + id)
				this.list = data.songs
			},
		},
		onLoad(option) {
			this.option = Object.assign({}, option)
			uni.setNavigationBarTitle({
				title: option.name + '-歌曲列表'
			})
			this._requestAwait(option.id)
		}
	}
</script>

<style>

</style>
