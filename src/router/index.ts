// router/index.ts
import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const mainRoutes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "home",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: mainRoutes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
