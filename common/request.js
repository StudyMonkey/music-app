//请求接口函数
function fetch (method, url, data = {}, loading = false){
  return new Promise((resolve, reject) => {
      //显示加载动画
      // if (loading) utils.showLoading()
      
      //获取token
      let token = uni.getStorageSync('token')
      
      let obj = { token } // 如果有token的话
      
      //添加token
      Object.assign(data,obj)
	  uni.showLoading({
		  title: '加载中'
	  });
  
      //发起请求
      uni.request({
          url: 'https://cloud-music-api-five.vercel.app' + url,
          method,
          data,
          header: {
              // 数据被编码为名称/值对
              //"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          success: res => {
			  uni.hideLoading();
              let code = res.data.code
              let message = res.data.message
              //统一处理返回值
              switch (code) {
                  case 200 :
					 //  uni.showToast({
						// title: '请求成功',
						// duration: 1000
					 //  });
                      resolve(res.data)
                      break
                  case 403 :
                      // utils.showToast('您的账号已离线，请重新登录')
                      // utils.goLogin()
                      break
                  case 423 :
                      // utils.showToast('账号异地登录，请重新登录')
                      // utils.goLogin()
                      break
                  default:
                      // utils.showToast(`${message}`)
              }
          },
          fail: err => {
              reject(err)
          },
          complete: () => {
              //结束加载动画
			  console.log('complete')
              // if (loading) utils.hideLoading()
          }
      });
  })
}

export default {
  get: function (url, params, loading){
      return fetch('GET', url, params, loading)
  },
  post: function (url, params, loading){
      return fetch('POST', url, params, loading)
  },
  put: function (url, params, loading){
      return fetch('PUT', url, params, loading)
  },
  delete: function (url, params, loading){
      return fetch('DELETE', url, params, loading)
  }
}
