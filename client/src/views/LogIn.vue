<template>

    <body>

        <header>
            <h1>BeerStep</h1>
        </header>

        <main>
    <div class="container">
        <div class="box">
            <h1 class="title">Welcome Back!</h1>
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
</main>

    </body>
</template>

<script>
export default {
    name: 'LogIn',
    data() {
        return {
            input: {
                username: "",
                password: ""
            },
            message: ""  // To store any error message
        };
    },
    methods: {
        async login() {
            try {
                // Fetch user data from the local JSON file
                const response = await fetch('/users.json');  // Make sure the path is correct
                const users = await response.json();

                // Check if the entered username and password match any user
                const user = users.find(u => u.username === this.input.username && u.password === this.input.password);
                
                if (user) {
                    this.$router.push('/homepage');  // Navigate to homepage if login is successful
                } else {
                    this.message = 'Invalid username or password.';
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                this.message = 'An error occurred while logging in. Please try again.';
            }
        }
    }
};
</script>

<style scoped>
header {
    text-align: center;
    color: White;
    font-size: 16px;
    padding: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-image: url('/src/assets/logInBack.jpg');
    background-size: cover;
    background-position: center;
    margin: 0;
    height: 100vh;
    /* Ensure the body covers the full height of the viewport */
}

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
