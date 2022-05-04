<template>
    <div class="Login_box">
<!--        注册-->
        <div class="sign_up_box" @click="sign_up">
            <span class="sign_up_title">SIGN UP</span>
            <svg class="sign_up_icon" xmlns="http://www.w3.org/2000/svg" width="121" height="121" viewBox="0 0 121 121">
                <path id="Icon_simple-spacemacs" data-name="Icon simple-spacemacs" d="M60,.054A60.229,60.229,0,0,0,35.16,5.521h.023c18.19,10.13,34.776,28.169,44.666,41.2,2,2.667,3.763,5.03,5.39,7.17l.02-.093c2.06-8.69-1.563-26.193-7.59-36.666a7.333,7.333,0,0,1-.937-1.96h.03v-.033A57.8,57.8,0,0,1,83.626,22.3a30.069,30.069,0,0,1,5.81,11.15,293.873,293.873,0,0,1,9.5,36.246c1.193,6.14,3.377,17.29,3.667,19.42a3,3,0,0,1-.05.717q-.7-.687-1.45-1.333a103.631,103.631,0,0,0-15.913-10.57c-7.85-4.35-15.59-8.07-32.876-15.81-15.78-7.063-23.05-10.43-28.756-13.3l-5.12-2.55c.6,1.5,1.243,3.12,2,5.023a76.685,76.685,0,0,1,10.87,7.04S42.92,80.169,48.076,93.109c3.837,9.746,8.17,21.333,10.773,24.519l.3.333c-5.13-1.253-28.726-13-28.726-13-2.59-22-9.843-48.049-19.273-74.7q-.333-.667-.623-1.353a10.89,10.89,0,0,1,1.553,1.517C21.583,40.61,41.86,49.86,63.393,53.836A82.4,82.4,0,0,0,81.059,54.95c-1.537-1.96-3.2-4.1-5.047-6.51C58.906,26.2,42.123,16.851,27.093,11.134c-.393-.133-.76-.3-1.153-.44A60.085,60.085,0,0,0,0,60.436V60a60.035,60.035,0,0,0,60.429,60h-.44A60.035,60.035,0,0,0,120,59.56V60A60.035,60.035,0,0,0,59.556,0H60ZM90.666,30.6v.033h0V30.6a65.032,65.032,0,0,0,11.666,10.31c3.947,4.95,6.08,9.813,8.74,13.146-1.093-.94-5.557-4.86-5.557-4.86s-6.89-6.527-10.706-10.763a17,17,0,0,1-2.39-3.14c-.31-.487-1.377-4.127-1.77-4.667h0V30.6Z" transform="translate(0.5 0.501)" fill="#3b4356" stroke="#d1cfd0" stroke-width="1"/>
            </svg>
            <span class="sign_up_span_one">免费账号</span>
            <span class="sign_up_span_two">前往注册</span>
        </div>
<!--        登录-->
        <div class="log_in_box" @click="log_in">
            <span class="log_in_title">LOG IN</span>
            <svg class="log_in_icon" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
                <path id="Icon_simple-spacemacs" data-name="Icon simple-spacemacs" d="M60,.054A60.229,60.229,0,0,0,35.16,5.521h.023c18.19,10.13,34.776,28.169,44.666,41.2,2,2.667,3.763,5.03,5.39,7.17l.02-.093c2.06-8.69-1.563-26.193-7.59-36.666a7.333,7.333,0,0,1-.937-1.96h.03v-.033A57.8,57.8,0,0,1,83.626,22.3a30.069,30.069,0,0,1,5.81,11.15,293.873,293.873,0,0,1,9.5,36.246c1.193,6.14,3.377,17.29,3.667,19.42a3,3,0,0,1-.05.717q-.7-.687-1.45-1.333a103.631,103.631,0,0,0-15.913-10.57c-7.85-4.35-15.59-8.07-32.876-15.81-15.78-7.063-23.05-10.43-28.756-13.3l-5.12-2.55c.6,1.5,1.243,3.12,2,5.023a76.685,76.685,0,0,1,10.87,7.04S42.92,80.169,48.076,93.109c3.837,9.746,8.17,21.333,10.773,24.519l.3.333c-5.13-1.253-28.726-13-28.726-13-2.59-22-9.843-48.049-19.273-74.7q-.333-.667-.623-1.353a10.89,10.89,0,0,1,1.553,1.517C21.583,40.61,41.86,49.86,63.393,53.836A82.4,82.4,0,0,0,81.059,54.95c-1.537-1.96-3.2-4.1-5.047-6.51C58.906,26.2,42.123,16.851,27.093,11.134c-.393-.133-.76-.3-1.153-.44A60.085,60.085,0,0,0,0,60.436V60a60.035,60.035,0,0,0,60.429,60h-.44A60.035,60.035,0,0,0,120,59.56V60A60.035,60.035,0,0,0,59.556,0H60ZM90.666,30.6v.033h0V30.6a65.032,65.032,0,0,0,11.666,10.31c3.947,4.95,6.08,9.813,8.74,13.146-1.093-.94-5.557-4.86-5.557-4.86s-6.89-6.527-10.706-10.763a17,17,0,0,1-2.39-3.14c-.31-.487-1.377-4.127-1.77-4.667h0V30.6Z" transform="translate(0 0)" fill="#d1cfd0"/>
            </svg>
            <span class="log_in_span">马上登录</span>
        </div>

        <div style="" class="back_box" @click="back">
            <!--        黑色-->
            <svg xmlns="http://www.w3.org/2000/svg" width="10.506" height="18.388" viewBox="0 0 10.506 18.388">
                <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M13.513,12.381,21.482,4.7a.848.848,0,0,0,0-1.25.983.983,0,0,0-1.33,0l-8.628,8.3a.847.847,0,0,0-.027,1.22l8.655,8.345a.97.97,0,0,0,1.32,0,.848.848,0,0,0,.01-1.25Z" transform="translate(-11.251 -3.188)"/>
            </svg>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Login",
        components:{

        },
        data(){
            return{
                login_select:true
            }
        },
        methods:{
            sign_up(){
              this.$store.commit('advance')
                this.$router.replace('/login/sign')
            },
            log_in(){
              this.$store.commit('advance')
                this.$router.replace('/login/log')
            },
            back(){
                this.$router.replace('/user')
            }
        }
    }
</script>

<style scoped>
.Login_box{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
}
.sign_up_box{
    width: 100%;
    height: 50%;
    background-color: #D1CFD0;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.sign_up_title{
    font-size: 25px;
    margin-top: 1.5rem;
    font-weight: bold
}
.sign_up_icon{
    margin-top: 2.5rem;
}
.sign_up_span_one{
    color: #3B4356;
    font-size: 25px;
    font-weight: bold;
    margin-top: 5rem;
}
.sign_up_span_two{
    color: #3B4356;
    font-size: 20px;
    font-weight: bold

}
.log_in_box{
    width: 100%;
    height: 50%;
    background-color: #3B4356;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.log_in_title{
    font-size: 25px;
    margin-top: 1.5rem;
    font-weight: bold;
    color: white;
}
.log_in_icon{
    margin-top: 2.5rem;
}
.log_in_span{
    font-size: 25px;
    font-weight: bold;
    color: #D1CFD0;
    margin-top: 5rem;
}

    .back_box{
        width: 2rem;
        height: 2rem;
        position: fixed;
        top:3.5rem;
        left:1rem;
        z-index: 9;
        display: flex;
        justify-content: center;
        align-items: center;
    }


</style>