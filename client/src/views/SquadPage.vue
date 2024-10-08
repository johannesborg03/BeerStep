<template>
    <body>
      <header>
        <h1>Squads</h1>
      </header>
  
      <main>
        <div class="container">
          <div class="box">
            <h1 class="title">Create Your Squad</h1>
            <p class="subtitle">
              Ready to create a squad and challenge others? Click the button to
              start!
            </p>
            <button class="submit-button" @click="createSquad">
              Create Squad
            </button>
          </div>
        </div>
      </main>
    </body>
  </template>
  
  <script>
  export default {
    name: "CreateSquad",
    data() {
      return {};
    },
    methods: {
      createSquad() {
        // Add the functionality you want to trigger on button click
        alert("Squad created!"); // Placeholder for the squad creation logic
        // You can replace this with a call to your backend or router navigation
      }
    }
  };
  </script>
  
  <style scoped>
  header {
    text-align: center;
    color: white;
    font-size: 16px;
    padding: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
  
  body {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-image: url("/src/assets/logInBack.jpg");
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
  }
  
  .subtitle {
    padding-top: 10px;
    padding-bottom: 70px;
    font-weight: 400;
    color: black;
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
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #d99f10;
  }
  </style>
