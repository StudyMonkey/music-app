<template>
	<view class="content">
		<view class="title-area">
			<view></view>
			<view class="name-area">
				<view class="music-name">{{ song.name }}</view>
				<view class="author-name" v-if="song.ar && song.ar.length">{{ song.ar[0].name }}</view>
			</view>
			<view class="share-icon"><text class="iconfont iconfenxiang"></text></view>
		</view>
		<view class="play-area">
			<view class="play-second">
				
			<!-- <view>123</view> -->
			<image class="al-image" :class="{ rotate360: isPlay }" :src="song.al.picUrl"
				mode="aspectFill" shape="circle"></image>
			</view>
		</view>
		<view class="tool-area"></view>
		<view class="progress-area"></view>
		<view class="operate-area">
			<view class="mode"></view>
			<view class="pre"></view>
			<view class="play" @click="handlePlayOrPause"><text class="iconfont"
					:class="isPlay ? 'iconzanting' : 'iconziyuan'"></text></view>
			<view class="next"></view>
			<view class="history"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPlay: true,
				song: {
					al: {}
				},
				audio: null,
				id: null,
				screenWidth: 0,
				leftPos: 0
			}
		},

		async onLoad(options) {
			console.log('load====', options)
			const data = await this.$fetch.get('/song/detail?ids=' + options.id)
			this.song = data.songs[0]
			this.createAudioEle(options.id)
			this.id = options.id
			// uni.setStorageSync('songId', options.id)
			//实例化声音
			// 第一次进来，id 和 audio 都没有
			// 第二次进来，点不同歌曲，id 不同，audio 已存在
			// 第二次进来，点相同的歌曲，id 相同，audio 已存在


			// this.$nextTick(function(){

			// })


		},
		onUnload() {
			console.log('Unload')
			this.audio.destroy()
		},
		onShow() {
			this.$nextTick(() => {
				console.log('show====', this.audio, this.id)
			})
		},
		methods: {
			// 播放暂停事件处理
			handlePlayOrPause() {
				this.isPlay = !this.isPlay
				if (!this.isPlay) {
					this.audio.destroy()
				} else {
					this.createAudioEle(this.id)
				}
			},
			createAudioEle(id) {
				//  https://music.163.com/song/media/outer/url?id=id.mp3
				this.audio = uni.createInnerAudioContext();
				this.audio.autoplay = true;
				this.audio.src = 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3'; //音频地址  
				this.audio.play(); //执行播放
				this.audio.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				this.audio.onPause(() => {
					console.log('end');
					this.audio.destroy();
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.rotate360 {
		animation: rotate360 30s linear 0.2s infinite;
	}

	@keyframes rotate360 {
		100% {
			transform: rotate(360deg);
		}
	}

	.content {
		background-color: #1b252d;
		height: 100%;
		display: flex;
		flex-direction: column;

		.title-area {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0;

			.name-area {
				text-align: center;

				.music-name {
					color: $uni-text-color-inverse;
				}

				.author-name {
					font-size: 12px;
					color: $uni-text-color-grey;
				}
			}

			.share-icon {
				color: $uni-text-color-inverse;
				margin: 10px 10px 0 0;
			}
		}

		.play-area {
			flex: 1 1 auto;

			.play-second{
				display: flex;
				flex-direction: column;
				align-items: center;
				.al-image {
					margin-top: auto;
					width: 400rpx;
					height: 400rpx;
					border-radius: $uni-border-radius-circle;
					border: 20px solid #171717
				}
			}

		}

		.tool-area,
		.progress-area {
			height: 160rpx;
		}

		.operate-area {
			display: flex;
			justify-content: space-between;
			color: $uni-text-color-inverse;
			height: 240rpx;
			line-height: 240rpx;

			.play {
				.iconfont {
					font-size: 80px;
				}
			}
		}
	}
</style>
