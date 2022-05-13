<template>
    <div>
        <div class="task-wrapper">
            <h3>{{ task.title }}</h3>
            <small @click="updateStatus(task.id)">[ {{ status }} ]</small>
            <p>{{ task.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Task",
    props: ["task"],
    computed: {
        status() {
            if (this.task.done == true) {
                return "Выполнено";
            } else {
                return "Ждёт своего часа";
            }
        },
    },
    methods: {
        updateStatus(id) {
            this.$store.dispatch("updateStatus", { id });
        },
    },
};
</script>

<style scoped>
.task-wrapper {
    display: block;
    border: 1px solid #666;
    border-radius: 5px;
    padding: 10px 20px;
    margin-bottom: 10px;
    cursor: pointer;
}
.task-wrapper:hover {
    background-color: #fafafa;
}
.task-wrapper p {
    transform: scaleY(0);
    transform-origin: top;
    transition: all 0.3s;
}
.task-wrapper:hover p {
    transform: scaleY(1);
}
</style>
