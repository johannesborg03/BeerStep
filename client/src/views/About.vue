<template>

<header>
    <router-link to="/LogIn" class="buttonNav">Log in</router-link>
<h1>BeerStep</h1>
      
</header>
<main>
    


</main>
</template>



<style scoped>

.main{

}

header{
 display: flex; 
  justify-content: space-between; 
  align-items: center;
}

header h1 {
  margin-top: 80px;
  font-family: 'Segoe UI';
  position: absolute; 
  left: 50%;
  transform: translateX(-50%);
 }

 .buttonNav {
  padding: 10px;
 }
 
 
 .buttonNav button {
  border: none;
 }

 .buttonNav, 
router-link { color: black; text-decoration: none; 
}

</style>