<template>
    <main>
        <div class="aboutImg">
            <img src="/src/assets/aboutImg.jpg">
            <div class="content">
                <h1>BeerStep</h1>
            </div>
            <router-link to="/LogIn" class="buttonNav">Log in</router-link>
        </div>
    </main>
</template>

<style scoped>
main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.aboutImg {
    overflow: hidden;
    width: 100%;
    height: 90vh;
    margin: 0 auto;
    position: relative;
}


.aboutImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}

/* Center the content over the image */
.content {
    position: absolute;
    text-align: center;
    color: white;
    left: 50%;
    margin-top: 50px;
    transform: translate(-50%, -50%);
    position: absolute;

}

.buttonNav {
    padding: 10px;
    position: absolute;
    right: 40px; 
    margin-top: 40px;
    transform: translateY(-50%);
}


.buttonNav button {
    border: none;
}

.buttonNav,
router-link {
    color: white;
    text-decoration: none;
    font-size: 18px;
}
</style>
