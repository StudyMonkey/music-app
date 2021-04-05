<template>
	<view class="content">
		<view class="tag-wrap mb10">
			<scroll-view scroll-x="true" class="mt20 bookshelf-content">
				<block v-for="(item, index) in tagList" :key="index">
					<view class="item" @tap="tagDetail(item.id)">
						<!-- <image class="dj-image" :src="item.picUrl" width="100%" mode="aspectFill"></image> -->
						<text class="item-title text-over">{{item.name}}</text>
					</view>
				</block>
			</scroll-view>
		</view>
		
		<view class="play-wrap">
			<view class="first-wrap" v-for="(item,index) in playList" :key="index">
				<view class="item-wrap" v-for="(ite,ind) in item"  @click="handlePlayDetail(ite)" :key="ind">
					<image class="play-image" :src="ite.coverImgUrl" mode="aspectFill"></image>
					<view class="item-text">
						<text>{{ ite.name }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tagList: [],
				playList: []
			}
		},
		async onLoad() {
			const data = await this.$fetch.get('/playlist/hot')
			console.log('data===', data)
			this.tagList = data.tags

			const data1 = await this.$fetch.get('/top/playlist/highquality')
			this.playList = this.arrTrans(3, data1.playlists) 
			console.log('playList====', this.playList)
		},
		methods: {
			arrTrans(num, arr) { // 一维数组转换为二维数组
			  const iconsArr = []; // 声明数组
			  arr.forEach((item, index) => {
			    const page = Math.floor(index / num); // 计算该元素为第几个素组内
			    if (!iconsArr[page]) { // 判断是否存在
			      iconsArr[page] = [];
			    }
			    iconsArr[page].push(item);
			  });
			  return iconsArr;
			},
			tagDetail(id) {

			},
			handlePlayDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/favorite/favorite?id=${item.id}&name=${item.name}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.tag-wrap {
		white-space: nowrap;

		.item {
			width: 20%;
			text-align: center;
			margin-right: 20rpx;
			display: inline-block;
			vertical-align: top;
		}
	}
	
	.play-wrap{
		// display: flex;
		// justify-content: space-between;
		.first-wrap{
			display: flex;
			justify-content: space-around;
			margin-bottom: 20rpx;
			.item-wrap{
				width: 30%;
				.play-image{
					width: 200rpx;
					height: 200rpx;
					border-radius: $uni-border-radius-lg;
				}
				.item-text{
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

	}
</style>
