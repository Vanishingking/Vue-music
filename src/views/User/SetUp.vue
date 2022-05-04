<template>
    <div class="setup_box" :class="[$store.state.theme == 'night' ? 'setup_box_night':'']">
            <div class="setup_title_box" :class="[$store.state.theme == 'night' ? 'setup_title_box_night':'']">
                <TitleHead title="设置"></TitleHead>
            </div>
        <div class="setup_body_box" @click="theme_select">
            <div class="setup_body" :class="[$store.state.theme == 'night' ? 'setup_body_night':'']">
                <span>主题</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10.026" height="18" viewBox="0 0 10.026 18">
                    <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M14.974,9l-1,1,8.239,8-8.239,8,1,1L24,18Z" transform="translate(-13.974 -9)" fill="#d9d9d9"/>
                </svg>
            </div>
        </div>
        <van-popup v-model:show="theme" position="right" :style="{ height: '100%',width:'100%'}">
            <div class="theme_box" :class="[$store.state.theme == 'night' ? 'theme_box_night':'']">
                <div class="setup_title_box" :class="[$store.state.theme == 'night' ? 'setup_title_box_night':'']">
                    <TitleHead title="主题"></TitleHead>
                </div>
                <div class="theme_body" :class="[$store.state.theme == 'night' ? 'theme_body_night':'']">
                    <div class="theme_color_box" :class="[$store.state.theme == 'night' ? 'theme_color_box_night':'']" style="margin-top: 1rem">
                        <div class="theme_color" :class="[$store.state.theme == 'night' ? 'theme_color_night':'']" @click="switch_theme('white')">
                            <div class="color_block_white"></div>
                            <span>简介白</span>
                            <svg style="margin-left: 70%" v-if="$store.state.theme == 'white'" xmlns="http://www.w3.org/2000/svg" width="15" height="10.741" viewBox="0 0 15 10.741">
                                <path id="路径_233" data-name="路径 233" d="M162.858,253.393a.635.635,0,0,0-.9.029L153.5,262.45l-4.385-3.684a.636.636,0,1,0-.819.974l4.846,4.072a.637.637,0,0,0,.874-.052l8.869-9.467A.636.636,0,0,0,162.858,253.393Z" transform="translate(-148.059 -253.22)" fill="#5ab4f0"/>
                            </svg>
                        </div>
                    </div>

                    <div class="theme_color_box" :class="[$store.state.theme == 'night' ? 'theme_color_box_night':'']">
                        <div class="theme_color" style="border: none" :class="[$store.state.theme == 'night' ? 'theme_color_night':'']" @click="switch_theme('night')">
                            <div class="color_block_night"></div>
                            <span>深色黑</span>
                            <svg style="margin-left: 70%" v-if="$store.state.theme == 'night'" xmlns="http://www.w3.org/2000/svg" width="15" height="10.741" viewBox="0 0 15 10.741">
                                <path id="路径_233" data-name="路径 233" d="M162.858,253.393a.635.635,0,0,0-.9.029L153.5,262.45l-4.385-3.684a.636.636,0,1,0-.819.974l4.846,4.072a.637.637,0,0,0,.874-.052l8.869-9.467A.636.636,0,0,0,162.858,253.393Z" transform="translate(-148.059 -253.22)" fill="#5ab4f0"/>
                            </svg>

                        </div>
                    </div>
                </div>
                <div class="modify_back" @click="onCancel"></div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import TitleHead from "../../components/TitleHead";
    export default {
        name: "SetUp",
        components:{
            TitleHead,
        },
        data(){
            return{
                theme:false
            }},
        methods:{
            theme_select(){
                this.theme = true
            },
            switch_theme(data){
                this.$store.commit('transform_theme',data)
            },
            onCancel(){
                this.theme = false
            }
        }
    }
</script>

<style scoped>
.setup_box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: #F6F6F6;
}
    .setup_title_box{
        background-color: white;
    }

    .setup_body{
        width: 100%;
        height: 4.25rem;
        background-color: white;
        display: flex;
       align-items: center;
        margin-top: 1rem;
    }
    .setup_body span{
        font-size: 20px;
        margin-left: 1rem;
    }
    .setup_body svg{
        position: fixed;
        right: 1rem;

         }
    .theme_box{
        width: 100%;
        height: 100%;
        background-color: #ECEDF1;
        display: flex;
        flex-direction: column;
    }
    .theme_body{
        width: 100%;
        height: 100%;
    }
    .theme_color_box{
        width: 100%;
        height: 4.25rem;
        background-color: white;
        display: flex;
        justify-content: flex-end;
    }
    .theme_color{
         width: 94%;
        height: 100%;
        border-bottom: 2px solid #F6F6F6;
        display: flex;
        align-items: center;
    }
    .color_block_white{
        width: 1rem;
        height: 1rem;
        background-color: white;
        border: 1px solid #707070;
        border-radius: 0.3rem;
        margin-right: 0.5rem;
    }
    .color_block_night{
        width: 1rem;
        height: 1rem;
        background-color: black;
        border: 1px solid black;
        border-radius: 0.3rem;
        margin-right: 0.5rem;
    }




    .setup_box_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 1;
        background-color: #2B2B2B;
        color: white;
    }

    .setup_title_box_night{
        background-color: #222225;
    }
    .setup_body_night{
        width: 100%;
        height: 4.25rem;
        background-color: #222225;
        display: flex;
        align-items: center;
        margin-top: 1rem;
    }

    .theme_box_night{
        width: 100%;
        height: 100%;
        background-color: #2B2B2B;
        display: flex;
        flex-direction: column;
    }

    .theme_color_box_night{
        width: 100%;
        height: 4.25rem;
        background-color: #222225;
        display: flex;
        justify-content: flex-end;
    }
    .theme_color_night{
        width: 94%;
        height: 100%;
        border-bottom: 2px solid #2B2B2B;
        display: flex;
        align-items: center;
    }

.modify_back{
    width: 1.5rem;
    height: 2rem;
    position: absolute;
    z-index: 3;
    margin-top: 3rem;
    margin-left: 1rem;
}
</style>