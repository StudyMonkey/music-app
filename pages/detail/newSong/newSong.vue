<template>
	<view>
		<uni-list :border="false" :enableBackToTop="true">
			<uni-list-item @more="handleMore(item)" :thumb="item.album.blurPicUrl" v-for="(item,index) in list"
				:key="index" :note="item.artists[0].name + '-' + item.name" :title="item.name" :showDot="true">
			</uni-list-item>
		</uni-list>
		<uni-popup ref="bottomPop" type="bottom">
			<view class="popup-wrap">
				<view class="song-info">
					<image class="song-image mr20" :src="item.album.blurPicUrl" mode="aspectFill"></image>
					<view class="uni-list-item__content">
						<text class="uni-list-item__content-title">{{ item.name }}</text>
						<text class="uni-list-item__content-note">{{ item.artists[0].name + '-' + item.name }}</text>
					</view>
				</view>
				<view class="note-info mb5 ml20">下载后仅限VIP有限期内播放</view>
				<uni-list>
					<uni-list-item 
						clickable
						@click="handlePopItemClick(item)"
						:icon="item.icon" 
						:showIconFont="true" 
						v-for="(item,index) in popList" 
						:key="index"
						:title="item.text"
					></uni-list-item>
				</uni-list>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				item: {
					album: {
						blurPicUrl: null
					},
					artists: [{
						name: null
					}]
				},
				popList: [{
						icon: 'iconziyuan',
						text: '下一首播放'
					},
					{
						icon: 'iconshoucang',
						text: '收藏到歌单'
					},
					{
						icon: 'iconxiazai',
						text: '下载'
					},
					{
						icon: 'iconfenxiang',
						text: '分享'
					},
				]
			}
		},
		async onLoad(options) {
			const data = await this.$fetch.get('/top/song', {
				type: options.type
			})
			this.list = data.data
			let title = this.barTitle(options.type)
			uni.setNavigationBarTitle({
				title: title + '新歌'
			})
		},
		methods: {
			handleMore(item) {
				console.log('item===', item)
				this.item = Object.assign({}, item)
				this.$refs.bottomPop.open()
			},
			// popup 弹出层里面的事件处理
			handlePopItemClick(item){
				console.log('item===', item)
			},
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

<style lang="scss">
	.popup-wrap {
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		background-color: $uni-bg-color;

		.song-info {
			display: flex;
			padding: 20rpx;

			.song-image {
				height: 100rpx;
				width: 100rpx;
			}
			.uni-list-item__content {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				padding-right: 8px;
				flex: 1;
				color: #3b4144;
				// overflow: hidden;
				flex-direction: column;
				justify-content: space-between;
				overflow: hidden;
			}
			.uni-list-item__content-title {
				font-size: $uni-font-size-base;
				color: #3b4144;
				overflow: hidden;
			}
			
			.uni-list-item__content-note {
				margin-top: 6rpx;
				color: $uni-text-color-grey;
				font-size: $uni-font-size-sm;
				overflow: hidden;
			}
		}
		.note-info{
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
		}
	}
</style>
