<template>
<div class ="page-wrapper" @submit.prevent="onSubmit">
<BRow>
<BCard style="background-color: #292929; margin-top: ">
     <BCol class="Avatar text-start">
    <BAvatar> </BAvatar>
</BCol>
<BCol class ="inputfield text-center"></BCol>
    <BFormInput v-model ="message">Share or Ask Something</BFormInput>
<BCol class ="submit-Col text-end">
    <BButton class ="submit-button">Submit </BButton>
</BCol>

</BCard>
</BRow>

<BCard class = "form-card">

<BForm>

</BForm>
</BCard>

</div>
</template>

<script>
export default {
data(){
    return {
        username: '',
        message: ''
    };
},

methods: {
    onSubmit(){
        let formPost = {
        username: this.username,
        message: this.message
        }

    }
}
}

</script>

<style>

.page-wrapper{
    background-image: url('@/assets/squad.jpg');
    background-size: cover;
    background-position: center;
    height: 100%;
    margin: 0;

}
.form-card{
    
     margin-top: 50px; 
     background-color: #292929;
}
</style>