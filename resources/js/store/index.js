import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // токен для запросов
        token: localStorage.getItem("todo_token"),
        // данные о пользователе
        user: null,
        // задачи
        tasks: [],
    },
    getters: {
        isLoggedIn(state) {
            return !!state.user;
        },
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload.token;
            localStorage.setItem("todo_token", payload.token);
        },
    },
    actions: {
        getToken(store, payload) {
            return axios
                .post("api/token", {
                    email: payload.email,
                    password: payload.password,
                    device_name: navigator.userAgent,
                })
                .then((response) => {
                    store.commit("setToken", { token: response.data });
                });
        },

        checkAuth(store) {
            const token = store.state.token;
            const user = store.state.user;

            if (!token) {
                store.state.isLoading = false;
                return false;
            }

            if (user) {
                store.state.isLoading = false;
                return true;
            }

            store.state.isLoading = true;
            return store
                .dispatch("getUser")
                .then(() => {
                    store.state.isLoading = false;
                    return true;
                })
                .catch(() => {
                    store.state.isLoading = false;
                    return false;
                });
        },

        logout(store) {
            const token = store.state.token;
            return axios
                .post("api/logout", null, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    store.commit("setToken", { token: "" });
                });
        },

        getUser(store) {
            const token = store.state.token;
            if (!token) {
                store.state.user = null;
                return;
            }

            return axios
                .get("api/user", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    store.state.user = response.data;
                });
        },

        updateStatus(store, payload) {
            const token = store.state.token;
            axios
                .post("api/tasks/update/" + payload.id, null, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then(() => {
                    const task = store.state.tasks.find(
                        (item) => item.id === payload.id
                    );
                    task.done = !task.done;
                });
        },

        getTasks(store, payload) {
            const token = store.state.token;
            let response = axios
                .get("api/tasks", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    store.state.tasks = response.data;
                });
        },

        createTask(store, payload) {
            const token = store.state.token;
            axios
                .post(
                    "api/tasks/create",
                    {
                        title: payload.title,
                        description: payload.description,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                )
                .then((response) => {
                    store.state.tasks.push(response.data);
                });
        },
    },
});
