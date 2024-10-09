<template>
    <div class="settings-container">
        <div class="box">
            <h1 class="title">Change User Settings!</h1>
            <p class="subtitle">Ready for more beers and steps? Log in to continue your BeerStep journey!</p>
            <form @submit.prevent="login">
                <input type="text" id="username" v-model="input.username" class="input-field"
                    placeholder="Enter your username" required><br><br>
                <input type="password" id="password" v-model="input.password" class="input-field"
                    placeholder="Enter your password" required><br><br>
                <button type="submit" class="submit-button">Login</button>
                <p class="register">If you don't have an account, <router-link to="/Register">Sign up here</router-link></p>
            </form>
            <!-- Display error message if login fails -->
            <p v-if="message" class="error-message">{{ message }}</p>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.box {
    width: 50%;
    background-color: rgb(238, 238, 238);
    border-radius: 3%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 70vh;
    margin: 0;
    color: black;
}

.title {
    color: black;
    margin: 0;
    font-weight: 400;
}

.subtitle {
    padding-top: 10px;
    padding-bottom: 70px;
    font-weight: 400;
    color: black;
}

.input-field {
    width: 380px;
    height: 30px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 18px;
    font-size: 14px;
}

.submit-button {
    width: 400px;
    height: 50px;
    color: white;
    border: none;
    border-radius: 18px;
    font-size: 16px;
    background-color: #ebb112;
    margin-bottom: 30px;
}

.register {
    color: rgb(49, 49, 49);
    font-size: 14px;
    text-align: center;
}
</style>

