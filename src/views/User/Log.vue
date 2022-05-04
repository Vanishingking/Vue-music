<template>
    <div class="log_in_box">
        <!--        登录主体-->
        <div class="log_in_body">
            <span class="log_in_title">LOG IN</span>
            <svg class="log_in_icon" xmlns="http://www.w3.org/2000/svg" width="121" height="121" viewBox="0 0 121 121">
                <path id="Icon_simple-spacemacs" data-name="Icon simple-spacemacs" d="M60,.054A60.229,60.229,0,0,0,35.16,5.521h.023c18.19,10.13,34.776,28.169,44.666,41.2,2,2.667,3.763,5.03,5.39,7.17l.02-.093c2.06-8.69-1.563-26.193-7.59-36.666a7.333,7.333,0,0,1-.937-1.96h.03v-.033A57.8,57.8,0,0,1,83.626,22.3a30.069,30.069,0,0,1,5.81,11.15,293.873,293.873,0,0,1,9.5,36.246c1.193,6.14,3.377,17.29,3.667,19.42a3,3,0,0,1-.05.717q-.7-.687-1.45-1.333a103.631,103.631,0,0,0-15.913-10.57c-7.85-4.35-15.59-8.07-32.876-15.81-15.78-7.063-23.05-10.43-28.756-13.3l-5.12-2.55c.6,1.5,1.243,3.12,2,5.023a76.685,76.685,0,0,1,10.87,7.04S42.92,80.169,48.076,93.109c3.837,9.746,8.17,21.333,10.773,24.519l.3.333c-5.13-1.253-28.726-13-28.726-13-2.59-22-9.843-48.049-19.273-74.7q-.333-.667-.623-1.353a10.89,10.89,0,0,1,1.553,1.517C21.583,40.61,41.86,49.86,63.393,53.836A82.4,82.4,0,0,0,81.059,54.95c-1.537-1.96-3.2-4.1-5.047-6.51C58.906,26.2,42.123,16.851,27.093,11.134c-.393-.133-.76-.3-1.153-.44A60.085,60.085,0,0,0,0,60.436V60a60.035,60.035,0,0,0,60.429,60h-.44A60.035,60.035,0,0,0,120,59.56V60A60.035,60.035,0,0,0,59.556,0H60ZM90.666,30.6v.033h0V30.6a65.032,65.032,0,0,0,11.666,10.31c3.947,4.95,6.08,9.813,8.74,13.146-1.093-.94-5.557-4.86-5.557-4.86s-6.89-6.527-10.706-10.763a17,17,0,0,1-2.39-3.14c-.31-.487-1.377-4.127-1.77-4.667h0V30.6Z" transform="translate(0.5 0.501)" fill="#d1cfd0" stroke="#d1cfd0" stroke-width="1"/>
            </svg>

            <span class="log_in_span_one">登录账号</span>
            <span class="log_in_span_two">立即体验</span>


            <!--            输入框-->
            <div class="log_in_enter">
                <!--                账号-->
                <div :class="input_focus=='acc' ? 'log_in_enter_box_focus':'log_in_enter_box'">
                    <input v-model="log_acc" type="text" class="sign_up_account" :placeholder="acc_placeholder" @focus="enter_box_focus('acc')" @blur="enter_box_blur">
                </div>
                <!--                密码-->
                <div :class="input_focus=='paw' ? 'log_in_enter_box_focus':'log_in_enter_box'">
                    <input v-model="log_paw" type="password" class="sign_up_password" placeholder="输入密码" @focus="enter_box_focus('paw')"  @blur="enter_box_blur">
                </div>
                <!--                登录-->
                <div class="log_in_button">
                    <span class="log_in_button_not_ready" v-show="!(log_acc != ''&&log_paw !='')">Log in now</span>
                    <span class="log_in_button_ready" @click="log_in_now" v-show="log_acc != ''&&log_paw !=''">Log in now</span>
                </div>
            </div>


            <div class="login_mode">
<!--                邮箱登录-->
                <svg v-if="login_mode_mail" xmlns="http://www.w3.org/2000/svg" width="41" height="31" viewBox="0 0 41 31">
                    <path id="路径_240" data-name="路径 240" d="M120.66,194H89.334a1.981,1.981,0,0,0-.5.062l15.173,15.172a1,1,0,0,0,1.414,0Zm2.163.665-12.22,12.22,12.325,12.324a1.993,1.993,0,0,0,.406-1.209V196a2,2,0,0,0-.51-1.335ZM120.89,220l-11.7-11.7-2.35,2.35a3,3,0,0,1-4.243,0l-2.349-2.35L88.664,219.885a2.012,2.012,0,0,0,.671.115h31.556Zm-33.525-1.646,11.469-11.47L87.408,195.46a2,2,0,0,0-.074.54v22a1.976,1.976,0,0,0,.031.354ZM89.334,192h32a4,4,0,0,1,4,4v22a4,4,0,0,1-4,4h-32a4,4,0,0,1-4-4V196a4,4,0,0,1,4-4Z" transform="translate(-84.834 -191.5)" fill="#d1cfd0" stroke="#d1cfd0" stroke-width="1"/>
                </svg>

                <svg v-else @click="login_mode_select" xmlns="http://www.w3.org/2000/svg" width="41" height="31" viewBox="0 0 41 31">
                    <path id="路径_243" data-name="路径 243" d="M120.66,194H89.334a1.981,1.981,0,0,0-.5.062l15.173,15.172a1,1,0,0,0,1.414,0Zm2.163.665-12.22,12.22,12.325,12.324a1.993,1.993,0,0,0,.406-1.209V196a2,2,0,0,0-.51-1.335ZM120.89,220l-11.7-11.7-2.35,2.35a3,3,0,0,1-4.243,0l-2.349-2.35L88.664,219.885a2.012,2.012,0,0,0,.671.115h31.556Zm-33.525-1.646,11.469-11.47L87.408,195.46a2,2,0,0,0-.074.54v22a1.976,1.976,0,0,0,.031.354ZM89.334,192h32a4,4,0,0,1,4,4v22a4,4,0,0,1-4,4h-32a4,4,0,0,1-4-4V196a4,4,0,0,1,4-4Z" transform="translate(-84.834 -191.5)" fill="#2a3344" stroke="#2a3344" stroke-width="1"/>
                </svg>

                <!--                手机号登录-->
                <svg v-if="login_mode_phone" xmlns="http://www.w3.org/2000/svg" width="20.187" height="30" viewBox="0 0 20.187 30">
                    <path id="路径_241" data-name="路径 241" d="M222.769,26.048a3.586,3.586,0,0,1-.329,1.531,4.059,4.059,0,0,1-.906,1.251,4.29,4.29,0,0,1-1.35.856,4.395,4.395,0,0,1-1.663.313h-11.69a4.395,4.395,0,0,1-1.663-.313,4.29,4.29,0,0,1-1.35-.856,4.059,4.059,0,0,1-.906-1.251,3.586,3.586,0,0,1-.329-1.531V3.984a3.7,3.7,0,0,1,.329-1.548,4,4,0,0,1,.906-1.268,4.29,4.29,0,0,1,1.35-.856A4.395,4.395,0,0,1,206.831,0h11.69a4.395,4.395,0,0,1,1.663.313,4.29,4.29,0,0,1,1.35.856,4,4,0,0,1,.906,1.268,3.7,3.7,0,0,1,.329,1.548ZM220.1,5.565H205.217V24.434H220.1ZM212.66,25.356a1.672,1.672,0,0,0-1.2.494,1.712,1.712,0,1,0,2.42,2.42,1.7,1.7,0,0,0-1.218-2.914Zm2.634-22.591a.535.535,0,0,0-.527-.56h-4.182a.557.557,0,0,0-.346.148.5.5,0,0,0-.181.412.535.535,0,0,0,.527.56h4.182a.535.535,0,0,0,.527-.56Z" transform="translate(-202.583 0.001)" fill="#d1cfd0"/>
                </svg>

                <svg v-else @click="login_mode_select" xmlns="http://www.w3.org/2000/svg" width="20.187" height="30" viewBox="0 0 20.187 30">
                    <path id="路径_242" data-name="路径 242" d="M222.769,26.048a3.586,3.586,0,0,1-.329,1.531,4.059,4.059,0,0,1-.906,1.251,4.29,4.29,0,0,1-1.35.856,4.395,4.395,0,0,1-1.663.313h-11.69a4.395,4.395,0,0,1-1.663-.313,4.29,4.29,0,0,1-1.35-.856,4.059,4.059,0,0,1-.906-1.251,3.586,3.586,0,0,1-.329-1.531V3.984a3.7,3.7,0,0,1,.329-1.548,4,4,0,0,1,.906-1.268,4.29,4.29,0,0,1,1.35-.856A4.395,4.395,0,0,1,206.831,0h11.69a4.395,4.395,0,0,1,1.663.313,4.29,4.29,0,0,1,1.35.856,4,4,0,0,1,.906,1.268,3.7,3.7,0,0,1,.329,1.548ZM220.1,5.565H205.217V24.434H220.1ZM212.66,25.356a1.672,1.672,0,0,0-1.2.494,1.712,1.712,0,1,0,2.42,2.42,1.7,1.7,0,0,0-1.218-2.914Zm2.634-22.591a.535.535,0,0,0-.527-.56h-4.182a.557.557,0,0,0-.346.148.5.5,0,0,0-.181.412.535.535,0,0,0,.527.56h4.182a.535.535,0,0,0,.527-.56Z" transform="translate(-202.583 0.001)" fill="#2a3344"/>
                </svg>


            </div>

        </div>
        <!--        登录尾部-->
        <div class="log_in_tail">
            <!--            返回上一界面-->
            <button class="revert" @click="revert_page">返回</button>
        </div>
        <div class="verification_ing_box" v-show="verification_ing">
            <div class="verification_load_background"></div>
            <svg v-show="loading" class="log_loading" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <rect id="矩形_76" data-name="矩形 76" width="48" height="48" fill="none"/>
                <path id="路径_163" data-name="路径 163" d="M24,44A20,20,0,0,0,24,4" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                <path id="路径_164" data-name="路径 164" d="M24,44A20,20,0,0,1,24,4" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke-dasharray="2 6"/>
            </svg>
            <div class="verification_load" v-show="err_message">
                <p>登录失败</p>
                <p>{{ err_tip }}</p>
                <button class="verification_load_determine" @click="verification_load_close">确定</button>
            </div>
        </div>
    </div>
</template>

<script>

    import ajax from '../../http/index'
    import md5 from 'js-md5';
    export default {
        name: "Log",
        data(){
            return{
                log_acc:'s2273659322@163.com',
                log_paw:'Lxs1241334789',
                // log_acc:'',
                // log_paw:'',
                verification_ing:false,
                loading:false,
                err_message:false,
                err_code:0,
                err_tip:"账号或密码错误",
                login_mode_mail:true,
                login_mode_phone:false,
                acc_placeholder:'输入邮箱账号',
                input_focus:''
            }
        },
        methods:{
          enter_box_blur(){
            this.input_focus = ''
          },
          enter_box_focus(data){
            this.input_focus = data
          },
            revert_page(){
              this.$store.commit('router_back')
                this.$router.replace('/login')
            },
            async log_in_now(){
                this.loading = true
                this.verification_ing = true
                if (this.login_mode_mail){
                    await ajax(
                        this.$store.state.api_url+'login',
                        {email:this.log_acc,md5_password:md5(this.log_paw)},
                        'post'
                    ).then((res)=>{
                        console.log(res)
                        console.log(res.code)
                        this.loading = false
                        if (res.code == 502){
                            this.err_message = true
                        }else if (res.code == 200){
                            this.$router.replace('/user')
                        }else if (res.code == 250){
                            this.err_tip = res.message
                            this.err_message = true
                        }else if(res.code == 400){
                            this.err_tip = res.message
                            this.err_message = true
                        }
                        this.err_code = res.code
                        this.$store.commit('get_user_cookie',res.cookie)

                    }).catch((err)=>{
                        console.log(err);
                        this.loading = false
                        this.err_message = true
                        this.err_tip = '登录失败请稍后重试'
                    })
                }else {
                    await ajax(
                        this.$store.state.api_url+'login/cellphone',
                        {phone:this.log_acc,md5_password:md5(this.log_paw)},
                        'post'
                    ).then((res)=>{
                        console.log(res)
                        console.log(res.code)
                        this.loading = false
                        if (res.code == 502){
                            this.err_message = true
                        }else if (res.code == 200){
                            this.$router.replace('/user')
                        }else if (res.code == 250){
                            this.err_tip = res.message
                            this.err_message = true
                        }else if(res.code == 400){
                            this.err_tip = res.message
                            this.err_message = true
                        }
                        this.err_code = res.code
                        this.$store.commit('get_user_cookie',res.cookie)

                    }).catch((err)=>{
                        console.log(err);
                        this.loading = false
                        this.err_message = true
                        this.err_tip = '登录失败请稍后重试'
                    })
                }




            },
            verification_load_close(){
                this.verification_ing = false
                this.err_message = false
                this.loading = false
            },
            login_mode_select(){

                this.login_mode_mail = !this.login_mode_mail
                this.login_mode_phone = ! this.login_mode_phone
                if (this.login_mode_mail){
                    this.acc_placeholder = '输入邮箱账号'

                }
                if (this.login_mode_phone){
                    this.acc_placeholder = '输入手机号'

                }
            }
        }
    }
</script>

<style scoped>
    input{
        font-size: 20px;
        border: none;
        background-color: #f4f4f4;
        outline: none;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    input::-ms-input-placeholder{
        text-align: center;
    }
    input::-webkit-input-placeholder{
        text-align: center;
    }
    .log_in_box{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

    }
    .log_in_body{
        width: 100%;
        height: 100%;
        background-color: #3B4356;
        display: flex;
        flex-direction: column;
        align-items: center;
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
    .log_in_tail{
        width: 100%;
        height: 2rem;
        background-color:  #D1CFD0;
        display: flex;
        justify-content: center;
    }
    .log_in_span_one{
        color: #D1CFD0;
        font-size: 25px;
        font-weight: bold;
        margin-top: 3rem;
    }
    .log_in_span_two{
        color: #D1CFD0;
        font-size: 20px;
        font-weight: bold;
    }
    .log_in_enter{
        width: 100%;
        height: 15rem;
        /*background-color: white;*/
        margin-top: 3.75rem;
        /*border-radius: 1.5rem;*/
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .log_in_enter_box{
        width: 70%;
        height: 3rem;
        /*border-bottom: 1px solid #707070;*/
        margin-top: 1rem;
    }
    .log_in_enter_box input{
      border-radius: 1.5rem;
    }
    .log_in_enter_box_focus{
      width: 80%;
      height: 3rem;
      /*border-bottom: 1px solid #707070;*/
      margin-top: 1rem;
    }
    .log_in_enter_box_focus input{
      border-radius: 1.5rem;
      border: #5AB4F0 2px solid;
    }

    .log_in_button{
        width: 80%;
        margin-top: 1rem;
        display: flex;
        justify-content: center;
    }
    .log_in_button_not_ready{
        color: #BFBFBF;
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        font-size: 25px;
        font-weight: bold
    }
    .log_in_button_ready{
        color: white;
        width: 90%;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        background-color: #2A3344;
        border: #3B4356 1px solid;
        border-radius: 1.5rem;
    }
    .revert{
        width: 7rem;
        height: 2rem;
        background-color: #BFBFBF;
        border-radius: 1rem;
        color: #3B4356;
        font-size: 16px;
        font-weight: bold;
        border: none;
        margin-top: -1rem;
    }

    .verification_ing_box{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        width: 100%;
        height: 100%;

    }
    .verification_load_background{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity:0.2;
        z-index: 1;
    }
    .log_loading{
        z-index: 2;
        animation: rotate 1s linear infinite;
    }

    .verification_load{
        width: 90%;
        height: 30%;
        background-color: white;
        opacity: 1;
        z-index: 2;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .verification_load p{
        height: 30%;
        font-size: 20px;
        font-weight: bold;
    }
    .verification_load_determine{
        width: 50%;
        height: 2.5rem;
        background-color: #3B4356;
        border: none;
        border-radius: 1rem;
        color: white;
        font-size: 20px;
    }

    .login_mode{
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 1rem;
    }
</style>