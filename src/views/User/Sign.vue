<template>
    <div class="sign_up_box">
<!--        注册主体-->
        <div class="sign_up_body">
            <span class="sign_up_title">SIGN UP</span>
            <svg class="sign_up_icon" xmlns="http://www.w3.org/2000/svg" width="121" height="121" viewBox="0 0 121 121">
                <path id="Icon_simple-spacemacs" data-name="Icon simple-spacemacs" d="M60,.054A60.229,60.229,0,0,0,35.16,5.521h.023c18.19,10.13,34.776,28.169,44.666,41.2,2,2.667,3.763,5.03,5.39,7.17l.02-.093c2.06-8.69-1.563-26.193-7.59-36.666a7.333,7.333,0,0,1-.937-1.96h.03v-.033A57.8,57.8,0,0,1,83.626,22.3a30.069,30.069,0,0,1,5.81,11.15,293.873,293.873,0,0,1,9.5,36.246c1.193,6.14,3.377,17.29,3.667,19.42a3,3,0,0,1-.05.717q-.7-.687-1.45-1.333a103.631,103.631,0,0,0-15.913-10.57c-7.85-4.35-15.59-8.07-32.876-15.81-15.78-7.063-23.05-10.43-28.756-13.3l-5.12-2.55c.6,1.5,1.243,3.12,2,5.023a76.685,76.685,0,0,1,10.87,7.04S42.92,80.169,48.076,93.109c3.837,9.746,8.17,21.333,10.773,24.519l.3.333c-5.13-1.253-28.726-13-28.726-13-2.59-22-9.843-48.049-19.273-74.7q-.333-.667-.623-1.353a10.89,10.89,0,0,1,1.553,1.517C21.583,40.61,41.86,49.86,63.393,53.836A82.4,82.4,0,0,0,81.059,54.95c-1.537-1.96-3.2-4.1-5.047-6.51C58.906,26.2,42.123,16.851,27.093,11.134c-.393-.133-.76-.3-1.153-.44A60.085,60.085,0,0,0,0,60.436V60a60.035,60.035,0,0,0,60.429,60h-.44A60.035,60.035,0,0,0,120,59.56V60A60.035,60.035,0,0,0,59.556,0H60ZM90.666,30.6v.033h0V30.6a65.032,65.032,0,0,0,11.666,10.31c3.947,4.95,6.08,9.813,8.74,13.146-1.093-.94-5.557-4.86-5.557-4.86s-6.89-6.527-10.706-10.763a17,17,0,0,1-2.39-3.14c-.31-.487-1.377-4.127-1.77-4.667h0V30.6Z" transform="translate(0.5 0.501)" fill="#3b4356" stroke="#d1cfd0" stroke-width="1"/>
            </svg>
            <span class="sign_up_span">立即注册</span>
<!--            输入框-->
            <div class="sign_up_enter">
<!--                账号-->
                <div :class="input_focus=='acc' ? 'sign_up_enter_box_focus':'sign_up_enter_box'">
                    <input v-model="sign_acc" type="text" class="sign_up_account" placeholder="输入手机号" @focus="enter_box_focus('acc')" @blur="enter_box_blur(1)">
                </div>
              <div class="tip_box" v-if="acc_tip_show">
                <span class="tip_span">手机号已被注册</span>
              </div>
                <!--                输入昵称-->
                <div :class="input_focus=='nic' ? 'sign_up_enter_box_focus':'sign_up_enter_box'">
                    <input v-model="sign_nickname" type="text" class="sign_up_password" placeholder="输入昵称" @focus="enter_box_focus('nic')" @blur="enter_box_blur(2)">
                </div>
                <div class="tip_box" v-if="nickname_tip_show">
                  <span class="tip_span">昵称已存在</span>
                </div>
<!--                密码-->
                <div :class="input_focus=='paw' ? 'sign_up_enter_box_focus':'sign_up_enter_box'">
                    <input v-model="sign_paw" type="password" class="sign_up_password" placeholder="输入密码" @focus="enter_box_focus('paw')" @blur="enter_box_blur(3)">
                </div>
              <div class="tip_box" v-if="paw_tip_show">
                <span class="tip_span">8-16个字符,需包含大、小写字母和数字</span>
              </div>
<!--                验证码-->
                <div :class="input_focus=='ver' ? 'sign_up_enter_two_box_focus':'sign_up_enter_two_box'">
                    <input v-model="sign_verification_code" type="password" class="sign_verification_code" placeholder="验证码" @focus="enter_box_focus('ver')" @blur="enter_box_blur">
                    <div @click="get_verification_code" :class="[get_verification_code_cd ? 'get_verification_code_cd':'get_verification_code']" ><span>获取验证码<p v-if="get_verification_code_cd" style="text-align: center">({{ verification_code_cd }}s)</p></span></div>
                </div>
<!--                注册-->
                <div class="sign_up_button">
                    <span class="sign_up_button_not_ready" v-if="!(sign_acc!=''&&sign_paw!=''&&sign_nickname!=''&&sign_verification_code!=''&&!acc_tip_show&&!nickname_tip_show&&!paw_tip_show)">Sign up now</span>
                    <span class="sign_up_button_ready" @click="register" v-else>Sign up now</span>
                </div>
            </div>

        </div>
<!--        注册尾部-->
        <div class="sign_up_tail">
            <!--            返回上一界面-->
            <button class="revert" @click="revert_page">返回</button>
        </div>
<!--      加载-->
      <van-overlay :show="load_box" @click="load_box = false">
        <div class="load_box">
          <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 101.5 102.993">
            <path id="路径_247" data-name="路径 247" d="M71.037,124.293l31.278,20.892-5.7,8.9a44.119,44.119,0,0,0,24.178,7.256c19.437,0,36-12.646,42.579-30.451,2.3-6.235,5.92-7.754,9.051-6.86a51.44,51.44,0,0,1-101.389.259Zm101.5-16.831L141.05,84.612l5-8.365a44.54,44.54,0,0,0-23.725-6.881c-19.923,0-36.84,13.119-43.171,31.438-1.131,2.013-4.418,3.641-7.613,3.125a51.442,51.442,0,0,1,101,3.533Z" transform="translate(-71.037 -63.884)" fill="#fff"/>
          </svg>
        </div>
      </van-overlay>
    </div>
</template>

<script>
    import ajax from '../../http'
    export default {
        name: "Sign",
        data(){
            return{
                // sign_acc:'18819779472',
                // sign_paw:'Lxs1241334789',
                // sign_nickname:'SharkChili-',
                // sign_verification_code:'0000',
                sign_acc:'',
                sign_paw:'',
                sign_nickname:'',
                sign_verification_code:'',
                get_verification_code_cd:false,
                verification_code_cd:60,

                //false --手机号未注册，true --手机号已注册
                acc_tip_show:false,
                //false --昵称不存在，true --昵称存在
                nickname_tip_show:false,
                //false --验证码正确  true--验证码错误
                paw_tip_show:false,
                //false --符合格式  true--不符合格式
                sv_code_correct:false,
                input_focus:'',
                load_box:false,

            }
        },
        computed:{

        },
        methods:{
          enter_box_focus(data){
            this.input_focus = data
            switch (data){
              case 'acc': this.acc_tip_show = false;break;
              case 'nic': this.nickname_tip_show = false;break;
              case 'paw': this.paw_tip_show = false;break;
            }
          },
          enter_box_blur(index){
            this.input_focus = ''
            switch (index){
              //验证手机号是否注册
              case 1:  ajax(
                  this.$store.state.api_url+'cellphone/existence/check',
                  {phone:this.sign_acc}
              ).then((res)=>{
                console.log(res);
                //已注册
                if (res.exist != -1){
                  this.acc_tip_show = true
                }else {
                  this.acc_tip_show = false
                }
              }).catch((err)=>{
                console.log(err);
              });break;
                //验证昵称是否重复
              case 2: ajax(
                  this.$store.state.api_url+'nickname/check',
                  {nickname:this.sign_nickname}
              ).then((res)=>{
                console.log(res);
                this.nickname_tip_show = res.duplicated
              }).catch((err)=>{
                console.log(err);
              });break;
                //验证密码格式是否正确
              case 3: if (this.sign_paw.length<8){
                this.paw_tip_show = true
              }else if (this.sign_paw.length>16){
                this.paw_tip_show = true
              }else {
                let password = this.sign_paw
                let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                if(reg.test(password)){
                  this.paw_tip_show = false
                }else{
                  this.paw_tip_show = true
                }}
                break;
            }
          },
            kk(){
                let password = this.sign_paw
                let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                if(reg.test(password)){
//表单展示内容
                    console.log('格式正确')
                }else{
//表单展示内容
                    console.log('格式错误')
                }
            },
            revert_page(){
              this.$store.commit('router_back')
                this.$router.replace('/login')
            },
          async  register(){

               if (!this.sv_code_correct){
                 this.load_box = true
                 await ajax(
                       this.$store.state.api_url+'register/cellphone',
                       {phone:this.sign_acc,password:this.sign_paw,captcha:this.sign_verification_code,nickname:this.sign_nickname}
                   ).then((res)=>{
                       console.log(res);
                      this.load_box = false
                   this.$toast('注册成功,请登录')
                   this.$router.replace('/login/log')
                   }).catch((err)=>{
                       console.log(err);
                   this.load_box = false
                   this.$toast('发生错误')
                   })
               }else if(this.sv_code_correct){
                 this.$toast('验证码错误')
                }
            },
             get_verification_code(){
                 if (this.sign_acc.length == 11){
                     this.get_verification_code_cd = true
                     setTimeout(()=>{
                         this.verification_code_cd =  this.verification_code_cd-1
                     },1000)
                     ajax(
                         this.$store.state.api_url+'captcha/sent',
                         {phone:this.sign_acc}
                     ).then((res)=>{
                         console.log(res);
                     }).catch((err)=>{
                         console.log(err);
                     })
                 }else {
                     this.$dialog.alert({
                         message: '请输入正确手机号',
                     });
                 }

            },
        },
        watch:{
            // 重新获取验证码时间
            verification_code_cd(val){
                if (val>0&&this.get_verification_code_cd){
                    setTimeout(()=>{
                        this.verification_code_cd = this.verification_code_cd-1
                    },1000)
                }else {
                    this.get_verification_code_cd = false
                    this.verification_code_cd = 60
                }

            },
            // 验证手机验证码
            sign_verification_code(val){
                if(val.length != 4){
                this.sv_code_correct = true
                }else {
                   ajax(
                        this.$store.state.api_url+'captcha/verify',
                        {phone:this.sign_acc,captcha:val}
                    ).then((res)=>{
                        console.log(res);
                       this.sv_code_correct = false
                    }).catch((err)=>{
                        console.log(err);
                       this.sv_code_correct = true
                    })
                }
            },
        },
        mounted() {

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
.sign_up_box{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

}
    .sign_up_body{
        width: 100%;
        height: 100%;
        background-color: #D1CFD0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
.sign_up_title{
    font-size: 25px;
    margin-top: 1.5rem;
    font-weight: bold
}
.sign_up_icon{
    margin-top: 2.5rem;
}
    .sign_up_tail{
        width: 100%;
        height: 2rem;
        background-color:  #3B4356;
        display: flex;
        justify-content: center;
    }
.sign_up_span{
    color: #3B4356;
    font-size: 25px;
    font-weight: bold;
    margin-top: 3rem;
}
    .sign_up_enter{
        width: 100%;
        height: 25rem;
        /*background-color: white;*/
        margin-top: 3.75rem;
      display: flex;
      flex-direction: column;
      align-items: center;
        /*border-radius: 1.5rem;*/
    }
    .sign_up_enter_box{
        width: 70%;
        height: 3rem;
        /*border-bottom: 1px solid #707070;*/
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
    }
    .sign_up_enter_box input{
      border-radius: 1.5rem;
    }

    .sign_up_enter_box_focus{
      width: 70%;
      height: 3rem;
      margin-top: 0.5rem;
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;


    }

    .sign_up_enter_box_focus input{
      border-radius: 1.5rem;
      border: 2px solid #5AB4F0;
    }
    .sign_up_enter_box svg{
        position: absolute;
        right: 1rem;

    }
    .sign_up_enter_two_box{
        width: 70%;
        height: 3rem;
        border-bottom: 1px solid #707070;
        display: flex;
        margin-top: 0.5rem;
        border-radius: 2rem;
    }

    .sign_up_enter_two_box_focus{
      width: 70%;
      height: 3rem;
      border-bottom: 1px solid #707070;
      display: flex;
      margin-top: 1rem;
      border-radius: 2rem;
    }

    .sign_up_button{
        width: 70%;
        margin-top: 0.5rem;
        display: flex;
        justify-content: center;
    }
    .sign_up_button_not_ready{
        color: #BFBFBF;
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        font-size: 25px;
        font-weight: bold
    }
    .sign_up_button_ready{
        color: #D1CFD0;
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
       border-radius: 2rem;
        background-color: #3B4356;
    }
    .revert{
        width: 7rem;
        height: 2rem;
        background-color: #2A3344;
        border-radius: 1rem;
        color: #D1CFD0;
        font-size: 16px;
        font-weight: bold;
        border: none;
        margin-top: -1rem;
    }
    .sign_verification_code{
        width: 60%;
        height: 100%;
        border-radius: 2rem;
    }
    .get_verification_code{
        width: 40%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .get_verification_code_cd{
        width: 40%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #B7B7B7;
        pointer-events:none ;
    }

    .sign_verification_code:focus{
      border: 2px solid #5AB4F0;
    }

    .tip_span{
      width: 100%;
      height: 100%;
      text-align: center;
      color: #F05A5A;
    }
    .tip_box{
      width: 70%;
      /*height: 3rem;*/
      /*border-bottom: 1px solid #707070;*/
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 0.5rem;
    }
    .load_box{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 9;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: rotate 1.5s linear infinite;
    }
    @keyframes rotate {
      0% {
        transform: rotateZ(0deg);
        /*从0度开始*/
      }
      100% {
        transform: rotateZ(360deg);
        /*360度结束*/
      }
    }
</style>