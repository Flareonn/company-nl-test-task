import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/category/:pathMatch(.*)*",
    name: "Categories",
    component: () => import("@/pages/category.vue"),
  },
];

const Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default Router;
