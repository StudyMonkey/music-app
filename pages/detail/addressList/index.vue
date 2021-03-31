<template>
	<view>
		<uni-easyinput v-model="name" @input="handleInput" placeholder="请输入名称搜索"></uni-easyinput>
		<uni-list>
			<template v-if="list.length">
				<uni-list-item :thumb="item.img1v1Url" v-for="(item,index) in list" :key="item.accountId" clickable
					@click="handleDetail(item)" :title="item.name" link></uni-list-item>
			</template>
			<template v-else>暂无数据</template>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: null,
				more: false,
				list: [],
				num: 0,
				param: {
					limit: 20,
					offset: 0,
					type: 1,
					area: -1
				}
			}
		},
		methods: {
			handleDetail(item) {
				uni.navigateTo({
					url: '/pages/detail/song/song?id=' + item.id + '&name=' + item.name
				})
			},
			// 442573633
			// https://cloud-music-api-five.vercel.app/song/url?id=33894312
			// https://cloud-music-api-five.vercel.app/artist/list?type=1&area=-1&initial=b
			async _requestAwait(data1 = {}, ) {
				let data = await this.$fetch.get('/artist/list', {
					...data1,
					...this.param
				})
				uni.stopPullDownRefresh()
				if (this.param.offset === 0) {
					this.list = data.artists
				} else {
					this.list = this.list.concat(data.artists)
				}
				this.more = data.more
			},
			async handleInput(e) {
				console.log('e===', e)
				this._requestAwait({
					initial: e
				})
			}
		},
		onReachBottom() {
			console.log('reach bottom')
			if (this.more) {
				this.num++
				this.param.offset = this.num * this.param.limit
				this._requestAwait()
			}
		},
		onPullDownRefresh(){
			this._requestAwait()
		},
		created() {
			this._requestAwait()

		}
	}
</script>

<style>

</style>
