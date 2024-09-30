<template>
  <header>
    <div class="settings">
      <img src="/src/assets/settings.png" alt="Settings" />
    </div>
    <h1>BeerStep</h1>
    <div class="user">
      <div class="profile-pic">
        <img src="/src/assets/userPic.png" alt="User profile picture" />
      </div>
      <p class="username">Jabo</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style>
header {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 80px;
  width: 100%;
  background: #333;
  display: flex;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header h1 {
  flex: 1;
  font-size: 44px;
  text-align: center;
  margin: 0;
  color: #ebb112;
  margin-left: 40px;
  margin-top: 10px;
  font-family: 'Segoe UI';
}

.user {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.profile-pic {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.settings {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 100px;
  margin-top: 20px;
}

.settings img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  
}

.settings:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.username {
  font-size: 16px;
  color: #ffffff;
  margin-right: 100px;
  margin-top: 9px;
}
</style>
