<template>
  <BContainer fluid class="settings-view">
    <BRow class="bcard">
      <BCard class="box">
        <h1 class="title">User Settings</h1>
        <p style="text-align: start; margin-top: 5%;">Profile</p>

        <BRow class="d-flex align-items-center justify-content-center">
          <BCol class="text-start d-flex align-items-center">
            <BAvatar class="avatar" :src="avatar"  v-if="avatar" />
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
      message: "",
      showNotification: false,
      isSubmitting: false, // Track submission state
      avatar: null, // Track selected avatar
      avatarChoices: [
        { avatar: 'src/assets/avatar1.jpg' },
        { avatar: 'src/assets/avatar2.jpg' }
      ]
    };
  },
  mounted() {
    const storedUsername = localStorage.getItem('username');
    this.username = storedUsername && storedUsername.trim() !== '' ? storedUsername : 'Guest'; 
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

        // Show Notification and Clear Input fields
        this.showNotification = true;
        this.input.email = "";
        this.input.password = "";

        // Show Notification for 3 seconds:
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      } catch (error) {
        console.error('Error updating user:', error);
        this.message = 'An error occurred while updating user. Please try again.';
      } finally {
        this.isSubmitting = false; // End submission state
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

</style>