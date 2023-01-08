module.exports = {
  // 订单服务
  "/ORDER_API": {
    target: 'https://buy.lenovouat.com/', // uat - 暂用pc接口测试
    // target: 'https://mbuy.lenovouat.com/', // uat
    // target: 'https://mbuy.lenovo.com.cn/', // prod
    pathRewrite: {
      "^/ORDER_API": ""
    },
    secure: false,
    changeOrigin: true
  },
  // 会员服务
  "/MEMBER_API": {
    target: 'https://i.lenovouat.com/', // uat
    // target: 'https://i.lenovo.com.cn/', // prod
    pathRewrite: {
      "^/MEMBER_API": ""
    },
    secure: false,
    changeOrigin: true
  }
}