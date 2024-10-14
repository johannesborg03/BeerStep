<template>
  <BContainer fluid class="settings-view">
    <BRow class="bcard">
      <BCard class="box">
        <h1 class="title">User Settings</h1>
        <p style="text-align: start; margin-top: 5%; margin-bottom: 0%;">Profile</p>

        <BRow>
          <p class="current-username">
          {{ username }}
          </p>
        </BRow>
        <BRow>
          <p class="current-email">
          {{ email }}
          </p>
        </BRow>

        <BRow class="d-flex align-items-center justify-content-center">
          <BCol class="text-start d-flex align-items-center">
            <BAvatar class="avatar" :src="avatar" v-if="avatar" />
            <BAvatar class="avatar" :text="firstIndex()" v-else />
            <BCol class="avatar-Buttons d-flex ms-3">
              <BButton variant="warning" class="me-2" @click="changeAvatar">Change Avatar</BButton>
              <BButton variant="danger" @click="deleteAvatar">Delete Avatar</BButton>
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
      username: "", // Added username to data()
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
    changeAvatar() {
      // Toggle between the two avatars at index 0 and 1
      this.avatar = this.avatar === this.avatarChoices[0].avatar ? this.avatarChoices[1].avatar : this.avatarChoices[0].avatar;
    },
    deleteAvatar() {
      this.avatar = null; // Reset avatar to default (first letter of username)
    },

    async fetchUserData() {
      try {
        const username = this.$route.params.username; // Get the username from route parameters

        const response = await fetch(`http://localhost:3000/api/users/${username}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const userData = await response.json();
        this.email = userData.email; // Set the email from the fetched user data
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

        const response = await fetch(`http://localhost:3000/api/users/${username}`, {
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


          // Update the email in the component's data to reflect the new value
          if (this.input.email) {
            this.email = this.input.email; // Update displayed email
            }

        // Show Notification and Clear Input fields
        this.showNotification = true;
        this.input.email = "";
        this.input.password = "";

        // Show success toast message
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
font-size: 2.5vh;
font-family: 'sans-serif';
}

@media (max-width: 768px) {

.box{
padding: 5%;
}

.avatar{
height: 30px;
width: 30px;
}

.bcard{
width: 90%;
}
}


.current-username {
  text-align: center;
  margin: 0;
  color: black;
  font-size: 3.5vh;
  font-family: 'sans-serif';
}
.current-email {
  text-align: left;
  text-align: center;
  margin: 0;
  color: black;
  font-size: 2.5vh;
  font-family: 'sans-serif';
}

</style>