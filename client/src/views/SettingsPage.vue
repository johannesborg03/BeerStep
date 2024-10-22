<template>
  <BContainer fluid class="settings-view">
    <BRow class="bcard">
      <BCard class="box">
        <h1 class="title">User Settings</h1>
        <p class="profile-title">Profile</p>
        <BRow class="d-flex align-items-center justify-content-center">
          <BCol class="text-start d-flex align-items-center">
            <BAvatar class="avatar" :text="firstIndex()"/>
            <BCol class="userEmail view-info d-flex ms-3">
              <p class ="view-info" style = "font-weight: 550;">Username: </p>
              <p class="current-username view-info"> {{ username }} </p>
              <p class ="divider">|</p>
             <p class = "view-info" style = "font-weight: 550;">Email: </p>
              <p class="current-email view-info"> {{ email }}</p>
            </BCol>
          </BCol>
        </BRow>

        <BForm @submit.prevent="submit">
          <!-- Change Email Section -->
          <p class="change-text">Change Email</p>
          <b-form-group class="inputfield">
            <b-form-input
              id="email"
              v-model="input.email"
              type="email"
              placeholder="Enter a New Email"
            ></b-form-input>
          </b-form-group>

          <!-- Change Password Section -->
          <p class="change-text">Change Password</p>
          <b-form-group class="inputfield">
            <b-form-input
              id="password"
              v-model="input.password"
              type="password"
              placeholder="Enter a New Password"
            ></b-form-input>
          </b-form-group>

          <!-- Submit Button -->
          <BButton class="btn" type="submit" variant="warning w-50" block>Submit</BButton>
        </BForm>

        <!-- Error or Success Messages -->
        <b-alert v-if="message" variant="danger" dismissible>{{ message }}</b-alert>
        <b-alert v-if="showNotification" variant="success" dismissible>
          User successfully updated!
        </b-alert>

        <!-- Toast Notification -->
        <div class="toast-container position-fixed top-0 end-0 p-3">
          <div id="liveToast" class="toast bg-dark" role="alert" style="color: white;" aria-live="assertive" aria-atomic="true" :class="{'show': showToast}">
            <div class="toast-header bg-dark" style="color: white;">
              <strong class="me-auto">User Settings</strong>
              <small>Just now</small>
              <button type="button" class="btn-close" @click="showToast = false" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              {{ toastMessage }}
            </div>
          </div>
        </div>
      </BCard>
    </BRow>
  </BContainer>
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
      username: "", 
      email: "",
      message: "",
      showNotification: false,
      isSubmitting: false, // Track submission state
      avatar: null, // Track selected avatar
      avatarChoices: [
        { avatar: 'src/assets/avatar1.jpg' },
        { avatar: 'src/assets/avatar2.jpg' }
      ],
      showToast: false,      // For controlling the toast display
      toastMessage: '',      // Message for the toast
    };
  },
  mounted() {
    const storedUsername = localStorage.getItem('username');
    this.username = storedUsername && storedUsername.trim() !== '' ? storedUsername : 'Guest'; 
    this.fetchUserData();
  },
  methods: {
    firstIndex() {
      return this.username.charAt(0).toUpperCase(); 
    },
    async fetchUserData() {
      try {
        const username = this.$route.params.username; 

        const response = await fetch(`/api/users/${username}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const userData = await response.json();
        this.email = userData.email; 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async submit() {
      this.isSubmitting = true; // Start submission state
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

        // If no fields are entered, show an error message:
        if (Object.keys(updatedUser).length === 0) {
          this.message = 'Please fill in at least one field to update.';
          this.isSubmitting = false;
          return;
        }

        const response = await fetch(`/api/users/${username}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser)
        });

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const updatedData = await response.json();
        console.log('User Updated Successfully');
        this.message = '';


          if (this.input.email) {
            this.email = this.input.email; // Update displayed email
            }

        this.showNotification = true;
        this.input.email = "";
        this.input.password = "";

        this.showToastMessage("User information updated successfully!");

      } catch (error) {
        console.error('Error updating user:', error);
        this.message = 'An error occurred while updating user. Please try again.';
      } finally {
        this.isSubmitting = false; // End submission state
      }
    },
    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      // Automatically hide the toast after 3 seconds
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
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
  width: 40px;
  height: 40px;
  margin-bottom: 5%;
}

.userEmail{
margin-right: 10%;
margin-bottom: 8px;
}

.btn{
border-radius: 15px;
margin-top: 5%;
margin-bottom: 5%;
}

.box {
    background-color: rgb(238, 238, 238);
    border-radius: 3%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    margin-bottom: 15%;
}

.bcard{
  width: 30%;
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
font-weight: 500;
color: #000;
}

.profile-title{
text-align: start; 
margin-top: 5%; 
margin-bottom: 2%; 
color: black; 
font-size: 18px;
}

.current-username, .current-email  {
  text-align: left;
  margin: 0;
  margin-left: 5px;
}

.divider{
margin-left: 5px;
margin-right: 5px;
}
@media (max-width: 1500px) {

  .bcard{
    width: 35%;
}
}

@media (max-width: 1400px) {

.bcard{
  width: 40%;
}
}

@media (max-width: 1150px) {

.bcard{
  width: 50%;
}
}

@media (max-width: 900px) {

.bcard{
  width: 60%;
}
}

@media (max-width: 768px) { 

.avatar {
  display: none;
}

.bcard{
  width: 100%;
}


}
@media (max-width: 425px) {
.box {
  padding: 5%;
}

.avatar {
  display: none;
}

.divider {
  display: none;
}

.userEmail {
  display: flex;
  flex-direction: column;
}

.current-username {
  margin-bottom: 5%;
}

.view-info {
  display: none;
}

.title {
  font-size: 19px;
}

.bcard {
  width: 90% !important;
}
}


</style>