# qiankun-admin-practice
乾坤微前端方案后台管理系统实践指南

## 快速上手

## 入门指南
### 目录
- [介绍](#1)
  - [什么是微前端](#1-1)
  - [qiankun的设计理念](#1-2)
  - [特性](#1-3)
  - [为什么不是iframe](#1-4)
- [构建主应用基座](#2)
- [接入微应用](#3)
  - [接入Vue微应用](#3-1)
  - [接入React微应用](#3-2)
- [父子应用间通信](#4)
- [公共代码复用](#5)
- [keepAlive方案](#6)
- [部署上线](#7)
- [性能优化](#8)
### <span id="1"> 介绍</span>
qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。
#### <span id="1-1">什么是微前端</span>
微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。
#### <span id="1-2">qiankun的设计理念</span>
- 简单
> 由于主应用微应用都能做到技术栈无关，qiankun 对于用户而言只是一个类似 jQuery 的库，你需要调用几个 qiankun 的 API 即可完成应用的微前端改造。同时由于 qiankun 的 HTML entry 及沙箱的设计，使得微应用的接入像使用 iframe 一样简单。

- 解耦/技术栈无关
> 微前端的核心目标是将巨石应用拆解成若干可以自治的松耦合微应用，而 qiankun 的诸多设计均是秉持这一原则，如 HTML entry、沙箱、应用间通信等。这样才能确保微应用真正具备 独立开发、独立运行的能力。

## 源码分析
// TODO

## 参考链接
- [官方文档](https://qiankun.umijs.org/zh/guide)
- [single-spa](https://github.com/single-spa/single-spa)
## License
[MIT](./LICENSE)

