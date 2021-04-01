<template>
	<view>
		<SongList :list="list" :showImage="true" />
	</view>
</template>

<script>
		import SongList from '../../../components/SongList.vue'
	export default {
		components:{
			SongList
		},
		data() {
			return {
				list: []
			}
		},
		async onLoad(options) {
			const data = await this.$fetch.get('/top/song', {
				type: options.type
			})
			this.list = data.data
			this.list.map(item => {
				item.authorName = item.artists ? item.artists[0].name : item.ar[0].name
				item.lmImage = item.album ? item.album.blurPicUrl : item.al.picUrl
			})
			let title = this.barTitle(options.type)
			uni.setNavigationBarTitle({
				title: title + '新歌'
			})
		},
		methods: {

			barTitle(num) {
				let str = null
				switch (num) {
					case '7':
						str = '华语'
						break;
					case '8':
						str = '日本'
						break;
					case '16':
						str = '韩国'
						break;
					default:
						str = '欧美'
						break;
				}
				return str
			}
		}
	}
</script>


