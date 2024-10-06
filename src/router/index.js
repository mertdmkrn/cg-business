import { createRouter, createWebHashHistory } from 'vue-router';
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
        name: "BUSINESSREGISTER",
        path: "/business-register",
        component: () => import("../views/Auth/BusinessRegister.vue")
    },
    {
        name: "FORGOTPASSWORD",
        path: "/forgot-password",
        component: () => import("../views/Auth/ForgotPassword.vue")
    },
    {
        name: "RESETPASSWORD",
        path: "/reset-password/:id",
        component: () => import("../views/Auth/ResetPassword.vue")
    },
    {
        name: "DASHBOARD",
        path: "/",
        component: () => import("../views/Dashboard/Index.vue")
    },
    {
        name: "CALENDAR",
        path: "/calendar",
        component: () => import("../views/Calendar/Index.vue")
    },
    {
        name: "CLIENT",
        path: "/client",
        component: () => import("../views/Client/Index.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authNotRequiredRoutes = ["LOGIN", "REGISTER", "FORGOTPASSWORD", "RESETPASSWORD"];
    let isAuthenticated = store.getters._isAuthenticated;
    let isBusinessRegistered = store.getters._isBusinessRegistered;

    if (authNotRequiredRoutes.includes(to.name)) {
        if (isAuthenticated) {
            next({ path: isBusinessRegistered ? "/" : "/business-register" });
        } else {
            next();
        }
    } else {
        if (isAuthenticated) {
            if (isBusinessRegistered) {
                next(isBusinessRegistered && to.name === "BUSINESSREGISTER"  ? { path: "/" } : true);
            } else {
                next(to.name !== "BUSINESSREGISTER" ? { path: "/business-register" } : true);
            }
        } else {
            next({ path: "/login" });
        }
    }
});


export default router;
