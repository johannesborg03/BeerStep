
<template>
<body> 

    <header>
        <h1>BeerStep</h1>
    </header>

    <main>
        <div class="container">
            <div class="box">
                <h1 class="title">Welcome Back!</h1> 
                <p class="subtitle">Ready for more beers and steps? Log in to continue your BeerStep journey!</p> 
                <form id="loginForm">
                    <input type="text" id="username" name="username" class="input-field" placeholder="Enter your username" required><br><br>
                    <input type="password" id="password" class="input-field" name="password" placeholder="Enter your password" required><br><br>
                    <button type="submit" class="submit-button">Login </button>
                    <p class ="register">If you don't have an account, <a href = "URL"> register here </a></p>
                </form>
            </div>
        </div>
    </main>

</body>
</template>
