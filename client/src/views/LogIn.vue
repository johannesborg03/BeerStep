<template>
    <div class="login-wrapper">
        <div class="title">
            <h1>BeerStep</h1>
        </div>
        <b-container class="d-flex justify-content-center align-items-center vh-100">
            <b-card class="text-center">
                <h1 class="mb-3">Welcome Back!</h1>
                <p class="mb-4">Ready for more beers and steps? Log in to continue your BeerStep journey!</p>
                <b-form @submit.prevent="login">
                    <div class="username d-flex justify-content-center">
                        <b-form-input id="username" v-model="input.username" type="text"
                            placeholder="Enter your username" required class="custom-input w-75"></b-form-input>
                    </div>
                    <div class="password d-flex justify-content-center">
                        <b-form-input id="password" v-model="input.password" type="password"
                            placeholder="Enter your password" required class="custom-input w-75"></b-form-input>
                    </div>


                    <b-button type="submit" variant="warning" class="custom-button w-75">Login</b-button>
                </b-form>

                <p class="register mt-3">
                    If you don't have an account,
                    <router-link to="/Register">Sign up here</router-link>
                </p>

                <!-- Display error message if login fails -->
                <b-alert v-if="message" variant="danger" dismissible>{{ message }}</b-alert>
            </b-card>
        </b-container>
    </div>
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
            message: ""
        };
    },
    methods: {
        async login() {
            try {
                // Construct query parameters (username and password)
                const queryParams = new URLSearchParams({
                    username: this.input.username,
                    password: this.input.password
                }).toString();


                // Send GET request with the login data
                const response = await fetch(`http://localhost:3000/api/users?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


                if (response.ok) {
                    const responseData = await response.json();


                    // Check if any user was returned
                    if (responseData.users && responseData.users.length > 0) {
                        // Save the username to local storage
                        localStorage.setItem('username', this.input.username);

                        // User found, redirect to homepage
                        this.$router.push('/homepage');
                    } else {
                        // No matching user found
                        this.message = 'Invalid username or password.';
                    }
                } else {
                    const errorData = await response.json();
                    this.message = errorData.message || 'Login failed. Please try again.';
                }
            } catch (error) {
                console.error('Error logging in:', error);
                this.message = 'An error occurred while logging in. Please try again.';
            }
        }
    }
};
</script>
<style scoped>
.username {
    padding-top: 40px;
    padding-bottom: 10px;
}

.password {
    padding-top: 10px;
    padding-bottom: 20px;
}

.custom-button {
   
    border-radius: 20px;
    padding: 10px
}

.custom-input {
    border-radius: 20px;
    /* Add custom border radius */
    padding: 10px;
    /* Optional: Add padding for better spacing */
    border: 1px solid #ced4da;
    /* Optional: Define a border color */
}

.text-center {
    border-radius: 20px;
    margin-bottom: 100px;
}

.mb-3 {
    padding-top: 12%;
}

.form {
    border-radius: 20px;
}

.title {
    text-align: center;
    color: White;
    font-size: 16px;
    padding: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.login-wrapper {
    background-image: url('@/assets/logInBack.jpg');
    background-size: cover;
    background-position: center;
    height: 100%;
    margin: 0;
}

.register {
    color: rgb(49, 49, 49);
    font-size: 14px;
}

.text-center {
    width: 700px;
    height: 600px;
}
</style>
