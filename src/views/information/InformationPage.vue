<template>
    <div :style="{color : $store.state.theme == 'night' ? 'white':''}">
    <div class="information_page" :class="[$store.state.theme == 'night' ? 'information_page_night':'']" v-if="$store.state.user_cookie !=undefined">
            <div class="information_head_box" :class="[$store.state.theme == 'night' ? 'information_head_box_night':'']">
                <span>动态</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="3" viewBox="0 0 10 3">
                    <line id="直线_22" data-name="直线 22" x2="7" transform="translate(1.5 1.5)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-width="3"/>
                </svg>
            </div>
        <div class="information_page_body">
            <InformationDetails
                ref="InformationDetails"
                @Share-music-url="ShareMusicUrl"
                @Share-music-stop="ShareMusicStop"
                @Play-music="startPlay"
                @Pause-play="pausePlay"
                @information_menu="information_menu"
                @rest="rest"
                @forward="forward">
            </InformationDetails>
        </div>
        <div class="send_information_box" @click="edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="28.73" height="25.437" viewBox="0 0 33.73 30.437">
                <path id="路径_194" data-name="路径 194" d="M115.7,39.217c-1.535-1.228-5.219-.921-10.284,2.916C98.2,47.505,94.979,54.566,90.374,61.473c-.767,1.074.46,1.688,1.381,1.228l2.916-1.688c.46-.153.614-.153.46-.921a8.636,8.636,0,0,1,2-6.293h0c5.065,2.149,11.2.921,13.354-5.219a8.849,8.849,0,0,0,5.833-5.833c.46-1.535.307-2.916-.614-3.53ZM84.849,61.473A14.878,14.878,0,0,0,105.263,67a15.164,15.164,0,0,0,7.521-12.74c0-1.688-2-1.535-2,0a12.755,12.755,0,0,1-6.447,11.051,13.144,13.144,0,0,1-17.8-4.758,12.878,12.878,0,0,1,4.758-17.8,12.476,12.476,0,0,1,10.9-.921.978.978,0,1,0,.614-1.842A14.909,14.909,0,0,0,84.849,61.473Z" transform="translate(-82.836 -38.574)" fill="#707070"/>
            </svg>
        </div>

    </div>
<!--    未登录动态-->
    <div class="not_logged_in_box" :class="[$store.state.theme == 'night' ? 'not_logged_in_box_night':'']" v-if="$store.state.user_cookie == undefined">
        <div class="information_head_box" :class="[$store.state.theme == 'night' ? 'information_head_box_night':'']">
            <span>动态</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="3" viewBox="0 0 10 3">
                <line id="直线_22" data-name="直线 22" x2="7" transform="translate(1.5 1.5)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-width="3"/>
            </svg>
        </div>
        <van-empty
                class="custom-image"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="请先登录"
        />
    </div>
<!--      删除&---举报-->
        <van-share-sheet
            v-model:show="information_menu_show"
            :options="options"
            @select="onSelect"
        />

      <!--      //转发界面-->
      <van-share-sheet
          v-model:show="showForward"
          title="立即分享给好友"
          :options="optionsForward"
      />
        <div style="position: fixed;z-index: 1;bottom: 0;width: 100%" >
            <Menu1 :menu_show="3"></Menu1>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import delete_img from '../../../public/img/delete.png'
    import report_img from  '../../../public/img/report.png'
    import Menu1 from "../../components/Menu1";
    import InformationDetails from "../../components/information/InformationDetails";
    import ajax from '../../http'
    export default {
        name: "InformationPage",
        data(){
          return{
              information_menu_show:false,
              options:[],
              operation_dynamic_id:'',
              operation_dynamic_index:-1,
              showForward:false,
              optionsForward:[
                [
                  { name: '微信', icon: 'wechat' },
                  { name: '朋友圈', icon: 'wechat-moments' },
                  { name: '微博', icon: 'weibo' },
                  { name: 'QQ', icon: 'qq' },
                ],
                [
                  { name: '复制链接', icon: 'link' },
                  { name: '分享海报', icon: 'poster' },
                  { name: '二维码', icon: 'qrcode' },
                  { name: '小程序码', icon: 'weapp-qrcode' },
                ],
            ]
          }
        },
        components: {InformationDetails,Menu1},
        methods:{
            ShareMusicUrl(data){
                this.$emit('ShareMusicUrl',data)
            },
            ShareMusicStop(){
                this.$emit('ShareMusicStop')
            },
            startPlay(){
                this.$emit('PlayMusic')
            },
            pausePlay(){
                this.$emit('PausePlay')
            },
            edit() {
                this.$store.commit('advance')
                this.$router.push('/information/postdynamics')
            },
            information_menu(data,index){
                this.information_menu_show = true
                this.operation_dynamic_id = data.id
                this.operation_dynamic_index = index
                if (data.user.userId == this.$store.state.my_user_id){
                   this.options =  [{name: '删除', icon: delete_img,}]
                }else {
                    this.options =  [{name: '举报', icon: report_img,}]
                }
            },
            onSelect(option){
                if (option.name == '删除'){
                    console.log(option.name)
                    ajax(
                        this.$store.state.api_url+'event/del',
                        {cookie:this.$store.state.user_cookie,evId:this.operation_dynamic_id}
                    ).then((res)=>{
                        console.log(res);
                        this.$refs.InformationDetails.dynamic_message.splice(this.operation_dynamic_index,1)
                        Toast.success('已删除');

                    }).catch((err)=>{
                        console.log(err);
                        Toast.fail('发生错误')
                    })

                }else {
                    Toast.success('已举报');
                }
                this.information_menu_show = false
            },
            rest(){
                this.$emit("rest")
            },
          //转发
          forward(){
              this.showForward = true
          }
        }
    }
</script>

<style scoped>
    .information_page{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        display: flex;
        /*flex-direction: column;*/
        flex-direction: column;
    }
    .information_head_box{
        font-size: 20px;
        width: 100%;
        height: 8rem;
        display: flex;
        align-items: center;
        background-color: white;
        flex-direction: column;
        /*background-color: #409eff;*/
    }
    .information_head_box span{
        margin-top: 3.5rem;
        font-weight: bold;
    }
    .send_information_box{
        position: fixed;
        top: 3.75rem;
        right: 1rem;
        z-index: 9;
    }
    .not_logged_in_box{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
    }
    .information_page_body{
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
    .custom-image{
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }



    .not_logged_in_box_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        background-color: #222225;
        color: white;
    }

    .information_head_box_night{
        font-size: 20px;
        width: 100%;
        height: 8rem;
        display: flex;
        align-items: center;
        background-color: #222225;
        flex-direction: column;
        /*background-color: #409eff;*/
    }

    .information_page_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        display: flex;
        /*flex-direction: column;*/
        flex-direction: column;
        /*background-color: ;*/
        color: white;
        background-color: #222225;
    }

    .information_head_box_night{
        font-size: 20px;
        width: 100%;
        height: 8rem;
        display: flex;
        align-items: center;
        background-color: #222225;
        flex-direction: column;
        /*background-color: #409eff;*/
    }

    .information_head_box_night span{
        margin-top: 3.5rem;
        font-weight: bold;
    }
</style>