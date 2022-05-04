<template>
  <div class="UserPage" :class="[$store.state.theme == 'night' ? 'UserPage_night':'']">
      <div class="Placeholder" style="height: 6.5rem;" v-if="$store.state.theme == 'white'"></div>
      <div class="Placeholder" style="height: 6.5rem;background-color: #2B2B2B" v-if="$store.state.theme == 'night'"></div>
<!--      已登录-->
      <div class="logged"  v-show="$store.state.user_cookie != undefined">

          <div class="User_box" :class="[$store.state.theme == 'night' ? 'User_box_night':'']">
              <div class="User_data_box" :class="[$store.state.theme == 'night' ? 'User_data_box_night':'']">
                  <img :src="account_img" class="User_image" v-if="account_img != ''">
                  <div class="User_name_box">
                      <span v-if="account_name != ''" class="User_name">{{ account_name }}</span>
                      <!--             性别-->
<!--                      女-->
                      <svg v-show="account_gender == 2" xmlns="http://www.w3.org/2000/svg" width="0.72rem" height="0.72rem" viewBox="0 0 14.621 14.622">
                          <path id="Icon_ionic-ios-female" data-name="Icon ionic-ios-female" d="M3.854,18a.468.468,0,0,0,.338-.141l1.575-1.575,1.3,1.3a.474.474,0,0,0,.338.141.468.468,0,0,0,.338-.141.477.477,0,0,0,0-.675l-1.3-1.3L8.2,13.855a5.943,5.943,0,1,0-.675-.675L5.767,14.938l-1.3-1.3a.474.474,0,0,0-.338-.141.468.468,0,0,0-.338.141.477.477,0,0,0,0,.675l1.3,1.3L3.517,17.188A.478.478,0,0,0,3.854,18ZM8.526,5.8A4.986,4.986,0,1,1,7.067,9.324,4.963,4.963,0,0,1,8.526,5.8Z" transform="translate(-3.377 -3.382)" fill="#ff6dc0"/>
                      </svg>
<!--                      男-->
                      <svg v-show="account_gender == 1" xmlns="http://www.w3.org/2000/svg" width="0.72rem" height="0.72rem" viewBox="0 0 14.724 14.728">
                          <path id="Icon_ionic-ios-male" data-name="Icon ionic-ios-male" d="M17.621,3.375H13.766a.481.481,0,0,0,0,.963h2.669L13.242,7.553a6.023,6.023,0,1,0,.68.683l3.215-3.2V7.708a.481.481,0,0,0,.963,0V3.856A.477.477,0,0,0,17.621,3.375Zm-3.236,8.741a5.028,5.028,0,1,1-1.473-3.551A4.989,4.989,0,0,1,14.385,12.116Z" transform="translate(-3.375 -3.375)" fill="#5ab4f0"/>
                      </svg>
                  </div>
              </div>
          </div>

    <!--      动态，关注，编辑-->
          <div class="dpe_box" :class="[$store.state.theme == 'night' ? 'dpe_box_night':'']">
                  <div class="dpe_box_in" @click="user_dynamic">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29.984" viewBox="0 0 30 29.984">
                          <g id="组_34" data-name="组 34" transform="translate(0)">
                              <path id="路径_253" data-name="路径 253" d="M2.324,290.335l1.587-1.587c-1.095-.627-1.706-1.293-1.706-1.864,0-1.674,5.014-4.109,12.867-4.109h.563l2.118-2.15c-.888-.063-1.793-.1-2.681-.1C7.766,280.522,0,282.744,0,286.869a4.362,4.362,0,0,0,2.324,3.467Z" transform="translate(0 -272.33)" fill="#a5a5a5"/>
                              <path id="路径_254" data-name="路径 254" d="M313.768,2.194c1.658,0,4.022,4.363,4.323,11.331l2.38-.584C320.011,6.312,317.734,0,313.768,0c-2.991,0-5.037,3.614-6.029,8.222l2.57-.639c.881-3.409,2.316-5.389,3.459-5.389Zm3.641,19.379c-.888,3.945-2.459,6.218-3.665,6.218s-2.705-2.209-3.6-5.973l-2.285.568c1.039,4.3,3.038,7.6,5.91,7.6,3.173,0,5.267-4.048,6.2-9.043Z" transform="translate(-298.764)" fill="#a5a5a5"/>
                              <path id="路径_255" data-name="路径 255" d="M147.045,388l3.4-5.886h-6.8Zm-16.35.627,4.752,4.863,1.84-6.545-6.592,1.682Z" transform="translate(-126.848 -370.962)" fill="#a5a5a5"/>
                              <path id="路径_256" data-name="路径 256" d="M271.64,361.634,270,363.3c1.587.738,2.5,1.587,2.5,2.277,0,1.674-5.014,4.109-12.867,4.109a32.834,32.834,0,0,1-5.823-.5l-1.848,1.872a33.945,33.945,0,0,0,7.671.857c7.306,0,15.073-2.221,15.073-6.346C274.7,363.958,273.512,362.641,271.64,361.634Z" transform="translate(-244.702 -351.074)" fill="#a5a5a5"/>
                          </g>
                      </svg>
                      <span class="words">动态</span>
                  </div>
                  <div class="dpe_box_in" @click="concerned_singer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29.996" viewBox="0 0 30 29.996">
                          <path id="路径_262" data-name="路径 262" d="M115.471,101l-2.112,2.1a.085.085,0,0,1,.02.013l-1.105,1.085a2.266,2.266,0,1,0,1.288,1.287l2.468-2.468h0l.727-.726,4.41.67,5.3-5.3-5.547-.794-2.59,2.579-.007-.006,2.621-2.619L120.1,91.3l-5.3,5.3Zm6.082,3.131-.469.588a7.543,7.543,0,0,1,.135,1.575,9.588,9.588,0,1,1-8.407-9.677l4.278-4.222a15.012,15.012,0,1,0,8.274,8.264Zm-10.084-1.562a3.822,3.822,0,0,1,.684.068l1.937-1.943-.358-2.349a8.31,8.31,0,1,0,5.727,5.841l-2.417-.493-1.916,1.918a3.724,3.724,0,1,1-3.658-3.041Z" transform="translate(-96.469 -91.296)" fill="#a5a5a5"/>
                      </svg>

                      <span>关注</span>
                  </div>
                  <div class="dpe_box_in" @click="compile_user">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29.667" viewBox="0 0 30 29.667">
                          <g id="组_35" data-name="组 35" transform="translate(-50.895 -60.712)">
                              <path id="路径_257" data-name="路径 257" d="M75.219,313.723v.666h5.011v20.119H51.561V314.389h7.579v-.666H50.895v21.451h30V313.723Z" transform="translate(0 -244.795)" fill="#b0b0b0"/>
                              <path id="路径_258" data-name="路径 258" d="M339.333,880.513H340.8v1.467h-1.467Z" transform="translate(-279.063 -793.154)" fill="#b0b0b0"/>
                              <path id="路径_259" data-name="路径 259" d="M640.119,880.513h1.474v1.467h-1.474Z" transform="translate(-570.073 -793.154)" fill="#b0b0b0"/>
                              <path id="路径_260" data-name="路径 260" d="M489.837,880.513H491.3v1.467h-1.467Z" transform="translate(-424.676 -793.154)" fill="#b0b0b0"/>
                              <path id="路径_261" data-name="路径 261" d="M213.808,77.665a1.939,1.939,0,0,0-.184.366,48.266,48.266,0,0,0-2.3,5.849,8.017,8.017,0,0,0-.184,1.234c1.035-1.289,3.749-6.481,4.106-6.864,1.053-1.131,6.617-10.02,7.838-10.866-.555,1.545-7.549,12.833-7.717,13.092,5.267,1.154,7.549-1.8,7.855-2.056l-2.32-.411,2.825-.845A10.339,10.339,0,0,0,226.1,72.3c-.214.076-2.465.739-2.848.845l3.078-1.668a32.857,32.857,0,0,0,1.906-10.761c-.827.061-9.214,2.529-14.47,16.4a.724.724,0,0,0,.046.548Z" transform="translate(-155.035)" fill="#b0b0b0"/>
                          </g>
                      </svg>
                      <span>编辑资料</span>
                  </div>
          </div>
      </div>

<!--      未登录-->
      <div class="not_logged" v-show="$store.state.user_cookie == undefined" :class="[$store.state.theme == 'night' ? 'not_logged_night':'']">
<!--          <div class="grey_box"></div>-->

          <div class="log_box" @click="go_login" :class="[$store.state.theme == 'night' ? 'log_box_night':'']">
              <svg id="组_31" data-name="组 31" xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49">
                  <path id="路径_234" data-name="路径 234" d="M49,26.031A22.969,22.969,0,0,1,26.031,49H22.969A22.968,22.968,0,0,1,0,26.031V22.969A22.969,22.969,0,0,1,22.969,0h3.063A22.97,22.97,0,0,1,49,22.969Z" fill="#5ab4f0"/>
                  <path id="路径_235" data-name="路径 235" d="M305.775,160a10.382,10.382,0,1,0,10.385,10.383A10.4,10.4,0,0,0,305.775,160Z" transform="translate(-281.274 -152.353)" fill="#fff"/>
                  <path id="路径_236" data-name="路径 236" d="M211.533,588.256a12.666,12.666,0,0,1-15.967,0,16.6,16.6,0,0,0-7.5,12.8,60.861,60.861,0,0,0,7.8.414h15.373a60.609,60.609,0,0,0,7.8-.416A16.581,16.581,0,0,0,211.533,588.256Z" transform="translate(-179.05 -560.124)" fill="#fff"/>
              </svg>
              <span>立即登录专享推荐</span>
          </div>

          <div class="dpe_box" :class="[$store.state.theme == 'night' ? 'dpe_box_night':'']">
              <div class="dpe_box_in" @click="go_login_">
                  <!--                      <span class="number">0</span>-->
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29.984" viewBox="0 0 30 29.984">
                      <g id="组_34" data-name="组 34" transform="translate(0)">
                          <path id="路径_253" data-name="路径 253" d="M2.324,290.335l1.587-1.587c-1.095-.627-1.706-1.293-1.706-1.864,0-1.674,5.014-4.109,12.867-4.109h.563l2.118-2.15c-.888-.063-1.793-.1-2.681-.1C7.766,280.522,0,282.744,0,286.869a4.362,4.362,0,0,0,2.324,3.467Z" transform="translate(0 -272.33)" fill="#a5a5a5"/>
                          <path id="路径_254" data-name="路径 254" d="M313.768,2.194c1.658,0,4.022,4.363,4.323,11.331l2.38-.584C320.011,6.312,317.734,0,313.768,0c-2.991,0-5.037,3.614-6.029,8.222l2.57-.639c.881-3.409,2.316-5.389,3.459-5.389Zm3.641,19.379c-.888,3.945-2.459,6.218-3.665,6.218s-2.705-2.209-3.6-5.973l-2.285.568c1.039,4.3,3.038,7.6,5.91,7.6,3.173,0,5.267-4.048,6.2-9.043Z" transform="translate(-298.764)" fill="#a5a5a5"/>
                          <path id="路径_255" data-name="路径 255" d="M147.045,388l3.4-5.886h-6.8Zm-16.35.627,4.752,4.863,1.84-6.545-6.592,1.682Z" transform="translate(-126.848 -370.962)" fill="#a5a5a5"/>
                          <path id="路径_256" data-name="路径 256" d="M271.64,361.634,270,363.3c1.587.738,2.5,1.587,2.5,2.277,0,1.674-5.014,4.109-12.867,4.109a32.834,32.834,0,0,1-5.823-.5l-1.848,1.872a33.945,33.945,0,0,0,7.671.857c7.306,0,15.073-2.221,15.073-6.346C274.7,363.958,273.512,362.641,271.64,361.634Z" transform="translate(-244.702 -351.074)" fill="#a5a5a5"/>
                      </g>
                  </svg>
                  <span class="words">动态</span>
              </div>
              <div class="dpe_box_in" @click="go_login_">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29.996" viewBox="0 0 30 29.996">
                      <path id="路径_262" data-name="路径 262" d="M115.471,101l-2.112,2.1a.085.085,0,0,1,.02.013l-1.105,1.085a2.266,2.266,0,1,0,1.288,1.287l2.468-2.468h0l.727-.726,4.41.67,5.3-5.3-5.547-.794-2.59,2.579-.007-.006,2.621-2.619L120.1,91.3l-5.3,5.3Zm6.082,3.131-.469.588a7.543,7.543,0,0,1,.135,1.575,9.588,9.588,0,1,1-8.407-9.677l4.278-4.222a15.012,15.012,0,1,0,8.274,8.264Zm-10.084-1.562a3.822,3.822,0,0,1,.684.068l1.937-1.943-.358-2.349a8.31,8.31,0,1,0,5.727,5.841l-2.417-.493-1.916,1.918a3.724,3.724,0,1,1-3.658-3.041Z" transform="translate(-96.469 -91.296)" fill="#a5a5a5"/>
                  </svg>

                  <span>关注</span>
              </div>
          </div>
      </div>
<!--      设置-->
        <div class="settings" :class="[$store.state.theme == 'night' ? 'settings_night':'']">
            <!--  最近播放-->
            <div class="settings_in" @click="recently_played">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" viewBox="0 0 24.988 24.918">
                    <g id="组_32" data-name="组 32" transform="translate(-92.253 -79.616)">
                        <path id="路径_238" data-name="路径 238" d="M104.708,79.616a12.459,12.459,0,1,0,12.463,12.46,12.459,12.459,0,0,0-12.463-12.46Zm0,18.688a6.229,6.229,0,1,1,6.232-6.23,6.229,6.229,0,0,1-6.232,6.23Z" fill="#727272"/>
                        <path id="路径_239" data-name="路径 239" d="M435.8,431.707m-2.224,0a2.224,2.224,0,1,0,2.224-2.224,2.224,2.224,0,0,0-2.224,2.224Z" transform="translate(-331.1 -339.376)" fill="#727272"/>
                        <path id="路径_240" data-name="路径 240" d="M480.09,546.133l-6.642,6.635h-4.422c-.056-.32-.222-.556-.425-.556s-.369.236-.425.556h-.465v.222h.445c0,.429.2.779.445.779s.445-.349.445-.779h4.491l6.7-6.706Z" transform="translate(-362.996 -451.682)" fill="#fff"/>
                    </g>
                </svg>
                <span>最近播放</span>
            </div>
            <div class="hr_grey" :class="[$store.state.theme == 'night' ? 'hr_grey_night':'']"></div>
            <!--  我的收藏-->
            <div class="settings_in" @click="my_collection">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" viewBox="0 0 22.218 21.296">
                    <path id="_收藏2小" d="M6.135,13.28,2.181,8.756,8.036,7.423l3.074-5.16,3.073,5.162,5.854,1.332-3.955,4.524.592,6.526a.926.926,0,0,0,1.844-.168L18,13.9l3.789-4.333a1.469,1.469,0,0,0-.812-2.5L15.366,5.8,12.422.848A1.468,1.468,0,0,0,9.8.848L6.851,5.794,1.243,7.07a1.47,1.47,0,0,0-.812,2.5L4.22,13.9,3.7,19.638a1.467,1.467,0,0,0,2.124,1.543l5.652-2.425a.926.926,0,1,0-.731-1.7L5.592,19.266l.543-5.986Z" transform="translate(0 -0.036)" fill="#727272"/>
                </svg>

                <span>我的收藏</span>
            </div>
            <div class="hr_grey" :class="[$store.state.theme == 'night' ? 'hr_grey_night':'']"></div>

<!--            设置-->
            <div class="settings_in" @click="my_setup">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" viewBox="0 0 21.419 21.922">
                    <path id="Icon_material-settings" data-name="Icon material-settings" d="M21.356,14.486a7.213,7.213,0,0,0,0-2.05l2.207-1.726a.528.528,0,0,0,.126-.67L21.6,6.421a.526.526,0,0,0-.638-.23l-2.6,1.046a7.643,7.643,0,0,0-1.768-1.025l-.4-2.772A.51.51,0,0,0,15.676,3H11.492a.51.51,0,0,0-.513.439l-.4,2.772A8.037,8.037,0,0,0,8.814,7.237l-2.6-1.046a.51.51,0,0,0-.638.23L3.479,10.04a.516.516,0,0,0,.126.67l2.207,1.726a8.3,8.3,0,0,0-.073,1.025,8.3,8.3,0,0,0,.073,1.025L3.6,16.212a.528.528,0,0,0-.126.67L5.571,20.5a.526.526,0,0,0,.638.23l2.6-1.046a7.643,7.643,0,0,0,1.768,1.025l.4,2.772a.51.51,0,0,0,.513.439h4.184a.51.51,0,0,0,.513-.439l.4-2.772a8.037,8.037,0,0,0,1.768-1.025l2.6,1.046a.51.51,0,0,0,.638-.23l2.092-3.619a.528.528,0,0,0-.126-.67l-2.207-1.726Zm-7.772,2.636a3.661,3.661,0,1,1,3.661-3.661A3.665,3.665,0,0,1,13.584,17.122Z" transform="translate(-2.87 -2.5)" fill="none" stroke="#727272" stroke-width="1"/>
                </svg>
                <span>设置</span>
            </div>
            <div class="hr_grey" :class="[$store.state.theme == 'night' ? 'hr_grey_night':'']"></div>
<!--            退出-->
            <div class="settings_in" @click="my_signout">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" viewBox="0 0 22.769 22.769">
                    <path id="Icon_material-power-settings-new" data-name="Icon material-power-settings-new" d="M17.149,4.5H14.62V17.149h2.53Zm6.11,2.745-1.8,1.8a8.754,8.754,0,0,1,3.276,6.843A8.855,8.855,0,1,1,10.293,9.029L8.51,7.245a11.374,11.374,0,1,0,18.759,8.64A11.3,11.3,0,0,0,23.259,7.245Z" transform="translate(-4.5 -4.5)" fill="#727272"/>
                </svg>

                <span>退出</span>
            </div>

<!--            <button @click="kk">+++</button>-->
            <div class="hr_grey" :class="[$store.state.theme == 'night' ? 'hr_grey_night':'']"></div>
        </div>

      <div style="position: fixed;bottom: 0;z-index: 9;width: 100%">
          <Menu1 :menu_show="4"></Menu1>
      </div>

  </div>
</template>

<script>
    import { Dialog } from 'vant';
    import Menu1 from "../../components/Menu1";
    import ajax from '../../http/index'
    export default {
        name: "UserPage",
        components:{Menu1},
        data() {
            return{
                account_img:'',
                account_name: '',
                account_gender:0,
                account_id:'',
                favorite_song_list_id:'0'
            }
        },
        methods:{
            kk(){
                console.log(this.$store.state.favorite_singer_id)
            },
            kkp(){
                // console.log(this.$refs.User_data_box.offsetHeight)
                console.log(this.$store.state.user_cookie)
                console.log(this.account_img)
                console.log(this.account_name)
                console.log(this.account_gender)
                ajax(
                    // this.$store.state.api_url+'user/subcount',
                    this.$store.state.api_url+'record/recent/song',
                    {cookie:this.$store.state.user_cookie},
                    'post'
                ).then((res)=>{
                    console.log(res);
                    // this.account_name = res.profile.nickname
                    // this.account_img = res.profile.avatarUrl
                    // this.account_gender = res.profile.gender

                }).catch((err)=>{
                    console.log(err);
                })
            },
            // 最近播放
            recently_played(){
                this.$store.commit('advance')
                this.$router.push('/user/recentlyplayed')

            },
            // 我的收藏
            my_collection(){
                this.$store.commit('advance')
                this.$router.push({path:`/user/localmusic/${this.favorite_song_list_id}`})
            },
            // 设置
            my_setup(){
                this.$store.commit('advance')
                this.$router.push('/user/setup')
            },
            // 登录
            my_signout(){
                this.$store.commit('delete_user_cookie')
                ajax(
                    this.$store.state.api_url+'logout'
                ).then((res)=>{
                    console.log(res);

                }).catch((err)=>{
                    console.log(err);
                })
            },
            // 去登录
            go_login(){
                    this.$router.replace('/login')
            },
            go_login_(){
                Dialog.alert({
                    message: '请先登录账号',
                }).then(() => {
                    this.$router.replace('/login')
                });

            },
            // 用户动态
            user_dynamic(){
                this.$store.commit('advance')
                this.$router.push(`/user/userdynamic/${this.account_id}`)
            },
            // 关注歌手
            concerned_singer(){
                this.$store.commit('advance')
                this.$router.push(`/user/concernedsinger/${this.account_id}`)
            },
            // 编辑用户资料
            compile_user(){
                this.$store.commit('advance')
                this.$router.push('/user/compileuser')
            }
        },
        mounted() {
            // 获取用户信息
            ajax(
                this.$store.state.api_url+'user/account',
                {cookie:this.$store.state.user_cookie}
            ).then((res)=>{
                console.log(res);
                this.account_name = res.profile.nickname
                this.account_img = res.profile.avatarUrl
                this.account_gender = res.profile.gender
                this.account_id = res.account.id
                // this.$store.column('get_my_user_id',res.account.id)
                this.$store.commit('get_my_user_id',res.account.id)

            }).catch((err)=>{
                console.log(err);
            })

        },
        watch:{
            // 监听对象favorite_song_list_id变化
            account_id(){
                if (this.account_id !=''){
                    Promise.all([
                        ajax(
                            this.$store.state.api_url+'user/playlist',
                            {cookie:this.$store.state.user_cookie,uid:this.account_id}
                        ),
                        ajax(
                            this.$store.state.api_url+'user/follows',
                            {uid:this.account_id}
                        ),
                        ajax(
                            this.$store.state.api_url+'artist/sublist',
                            {cookie:this.$store.state.user_cookie}
                        )
                        // ajax(
                        //     this.$store.state.api_url+'user/follows',
                        //     {uid:this.account_id,cookie:this.$store.state.user_cookie}
                        // )
                    ]).then((res)=>{
                        this.favorite_song_list_id = res[0].playlist[0].id
                        this.$store.commit('get_subscrib_song_id',this.favorite_song_list_id)

                        let arr = []
                        for (let i = 0; i<res[1].follow.length;i++){
                            arr.push({
                                follow:res[1].follow[i].userId
                            })
                        }
                        this.$store.commit('get_concerned_users_id',arr)

                        //收藏歌单id
                        let singer_arr = []
                        console.log(res[2])
                        for (let i = 0; i<res[2].data.length; i++){
                            singer_arr.push({
                                id:res[2].data[i].id
                            })
                        }
                        this.$store.commit('get_favorite_singer_id',singer_arr)
                        // let follow_arr = []
                        // for (let i = 0; i<res[2].follow.length;i++){
                        //     follow_arr.push(res[2].follow[i].userId)  ;
                        // }
                        // this.$store.commit('get_user_id_followed',follow_arr)
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            },
            favorite_song_list_id(){
                ajax(
                    this.$store.state.api_url+'playlist/detail',
                    {cookie:this.$store.state.user_cookie,id:this.favorite_song_list_id},
                    'post'
                ).then((res)=>{
                   console.log(res);
                   let arr = []
                   for (let i = 0; i<res.privileges.length;i++){
                       arr.push({
                           song_id:res.privileges[i].id,
                       })
                   }
                   this.$store.commit('get_user_collected_song_id',arr)
               }).catch((err)=>{
                   console.log(err);
               })
            }

        }

    }
</script>

<style scoped>
.UserPage{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    /*background-color: #f4f4f4;*/
    background-color: #FAFAFA;
}
.User_box{
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*background-color: white;*/
}
    .User_image{
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 2rem;
        margin-left: 2rem;
    }
    .User_name_box svg{
        /*margin-top: 0.5rem;*/
        margin-left: 1rem;
    }

    .User_name{

        font-size: 20px;
        margin-left: 1rem;

    }
    .dpe_box{
        width: 94%;
        height: 8rem;
        display: flex;
        justify-content: space-around;
        border-radius: 0.75rem;
        background-color: white;
        margin-top: 1rem;

    }
    .dpe_box_in{
        display: flex;
        height: 3rem;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #333333;
        margin-top: 2rem;
    }
    .number{
        font-size: 20px;
    }
    .words{
        font-size: 15px;
    }
    .settings{
        width: 100%;
        margin-top: 0.5rem;
        background-color: white;

    }
    .hr_grey{
        width: 90%;
        height: 0.2rem;
        /*height: 2px;*/
        background-color: #f4f4f4;
        float: right;

    }
    .settings_in{
        width: 100%;
        height: 3rem;
        display: flex;
        flex-direction: row;
        align-items: center;

    }
    .settings_in svg{
        margin-left: 1.25rem;
    }
    .settings_in span{
        font-size: 18px;
        margin-left: 1rem;

    }

.UserPageHead{
    position: fixed;
    top: 0;
    width: 100%;
    height: 5.5rem;
    background-color: white;
    z-index: 999;
    display: flex;
}
.UP_title{
    margin-top: 3rem;
    margin-left: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;


}
.UP_title span{
    color: #5AB4F0;
    font-size: 23px;
    font-weight: bold;
}
.line{
    margin-top: -5px;
}
    .not_logged{
        width: 100%;
        height: 14.5rem;
        /*background-color: white;*/
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    .logged{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .User_data_box{
        width: 92%;
        height: 8rem;
        /*阴影*/
        /*-webkit-box-shadow: #DDDDDD 0px 0px 10px;*/
        /*-moz-box-shadow: #DDDDDD 0px 0px 10px;*/
        /*box-shadow: #DDDDDD 0px 0px 10px;*/
        background-color: white;
        border-radius: 1rem;
        display: flex;
        align-items: center;
    }
    .log_box{
        width: 94%;
        height: 6rem;
        background-color: white;
        border-radius: 0.75rem;
        display: flex;
        /*justify-content: center;*/
        align-items: center;
    }
    .log_box svg{
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .log_box_icon{
        margin-left: 2rem;
    }
    .log_box_p span{
        font-size: 20px;
        font-weight: bold;
        margin-left: 1rem;
    }


    .UserPage_night{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: #2B2B2B;
        color: white;
    }

.User_box_night{
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2B2B2B;
}


    .User_data_box_night{
        width: 92%;
        height: 8rem;
        /*阴影*/
        background-color: #222225;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
    }

.dpe_box_night{
    width: 100%;
    height: 8rem;
    display: flex;
    justify-content: space-around;
    background-color: #222225;

}

    .settings_night{
        width: 100%;
        margin-top: 0.5rem;
        background-color: #222225;

    }
    .hr_grey_night{
        width: 90%;
        height: 0.2rem;
        /*height: 2px;*/
        background-color: #2B2B2B;
        float: right;

    }

    .not_logged_night{
        width: 100%;
        height: 14.5rem;
        /*background-color: white;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
    }

.log_box_night{
    width: 94%;
    height: 6rem;
    background-color: #222225;
    border-radius: 0.75rem;
    display: flex;
    /*justify-content: center;*/
    align-items: center;
}
.log_box_night svg{
    margin-left: 1rem;
    margin-right: 1rem;
}


</style>