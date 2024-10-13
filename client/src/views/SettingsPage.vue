<template>
    <BContainer fluid class="settings-view">

      <BRow class="" style="margin-top: 5%;">
       
          <BCard class="box">
            <h1 class="title ">User Settings</h1>
  

            <BCol class= "text-start">
              <p style="margin-top: 5%;">Profil</p>
              <BAvatar class ="avatar" src="" />
            </BCol>
            <BCol class="avatar-Buttons text-center"><BButton variant ="warning">Change Avatar</BButton>
              <BButton variant ="danger">Delete Avatar</BButton>
          </BCol>
          
            <BForm @submit.prevent="submit">
              <!-- Change Email Section -->
              <b-form-group class ="inputfield" label="Change Your Email:" label-for="email">
                <b-form-input
                  id="email"
                  v-model="input.email"
                  type="email"
                  placeholder="Enter a New Email"
                ></b-form-input>
              </b-form-group>
  
  
              <!-- Change Password Section -->
              <b-form-group class ="inputfield" label="Change Your Password:" label-for="password">
                <b-form-input
                  id="password"
                  v-model="input.password"
                  type="password"
                  placeholder="Enter a New Password" label-class=""
                ></b-form-input>
              </b-form-group>
  
              <!-- Submit Button -->
              <BButton class= "btn" type="submit" variant="warning w-50" block>Submit</BButton>
            </BForm>
  
            <!-- Error or Success Messages -->
            <b-alert v-if="message" variant="danger" dismissible>{{ message }}</b-alert>
            <b-alert v-if="showNotification" variant="success" dismissible>
                User successfully updated!
            </b-alert>

          </BCard>
     
      </BRow>
    </BContainer>
 
  </template>
  

<script>
import { BCard } from 'bootstrap-vue-next';

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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });
            
            if(response.ok) {
                const updatedData = await response.json();
                console.log('User Updated Successfully');
              //  this.successMessage = 'User Updated Successfully!';
                this.message = '';

                //Show Notification and Clear Input fields
                this.showNotification = true;
                this.input.email = "";
                this.input.password = "";
                //Show Notification for 3 seconds:
                setTimeout(() => {
                    this.showNotification = false
                }, 3000);
            } else {
                const errorData = await response.json();
                this.message = errorData.message || 'Error updating user. Please try again.';
               // this.successMessage = '';
            }
         } catch (error) {
                console.error('Error updating user:', error);
                this.message = 'An error occured while updating user. Please try again.';
               // this.successMessage = '';
            }
        }
 
}
}

</script>


<style scoped>
.settings-view {
    font-family:  Tahoma;
    background-image: url('/src/assets/set&homeBackground.jpg');
    background-size: cover;
    background-position: center;
    margin: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;

}

.avatar{
  width:7%;
  height: 7%;
}

.avatar-Buttons{
margin-right: 10%;
margin-bottom: 5%;
}

.btn{
border-radius: 15px;
margin-top: 5%;
}

.box {
    width: 50%;
    background-color: rgb(238, 238, 238);
    border-radius: 3%;
}


.title {
    color: black;
    margin: 0;
    font-size: 30px;
    text-align: start;
}

.inputfield{
text-align: start;
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
  font-size: 25%;
  color: #c60c0c;
  background-color: #2c18c6;
  padding: 2%;
  border-radius: 25%;
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