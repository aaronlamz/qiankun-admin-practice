# qiankun-admin-practice
乾坤微前端｜后台管理系统实践指南

## 快速上手

## 入门指南
### 目录
- [介绍](#1)
  - [什么是微前端](#1-1)
  - [qiankun的设计理念](#1-2)
  - [特性](#1-3)
  - [为什么不是iframe](#1-4)
- [后台管理系统微前端实践](#2)
  - [选择微应用路由模式](.guide/2-0.md)
  - [构建主应用基座](./guide/2-1.md)
  - [接入Vue微应用](./guide/2-2.md)
  - [接入React微应用](./guide/2-3.md)
  - [应用间通信](./guide/2-4.md)
  - [公共代码复用](./guide/2-4.md)
  - [keepAlive方案](./guide/2-6.md)
- [部署上线](#3)
- [性能优化](#4)
### <span id="1"> 介绍</span>
qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。
#### <span id="1-1">什么是微前端</span>
微前端是一种多个团队通过独立发布功能的方式来共同构建现代化web应用的技术手段及方法策略。
#### <span id="1-2">qiankun的设计理念</span>
- 简单，qiankun 的 HTML entry 及沙箱的设计，使得微应用的接入像使用iframe一样简单。
- 解耦/技术栈无关，微前端的核心目标是将大型应用拆解成若干可以自治的松耦合微应用，而qiankun的诸多设计均是秉持这一原则，如 HTML entry、沙箱、应用间通信等。这样才能确保微应用真正具备 独立开发、独立运行的能力。
#### <span id="1-3">特性</span>
- 📦 基于 [single-spa](https://github.com/single-spa/single-spa) 封装，提供了更加开箱即用的 API。
- 📱 技术栈无关，任意技术栈的应用均可 使用/接入，不论是 React/Vue/Angular/JQuery 还是其他等框架。
- 💪 HTML Entry 接入方式，让你接入微应用像使用 iframe 一样简单。
- 🛡​ 样式隔离，确保微应用之间样式互相不干扰。
- 🧳 JS 沙箱，确保微应用之间 全局变量/事件 不冲突。
- ⚡️ 资源预加载，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。
- 🔌 umi 插件，提供了 [@umijs/plugin-qiankun](https://github.com/umijs/plugins/tree/master/packages/plugin-qiankun) 供 umi 应用一键切换成微前端架构系统
#### <span id="1-4">为什么不是iframe</span>
如果不考虑体验问题，iframe 几乎是最完美的微前端解决方案了。
iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。
* URL 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
* UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中。
* 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
* 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。

## 源码分析

## 参考链接
- [官方文档](https://qiankun.umijs.org/zh/guide)
- [single-spa文档](https://github.com/single-spa/single-spa)
## License
[MIT](./LICENSE)
