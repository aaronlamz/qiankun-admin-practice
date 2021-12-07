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
    const cachedNode =
      cachedInstance._instance && cachedInstance._instance.vnode;
    // router.apps.push(...cachedInstance.$router.apps);

    instance = createApp({
      data() {
        return {
          mainStore: data.store,
        };
      },
      render() {
        return h(cachedNode);
      },
    });
    instance.use(router);
    instance.use(store);
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

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("vue app bootstraped");
}

function setupState(props) {
  props.setGlobalState &&
    props.setGlobalState({
      routes,
    });
}

export async function mount(props) {
  setupState(props);
  render(props);
}

export async function unmount() {
  console.log("vue3 app unmount");
  window[qiankunCachedKey] = instance.cachedInstance || instance;
}
