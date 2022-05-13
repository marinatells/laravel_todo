require("./bootstrap");

window.Vue = require("vue").default;

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
