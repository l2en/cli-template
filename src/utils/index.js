const util = {
  // 默认本页跳转
  jump: (
    path = '',
    opt = {
      target: false,
      params: {}
    }) => {
    let paramsify = '';
    // params stringfy
    if (opt?.params && JSON.stringify(opt?.params) !== '{}') {
      const tmp = [];
      Object.entries(opt?.params).forEach(([key, val]) => {
        if (typeof val === 'object') {
          throw Error(`param [${key}]\'s val  must be basic data types!`)
        }
        tmp.push(`${key}=${encodeURI(val)}`);
      });
      paramsify = tmp.join('&');
    }
    if (!path.startsWith('/')) {
      path = `/${[path]}`
    }
    path = paramsify ? `${path}?${paramsify}` : path;
    if (window && window.location) {
      if (opt?.target) {
        window.open(path);
      } else {
        window.location.href = path;
      }
    }
  },
  // 获取地址栏参数
  getParams: () => {
    if (window && window.location) {
      const paramsify = window.location.search;
      if (!paramsify) {
        return {};
      }
      const paramsObj = paramsify.substring(1).split('&').reduce((res, cur) => {
        const [key, val] = cur.split('=');
        res[key] = decodeURI(val);

        return res;
      }, {});

      return paramsObj;
    }
  },
  // 用于生成随机id
  guid: () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
};

export default util;
