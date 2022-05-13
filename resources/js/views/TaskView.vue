<template>
    <div>
        <h1 class="red">Мой Nuxt-TODO</h1>

        <input type="text" v-model="newTask.title" />
        <input type="text" v-model="newTask.description" />
        <button @click="createTask">Add task</button>

        <hr />

        <div>
            <Task v-for="(task, index) in tasks" :key="index" :task="task" />
        </div>
    </div>
</template>

<script>
import Task from "../components/Task.vue";

export default {
    components: {
        Task,
    },
    computed: {
        tasks() {
            return this.$store.state.tasks;
        },
    },
    data() {
        return {
            newTask: {
                title: "Новое задание",
                description: "Его описание",
            },
        };
    },
    methods: {
        createTask() {
            this.$store.dispatch("createTask", {
                title: this.newTask.title,
                description: this.newTask.description,
            });
        },
    },
    mounted() {
        this.$store.dispatch("getTasks");
    },
};
</script>

<style>
.red {
    color: rgb(0, 180, 81);
}
hr {
    margin: 20px;
}
</style>
