<template>
    <BContainer fluid class="settings-view">

      <BRow class="">
       
          <BCard class="box" >
            <h1 class="title ">User Settings</h1>
            <p style=" text-align: start; margin-top: 5%;">Profil</p>  

             <BRow class="d-flex align-items-center justify-content-center">
            <BCol class="text-start d-flex align-items-center">
              <BAvatar class="avatar" src="" />
              <BCol class="avatar-Buttons d-flex ms-3">
                <BButton variant="warning" class="me-2">Change Avatar</BButton>
                <BButton variant="danger">Delete Avatar</BButton>
              </BCol>
            </BCol>
          </BRow>
          
            <BForm @submit.prevent="submit">
              <!-- Change Email Section -->
              <p class ="change-text">Change Password</p>
              <b-form-group class ="inputfield">
                <b-form-input
                  id="email"
                  v-model="input.email"
                  type="email"
                  placeholder="Enter a New Email"
                ></b-form-input>
              </b-form-group>
  
  
              <!-- Change Password Section -->
               <p class ="change-text">Change Password</p>
              <b-form-group class ="inputfield">
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
    justify-content: center; 
    align-items: center;
}

.avatar{
  width:9%;
  height: 9%;
  margin-bottom: 5%;
}

.avatar-Buttons{
margin-right: 10%;
margin-bottom: 5%;
}

.btn{
border-radius: 15px;
margin-top: 5%;
margin-bottom: 5%;
}

.box {
    background-color: rgb(238, 238, 238);
    border-radius: 3%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional for visual effect */
    margin-bottom: 15%;
}


.title {
    color: black;
    margin: 0;
    font-size: 30px;
    text-align: start;
}

.inputfield{
text-align: start;
font-size: 16px;
}

.change-text{
text-align: start;
margin-left: 2%;
margin-top: 3%;
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

@media (max-width: 768px) {

.box{
padding: 5%;
}

.avatar{
height: 15%;
width: 15%;
}
}

</style>