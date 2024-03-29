import "./public-path";
import { createApp, h } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import { routes } from "./router";
import store from "./store";
import { qiankunCachedKey } from "@/config";

let router = null;
let instance = null;

function render(props = {}) {
  const data = props;
  const { container } = props;
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  if (window.__POWERED_BY_QIANKUN__ && window[qiankunCachedKey]) {
    const cachedInstance = window[qiankunCachedKey];
    const cachedVNode =
      cachedInstance._instance && cachedInstance._instance.vnode;
    // cachedVNode.type.__isKeepAlive = true;

    instance = createApp({
      data() {
        return {
          mainStore: data.store,
        };
      },
      render() {
        return cachedVNode;
      },
    });
    instance.use(router);
    instance.use(store);
    console.log("router", router);
    instance.mount(container ? container.querySelector("#app") : "#app");
  } else {
    instance = createApp({
      data() {
        return {
          mainStore: data.store,
        };
      },
      render() {
        return h(App);
      },
    });
    instance.use(router);
    instance.use(store);
    instance.mount(container ? container.querySelector("#app") : "#app");
  }
}

function setupState(props) {
  props.setGlobalState &&
    props.setGlobalState({
      routes,
    });
}

// lifeCycle muse be declared
export async function bootstrap() {
  console.log("vue3 app bootstraped");
}

export async function mount(props) {
  console.log("vue3 app mount");
  setupState(props);
  render(props);
}

export async function unmount() {
  //hack unmount 默认会删除容器内的所/有内容，包括子应用渲染的内容，所以需要在子应用中重写 unmount 方法，阻止容器内的内容被删除
  // 如果页签全部关闭，需要手动卸载子应用 TODO
  throw new Error("unmount");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
