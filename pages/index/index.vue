<template>
	<view class="content">
		<view class="swiper-wrap mb20">
			<swiper class="swiper" :indicator-dots="false" autoplay="true" interval="5000" duration="1500">
				<swiper-item class="banner-swiper" v-for="(item , index) in banners" :key="index">
					<image :src="item.pic" mode="cover"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="mb20">
			<text class="wrap-text">新歌速递</text>
			<view class="new-wrap">
				<view v-for="(item,index) in newList" @click="handleNew(item)" :key="index" class="new-item mt20" style="width: 46%">
					<image class="new-item-image" src="/../../static/riben.jpeg" width="100%" mode="aspectFill">
					</image>
					<text>{{ item.text }}</text>
				</view>
			</view>
		</view>

		<view class="rank-wrap mb20">
			<view class="mb10"><text class="wrap-text">排行榜</text></view>
			<swiper class="rank-swiper" :indicator-dots="false" :autoplay="false">
				<swiper-item class="rank-swiper-item" v-for="(item , index) in rankList" :key="index">
					<view class="rank-item">
						<view class="rank-title mb10"><text>{{ item.name }}</text></view>
						<view class="rank-item-song" v-for="(ite,ind) in item.tracks" :key="ind">
							<!-- <image class="dj-image" :src="item.picUrl" width="100%" mode="aspectFill"></image> -->
							<text v-text="ind + 1" class="mr20"></text>
							<text class="mr20 item-title text-over" v-text="ite.first + '-' + ite.second"></text>
							<text>新</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="dj-wrap">
			<text class="mb20">热门电台</text>
			<scroll-view scroll-x="true" class="mt20 bookshelf-content">
				<block v-for="(item, index) in list" :key="index">
					<view class="item" @tap="goDetail(item.id)">
						<image class="dj-image" :src="item.picUrl" width="100%" mode="aspectFill"></image>
						<text class="item-title text-over">{{item.name}}</text>
					</view>
				</block>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				banners: [], // banner
				newList: [{
						url: '',
						text: '华语',
						type: 7
					},
					{
						url: '',
						text: '欧美',
						type: 96
					},
					{
						url: '',
						text: '日本',
						type: 8
					},
					{
						url: '',
						text: '韩国',
						type: 16
					},
				],
				list: [],
				rankList: [], // 排行榜
			};
		},
		async onLoad() {
			const data1 = await this.$fetch.get('/banner', {
				type: 2
			})
			this.banners = data1.banners
			
			// 排行榜数据
			const data2 = await this.$fetch.get('/toplist/detail')
			let arr = []
			data2.list.map(v => {
				if (v.tracks && v.tracks.length > 0) {
					arr.push(v)
				}
			})
			this.rankList = arr

			const data = await this.$fetch.get('/dj/hot', {
				limit: 10,
				offset: 0
			})
			this.list = data.djRadios

		},
		methods: {
			handleNew(item){
				console.log('item===', item)
				uni.navigateTo({
					url: '/pages/detail/newSong/newSong?type=' + item.type
				})
			}
		}
	};
</script>

<style lang="scss">
	.content {
		background-color: #f8f8f8;
	}

	.swiper-wrap {
		width: 94%;
		margin-left: 3%;
	}

	swiper-item image {
		width: 100%;
		border-radius: 6px;
	}

	.wrap-text {
		margin-left: 3%;
	}

	.mr5 {
		margin-right: 5%;
	}


	.dj-wrap {
		white-space: nowrap; // 滚动必须加的属性
		width: 94%;
		height: 300rpx;
		padding: 0 3%;
		margin: 0 auto;

		.item {
			width: 30%;
			margin-right: 20rpx;
			display: inline-block;
			vertical-align: top;

			.dj-image {
				width: 100%;
				height: 160rpx;

				image {
					width: 100%;
					height: 160rpx;
					border-radius: 6rpx;
				}
			}

			.item-title {
				text-align: center;
				display: block; // 让字体换行
				width: 90%;
				font-size: 30rpx;
				line-height: 40rpx;
			}
		}
	}

	.new-wrap {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 3%;

		.new-item-image {
			width: 100%;
			height: 200rpx;

			image {
				width: 100%;
				height: 200rpx;
			}
		}

		.new-item {
			text-align: center;
		}
	}

	.rank-wrap {
		white-space: nowrap; // 滚动必须加的属性
		// .rank-swiper{
		// 	.rank-swiper-item{
		// 		width: 94% !important;
		// 	}
		// }
		.rank-item {
			display: inline-block;
			width: 86%;
			margin: 0 3%;
			padding: 20rpx;
			background-color: rgba($color: #999999, $alpha: 0.2);
			border-radius: 6px;

			.rank-title {
				text-align: center;
			}

			.rank-item-song {
				height: 60rpx;
				line-height: 60rpx;
			}
		}
	}

	.text-over {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
