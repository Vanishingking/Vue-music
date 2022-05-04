<template>
    <div class="PostDynamics" :class="[$store.state.theme == 'night' ? 'PostDynamics_night':'']">
        <div class="Placeholder"></div>
        <div class="Send_dynamic" @click="send_dynamics">
            <span :class="[send_dynamic_content != '' ? 'send_dynamic':'send_empty']" >发送</span>
        </div>
<!--        分享内容-->
        <div class="DynamicContent">
            <textarea class="DynamicContent_data" :class="[$store.state.theme == 'night' ? 'DynamicContent_data_night':'']" placeholder="分享我的动态" v-model="send_dynamic_content"></textarea>
        </div>
        <div class="Dynamic_img">
            <div class="add" :class="[$store.state.theme == 'night' ? 'add_night':'']" @click="add_music">
                <span>+</span>
            </div>
        </div>

<!--        选中的音乐-->
        <div class="share_selected_music_box" v-if="selected_music">
            <div class="audio_box" :class="[$store.state.theme == 'night' ? 'audio_box_night':'']">
            <div class="audio_ico">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.125rem" height="1.5rem" viewBox="0 0 22.507 29.25">
                    <path id="Icon_ionic-ios-musical-notes" data-name="Icon ionic-ios-musical-notes" d="M28.568,3.389c-.33.063-14.2,2.756-14.5,2.813a.623.623,0,0,0-.57.563V23.646a1.939,1.939,0,0,1-.169.823,1.874,1.874,0,0,1-1.132.893c-.232.077-.548.148-.921.232-1.695.38-4.528,1.027-4.528,3.642a3.219,3.219,0,0,0,2.932,3.34,3.428,3.428,0,0,0,.5.049h0a8.679,8.679,0,0,0,3.6-.928,3.788,3.788,0,0,0,1.695-3.361V13.395a.558.558,0,0,1,.45-.548l10.688-2.159a.562.562,0,0,1,.675.548v9.2a2.016,2.016,0,0,1-.176.942,1.869,1.869,0,0,1-1.139.893c-.232.077-.619.148-.991.232-1.695.38-4.528,1.02-4.528,3.635a3.225,3.225,0,0,0,2.939,3.4,5.811,5.811,0,0,0,1.364-.063,8.061,8.061,0,0,0,2.566-.914,3.706,3.706,0,0,0,1.934-3.389V3.93A.557.557,0,0,0,28.568,3.389Z" transform="translate(-6.75 -3.375)" fill="#5ab4f0"/>
                </svg>
            </div>
            <span class="share_song_name">{{ selected_song_name }}</span>
            <div class="share_selected_music_delete" @click="delete_selected_song">
                <span>X</span>
            </div>
            </div>
        </div>
        <!--        分享菜单-->
        <div class="share_song_box" :class="[$store.state.theme == 'night' ? 'share_song_box_night':'']">
<!--            音乐-->
            <svg @click="share_song" xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.6rem" viewBox="0 0 28.249 24.25">
                <path id="路径_166" data-name="路径 166" d="M65.81,149.748c-2.231,0-4.045-1.514-4.045-3.372s1.814-3.369,4.045-3.369,4.045,1.511,4.045,3.369-1.814,3.372-4.045,3.372Zm0-5.393c-1.487,0-2.7.907-2.7,2.021s1.209,2.024,2.7,2.024,2.7-.908,2.7-2.024-1.209-2.021-2.7-2.021Zm17.527,5.393c-2.231,0-4.045-1.514-4.045-3.372s1.814-3.369,4.045-3.369a.674.674,0,0,1,0,1.348c-1.487,0-2.7.907-2.7,2.021s1.209,2.024,2.7,2.024A2.583,2.583,0,0,0,86,146.666a.674.674,0,0,1,1.324.257,3.882,3.882,0,0,1-3.992,2.825Zm5.329-17.508H75.183a.674.674,0,0,1,0-1.348H88.666a.674.674,0,1,1,0,1.348Zm1.341-3.948L87.375,146.66a.677.677,0,0,1-.667.581c-.033,0-.064,0-.1-.007a.675.675,0,0,1-.571-.764l2.626-18.318a1.351,1.351,0,0,0-1.348-1.306H73.835c-1.139,0-1.334,1.283-1.353,1.43L69.848,146.66a.674.674,0,1,1-1.335-.19l2.633-18.37a2.8,2.8,0,0,1,2.689-2.6H87.318a2.7,2.7,0,0,1,2.7,2.7.568.568,0,0,1-.007.1Z" transform="translate(-61.765 -125.499)" fill="#acacac"/>
            </svg>
<!--            艾特-->
            <svg @click="atuser" xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24.25 24.25">
                <path id="路径_167" data-name="路径 167" d="M115.466,123.241a11.043,11.043,0,0,1-5.775,1.3.755.755,0,0,0-.076,1.508c.211.012.422.015.633.015a12.529,12.529,0,0,0,5.927-1.49.754.754,0,0,0-.71-1.331Zm2.3-19.335A12.573,12.573,0,0,0,98.239,114.18a11.517,11.517,0,0,0,5.945,10.316c.328.183.669.35,1.009.5a.749.749,0,0,0,.991-.386.756.756,0,0,0-.387-1c-.3-.133-.6-.28-.886-.439a10.01,10.01,0,0,1-5.168-8.967,11.07,11.07,0,0,1,17.189-9.043,9.111,9.111,0,0,1,3.81,9.65,4.955,4.955,0,0,1-3.475,3.637,2.407,2.407,0,0,1-2.974-2.93l1.792-6.914a.752.752,0,1,0-1.455-.383l-.534,2.07a4.71,4.71,0,0,0-2.552-2.488c-2.733-1.063-6.018.819-7.317,4.193s-.132,6.982,2.6,8.045a4.414,4.414,0,0,0,1.6.3,6.021,6.021,0,0,0,4.651-2.559,3.99,3.99,0,0,0,.809,1.146,3.852,3.852,0,0,0,3.792.975,6.465,6.465,0,0,0,4.531-4.744A10.638,10.638,0,0,0,117.762,103.905Zm-10.391,14.73c-1.962-.763-2.742-3.5-1.742-6.093.824-2.138,2.6-3.528,4.3-3.528a2.939,2.939,0,0,1,1.073.2c1.962.763,2.742,3.5,1.742,6.093S109.33,119.4,107.371,118.635Z" transform="translate(-98.237 -101.812)" fill="#acacac"/>
            </svg>
<!--            话题-->
            <svg @click="topic" xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.6rem" viewBox="0 0 28.947 24.32">
                <g id="组_22" data-name="组 22" transform="translate(0 -0.083)">
                    <path id="路径_170" data-name="路径 170" d="M28.368,232.722H25.786a.579.579,0,0,1,0-1.158h2.582a.579.579,0,0,1,0,1.158Zm-5.679,0H1.737a.579.579,0,0,1,0-1.158H22.689a.579.579,0,0,1,0,1.158Zm4.522,12.343H9.263a.579.579,0,0,1,0-1.158H27.21a.579.579,0,0,1,0,1.158Zm-21.265,0H.579a.579.579,0,0,1,0-1.158H5.946a.579.579,0,0,1,0,1.158Z" transform="translate(0 -225.982)" fill="#acacac"/>
                    <path id="路径_171" data-name="路径 171" d="M143.911,24.4a.48.48,0,0,1-.2-.041.579.579,0,0,1-.347-.741L151.8.463a.58.58,0,1,1,1.088.4l-8.429,23.158a.579.579,0,0,1-.544.382Zm12.279,0a.481.481,0,0,1-.2-.041.579.579,0,0,1-.347-.741L164.075.463a.58.58,0,1,1,1.088.4l-8.429,23.158A.579.579,0,0,1,156.19,24.4Z" transform="translate(-139.927 0)" fill="#acacac"/>
                </g>
            </svg>
<!--            表情-->
            <svg @click="expression" id="组_23" data-name="组 23" xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 24.311 24.311">
                <path id="路径_172" data-name="路径 172" d="M149.683,309.742a1.273,1.273,0,1,1,1.2-1.271A1.266,1.266,0,0,1,149.683,309.742Zm0-1.694a.424.424,0,1,0,.4.424A.389.389,0,0,0,149.683,308.047Zm-7.97.847h-3.188a.424.424,0,0,1,0-.847h3.188a.424.424,0,0,1,0,.847ZM145.3,321.6c-4.861,0-8.767-3.22-8.767-7.2a.389.389,0,0,1,.4-.424h16.736a.389.389,0,0,1,.4.424c0,3.982-3.905,7.2-8.767,7.2Zm-7.97-6.778c.239,3.3,3.746,5.931,7.97,5.931s7.651-2.626,7.97-5.931Z" transform="translate(-133.144 -300.681)" fill="#acacac"/>
                <path id="路径_173" data-name="路径 173" d="M12.156,24.311A12.156,12.156,0,1,1,24.311,12.156,12.139,12.139,0,0,1,12.156,24.311Zm0-23.5A11.345,11.345,0,1,0,23.5,12.156,11.379,11.379,0,0,0,12.156.81Z" fill="#acacac"/>
                <path id="路径_174" data-name="路径 174" d="M37.436,22.5Z" transform="translate(-15.987 1.639)" fill="#acacac"/>
            </svg>

        </div>

        <!--        选择音乐窗口-->
        <van-popup v-model:show="select_song" position="bottom" :style="{ height: '90%' ,backgroundColor:theme_color }" closeable round>
            <div style="display: flex;flex-direction: column;width: 100%;height: 100%">
                <div class="select_a_song_title_box">
                    <span class="select_a_song_title">最近播放</span>
                </div>
                <div class="select_a_song_body_box">
                    <ul class="select_a_song">
                        <li v-for="(item,index) in recently_played_data" :key="item" @click="selected_song(item.song_id,item.song_name)">
                            <span class="song_number">{{index+1}}</span>
                            <div style="margin-left: 0.5rem">
                                <div class="select_a_song_name">{{ item.song_name }}</div>
                                <div class="select_a_song_singer">
                                    <svg style="margin-right: 0.5rem" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 4.79 4.112">
                                        <path id="路径_175" data-name="路径 175" d="M62.451,129.611a.581.581,0,1,1,.686-.572.637.637,0,0,1-.686.572Zm0-.915c-.252,0-.457.154-.457.343s.205.343.457.343.457-.154.457-.343-.205-.343-.457-.343Zm2.972.915a.581.581,0,1,1,0-1.143.114.114,0,0,1,0,.229c-.252,0-.457.154-.457.343s.205.343.457.343a.438.438,0,0,0,.452-.294.114.114,0,0,1,.225.044.658.658,0,0,1-.677.479Zm.9-2.969H64.04a.114.114,0,0,1,0-.229h2.286a.114.114,0,1,1,0,.229Zm.227-.67-.446,3.115a.115.115,0,0,1-.113.1h-.016a.115.115,0,0,1-.1-.13l.445-3.106a.229.229,0,0,0-.229-.221H63.812c-.193,0-.226.218-.229.243l-.447,3.117a.114.114,0,1,1-.226-.032l.446-3.115a.475.475,0,0,1,.456-.441H66.1a.458.458,0,0,1,.457.457.1.1,0,0,1,0,.016Z" transform="translate(-61.765 -125.499)" fill="#acacac"/>
                                    </svg>
                                    <div class="select_a_song_singer_name">{{ item.song_singer }}<span>-</span>{{ item.song_name }}</div>
                                </div>
                            </div>
                        </li>
                        <div style="width: 100%;height: 4rem"></div>
                    </ul>
                </div>
            </div>
        </van-popup>

        <div style="position: fixed; top:3.5rem;left:1rem;z-index: 9">
            <Back :color="1"></Back>
        </div>
    </div>
</template>

<script>
    import Back from '../../components/menu/Back'
    import ajax from '../../http/index'
    import { Dialog,Toast } from 'vant';

    export default {
        name: "PostDynamics",
        components: {
            // PictureAdd
            Back
        },
        beforeUpdate(){
            if (this.send_dynamic_content!=''){
                this.$store.commit('send_permission')
            }else {
                this.$store.commit('send_disabled')
            }
        },
        data() {
            return{
                send_dynamic_content: '',
                loading:true,
                music_delete_ico:false,
                music_ico_box:false,
                loading_ico:false,
                share_song_id:'',
                recently_played_data:[],
                select_song:false,
                selected_song_name:'',
                theme_color:'#ffffff',
                selected_music:false
            }
        },
        methods: {
            kk(){
                ajax(
                    this.$store.state.api_url+'record/recent/song',
                    {cookie:this.$store.state.user_cookie}

                ).then((res)=>{
                    console.log(res);
                    for (let i = 0;i<res.data.list.length;i++){
                        this.recently_played_data.push({
                            song_name:res.data.list[i].data.name,
                            song_singer:res.data.list[i].data.ar[0].name,
                            song_id:res.data.list[i].data.id
                        })
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },

            send_dynamics(){
                if (this.share_song_id == ''){
                    ajax(
                        this.$store.state.api_url+'share/resource',
                        {type:"noresource",msg:this.send_dynamic_content}
                    ).then((res)=>{
                        console.log(res);
                        Toast.success('发表成功');
                        setTimeout(()=>{
                            this.$store.commit('router_back')
                            this.$router.go(-1)
                        },2000)
                    }).then((err)=>{
                        console.log(err);
                        Dialog.alert({
                            message: '发生错误，稍后重试',
                        }).then(() => {
                        });
                    })
                }else {
                    ajax(
                        this.$store.state.api_url+'share/resource',
                        {cookie:this.$store.state.user_cookie,id:this.share_song_id,msg:this.send_dynamic_content}
                    ).then((res)=>{
                        console.log(res);
                        Toast.success('发表成功');
                        this.share_song_id = ''
                        setTimeout(()=>{
                            this.$store.commit('router_back')
                            this.$router.go(-1)
                        },2000)
                    }).catch((err)=>{
                        console.log(err);
                        Dialog.alert({
                            message: '发生错误，稍后重试',
                        }).then(() => {
                        });

                    })
                }


            },
            add_music(){
             this.$toast('暂不支持')
            },
          // @用户
            atuser(){
              this.$toast('敬请期待')
            },
          topic(){
            this.$toast('敬请期待')
          },
          expression(){
            this.$toast('敬请期待')
          },
            music_delete(){
              this.music_delete_ico = true
            },
            music_delete_data(){
                this.music_ico_box = false
                this.$refs.file.value = ''
            },
            share_song(){
                this.select_song = true
            },
            selected_song(id,name){
                this.select_song = false
                this.selected_song_name = name
                this.share_song_id = id
                this.selected_music = true
            },
            delete_selected_song(){
                this.selected_music = false
                this.share_song_id = ''
            },
        },
        mounted() {
            if (this.$store.state.theme == 'night'){
                this.theme_color = '#222225'
            }
            if (this.$store.state.recently_played_local_data.song.length>0){
                for (let i=0;i<this.$store.state.recently_played_local_data.song.length;i++){
                    this.recently_played_data.unshift(this.$store.state.recently_played_local_data.song[i])
                }
            }
        }


    }
</script>

<style scoped>
    .PostDynamics{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
    }
.DynamicContent{
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    /*border: 1px solid black;*/

}
    .Dynamic_img{
        margin-top: 0.5rem;
        margin-left: 1rem;
        display: flex;
    }
    .DynamicContent_data{
        width: 90%;
        height: 15rem;
        font-size: 18px;
        outline:none;
        border: none;
    }
.add {
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ECEDF1;
    border-radius: 0.5rem;
}
.add span{
    font-size: 50px;
    font-weight: bold;
    color: #AEAFB3;
}
.share_selected_music_box{
    width: 100%;
    display: flex;
    justify-content: center;
}
.audio_box{
    width: 18rem;
    height: 3.5rem;
    background-color: #F9F9F9;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    z-index: 2;
    margin-top: 1rem;
    margin-bottom: 1rem;

}
.audio_ico{
    height: 2.5rem;
    width: 2.5rem;
    border: 0.3rem solid white;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
}
.share_song_name{
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    width: 10.5rem;
    font-size: 18px;
}
.share_selected_music_delete{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1rem;
    line-height: 1.5rem;
    text-align: center;
    color: #ACACAC;
    font-size: 15px;

}
 .send_empty{
     position: fixed;
     top: 3.1rem;
     right: 2rem;
     z-index: 9;
     color: #959595;
     /*禁止点击*/
     pointer-events:none;
     width: 4rem;
     height: 2rem;
     background-color: #E8E8E8;
     text-align: center;
     line-height: 2rem;
     border-radius: 1rem;

 }
    .send_dynamic{
        position: fixed;
        top: 3rem;
        right: 2rem;
        z-index: 9;
        color: white;
        /*pointer-events:none;*/
        width: 4rem;
        height: 2rem;
        background-color: #409eff;
        text-align: center;
        line-height: 2rem;
        border-radius: 1rem;
    }
    .share_song_box{
        width: 100%;
        height: 3rem;
        background-color: #F4F4F4;
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;

    }
    .select_a_song_box{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 9;
       background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 3.15rem;
    }
    .select_a_song_title{
        font-size: 22px;
        font-weight: bold;
    }
    .select_a_song{
        width: 100%;
        height: 100%;
        list-style-type:none;
        overflow-y:auto
    }

    .select_a_song li{
        width: 90%;
        height: 4rem;
        display: flex;
        flex-direction: row;
        align-items: center;

    }
    .song_number{
        font-size: 20px;
        font-weight: bold;
        width: 2.5rem;
        text-align: center;
        color: #7A7979;
    }
    .select_a_song_name{
        font-size: 20px;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .select_a_song_singer{
        font-size: 15px;
        width: 100%;
        color: #7A7979;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .select_a_song_singer_name{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .select_a_song_title_box{
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        /*flex-direction: column;*/
    }
    .select_a_song_body_box{
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }


    .PostDynamics_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: #222225;
        color: white;
    }
    .DynamicContent_data_night{
        width: 90%;
        height: 15rem;
        font-size: 18px;
        outline:none;
        border: none;
        background-color: #222225;
    }


    .add_night {
        width: 4.5rem;
        height: 4.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #2B2B2B;
        border-radius: 0.5rem;
    }
    .share_song_box_night{
        width: 100%;
        height: 3rem;
        background-color: #2B2B2B;
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;

    }

    .audio_box_night{
        width: 18rem;
        height: 3.5rem;
        background-color: #2B2B2B;
        display: flex;
        align-items: center;
        border-radius: 0.5rem;
        z-index: 2;
        margin-top: 1rem;
        margin-bottom: 1rem;

    }

</style>