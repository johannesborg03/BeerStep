<template>

    <body>
        <header>
            <h1>BeerStep</h1>
        </header>
        <main>
            <div class="container">
                <div class="box">
                    <h1 class="title">Register an account</h1>
                    <form id="loginForm">
                        <input type="text" id="email" name="email" class="input-field" placeholder="Enter your email"
                            required><br><br>
                        <input type="text" id="username" name="username" class="input-field"
                            placeholder="Enter your username" required><br><br>
                        <input type="password" id="password" class="input-field" name="password"
                            placeholder="Enter your password" required><br><br>
                        <button type="submit" class="submit-button">Login </button>
                        <p class ="logIn">If you already have an account, <a> <router-link to="/LogIn" >sign in here</router-link> </a></p>
                    </form>
                </div>
            </div>
        </main>

    </body>

</template>

<script>
export default {
    name: 'Register',
};
</script>

<style scoped>
header {
    text-align: center;
    color: White;
    font-size: 16px;
    padding: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-image: url('/src/assets/logInBack.jpg');
    background-size: cover;
    background-position: center;
    margin: 0;
    height: 100vh;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
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
    margin: 0;
    color: black;

}

.title {
    color: black;
    margin: 0;
    font-weight: 400;
    padding: 40px;
}

.subtitle {
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


.logIn {
    color: rgb(49, 49, 49);
    font-size: 14px;
    text-align: center;
}
</style>