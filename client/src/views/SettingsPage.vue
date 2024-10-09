<template>
    
    <div class="settings-view">
        <header>
        <h1>BeerStep</h1>
    </header>
        
        <div class="Settings-Container">
        <div class="box">
        <h1 class="Title">Change User Settings</h1>
        <p class="subtitle">Do You Want To Change Your Settings?</p>
        <form @submit.prevent="submit">
            <p>Want To Change Your Email?</p>
            <input type="text" id="email" v-model="input.email" class="input-field"
            placeholder="Enter your Email"><br><br>
            <p>Want to Change Your Password?</p>
            <input type="text" id="password" v-model="input.password" class="input-field"
            placeholder="Enter your password"><br><br>
            <button type="submit" class="submit-button">Submit</button>
        </form>
         <!-- Display error message if login fails -->
         <p v-if="message" class="error-message">{{ message }}</p>
    </div>

    </div>
</div>
    
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
           message: ""  
       };
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
    padding-top: 10px;
    padding-bottom: 70px;
    font-weight: 400;
    color: black;
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
    margin-bottom: 30px;
}

.register {
    color: rgb(49, 49, 49);
    font-size: 14px;
    text-align: center;
}
</style>