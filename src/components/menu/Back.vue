<template>
    <div class="back_btn" @click="back_page">
<!--        黑色-->
        <svg v-if="color == 1&&$store.state.theme == 'white'" xmlns="http://www.w3.org/2000/svg" width="10.506" height="18.388" viewBox="0 0 10.506 18.388">
            <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M13.513,12.381,21.482,4.7a.848.848,0,0,0,0-1.25.983.983,0,0,0-1.33,0l-8.628,8.3a.847.847,0,0,0-.027,1.22l8.655,8.345a.97.97,0,0,0,1.32,0,.848.848,0,0,0,.01-1.25Z" transform="translate(-11.251 -3.188)"/>
        </svg>

        <svg v-if="color == 1&&$store.state.theme == 'night'" xmlns="http://www.w3.org/2000/svg" width="10.506" height="18.388" viewBox="0 0 10.506 18.388">
            <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M13.513,12.381,21.482,4.7a.848.848,0,0,0,0-1.25.983.983,0,0,0-1.33,0l-8.628,8.3a.847.847,0,0,0-.027,1.22l8.655,8.345a.97.97,0,0,0,1.32,0,.848.848,0,0,0,.01-1.25Z" transform="translate(-11.251 -3.188)" fill="#fff"/>
        </svg>

<!--    白色-->
        <svg v-if="color == 2" xmlns="http://www.w3.org/2000/svg" width="10.506" height="18.388" viewBox="0 0 10.506 18.388">
            <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M13.513,12.381,21.482,4.7a.848.848,0,0,0,0-1.25.983.983,0,0,0-1.33,0l-8.628,8.3a.847.847,0,0,0-.027,1.22l8.655,8.345a.97.97,0,0,0,1.32,0,.848.848,0,0,0,.01-1.25Z" transform="translate(-11.251 -3.188)" fill="#fff"/>
        </svg>
    </div>
</template>

<script>


    export default {
        name: "Back",
        data() {
            return{
                back_display: false
            }
        },
        props:{
            color:Number
        },
        methods: {
            back_page() {

                this.$store.commit('router_back')
                this.$router.go(-1)

            },
        },
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;

    }
.back_btn{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height:1.5rem;

}


</style>