import Vue from "vue";
import VueRouter from "vue-router";
import TaskView from "../views/TaskView.vue";
import LoginView from "../views/LoginView.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Task",
        component: TaskView,
        // если на главный экран пришел не залогиненный юзер,
        // то отправляем его на логин
        beforeEnter: (to, from, next) => {
            store.dispatch("checkAuth").then((result) => {
                result ? next() : next("/login");
            });
        },
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView,
        // если на логин пришел залогиненный юзер,
        // то отправляем его на главную
        beforeEnter: (to, from, next) => {
            store.dispatch("checkAuth").then((result) => {
                result ? next("/") : next();
            });
        },
    },
    {
        path: "*",
        // Во всех остальных случаях отправляем на главную
        redirect: "/",
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
