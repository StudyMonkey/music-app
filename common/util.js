export function getHeight(ele) {
	let height = 0
	let info = uni.createSelectorQuery().in(this).select(`.${ele}`);
	console.log('ele===', ele)
	info.boundingClientRect((data) => {
		console.log('boundingClientRect data===', data.height)
		height = data.top
	})
	return height
}

export function throttle(fn, gaptime) {
	if (gaptime == null || gaptime == undefined) {
		gaptime = 300
	}
	let _lastTime = null
	return function() {
		let _nowTime = +new Date()
		if (_nowTime - _lastTime > gaptime || !_lastTime) {
			fn.apply(this, arguments)
			_lastTime = _nowTime
		}
	}
}

