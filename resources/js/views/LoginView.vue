<template>
    <div class="form-container">
        <form @submit="getToken">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                    >Email address</label
                >
                <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                </div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                    >Password</label
                >
                <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <h3 v-if="!isCorrect">Login or password is incorrect</h3>
    </div>
</template>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.form-container h3 {
    color: red;
}
</style>

<script>
export default {
    data() {
        return {
            form: {
                email: null,
                password: null,
            },
            isCorrect: true,
        };
    },

    methods: {
        getToken(evt) {
            evt.preventDefault();
            this.$store
                .dispatch("getToken", {
                    email: this.form.email,
                    password: this.form.password,
                })
                .then(() => {
                    if (this.$store.state.token) {
                        this.$router.push("/");
                    } else {
                        this.isCorrect = false;
                    }
                });
        },
    },

    mounted() {},
};
</script>
