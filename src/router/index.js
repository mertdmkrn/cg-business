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
            if (isBusinessRegistered) {
                next({ path: "/" });
            } else {
                next({ path: "/business-register" });
            }
        } else {
            next();
        }
    } else {
        if (isAuthenticated) {
            if (isBusinessRegistered) {
                next();
            } else {
                if(to.fullPath !== "/business-register") {
                    next({ path: "/business-register" });
                } else {
                    next();
                }
            }
        } else {
            next({ path: "/login" });
        }
    }
    
});

export default router;
