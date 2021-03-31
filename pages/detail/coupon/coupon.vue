<template>
	<view>
		<view class="alarmList">
			<view class="switchHead">
				<view v-for="(item,index) in tabData" class="boxList" :class="{activeCss:activeIndex==index}"
					:key="index">
					<text @click="clickTab(index)">{{item.name}}</text>
				</view>
			</view>
			<!-- <tabs :list="tabData" v-model="activeIndex"></tabs> -->
			<uni-list>
				<uni-list-item v-for="(item,index) in list" :key="index" :title="item.title"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				tabData: [{
					id: 1,
					name: '待使用'
				}, {
					id: 2,
					name: '已使用'
				}, {
					id: 3,
					name: '已过期'
				}],
				list: [{title: '标题1'}, {title: '标题2'}]
			}
		},
		methods: {
			clickTab(index) {
				this.activeIndex = index
			}
		}
	}
</script>

<style scoped>
	.alarmList {
		font-size: 14px;
		height: 100%;
	}

	.alarmList .switchHead {
		height: 35px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #FFFFFF;
		background-color: #13D1BE;
	}

	.alarmList .switchHead .boxList {
		height: 100%;
	}

	.alarmList .switchHead .activeCss {
		border-bottom: 2px solid yellow;
		color: yellow;
	}
</style>
