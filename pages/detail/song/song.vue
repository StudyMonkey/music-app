<template>
	<view>
		<uni-list>
			<template v-if="list.length">
				<uni-list-item clickable @click="handleSongDetail(item)" :thumb="item.img1v1Url" v-for="(item,index) in list" :key="item.accountId" :title="item.name"></uni-list-item>
			</template>
			<template v-else>暂无歌曲</template>
		</uni-list>
	</view>
</template>

<script>
	export default {
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
			console.log('option===', option)
			this._requestAwait(option.id)
		}
	}
</script>

<style>

</style>
