import { createRouter, createWebHistory } from 'vue-router'
import Admin from "@/layouts/Admin.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Employees from "@/views/admin/Employees.vue";
import Auth from "@/layouts/Auth.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Landing from "@/views/Landing.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      redirect: "/admin/dashboard",
      component: Admin,
      children: [
        {
          path: "/admin/dashboard",
          component: Dashboard,
        },
        {
          path: "/admin/settings",
          component: Settings,
        },
        {
          path: "/admin/employees",
          component: Employees,
        },
      ],
    },
    {
      path: "/auth",
      redirect: "/auth/login",
      component: Auth,
      children: [
        {
          path: "/auth/login",
          component: Login,
        },
        {
          path: "/auth/register",
          component: Register,
        },
      ],
    },
    {
      path: "/",
      component: Landing,
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ]
})

export default router
