<template>
    <BContainer fluid class="page-wrapper">
        <BRow class="brow">
            <BCol>
                <BCard class="text-center" style="margin-top: 5%;">
                    <BRow class="d-flex align-items-center">
                        <BCol class="Avatar text-start">
                            <BAvatar class="avatar"></BAvatar>
                        </BCol>
                        <BCol class="inputfield text-center">
                            <BFormInput v-model="message" placeholder="Share or Ask Something" />
                        </BCol>
                        <BCol class="submit-Col text-end">
                            <BButton class="submit-button" @click="onSubmit">Submit</BButton>
                        </BCol>
                    </BRow>
                </BCard>
                <BCard class="form-card">
                    <h3 class="title">SquadSpace</h3>
                    <ul>
                        <li v-for="(formPost, index) in squadforum" :key="index">
                            <p><strong>{{ formPost.username }}: {{ formPost.message }}</strong></p>
                        </li>
                    </ul>
                </BCard>
            </BCol>
        </BRow>

        <!-- Toast Notification -->
        <div class="toast-container position-fixed top-0 end-0 p-3">
            <div id="liveToast" class="toast bg-dark" role="alert" style="color: white;" aria-live="assertive" aria-atomic="true" :class="{'show': showToast}">
                <div class="toast-header bg-dark" style="color: white;">
                    <strong class="me-auto">Post Tracker</strong>
                    <small>Just now</small>
                    <button type="button" class="btn-close" @click="showToast = false" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    {{ toastMessage }}
                </div>
            </div>
        </div>
    </BContainer>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            message: '',
            squadforum: [], // Holds the list of forum posts
            showToast: false, // Controls toast visibility
            toastMessage: ''  // Message to display in the toast
        };
    },
    mounted() {
        this.username = localStorage.getItem('username') || 'Guest';
    },
    methods: {
        onSubmit() {
            if (this.message.trim() === '') {
                return; // Prevent empty submissions
            }

            // Create a new post object
            const formPost = {
                username: this.username, // Use the username from localStorage
                message: this.message
            };

            // Add the post to the forum
            this.squadforum.push(formPost);

            // Trigger the toast notification
            this.toastMessage = 'Post submitted successfully!';
            this.showToast = true;

            // Automatically hide the toast after a few seconds
            setTimeout(() => {
                this.showToast = false;
            }, 3000);

            // Reset the message field
            this.message = '';
        }
    }
};
</script> 

<style scoped>

.brow{
    min-height: 100vh; 
    width: 60%;
}
.page-wrapper {
    background-image: url('@/assets/squad.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-card {
    background-color: #292929;
    padding: 30%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    overflow-y: auto;
    max-height: 600px; 
}

.submit-button {
    background-color: #f0ad4e;
    border: none;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 15px;
    border-radius: 8px;
    color: white;
}

.text-center {
    color: white;
    background-color: #292929;
}

.inputfield {
    color: white;
}

.title {

    color: white;
}

@media (max-width: 768px) {

.avatar{
display: none;
}

.brow{
width: 95%;
}
.title{
display: none;
}
}
</style>