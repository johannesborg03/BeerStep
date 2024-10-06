<template>
    <body>
        <header>
            <h1>BeerStep</h1>
        </header>
        <main>
            <div class="container">
                <div class="box">
                    <h1 class="title">Register an account</h1>
                    <form @submit.prevent="register">
                        <input type="email" id="email" v-model="input.email" class="input-field"
                            placeholder="Enter your email" required><br><br>
                        <input type="text" id="username" v-model="input.username" class="input-field"
                            placeholder="Enter your username" required><br><br>
                        <input type="password" id="password" v-model="input.password" class="input-field"
                            placeholder="Enter your password" required><br><br>
                        <button type="submit" class="submit-button">Register</button>
                        <p class="logIn">If you already have an account, 
                            <router-link to="/LogIn">Sign in here</router-link>
                        </p>
                    </form>
                    <!-- Display error message if registration fails -->
                    <p v-if="message" class="error-message">{{ message }}</p>
                </div>
            </div>
        </main>
    </body>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            input: {
                email: "",
                username: "",
                password: ""
            },
            message: ""  // To store any error message
        };
    },
    methods: {
        async register() {
            try {
                const newUser = {
                    email: this.input.email,
                    username: this.input.username,
                    password: this.input.password
                };

                // Call the backend to create a new user
                const backendResponse = await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)  // Send user data to backend
                });

                if (backendResponse.ok) {
                    // User created successfully
                    const userData = await backendResponse.json();
                    console.log('User registered successfully:', userData);

                    // Redirect to login page after successful registration
                    this.$router.push('/LogIn');
                } else {
                    const errorData = await backendResponse.json();
                    this.message = errorData.message || 'An error occurred during registration.';
                    console.error('Error registering user:', this.message);
                }
            } catch (error) {
                console.error('Error registering user:', error);
                this.message = 'An error occurred while registering. Please try again.';
            }
        }
    }
};
</script>

<style scoped>
/* Add your styles here as you already have them */
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
    padding: 40px;
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

.logIn {
    color: rgb(49, 49, 49);
    font-size: 14px;
    text-align: center;
}

.error-message {
    color: red;
    font-size: 14px;
    text-align: center;
}
</style>
