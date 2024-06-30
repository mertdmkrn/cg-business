import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [
    {
        name: "LOGIN",
        path: "/login",
        component: () => import("../views/Auth/Login.vue")
    },
    {
        name: "REGISTER",
        path: "/register",
        component: () => import("../views/Auth/Register.vue")
    },
    {
        name: "FORGOTPASSWORD",
        path: "/forgot-password",
        component: () => import("../views/Auth/ForgotPassword.vue")
    },
    {
        name: "RESETPASSWORD",
        path: "/reset-password",
        component: () => import("../views/Auth/ResetPassword.vue")
    },
    {
        name: "DASHBOARD",
        path: "/",
        component: () => import("../views/Dashboard/Index.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authNotRequiredRoutes = ["LOGIN", "REGISTER", "FORGOTPASSWORD", "RESETPASSWORD"];
    let isAuthenticated = store.getters._isAuthenticated;

    if (!authNotRequiredRoutes.includes(to.name)) {
        if (!isAuthenticated) {
            next({ name: "LOGIN" });
        } else {
            next();
        }
    } else {
        if(isAuthenticated) next(false);
        else next();
    }
});

export default router;
