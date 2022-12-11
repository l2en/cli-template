
#### ⚠️规范

> 开发前请先查看相关开发规范文档。

开发规范： [参考前端开发规范](https://km.xpaas.lenovo.com/pages/viewpage.action?pageId=225674685)

git规范及工作流： [git工作流](https://km.xpaas.lenovo.com/pages/viewpage.action?pageId=225674731)

---

#### 项目结构

```bash
├── README.md // 项目文档
├── config // 项目配置集，【勿动】
│   ├── ...
├── dist // build产物
│   ├── source // 生产代码
│   └── zip // 部署用zip包
│       └── dist.zip
├── jsconfig.json
├── package.json
├── public // 公共资源文件
├── scripts // 项目脚本集
│   ├── ...
└── src
    ├── baseComponents // 基础组件，View原子级别
    │   └── ...
    ├── bizComponents // 业务组件，服务于当前业务的View
    │   ├── ...
    ├── domainComponents // 领域组件，由baseComponent组件+领域数据组合的资产组件
    │   ├── ...
    ├── hooks // 自定义hooks
    │   └── index.js
    ├── http // 基于axios封装请求工具
    │   ├── constants.js
    │   └── index.js
    ├── main // 单页面的根组件
    ├── pages // 单页文件入口，内容取名为index.html&index.js,文件夹命名即为线上路由； 新增页面在此新建
    │   ├── page1 // 单页入口1
    │   │   ├── index.html
    │   │   └── index.js
    │   ├── page2 // 单页入口2
    │   │   ├── index.html
    │   │   └── index.js
    ├── services // 服务层，业务请求集合
    │   └── asyncService.js
    ├── styles // 公共样式
    │   ├── common.scss
    │   ├── margin-padding.scss
    └── utils // 公共方法集
        └── index.js
```


#### How to Start?
```bash
1. npm install
2. npm run dev
3. npm run build
```

---


#### 技术栈

- Webpack 5
- React(hooks)
- JavaScript(ES6+)
- Scss

---

#### 环境配置
- node >= 12
