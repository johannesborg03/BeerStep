<template>
    <main class="d-flex flex-column align-items-center vh-100 bg-dark">
      <div class="d-none d-lg-flex align-items-center">
      <div class="beerBack">
        <b-img src="/src/assets/beerBackground.jpg" fluid class="bg-cover" />
        </div>
      </div>
        <div class="overlay">
          <div class="stats">
            <h2>2300</h2>
            <p>Steps Needed</p>
          </div>
            <router-link to="/Activity" class="btn btn-danger w-25">Log activity</router-link>
        </div>
    </main>

</template>

<style scoped>

.main{
  background-color: rgba(0, 0, 0, 0.5);
}

.beerBack {
  position: relative;
  width: 100%;
  height: 100vh; 
  overflow: hidden
}

.overlay {
  margin-top: 150px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  font-size: 23px;
}

.btn{
 margin-top: 12%;
 border-radius: 20px;
}

.btn:hover {
  transform: translateY(-3px);
}

</style>
