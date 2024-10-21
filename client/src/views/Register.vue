<template>
    <div class="register-wrapper">
      <div class="title">
        <h1>BeerStep</h1>
      </div>
      <b-container class="d-flex justify-content-center align-items-center vh-100">
        <b-card class="text-center">
          <h1 class="mb-3">Register an Account</h1>
          <p class="mb-4">Join us today and start tracking your beers and steps!</p>
          <b-form @submit.prevent="register">
            <div class="email d-flex justify-content-center">
              <b-form-input id="email" v-model="input.email" type="email" placeholder="Enter your email"
                required class="custom-input w-75"></b-form-input>
            </div>
            <div class="username d-flex justify-content-center">
              <b-form-input id="username" v-model="input.username" type="text" placeholder="Enter your username"
                required class="custom-input w-75"></b-form-input>
            </div>
            <div class="password d-flex justify-content-center">
              <b-form-input id="password" v-model="input.password" type="password" placeholder="Enter your password"
                required class="custom-input w-75"></b-form-input>
            </div>
            <b-button type="submit" variant="warning" class="custom-button w-75">Register</b-button>
          </b-form>
  
          <p class="logIn mt-3">
            If you already have an account, <router-link to="/LogIn">Sign in here</router-link>
          </p>
  
        </b-card>
      </b-container>
  
      <!-- Toast Notification -->
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="liveToast" class="toast bg-dark" role="alert" style="color: white;" aria-live="assertive"
          aria-atomic="true" :class="{'show': showToast}">
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
    name: 'Register',
    data() {
      return {
        input: {
          email: "",
          username: "",
          password: ""
        },
        message: "",  // To store any error message
        showToast: false,  // Toast visibility flag
        toastMessage: ""   // Toast message
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
          const backendResponse = await fetch('/api/users', {
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
  
            // Show success toast
            this.toastMessage = "Registration successful! Redirecting to login...";
            this.showToast = true;
  
            // Redirect to login page after a short delay
            setTimeout(() => {
              this.$router.push('/LogIn');
            }, 2000);  // 2-second delay to show the toast
          } else {
            const errorData = await backendResponse.json();
            this.message = errorData.message || 'An error occurred during registration.';
            console.error('Error registering user:', this.message);
            
  
            // Show error toast
            this.toastMessage = "Registration failed: " + this.message;
            this.showToast = true;
            setTimeout(() => this.showToast = false, 3000);
          }
        } catch (error) {
          console.error('Error registering user:', error);
          this.message = 'An error occurred while registering. Please try again.';
  
          // Show error toast
          this.toastMessage = "Error: " + this.message;
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
        }
      }
    }
  };
  </script>
  

<style scoped>
.email {
  padding-top: 40px;
  padding-bottom: 10px;
}

.username {
  padding-top: 10px;
  padding-bottom: 10px;
}

.password {
  padding-top: 10px;
  padding-bottom: 20px;
}

.custom-button {
  border-radius: 20px;
  padding: 10px;
}

.custom-input {
  border-radius: 20px;
  padding: 10px;
  border: 1px solid #ced4da;
}

.text-center {
  border-radius: 20px;
  margin-bottom: 230px;
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

.register-wrapper {
  background-image: url('@/assets/logInBack.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
  margin: 0;
}

.logIn {
  color: rgb(49, 49, 49);
  font-size: 14px;
}

.text-center {
  width: 700px;
  height: 600px;
}
</style>