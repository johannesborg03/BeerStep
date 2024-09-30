<template>

    <header>
        <h1>BeerStep</h1>
    </header>

    <body>
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
                        <p class="register">If you already have an account <a href="URL"> sign in here </a></p>
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

