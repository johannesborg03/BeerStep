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
        </b-card>
    </b-container>

    <!-- Toast notification container -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="liveToast" class="toast bg-dark" role="alert" style="color: white;" aria-live="assertive" aria-atomic="true" :class="{'show': showToast}">
            <div class="toast-header bg-dark" style="color: white;">
                <strong class="me-auto">BeerStep</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" @click="showToast = false" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ toastMessage }}
            </div>
        </div>
    </div>
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
            toastMessage: "",
            showToast: false
        };
    },
    methods: {
        async login() {
            try {
                // Construct query parameters (username and password)
                const queryParams = new URLSearchParams({
                    username: this.input.username,
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

                    // Check if a user was found
                    if (responseData.users && responseData.users.length > 0) {
                        const user = responseData.users[0];

                        // Check if the input password matches the one from the response
                        if (user.password === this.input.password) {
                            // Save the username to local storage
                            localStorage.setItem('username', this.input.username);

                            // Success message and redirect to homepage
                            this.showToast = true;
                            this.toastMessage = 'Login successful!';
                            setTimeout(() => {
                                this.showToast = false;
                                this.$router.push('/homepage');
                            }, 3000); // Show toast for 3 seconds before redirecting
                        } else {
                            // Password mismatch
                            this.showToast = true;
                            this.toastMessage = 'Invalid password.';
                            setTimeout(() => this.showToast = false, 3000); // Hide toast after 3 seconds
                        }
                    } else {
                        // No matching user found
                        this.showToast = true;
                        this.toastMessage = 'Invalid username.';
                        setTimeout(() => this.showToast = false, 3000); // Hide toast after 3 seconds
                    }
                } else {
                    const errorData = await response.json();
                    this.showToast = true;
                    this.toastMessage = errorData.message || 'Login failed. Please try again.';
                    setTimeout(() => this.showToast = false, 3000); // Hide toast after 3 seconds
                }
            } catch (error) {
                console.error('Error logging in:', error);
                this.showToast = true;
                this.toastMessage = 'An error occurred while logging in. Please try again.';
                setTimeout(() => this.showToast = false, 3000); // Hide toast after 3 seconds
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
    margin-bottom: 200px;
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
