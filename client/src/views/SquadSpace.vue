<template>
    <BContainer fluid class="page-wrapper">
        <BRow class="brow">
            <BCol>
                <BCard class="text-center" style="margin-top: 5%;">
                    <BRow class="d-flex align-items-center">
                        <BCol class="Avatar text-start">
                            <BAvatar class="avatar" :text= "firstIndex()" />
                        </BCol>
                        <BCol class="inputfield text-center">
                            <BFormInput class="form" v-model="message" placeholder="Share or Ask Something" />
                        </BCol>
                        <BCol class="submit-Col text-end">
                            <BButton class="submit-button" @click="onSubmit">Submit</BButton>
                        </BCol>
                    </BRow>
                </BCard>
                <BCard class="form-card text-start">
                    <ul>
                        <li v-for="(formPost, index) in squadforum" :key="index">
                            <p>
                                <span style="color: darkorange;">
                                    <strong>{{ formPost.username }}</strong>
                                </span>
                                : {{ formPost.message }}
                            </p>
                        </li>
                    </ul>
                </BCard>
            </BCol>
        </BRow>

        <div class="toast-container position-fixed top-0 end-0 p-3">
            <div id="liveToast" class="toast bg-dark" role="alert" style="color: white;" aria-live="assertive" aria-atomic="true" :class="{ show: showToast }">
                <div class="toast-header bg-dark" style="color: white;">
                    <strong class="me-auto">Post Tracker</strong>
                    <small>Just now</small>
                    <button type="button" class="btn-close" @click="showToast = false" aria-label="Close"></button>
                </div>
                <div class="toast-body">{{ toastMessage }}</div>
            </div>
        </div>
    </BContainer>
</template>

<script>
export default {
    data() {
        return {
            username: '', 
            squadName: '',
            message: '',
            showToast: false,
            toastMessage: '',
            squadforum: [] // Initialize the array to hold forum posts
        };
    },
    mounted() {
        this.username = localStorage.getItem('username'); 
        this.fetchSquadPosts(); 
    },
    methods: {
        firstIndex() {
            const username = localStorage.getItem('username')
            return this.username.charAt(0).toUpperCase(); 
        },

        async fetchSquadPosts() {
            try {
                const squadName = this.$route.params.squadName; 
                const response = await fetch(`/api/squads/${squadName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    this.squadforum = data;  
                } else {
                    console.error('Error fetching squad posts');
                }
            } catch (error) {
                console.error('Error fetching squad posts:', error);
            }
        },

        async onSubmit() {
            if (this.message.trim() === '') {
                alert('Please enter a message before submitting.');
                return;
            }

            this.username = localStorage.getItem('username')
            const newPost = {
                username: this.username,  
                message: this.message,
            };

            try {
                const squadName = this.$route.params.squadName;
                const response = await fetch(`/api/squads/${squadName}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPost),
                });

                if (response.ok) {
                    // Add the new post to the squad forum
                    this.squadforum.push(newPost);

                    this.toastMessage = 'Post submitted successfully!';
                    this.showToast = true;
                    setTimeout(() => this.showToast = false, 3000);

                    this.message = '';
                } else {
                    const errorData = await response.json();
                    alert(`Error submitting post: ${errorData.message}`);
                }
            } catch (err) {
                console.error('Error submitting post:', err);
                alert('An error occurred while submitting the post. Please try again.');
            }
        },
    },
};
</script>

<style scoped>
.brow {
    min-height: 100vh;
    width: 50%;
}

.page-wrapper {
    background-image: url('@/assets/set&homeBackground.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-card {
    background-color: whitesmoke;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    overflow-y: auto;
    max-height: 600px;
    min-height: 600px;
}

.form {
    border-color: rgb(125, 125, 125);
}

.title {
    color: rgb(0, 0, 0);
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 15px;
    border-radius: 8px;
    color: black;
}

.submit-button {
    background-color: #f0ad4e;
    border: none;
}

.text-center {
    color: black;
    background-color: #333;
}

.inputfield {
    color: black;
}

@media (max-width: 768px) {
    .brow {
        width: 95%;
    }
}

@media (max-width: 480px) {
    .brow {
        width: 100%;
    }

    .form::placeholder {
        visibility: hidden;
    }
}
</style>