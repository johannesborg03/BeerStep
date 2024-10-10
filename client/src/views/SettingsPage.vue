<template>
    <b-container fluid class="settings-view">
  
      <b-row class="justify-content-center mt-5">
        <b-col cols="12" md="6">
          <b-card class="box">
            <h1 class="title text-center">User Settings</h1>
            <p class="subtitle text-center">Change Your Settings:</p>
  
            <b-form @submit.prevent="submit">
              <!-- Change Email Section -->
              <b-form-group label="Change Your Email:" label-for="email">
                <b-form-input
                  id="email"
                  v-model="input.email"
                  type="email"
                  placeholder="Enter a New Email"
                ></b-form-input>
              </b-form-group>
  
              <!-- OR Section -->
              <p class="or text-center">OR</p>
  
              <!-- Change Password Section -->
              <b-form-group label="Change Your Password:" label-for="password">
                <b-form-input
                  id="password"
                  v-model="input.password"
                  type="password"
                  placeholder="Enter a New Password"
                ></b-form-input>
              </b-form-group>
  
              <!-- Submit Button -->
              <b-button type="submit" variant="warning" block>Submit</b-button>
            </b-form>
  
            <!-- Error or Success Messages -->
            <b-alert v-if="message" variant="danger" dismissible>{{ message }}</b-alert>
            <b-alert v-if="showNotification" variant="success" dismissible>
              User Successfully updated!
            </b-alert>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </template>
  

<script>
export default {
   name: 'Submit',
   data() {
       return {
           input: {
               email: "",
               password: ""
           },
           message: "",
           showNotification: false
       };
   },
   methods: {
    async submit () {
        try {
            const username = this.$route.params.username; // Get the username from route parameters
            console.log(username);
            const updatedUser = {};
            if (this.input.email) {
                updatedUser.email = this.input.email;
            }
            if (this.input.password) {
                updatedUser.password = this.input.password;
            }

            //If no fields are entered show error message:
            if(Object.keys(updatedUser).length === 0) {
                this.message = 'Please fill in atleast one field to update.';
                return;
            }

            const response = await fetch(`http://localhost:3000/api/users/${username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify(updatedUser)
            });
            
            if(response.ok) {
                const updatedData = await response.json();
                console.log('User Updated Successfully');
                this.successMessage = 'User Updated Successfully!';
                this.message = '';

                //Show Notification and Clear Input fields
                this.showNotification = true;
                this.input.email = "";
                this.input.password = "";
                //Show Notification for 3 seconds:
                setTimeout(() => {
                    this.showBeerNotification = false
                }, 3000);
            } else {
                const errorData = await response.json();
                this.message = errorData.message || 'Error updating user. Please try again.';
                this.successMessage = '';
            }
         } catch (error) {
                console.error('Error updating user:', error);
                this.message = 'An error occured while updating user. Please try again.';
                this.successMessage = '';
            }
        }
 
}
}

</script>


<style scoped>
.settings-view {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-image: url('/src/assets/logInBack.jpg');
    background-size: cover;
    background-position: center;
    margin: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;

}

.or {
    margin-top: 0%;
    font-size:large;
    padding-top: 2%;
    padding-bottom: 2%;
    font-weight: 400;
    color: black;
    margin-bottom: 5%;
    font-weight: 1000;
}

header {
    text-align: center;
    color: White;
    font-size: 16px;
    padding: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.settings-container {
    display: flex;
    justify-content: center;
    align-items: center;
    
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
    color: black;
    margin-left: 25%;
    margin-right: auto;
}

.title {
    color: black;
    margin: 0;
    font-weight: 400;
}

.subtitle {
    font-size:large;
    padding-top: 2%;
    padding-bottom: 2%;
    font-weight: 400;
    color: black;
    margin-bottom: 0%;
    font-weight: 1000;
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
    margin-bottom: 2%; 
}
.notification {
  margin-top: 2%;
  margin-bottom: 0%;
  font-size: 32px;
  color: #fff;
  background-color: #28a745;
  padding: 2%;
  border-radius: 20px;
  opacity: 0.9;
  animation: fadeout 3s ease-out forwards; /* Animate fading out after a while */
  pointer-events: none; /* Disable pointer events when animating */
}
@keyframes fadeout {
  0% {                    /* 0%: This represents the starting point of the animation (the beginning).
                           At 0%, the opacity is set to 0.9, which means the element is almost fully visible but slightly transparent. */
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {                  /* 100%: This represents the end point of the animation (the end).
    At 100%, the opacity is set to 0, meaning the element becomes fully transparent (completely invisible). */
    opacity: 0;
  }
}

</style>