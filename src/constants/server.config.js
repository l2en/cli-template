// 微服务， 运维根据此配置跨域服务

/**
 * ORDER: https://buy.lenovouat.com/ || https://buy.lenovo.com.cn/
 * MEMBER: https://b.lenovouat.com/.. || https://b.lenovo.com.cn/
 */
 const SERVER_MAP = {
  order: "ORDER_API", // 订单服务
  member: "MEMBER_API" // 会员服务
};


const BASE_URL_UAT = {
  MEMBER_API: 'https://i.lenovouat.com',
  ORDER_API: 'https://buy.lenovouat.com',
}

const BASE_URL_PROD = {
  MEMBER_API: 'https://i.lenovo.com.cn',
  ORDER_API: 'https://buy.lenovo.com.cn',
}

// 错误类型
const ERROR_TYPE = {
  NOT_BIZ: 'NOT_BIZ',  // 非业务错误，一般是网络错误等
};

export {
  SERVER_MAP,
  BASE_URL_UAT,
  BASE_URL_PROD,
  ERROR_TYPE
};
