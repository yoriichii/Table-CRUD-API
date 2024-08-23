import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/table",
    component: () => import("../views/employee-list.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
