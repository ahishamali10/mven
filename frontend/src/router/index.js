import {createRouter, createWebHistory} from 'vue-router'
import Admin from "@/layouts/Admin.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Employees from "@/views/admin/Employees.vue";
import Auth from "@/layouts/Auth.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Landing from "@/views/Landing.vue";
import auth from '@/midlleware/auth'

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
                    meta: {
                        middleware: auth
                    },
                },
                {
                    path: "/admin/settings",
                    component: Settings,
                    meta: {
                        middleware: auth
                    },
                },
                {
                    path: "/admin/employees",
                    component: Employees,
                    meta: {
                        middleware: auth
                    },
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
                    meta: {
                        middleware: () => true
                    },
                },
                {
                    path: "/auth/register",
                    component: Register,
                    meta: {
                        middleware: () => true
                    },
                },
            ],
        },
        {
            path: "/",
            component: Landing,
            meta: {
                middleware: () => true
            },
        },
        {path: "/:pathMatch(.*)*", redirect: "/"},
    ]
})

router.beforeEach(async (to, from, next) => {
    let middleware = await to.meta.middleware();
    if (!middleware) {
    console.log(!middleware)
        return next({path: '/'})

    } else
        return next();
});

export default router
