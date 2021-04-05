<template>
	<view>
		<uni-list :bgColor="bgColor" :border="false" :enableBackToTop="true">
			<uni-list-item :bgColor="bgColor" :border="false" @more="handleMore(item)" clickable @click="handleItemClick(item)"
				:thumb="showImage ? item.album.blurPicUrl : '' " :leftText="showLeftText ? index + 1 : 0"
				v-for="(item,index) in list" :key="index" :note="(item.artists ? item.artists[0].name : item.ar[0].name) + '-' + item.name" :title="item.name"
				:showDot="true">
			</uni-list-item>
		</uni-list>
		<uni-popup ref="bottomPop" type="bottom">
			<view class="popup-wrap">
				<view class="song-info">
					<image class="song-image mr20" :src="item.album ? item.album.blurPicUrl : item.al.picUrl" mode="aspectFill"></image>
					<view class="uni-list-item__content">
						<text class="uni-list-item__content-title">{{ item.name }}</text>
						<text class="uni-list-item__content-note">{{ (item.artists ? item.artists[0].name : item.ar[0].name) + '-' + item.name }}</text>
					</view>
				</view>
				<view class="note-info mb5 ml20">下载后仅限VIP有限期内播放</view>
				<uni-list>
					<uni-list-item clickable :border="false" @click="handlePopItemClick(item)" :icon="item.icon"
						:showIconFont="true" v-for="(item,index) in popList" :key="index" :title="item.text">
					</uni-list-item>
				</uni-list>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "SongList",
		props: {
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			list: {
				type: Array,
				default: () => []
			},
			showImage: {
				type: Boolean,
				default: true
			},
			showLeftText: {
				type: Boolean,
				default: false
			}
		},
		// watch: {
		// 	list: {
		// 		handler(n, o) {
		// 			this.hanndleData()
		// 		},
		// 		deep: true
		// 	}
		// },
		data() {
			return {
				item: {
					ar: [{name: null}],
					al: {
						picUrl: null
					}
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
				],
				audio: null
			};
		},
		methods: {
			// hanndleData(){
			// 	this.list.map(item => {
			// 		item.authorName = item.artists ? item.artists[0].name : item.ar[0].name
			// 		item.lmImage = item.album ? item.album.blurPicUrl : item.al.picUrl
			// 	})
			// },
			createAudioEle(item) {
				this.audio = uni.createInnerAudioContext();
				this.audio.autoplay = true;
				this.audio.src = 'https://music.163.com/song/media/outer/url?id=' + item.id + '.mp3'; //音频地址  
				this.audio.play(); //执行播放  
				this.audio.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				this.audio.onPause(function() {
					console.log('end');
					this.audio.destroy();
				});
			},
			async handleItemClick(item) {
				//  https://music.163.com/song/media/outer/url?id=id.mp3
				// console.log('item===', item)
				// const data = await this.$fetch.get('/song/url', {
				// 	id: item.id
				// })
				// console.log('data', data)
				uni.navigateTo({
					url:'/pages/detail/play/play?id=' + item.id
				})
				//实例化声音  
				// if (!this.audio) {
				// 	this.createAudioEle(item)
				// } else {
				// 	this.audio.destroy()
				// 	this.$nextTick(() => {
				// 		this.createAudioEle(item)
				// 	})
				// }
			},
			handleMore(item) {
				console.log('item===', item)
				// 最喜欢的音乐那边没有专辑信息，获取调用接口获取专辑信息

				this.item = Object.assign({}, item)
				this.$refs.bottomPop.open()
			},
			// popup 弹出层里面的事件处理
			handlePopItemClick(item) {
				console.log('item===', item)
			},
		},
		// onShow: () => {
		// 	this.hanndleData()
		// }
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
		}

		.note-info {
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
		}
	}
</style>
