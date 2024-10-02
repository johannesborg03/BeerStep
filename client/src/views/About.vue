<template>

<body>
<h1>BeerStep</h1>
<div class= "button-container">
      <router-link to="/LogIn" class="buttonNav">Log in</router-link>
</div>
</body>
</template>



<style scoped>

body {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2b2b2b
}

header h1 {
  flex: 1;
  font-size: 44px;
  text-align: center;
  margin: 0;
  color: #ebb112;
  margin-top: 10px;
  font-family: 'Segoe UI';
  margin-right: 416px;
 }

 .buttonsNav {
  padding: 10px;
  display: flex;
  margin-left: 55px;
 }
 
 
 .buttonNav button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
 }

</style>