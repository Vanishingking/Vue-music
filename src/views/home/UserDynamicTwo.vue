<template>
    <div class="UserInformation"  @touchmove='touchmove'>
        <audio ref="audio">
            <source :src="music_url">
        </audio>
        <div class="xu" :style="{'opacity':transparency}"> <div class="title"><span>{{ user_dynamic_data.user_name }}</span></div></div>
        <img :src="user_dynamic_data.user_img" class="blur" ref="slide">
        <!--    用户资料-->
        <div class="user_details_box">
            <div class="information_head_box">
                <img :src="user_dynamic_data.user_img" class="user_img">

<!--                编辑-->
                <div class="user_edit" v-if="$route.params.id == $store.state.my_user_id" @click="edit_user">
                    <div class="user_edit_bag"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15.048" viewBox="0 0 20 20.048">
                        <path id="路径_200" data-name="路径 200" d="M143.434,128.355l2.355,2.355-12.525,12.527-4.688,2.379,2.332-4.736Zm1.178-1.178,1.609-1.609,2.355,2.355-1.609,1.609Z" transform="translate(-128.576 -125.568)" fill="#FFFFFF"/>
                    </svg>
                    <span style="z-index: 2;color: white;margin-left: 0.5rem">编辑</span>
                </div>
                <!--                关注-->
                <div class="user_edit" v-if="$route.params.id != $store.state.my_user_id && follows ==-1" @click="follow_user">
                    <div class="user_edit_bag"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15.943 15.943">
                        <g id="组_28" data-name="组 28" transform="translate(-90.9 -90.9)">
                            <path id="路径_201" data-name="路径 201" d="M872.8,755.632h0v0Z" transform="translate(-767.102 -652.142)" fill="#fff"/>
                            <path id="路径_202" data-name="路径 202" d="M104.51,93.232a7.975,7.975,0,1,0,0,11.278,7.983,7.983,0,0,0,0-11.278M103.7,103.7a6.83,6.83,0,1,1,0-9.659,6.838,6.838,0,0,1,0,9.659" fill="#fff"/>
                            <path id="路径_203" data-name="路径 203" d="M290.968,338.737a2.311,2.311,0,0,0-1.714.892,2.306,2.306,0,0,0-1.712-.892,2.7,2.7,0,0,0-2.585,2.789A3.407,3.407,0,0,0,286,343.757c.539.666,2.73,2.662,3.262,2.662.507,0,2.642-1.908,3.224-2.638a3.436,3.436,0,0,0,1.067-2.256,2.7,2.7,0,0,0-2.585-2.789m.8,4.255-.063.057-.053.066a15.048,15.048,0,0,1-2.389,2.139,16.368,16.368,0,0,1-2.429-2.169l-.051-.063-.06-.055a2.38,2.38,0,0,1-.694-1.441,1.628,1.628,0,0,1,1.515-1.719,1.291,1.291,0,0,1,.905.523l.807.929.808-.929a1.293,1.293,0,0,1,.906-.524,1.629,1.629,0,0,1,1.515,1.719,2.4,2.4,0,0,1-.718,1.466" transform="translate(-190.383 -243.146)" fill="#fff"/>
                        </g>
                    </svg>
                    <span style="z-index: 2;color: white;margin-left: 0.5rem">关注</span>
                </div>

                <!--                取消关注-->
                <div class="user_edit" v-if="$route.params.id != $store.state.my_user_id && follows !=-1" @click="no_follow_user">
                    <div class="user_edit_bag"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 19.257 19.01">
                        <path id="路径_204" data-name="路径 204" d="M96.387,85.333a5.307,5.307,0,0,1,2.795,9.818,9.617,9.617,0,0,1,3.456,1.887.724.724,0,0,1-.938,1.1,8.2,8.2,0,0,0-13.484,5.541.724.724,0,1,1-1.442-.123,9.651,9.651,0,0,1,6.819-8.407,5.307,5.307,0,0,1,2.794-9.818Zm9.406,14.187.024.023a.674.674,0,0,1,0,.982l-3.669,3.459a.772.772,0,0,1-1.03,0L99.011,102a.674.674,0,0,1,0-.982l.024-.023a.724.724,0,0,1,.993,0l1.6,1.513L104.8,99.52a.724.724,0,0,1,.993,0ZM96.387,86.78a3.859,3.859,0,1,0,3.859,3.859A3.859,3.859,0,0,0,96.387,86.78Z" transform="translate(-86.772 -85.333)" fill="#fff"/>
                    </svg>
                    <span style="z-index: 2;color: white;margin-left: 0.5rem">已关注</span>
                </div>



                <!--                用户昵称-->
                <div style="margin-top: 1rem">
                    <span class="user_nickname">{{ user_dynamic_data.user_name }}</span>
                    <!--             性别-->
                    <!--                      女-->
                    <svg v-show="user_dynamic_data.user_gender == 2" xmlns="http://www.w3.org/2000/svg" width="0.72rem" height="0.72rem" viewBox="0 0 14.621 14.622">
                        <path id="Icon_ionic-ios-female" data-name="Icon ionic-ios-female" d="M3.854,18a.468.468,0,0,0,.338-.141l1.575-1.575,1.3,1.3a.474.474,0,0,0,.338.141.468.468,0,0,0,.338-.141.477.477,0,0,0,0-.675l-1.3-1.3L8.2,13.855a5.943,5.943,0,1,0-.675-.675L5.767,14.938l-1.3-1.3a.474.474,0,0,0-.338-.141.468.468,0,0,0-.338.141.477.477,0,0,0,0,.675l1.3,1.3L3.517,17.188A.478.478,0,0,0,3.854,18ZM8.526,5.8A4.986,4.986,0,1,1,7.067,9.324,4.963,4.963,0,0,1,8.526,5.8Z" transform="translate(-3.377 -3.382)" fill="#ff6dc0"/>
                    </svg>
                    <!--                      男-->
                    <svg v-show="user_dynamic_data.user_gender == 1" xmlns="http://www.w3.org/2000/svg" width="0.72rem" height="0.72rem" viewBox="0 0 14.724 14.728">
                        <path id="Icon_ionic-ios-male" data-name="Icon ionic-ios-male" d="M17.621,3.375H13.766a.481.481,0,0,0,0,.963h2.669L13.242,7.553a6.023,6.023,0,1,0,.68.683l3.215-3.2V7.708a.481.481,0,0,0,.963,0V3.856A.477.477,0,0,0,17.621,3.375Zm-3.236,8.741a5.028,5.028,0,1,1-1.473-3.551A4.989,4.989,0,0,1,14.385,12.116Z" transform="translate(-3.375 -3.375)" fill="#5ab4f0"/>
                    </svg>
                </div>
                <!--                生日 地区-->
                <div style="margin-top: 1rem">
                    <span class="user_birthday">生日：{{ formatDate(user_dynamic_data.user_birthday) }}</span>
<!--                    <span class="user_region">地区</span>-->
                </div>
                <!--                签名-->
                <div style="margin-top: 1rem">
                    <p class="user_autograph">{{ user_dynamic_data.user_signature }}</p>
                </div>
            </div>
        </div>
<!--        用户动态-->
        <div class="user_dynamics_box" :class="[$store.state.theme == 'night' ? 'user_dynamics_box_night':'']">
                <div class="user_dynamics_title_box">
                    <span>动态</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="3" viewBox="0 0 10 3">
                        <line id="直线_22" data-name="直线 22" x2="7" transform="translate(1.5 1.5)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-width="3"/>
                    </svg>
                </div>
            <div class="user_dynamic_body" :class="[$store.state.theme == 'night' ? 'user_dynamic_body_night':'']">
                <ul>
                    <li v-for="(item,index) in user_dynamic_data" :key="item">
                        <div class="information_box">
                            <div class="information_box_head">
                                <img :src="item.user_img" class="ID_user_avatar">
                                <span class="ID_user_name">{{ item.user_name }}</span>
                                <div class="information_menu_box" @click="information_menu(item,index)">
                                    <svg style="z-index: 1;" xmlns="http://www.w3.org/2000/svg" width="0.17rem" height="0.86rem" viewBox="0 0 3.412 17.24">
                                        <g id="Icon_ionic-ios-more" data-name="Icon ionic-ios-more" transform="translate(18.74 -4.5) rotate(90)">
                                            <path id="路径_63" data-name="路径 63" d="M17.02,15.328a1.706,1.706,0,1,0,1.706,1.706,1.705,1.705,0,0,0-1.706-1.706Z" transform="translate(-3.909)" fill="#7a7a7a"/>
                                            <path id="路径_64" data-name="路径 64" d="M6.206,15.328a1.706,1.706,0,1,0,1.706,1.706,1.705,1.705,0,0,0-1.706-1.706Z" fill="#7a7a7a"/>
                                            <path id="路径_65" data-name="路径 65" d="M27.862,15.328a1.706,1.706,0,1,0,1.706,1.706,1.705,1.705,0,0,0-1.706-1.706Z" transform="translate(-7.828)" fill="#7a7a7a"/>
                                        </g>
                                    </svg>
                                </div>

                            </div>
                            <div class="information_box_main_box">
                                <div class="information_box_main" :class="[$store.state.theme == 'night' ? 'information_box_main_night':'']">
                                    <p>{{ item.user_content.msg }}</p>
                                </div>
                                <!--                            音乐-->
                                <div class="audio_box" v-if="item.user_content.song != undefined">
                                    <div class="audio_ico">
                                        <img class="share_music_pic" :src="item.user_content.song.album.blurPicUrl">
                                    </div>
                                    <span v-if="item.user_content.song.alias != undefined && item.user_content.song.alias.length>0" class="share_song_name">{{ item.user_content.song.name }}({{item.user_content.song.alias[0]}})</span>
                                    <span v-else class="share_song_name">{{ item.user_content.song.name }}</span>
                                    <div class="audio_playing">
                                        <svg  v-show="!(share_music_playing === index)" @click="share_music_play_or_stop(index,item.user_content.song.id)" xmlns="http://www.w3.org/2000/svg" width="18" height="20.998" viewBox="0 0 18 20.998">
                                            <path id="Icon_awesome-play" data-name="Icon awesome-play" d="M17.052,8.807,2.909.272A1.918,1.918,0,0,0,0,1.966V19.031a1.927,1.927,0,0,0,2.909,1.694l14.143-8.531a1.988,1.988,0,0,0,0-3.388Z" transform="translate(0.001 0.004)" fill="#fff"/>
                                        </svg>

                                        <svg v-show="share_music_playing === index" @click="share_music_play_or_stop(index,item.user_content.song.id)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <path id="Icon_awesome-pause" data-name="Icon awesome-pause" d="M5.786,20.18H1.929A1.929,1.929,0,0,1,0,18.251V4.108A1.929,1.929,0,0,1,1.929,2.18H5.786A1.929,1.929,0,0,1,7.714,4.108V18.251A1.929,1.929,0,0,1,5.786,20.18ZM18,18.251V4.108A1.929,1.929,0,0,0,16.071,2.18H12.214a1.929,1.929,0,0,0-1.929,1.929V18.251a1.929,1.929,0,0,0,1.929,1.929h3.857A1.929,1.929,0,0,0,18,18.251Z" transform="translate(0 -2.18)" fill="#fff"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <!--                    图片-->
                            <div>
                                <ul class="share_img_box" v-if="item.user_share_img.length>0">
                                    <li v-for="item in item.user_share_img" :key="item">
                                        <img :src="item.originUrl" class="share_img">
                                    </li>
                                </ul>
                            </div>
                            <!--                    菜单栏-->
                            <div class="information_next" @click="dynamic_details(item)"></div>
                        </div>
                        <div style="width: 100%;height: 1rem;"></div>
                    </li>
                </ul>
            </div>
        </div>

        <van-share-sheet v-model:show="information_menu_show" :options="options" @select="onSelect"/>
        <div style="position: fixed;bottom: 0;z-index: 9;width: 100%">
            <Menu1 :menu_show="menu_select_number"></Menu1>
        </div>
        <div style="position: fixed; top:3.5rem;left:1rem;z-index: 9">
            <Back :color="1"></Back>
        </div>
    </div>

</template>

<script>
    import ajax from "../../http";
    import Back from '../../components/menu/Back'
    import Menu1 from "../../components/Menu1";
    import delete_img from "../../../public/img/delete.png";
    import report_img from "../../../public/img/report.png";
    import {Toast} from "vant";
    export default {
        name: "SongListDetails",
        components: {Back,Menu1 },
        data() {
            return{
                Album_cover:'https://p1.music.126.net/9O3tSFUZ2c0gtJh1P_JaSA==/109951166592827652.jpg',
                share_music_playing:-1,
                user_dynamic_id:'247324263',
                user_dynamic_data:[],
                transparency:0,
                // myself:false
                follows:-1,
                information_menu_show:false,
                options:[],
                operation_dynamic_id:'',
                operation_dynamic_index:-1,
                music_url:'',
                menu_select_number:0,
            }
        },
        methods:{
            touchmove() {
                let c =1-(287+(this.$refs.slide.getBoundingClientRect().top))/239
                this.transparency = c
            },
            dynamic_details(){

            },
            share_music_play_or_stop(index,id){
                if (this.share_music_playing != index){
                    this.share_music_playing = index
                    let url = 'https://music.163.com/song/media/outer/url?id='+id+'.mp3'
                    if(this.$refs.audio.src != url ){
                        this.$refs.audio.src = 'https://music.163.com/song/media/outer/url?id='+id+'.mp3'
                        this.$emit("rest")
                        setTimeout(()=>{
                            this.$refs.audio.play()
                        },500)
                        this.$refs.audio.play()
                    }else {
                        this.$refs.audio.play()
                    }
                }else if (this.share_music_playing == index){
                    this.share_music_playing = -1
                    this.$refs.audio.pause()
                }

            },

            information_menu(data,index){
                this.operation_dynamic_id = data.id
                this.operation_dynamic_index = index

                this.information_menu_show = true
            },
            onSelect(){
                if (this.$route.params.id != this.$store.state.my_user_id){
                    Toast.success('已举报');
                }else {
                    ajax(
                        this.$store.state.api_url+'event/del',
                        {cookie:this.$store.state.user_cookie,evId:this.operation_dynamic_id}
                    ).then((res)=>{
                        console.log(res);
                        this.user_dynamic_data.splice(this.operation_dynamic_index,1)
                        Toast.success('已删除');

                    }).catch((err)=>{
                        console.log(err);
                        Toast.fail('发生错误')
                    })
                }


                this.information_menu_show = false
            },
            // 编辑用户
            edit_user(){
                this.$router.push('/user/compileuser')
            },
            // 关注用户
            follow_user(){
                // this.follows = 0
                let  id = this.$route.params.id
                ajax(
                    this.$store.state.api_url+'follow',
                    {cookie:this.$store.state.user_cookie,id:id,t:1}
                ).then((res)=>{
                    console.log(res);
                    this.follows = 0
                }).catch((err)=>{
                    console.log(err);
                    Toast.fail('发生错误')
                })
            },
            // 取消关注
            async no_follow_user(){
                // this.follows = -1
                let  id = this.$route.params.id
               await ajax(
                    this.$store.state.api_url+'follow',
                    {id:id,t:-1}
                ).then((res)=>{
                    console.log(res);
                    this.follows = -1
                }).catch((err)=>{
                    console.log(err);
                    Toast.fail('发生错误')
                })
            }
        },
        mounted() {
            if (this.$route.params.id != this.$store.state.my_user_id){
                this.options = [{name: '举报', icon: report_img,}]
            }else {
                this.options = [{name: '删除', icon: delete_img,}]
            }
            let id = this.$route.params.id
            Promise.all([
                ajax(
                    this.$store.state.api_url+'user/event',
                    {cookie:this.$store.state.user_cookie,uid:id}
                ),
                ajax(
                    // this.$store.state.api_url+'user/account',
                    this.$store.state.api_url+'user/detail',
                    {uid:id}
                )
            ]).then((res)=>{
                console.log(res[0])
                if (res[0].events.length == 0){
                    this.user_dynamic_data = []
                }else {
                    for (let i = 0;i<res[0].events.length;i++){
                        this.user_dynamic_data.push({
                            user_img:res[0].events[i].user.avatarUrl,
                            user_name:res[0].events[i].user.nickname,
                            user_content:JSON.parse(res[0].events[i].json),
                            user_share_img:res[0].events[i].pics,
                            user_share_info:res[0].events[i].info,
                            id:res[0].events[i].id
                        })
                    }
                }
                //获取动态内容

                // h获取用户信息
                this.user_dynamic_data.user_img = res[1].profile.avatarUrl
                this.user_dynamic_data.user_name = res[1].profile.nickname
                this.user_dynamic_data.user_birthday = res[1].profile.birthday
                this.user_dynamic_data.user_city = res[1].profile.city
                this.user_dynamic_data.user_signature = res[1].profile.signature
                this.user_dynamic_data.user_gender = res[1].profile.gender
            }).catch((err)=>{
                console.log(err)
            })
            // 查找已关注ID -1为未关注 其他为已关注
            this.follows = this.$store.state.concerned_users_id.findIndex(item=> item.follow == id);

            // let user_id_followed = this.$store.state.user_id_followed.findIndex(item =>item == id)
            // console.log(user_id_followed)

            let menu_select = ['home','video','information','user']
            let url_str = this.$route.path
            let url_arr = url_str.split('/');
            for (let i =0; i<url_arr.length;i++){
                for (let j =0;j<menu_select.length;j++ ){
                    if (url_arr[i] == menu_select[j]){
                        this.menu_select_number = j+1
                    }
                }
            }
        },
        setup(){
            // 时间戳转换成时间格式
            function formatDate(value) {
                let date = new Date(value);
                let y = date.getFullYear();// 年
                let MM = date.getMonth() + 1;// 月
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();// 日
                d = d < 10 ? ('0' + d) : d;
                var time = y + '年' + MM + '月' + d+'日';

                return time
            }

            return{
                formatDate
            }
        }

    }
</script>

<style scoped>
    .UserInformation{
        width: 100%;
        height: 100%;
        position: absolute;
        overflow-x: hidden;
        overflow-y: scroll;

    }
    .UserInformation::-webkit-scrollbar {
        display: none;/*隐藏滚动条*/
    }
    .xu{
        width: 100%;
        height: 5rem;
        position: fixed;
        z-index: 7;
        opacity:0;
        background: inherit;
        backdrop-filter: blur(30px); /* Chrome, Opera */


    }

    .user_details_box{
        width: 100%;
        height: 20rem;

    }
    .title{
        font-size: 20px;
        display: flex;
        /*align-items: center*/
        justify-content: center;
        margin-top: 3rem;
        color: white;
    }

    .blur{
        position: absolute;
        width:120%;
        height: 100%;
        z-index: -10;
        left: -3rem;
        top: -3rem;
        /*object-fit:cover;*/
        /*模糊程度*/
        -webkit-filter: blur(20px); /* Chrome, Opera */
        background: inherit;
        /*background:hsla(0,0%,0%,.25) border-box;*/
    }
    .user_dynamics_box{
        width: 100%;
        height: 90%;
        border-radius: 1.5rem;
        background-color: white;
        overflow-x: hidden; /*x轴禁止滚动*/
        overflow-y: scroll;/*y轴滚动*/
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .user_img{
        width: 6rem;
        height: 6rem;
        border-radius: 3rem;
        margin-top: 5rem;
        margin-left: 2rem;
    }
    .user_edit{
        position: absolute;
        right: 2rem;
        top: 10rem;
        width: 5rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .user_edit_bag{
        width: 100%;
        height: 100%;
        background-color: #C0C0C0;
        position: absolute;
        z-index: 1;
        opacity: 0.4;
        border-radius: 0.3rem;

    }
    .user_edit svg{
        z-index: 1;
    }
    .user_nickname{
        margin-left: 2rem;
        color: white;
        font-weight: bold;
        margin-right: 1rem;
    }
    .user_birthday{
        margin-left: 2rem;
        color: white;
        font-size: 18px;
    }
    .user_region{
        margin-left: 2rem;
        color: white;
        font-size: 18px;
    }
    .user_autograph{
        margin-left: 2rem;
        color: white;
        max-width: 90%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 17px;
    }
    .user_dynamics_title_box{
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .user_dynamic_body{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background-color: #F5F5F5;
    }
    .user_dynamic_body li{
        background-color: white;
        margin-bottom: 0.5rem;
    }

    .information_box{
        width: 100%;
        max-height: 25rem;
        position: relative;
        /*background-color: #409eff;*/
    }
    .information_box_head{
        width: 100%;
        height: 3.5rem;
        /*background-color: white;*/
        /*border:1px solid black;*/
        display: flex;
        align-items: center;
        /*position: absolute;*/
        z-index: 1;
    }
    .ID_user_avatar{
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        margin-left: 0.75rem;
        z-index: 1;

    }
    .ID_user_name{
        font-size: 18px;
        width: 75%;
        margin-left: 0.5rem;
        margin-right: 1rem;
        z-index: 1;
    }
    .information_svg{
        /*width: 1rem;*/
        /*height: 1rem;*/
    }
    .information_box_main_box{
        max-height: 13.25rem;
        display: flex;
        /*justify-content: center;*/
        flex-direction: column;
        align-items: center;
    }
    .information_box_main{
        width: 22rem;
        max-height: 13.25rem;
        overflow:hidden;
        background-color: white;
        display: flex;
        justify-content: center;

    }
    .information_box_main p{
        width: 21rem;
        max-height: 8rem;
        /*自动换行*/
        word-wrap:break-word;
        /*超出省略*/
        text-overflow:ellipsis;
        overflow:hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:6;

    }
    .audio_box{
        width: 80%;
        height: 4rem;
        background-color: #f4f4f4;
        display: flex;
        align-items: center;
        border-radius: 0.5rem;
        z-index: 2;
        margin-top: 1rem;
        margin-bottom: 1rem;
        position: relative;
        /*justify-content: space-around;*/

    }
    .audio_ico{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1rem;
        z-index: 1;
    }
    .share_music_pic{
        width: 3rem;
        height: 3rem;
        border-radius: 0.5rem;

    }
    .audio_playing{
        position: absolute;
        margin-left: 2rem;
        /*margin-top: 0.3rem;*/
        z-index: 2;
        opacity: 0.8;
    }
    .share_img_box{
        display: flex;
        justify-content: space-around;
        list-style: none;
    }
    .share_img{
        width: 6.25rem;
    }
    .share_song_name{
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        width: 10.5rem;
        font-size: 18px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }



    .user_dynamics_box_night{
        width: 100%;
        height: 90%;
        border-radius: 1.5rem;
        background-color: #222225;
        overflow-x: hidden; /*x轴禁止滚动*/
        overflow-y: scroll;/*y轴滚动*/
        position: relative;
        display: flex;
        flex-direction: column;
        color: white;
    }


    .user_dynamic_body_night{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background-color: #2B2B2B;
    }

    .user_dynamic_body_night li{
        background-color: #222225;
        margin-bottom: 0.5rem;
    }
    .information_box_main_night{
        width: 22rem;
        max-height: 13.25rem;
        overflow:hidden;
        background-color: #222225;
        display: flex;
        justify-content: center;

    }
    .information_menu_box{
        width: 1rem;
        height: 1.5rem;
    /*background-color: #39a9ed;*/
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>