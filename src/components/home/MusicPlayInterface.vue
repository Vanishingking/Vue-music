<template>
    <div  class="Hover_player_box" v-if="$store.state.music_play_id!=null">
        <!--            虚化背景-->
        <img :src="Background_map" class="blur"  >
        <div class="Hover_player_body">
            <!--专辑图片-->
            <div class="Song_cover">
              <img :src="Background_map" ref="song_cover" crossorigin="anonymous">
<!--              <img src="../../../public/img/fire.jpg" ref="imgg">-->
            </div>
            <div class="song_name_box">
            <span>{{ music_name }}</span>
            </div>
            <!--评论 收藏 下载-->
            <div class="ccd_box">
                <!--评论-->
                <svg  @click="song_comment" xmlns="http://www.w3.org/2000/svg" width="26" height="22.748" viewBox="0 0 26 22.748">
                    <g id="组_29" data-name="组 29" transform="translate(-35.328 -94.72)">
                        <path id="路径_210" data-name="路径 210" d="M184.434,257.442a.673.673,0,0,1-.626-.625v-4.791a2.121,2.121,0,0,1,2.169-2.169h8.677a.673.673,0,0,1,.626.626.415.415,0,0,1-.466.466h-8.824a1.04,1.04,0,0,0-.932,1.091V257C185.059,257.3,184.74,257.442,184.434,257.442Z" transform="translate(-144.271 -150.802)" fill="#fff"/>
                        <path id="路径_211" data-name="路径 211" d="M50.428,117.468a1.518,1.518,0,0,1-1.144-.488l-2.931-2.763H41.818a2.224,2.224,0,0,1-2.275-2.275v-2.931H37.435a2.182,2.182,0,0,1-2.107-2.275V96.827a2.142,2.142,0,0,1,2.107-2.107h14.3a2.321,2.321,0,0,1,2.275,2.275V99.1h5.038a2,2,0,0,1,2.275,2.107v10.565a2.224,2.224,0,0,1-2.275,2.275H54.5l-2.931,3.084a2.694,2.694,0,0,1-1.144.335ZM37.435,95.851a.908.908,0,0,0-.809.977v9.909c0,.656.321.977.809.977h2.6a.705.705,0,0,1,.656.656v3.419a1.115,1.115,0,0,0,1.144,1.144H46.7a.588.588,0,0,1,.488.167l3.084,3.084a.3.3,0,0,0,.488,0l3.084-3.084a.588.588,0,0,1,.488-.167h4.871a1.115,1.115,0,0,0,1.144-1.144V101.224a1.115,1.115,0,0,0-1.144-1.144H53.513a.705.705,0,0,1-.656-.656v-2.6a1.051,1.051,0,0,0-.977-.977Z" fill="#fff"/>
                        <path id="路径_212" data-name="路径 212" d="M312.318,524.4a.673.673,0,0,1-.626.626H297.585a.626.626,0,1,1,0-1.251h14.254C312.158,523.776,312.318,524.1,312.318,524.4Z" transform="translate(-253.625 -417.328)" fill="#fff"/>
                    </g>
                </svg>
                <!--未收藏-->
                <svg v-if="subscribed_already_of_not == -1" @click="subscribed" xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.675rem" viewBox="0 0 38.004 33.505">
                    <path id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M32.505,4.4a9.615,9.615,0,0,0-13.12.956L18,6.785,16.615,5.358A9.615,9.615,0,0,0,3.495,4.4,10.1,10.1,0,0,0,2.8,19.02L16.4,33.068a2.2,2.2,0,0,0,3.185,0L33.195,19.02A10.09,10.09,0,0,0,32.505,4.4Z" transform="translate(1.003 -1.244)" fill="none" stroke="#ffffff" stroke-width="2"/>
                </svg>
    <!--            已收藏-->
                <svg v-else @click="no_subscribed" xmlns="http://www.w3.org/2000/svg" width="36.001" height="31.501" viewBox="0 0 36.001 31.501">
                    <path id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M32.505,4.4a9.615,9.615,0,0,0-13.12.956L18,6.785,16.615,5.358A9.615,9.615,0,0,0,3.495,4.4,10.1,10.1,0,0,0,2.8,19.02L16.4,33.068a2.2,2.2,0,0,0,3.185,0L33.195,19.02A10.09,10.09,0,0,0,32.505,4.4Z" transform="translate(0.001 -2.248)" fill="#f05a5a"/>
                </svg>

                <!--下载-->
                <svg @click="kk" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 30 30">
                    <g id="Icon_feather-download" data-name="Icon feather-download" transform="translate(-3 -3)">
                        <path  d="M31.5,22.5v6a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3v-6" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        <path  d="M10.5,15,18,22.5,25.5,15" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        <path  d="M18,22.5V4.5" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    </g>
                </svg>
            </div>
        </div>

        <div class="Hover_player_tail">
            <!--歌曲进度条-->
            <div class="progress">
                <!--                歌曲播放实时时间-->
                <span class="Real_time">{{ music.Played_time }}</span>
                <div class="slider">
                    <van-slider v-model="slider_Time" active-color="#409eff" @change="changeCurrentTime">
                        <template #button>
                            <div class="custom-button"></div>
                        </template>
                    </van-slider>
                </div>
                <!--                歌曲总时间-->
                <span class="Total_time">{{ music.Total_time }}</span>
            </div>
            <!--            播放按钮-->
            <div class="music_assembly">
                <!--                列表循环-->
                <svg  v-show="playback_mode == 0" @click="playback_mode_select" xmlns="http://www.w3.org/2000/svg" width="27" height="19.115" viewBox="0 0 27 19.115">
                    <g id="Icon_ionic-ios-repeat" data-name="Icon ionic-ios-repeat" transform="translate(-4.5 -8.439)">
                        <path d="M23.667,11.074,21.3,8.726a.985.985,0,0,0-.956-.253.84.84,0,0,0-.246.105.981.981,0,0,0-.478.921,1.031,1.031,0,0,0,.3.64l1.125,1.118H9.984A5.5,5.5,0,0,0,4.5,16.734v1.125a.987.987,0,0,0,.984.984h0a.987.987,0,0,0,.984-.984V16.734a3.529,3.529,0,0,1,3.516-3.516H20.911l-1.125,1.118a1,1,0,0,0-.3.612.991.991,0,0,0,.984,1.083.973.973,0,0,0,.7-.288l2.5-2.489a1.521,1.521,0,0,0,.457-1.09A1.568,1.568,0,0,0,23.667,11.074Z" fill="#BBBBBB"/>
                        <path d="M30.516,17.156h0a.987.987,0,0,0-.984.984v1.125a3.529,3.529,0,0,1-3.516,3.516H15.089l1.125-1.118a1,1,0,0,0,.3-.619.991.991,0,0,0-.984-1.083.973.973,0,0,0-.7.288l-2.5,2.489a1.528,1.528,0,0,0,0,2.18L14.7,27.267a.985.985,0,0,0,.956.253.84.84,0,0,0,.246-.105.981.981,0,0,0,.478-.921,1.031,1.031,0,0,0-.3-.64l-1.125-1.118H26.016A5.491,5.491,0,0,0,31.5,19.252V18.127A.984.984,0,0,0,30.516,17.156Z" fill="#BBBBBB"/>
                    </g>
                </svg>
                <!--                单曲循环-->
                <svg v-show="playback_mode == 1" @click="playback_mode_select" xmlns="http://www.w3.org/2000/svg" width="27" height="19.115" viewBox="0 0 27 19.115">
                    <g id="Icon_ionic-ios-repeat" data-name="Icon ionic-ios-repeat" transform="translate(-4.5 -8.439)">
                        <path d="M23.667,11.074,21.3,8.726a.985.985,0,0,0-.956-.253.84.84,0,0,0-.246.105.981.981,0,0,0-.478.921,1.031,1.031,0,0,0,.3.64l1.125,1.118H9.984A5.5,5.5,0,0,0,4.5,16.734v1.125a.987.987,0,0,0,.984.984h0a.987.987,0,0,0,.984-.984V16.734a3.529,3.529,0,0,1,3.516-3.516H20.911l-1.125,1.118a1,1,0,0,0-.3.612.991.991,0,0,0,.984,1.083.973.973,0,0,0,.7-.288l2.5-2.489a1.521,1.521,0,0,0,.457-1.09A1.568,1.568,0,0,0,23.667,11.074Z" fill="#BBBBBB"/>
                        <path d="M30.516,17.156h0a.987.987,0,0,0-.984.984v1.125a3.529,3.529,0,0,1-3.516,3.516H15.089l1.125-1.118a1,1,0,0,0,.3-.619.991.991,0,0,0-.984-1.083.973.973,0,0,0-.7.288l-2.5,2.489a1.528,1.528,0,0,0,0,2.18L14.7,27.267a.985.985,0,0,0,.956.253.84.84,0,0,0,.246-.105.981.981,0,0,0,.478-.921,1.031,1.031,0,0,0-.3-.64l-1.125-1.118H26.016A5.491,5.491,0,0,0,31.5,19.252V18.127A.984.984,0,0,0,30.516,17.156Z" fill="#BBBBBB"/>
                    </g>
                    <path id="Icon_material-repeat-one" data-name="Icon material-repeat-one" d="M21.15,17.014Zm-3.514,1.757V13.5h-.879L15,14.379v.879h1.318v3.514Z" transform="translate(-3.25 -5.943)" fill="#BBBBBB"/>
                </svg>
                <!--                随机播放-->
                <svg v-show="playback_mode == 2" @click="playback_mode_select" xmlns="http://www.w3.org/2000/svg" width="27" height="19.125" viewBox="0 0 27 19.125">
                    <g id="Icon_ionic-ios-shuffle" data-name="Icon ionic-ios-shuffle" transform="translate(-4.5 -8.445)">
                        <path d="M28.54,20.257a.99.99,0,0,0-.7-.288.973.973,0,0,0-.7.288.961.961,0,0,0-.288.7,1,1,0,0,0,.288.7l1.146,1.139H22.985l-8.719-10.9-.007-.007a1.009,1.009,0,0,0-.759-.352H5.484a.984.984,0,0,0,0,1.969h7.552l3.691,4.641-3.691,4.641H5.484a.984.984,0,0,0,0,1.969H13.5a.982.982,0,0,0,.752-.352l.007-.007L18,19.695l3.741,4.7.007.007a.982.982,0,0,0,.752.352h5.934l-1.146,1.139a.95.95,0,0,0-.288.7,1,1,0,0,0,.288.7.99.99,0,0,0,.7.288.973.973,0,0,0,.7-.288l2.362-2.348a1.528,1.528,0,0,0,0-2.18Z" fill="#BBBBBB"/>
                        <path d="M19.645,16.552a.4.4,0,0,0,.323.148h.007a.41.41,0,0,0,.323-.155l2.665-3.326h5.33l-1.146,1.139a.95.95,0,0,0-.288.7,1,1,0,0,0,.288.7.99.99,0,0,0,.7.288.973.973,0,0,0,.7-.288l2.5-2.489a1.528,1.528,0,0,0,0-2.18L28.68,8.733a.99.99,0,0,0-.7-.288.973.973,0,0,0-.7.288.961.961,0,0,0-.288.7,1,1,0,0,0,.288.7l1.146,1.139H22.5a.982.982,0,0,0-.752.352l-.007.007-2.834,3.53a.415.415,0,0,0,.007.534Z" fill="#BBBBBB"/>
                    </g>
                </svg>
                <!--上一首-->
                <svg  xmlns="http://www.w3.org/2000/svg" width="22.5" height="22.5" viewBox="0 0 22.5 22.5" @click="previous_song">
                    <path id="Icon_ionic-ios-skip-backward" data-name="Icon ionic-ios-skip-backward" d="M12.3,7.031V16.72L28.4,6.9a.566.566,0,0,1,.851.485V28.617a.565.565,0,0,1-.851.485L12.3,19.28v9.689a.282.282,0,0,1-.281.281H7.031a.282.282,0,0,1-.281-.281V7.031a.282.282,0,0,1,.281-.281h4.992A.282.282,0,0,1,12.3,7.031Z" transform="translate(-6.75 -6.75)" fill="#5ab4f0"/>
                </svg>

                <!--                暂停-->
                <svg v-if="music.playing" @click="startPlayOrPause" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path id="Icon_awesome-pause" data-name="Icon awesome-pause" d="M5.786,20.18H1.929A1.929,1.929,0,0,1,0,18.251V4.108A1.929,1.929,0,0,1,1.929,2.18H5.786A1.929,1.929,0,0,1,7.714,4.108V18.251A1.929,1.929,0,0,1,5.786,20.18ZM18,18.251V4.108A1.929,1.929,0,0,0,16.071,2.18H12.214a1.929,1.929,0,0,0-1.929,1.929V18.251a1.929,1.929,0,0,0,1.929,1.929h3.857A1.929,1.929,0,0,0,18,18.251Z" transform="translate(0 -2.18)" fill="#5ab4f0"/>
                </svg>
                <!--                播放-->
                <svg v-else @click="startPlayOrPause" xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21">
                    <path id="Icon_awesome-play" data-name="Icon awesome-play" d="M17.052,8.807,2.909.272A1.918,1.918,0,0,0,0,1.966V19.031a1.927,1.927,0,0,0,2.909,1.694l14.143-8.531a1.988,1.988,0,0,0,0-3.388Z" transform="translate(0 -0.002)" fill="#5ab4f0"/>
                </svg>

                <!--下一首-->
                <svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="22.5" viewBox="0 0 22.5 22.5" @click="next_song">
                    <path id="Icon_ionic-ios-skip-forward" data-name="Icon ionic-ios-skip-forward" d="M23.7,7.031V16.72L7.6,6.9a.565.565,0,0,0-.851.485V28.617A.565.565,0,0,0,7.6,29.1L23.7,19.28v9.689a.282.282,0,0,0,.281.281h4.992a.282.282,0,0,0,.281-.281V7.031a.282.282,0,0,0-.281-.281H23.977A.282.282,0,0,0,23.7,7.031Z" transform="translate(-6.75 -6.75)" fill="#5ab4f0"/>
                </svg>
                <!--                菜单-->
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21.375" viewBox="0 0 27 21.375" @click="to_play_list">
                    <g id="Icon_ionic-ios-list" data-name="Icon ionic-ios-list" transform="translate(-4.5 -7.313)">
                        <path d="M8.438,18a1.969,1.969,0,1,1-1.969-1.969A1.969,1.969,0,0,1,8.438,18Z" fill="#BBBBBB"/>
                        <path d="M8.438,9.281A1.969,1.969,0,1,1,6.469,7.313,1.969,1.969,0,0,1,8.438,9.281Z" fill="#BBBBBB"/>
                        <path d="M8.438,26.719A1.969,1.969,0,1,1,6.469,24.75a1.969,1.969,0,0,1,1.969,1.969Z" fill="#BBBBBB"/>
                        <path d="M30.375,16.875H13.465a1.125,1.125,0,0,0,0,2.25h16.91a1.125,1.125,0,0,0,0-2.25Z" fill="#BBBBBB"/>
                        <path d="M30.375,25.594H13.465a1.125,1.125,0,0,0,0,2.25h16.91a1.125,1.125,0,0,0,0-2.25Z" fill="#BBBBBB"/>
                        <path d="M13.465,10.406h16.91a1.125,1.125,0,0,0,0-2.25H13.465a1.125,1.125,0,0,0,0,2.25Z" fill="#BBBBBB"/>
                    </g>
                </svg>


            </div>
        </div>

        <van-popup v-model:show="to_play_list_display" position="bottom" :style="{ height: '60%',backgroundColor:theme_color }" round >
<!--            待播放歌曲列表-->
            <div class="to_play_song_list" :class="[$store.state.theme == 'night' ? 'to_play_song_list_night':'']">
                <div class="to_play_song_list_operation" :class="[$store.state.theme == 'night' ? 'to_play_song_list_operation_night':'']">
                    <div class="to_play_song_list_close" @click="to_play_list_close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="0.25rem" viewBox="0 0 40 5">
                            <line id="直线_2" data-name="直线 2" x2="40" transform="translate(0 2.5)" fill="none" stroke="#B7B7B7" stroke-width="5"/>
                        </svg>
                    </div>
                    <div class="to_play_song_list_delete">
                        <svg width="25" height="25" viewBox="0 0 25 25">
                            <g  transform="translate(-241 -868.376)">
                                <g  transform="translate(241 868.525)">
                                    <rect  width="25" height="25" transform="translate(0 -0.149)" fill="none"/>
                                    <path  d="M15,8.562,15.611,5h7.937l.611,3.562" transform="translate(-7.368 -2.027)" fill="none" stroke="#B7B7B7" stroke-linejoin="round" stroke-width="2"/>
                                    <path  d="M6,12H24.316" transform="translate(-2.947 -5.466)" fill="none" stroke="#B7B7B7" stroke-linecap="round" stroke-width="2"/>
                                    <path  d="M24.228,12,23.211,27.772H12.018L11,12Z" transform="translate(-5.403 -5.466)" fill="none" stroke="#B7B7B7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill-rule="evenodd"/>
                                </g>
                                <g transform="translate(250.512 880.621)">
                                    <g transform="translate(0 0)">
                                        <path  d="M17,22.067,22.067,17" transform="translate(-17 -17)" fill="none" stroke="#B7B7B7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                        <path  d="M17.724,17.724,17,17" transform="translate(-17 -17)" fill="none" stroke="#B7B7B7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                        <path  d="M29.724,29.724,29,29" transform="translate(-24.657 -24.657)" fill="none" stroke="#B7B7B7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="to_play_song_list_body" >
                    <ul v-bind:key="index" v-for="(item,index) in play_later_song_data">
                        <li>
                            <div class="to_play_song_list_song_box" :class="[$store.state.theme == 'night' ? 'to_play_song_list_song_box_night':'']">
                                <!--                                正在播放时显示的图标-->
                                <div class="to_play_song_list_song_play_icon" v-show="item.play_later_song_id == $route.params.songid">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
                                        <g  transform="translate(0 -0.312)">
                                            <rect width="25" height="25" transform="translate(0 0.312)" fill="none"/>
                                            <path d="M14.214,24.427A10.214,10.214,0,1,0,4,14.214,10.214,10.214,0,0,0,14.214,24.427Z" transform="translate(-1.557 -1.557)" fill="none" stroke="#5ab4f0" stroke-linejoin="round" stroke-width="2"/>
                                            <path d="M19.328,12A7.328,7.328,0,0,0,12,19.328" transform="translate(-6.024 -5.967)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                            <path d="M24,31.328A7.328,7.328,0,0,0,31.328,24" transform="translate(-12.049 -11.991)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                            <path d="M22.443,24.885A2.443,2.443,0,1,0,20,22.443,2.443,2.443,0,0,0,22.443,24.885Z" transform="translate(-9.812 -9.761)" fill="none" stroke="#5ab4f0" stroke-linejoin="round" stroke-width="2"/>
                                        </g>
                                    </svg>
                                </div>
                                <!--                                歌曲名称-->
                                <div :class="[item.play_later_song_id == $route.params.songid ? 'to_play_song_list_song_name_selected' : 'to_play_song_list_song_name']">
                                    {{ item.play_later_song_name }}
                                </div>
                                <!--                                分割线-->
                                <span :class="[item.play_later_song_id == $route.params.songid ? 'split_line_selected' : 'split_line']">-</span>
                                <!--                                歌手名称-->
                                <div :class="[item.play_later_song_id == $route.params.songid ? 'to_play_song_list_singer_name_selected' : 'to_play_song_list_singer_name']">
                                    {{ item.play_later_song_singer }}
                                </div>
                                <!--                                跳转播放-->
                                <div class="to_play_song_list_song_play" @click="to_play_song_list_song_play_start(item.play_later_song_id)"></div>
                                <!--                                删除按钮-->
                                <div class="to_play_song_list_song_delete" @click="to_play_song_list_song_data_delete(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 25 25">
                                        <g id="组_20" data-name="组 20" transform="translate(-3 -2.747)">
                                            <circle cx="11.5" cy="11.5" r="11.5" transform="translate(4 3.747)" fill="none" stroke="#b7b7b7" stroke-width="2"/>
                                            <path d="M17,24.968,24.968,17" transform="translate(-5.601 -5.621)" fill="none" stroke="#b7b7b7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                            <path d="M18.138,18.138,17,17" transform="translate(-5.601 -5.621)" fill="none" stroke="#b7b7b7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                            <path d="M30.138,30.138,29,29" transform="translate(-10.771 -10.791)" fill="none" stroke="#b7b7b7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                        </g>
                                    </svg>
                                </div>

                            </div>
                        </li>
                    </ul>
                    <div class="to_play_song_list_body_tail"></div>
                </div>
            </div>
        </van-popup>





        <div style="position: fixed; top:3.5rem;left:1rem;z-index: 99">
            <Back :color="2"></Back>
        </div>


    </div>

</template>

<script>
    import ajax from '../../http/index'
    import Back from '../../components/menu/Back'

    // 歌曲时间转换
    import { defineComponent } from 'vue'
    import axios from "axios";
    export default defineComponent( {
        components: {Back},
        props:{
            sliderTime:Number,
            music:{
                type:Array,
                default(){
                  return []
                }
            },
          endplay:Boolean
        },
        name: "Musicplayer",
        data() {

            return {
                // https://p1.music.126.net/Du8yFejFSqukIqbV0IhKuA==/109951165742954582.jpg
                Background_map:'',
                slider_Time:0,
                song_cover_url:'',
                currently_playing_song:true,
                to_play_list_display:false,
                play_later_song_data:[],
                subscribed_already_of_not:-1,
                music_name:'',
                music_playing:false,
                theme_color:'#fff',
                playback_mode:0,
                // 随机播放歌曲排序
                random_order:[]
            }
        },
        computed:{
          MusicPlayId(){
              return this.$store.state.music_play_id
          },
        },

        watch:{
            sliderTime(newVal){
                this.slider_Time = newVal
            },
            MusicPlayId(val){
                this.$emit('get_music_url',val)

                //如果处于播放状态，0.8秒后播放音频
                if (!this.music_playing){
                    setTimeout(()=>{
                        this.$emit('home_play')
                    },800)
                }


            },
            $route(){
                let url_musicplay = this.$route.path.split('/');
                let url_index = url_musicplay.findIndex(item=> item == 'musicplay')
                console.log(url_index)
                if (this.$store.state.skip_mode =='right_left'&&url_index !=-1){
                    let id = this.$route.params.songid
                    this.$store.commit('get_music_play_id',id)
                    ajax(
                        this.$store.state.api_url+'song/detail?ids='+id
                    ).then((res)=>{
                        console.log(res);
                        this.Background_map = res.songs[0].al.picUrl
                        this.music_name = res.songs[0].name
                        let home_name = res.songs[0].name+' - '+res.songs[0].ar[0].name
                        this.$store.commit('get_home_music_name', home_name)
                        this.$store.commit('get_home_music_img', this.Background_map)
                        this.get_again_color()
                        let arr = {type:'song',song_id:id,song_name:this.music_name,song_singer:res.songs[0].ar[0].name,singer_id:res.songs[0].ar[0].id}
                        this.$store.commit('push_recently_played_local_data',arr)

                      if (this.$store.state.user_cookie != undefined){
                        axios.post(
                            'http://localhost:3001/played',
                            {id:this.$store.state.my_user_id,type:'song',song_id:arr.song_id,music_name:arr.song_name,song_singer:arr.song_singer,singer_id:arr.singer_id}
                        ).then((res)=>{
                          console.log(res);
                        }).catch((err)=>{
                          console.log(err);
                        })
                      }


                    }).catch((error)=>{
                        console.log(error);
                    })

                }


            },
          endplay(){
              if (this.endplay){
                //playback_mode = 0 顺序播放； playback_mode = 1 单曲循环； playback_mode = 2 随机播放
                switch (this.playback_mode){
                  case 0: this.next_song(); break;
                  case 1: this.startPlayOrPause(); break;
                  case 2: this.shuffle_play();break;
                }
                // 重新播放歌曲 修改endplay值
                this.$emit('endplayRevise')
              }
          }

        },
        methods: {
          kk(){
            console.log(this.$store.state.floats_player_background)
            this.get_again_color()
          },
            // 上一首
            previous_song(){
                // 获取当前播放歌曲id
                let id = this.$route.params.songid
               // 获取当前播放歌单所有歌曲id
                let arr = this.$store.state.play_song_information_later
                // 查找当前播放歌曲id下标
                let song_id_subscript = (arr).findIndex((arr) => arr.play_later_song_id == id )// 根据条件查找符合条件对象下标索引
                if (song_id_subscript >= 1){
                    // 跳转
                    this.$router.replace({ path: `/home/musicplay/${ arr[song_id_subscript-1].play_later_song_id }`})
                    if (this.$store.state.music_cover != undefined){
                        this.Background_map = this.$store.state.music_cover
                    }
                    // 获取歌曲ID
                    let previous_id = arr[song_id_subscript-1].play_later_song_id
                    // 获取歌曲信息
                    ajax(
                        // 'http://127.0.0.1:3000/song/detail?ids='+previous_id
                        this.$store.state.api_url+'song/detail?ids='+previous_id
                    ).then((res)=>{
                        console.log(res);
                        this.Background_map = res.songs[0].al.picUrl
                        this.$store.commit('get_music_play_id',previous_id)
                        this.music_name = res.songs[0].name
                        let home_name = res.songs[0].name+' - '+res.songs[0].ar[0].name
                        this.$store.commit('get_home_music_name', home_name)
                        this.$store.commit('get_home_music_img', this.Background_map)

                    }).catch((error)=>{
                        console.log(error);
                    })
                } else {
                    this.$toast('已经没有了');
                }
                // this.$emit('music_play')
            },
            // 下一首
            next_song(){
                // 获取当前播放歌曲id
                let id = this.$route.params.songid
                // 获取当前播放歌单所有歌曲id
                let arr = this.$store.state.play_song_information_later
                // 查找当前播放歌曲id下标
                let song_id_subscript = (arr).findIndex((arr) => arr.play_later_song_id == id )// 根据条件查找符号条件对象下标索引
                if (song_id_subscript < arr.length-1){
                    // 跳转
                    this.$router.replace({ path: `/home/musicplay/${ arr[song_id_subscript+1].play_later_song_id }`})
                    if (this.$store.state.music_cover != undefined){
                        this.Background_map = this.$store.state.music_cover
                    }
                    // 获取歌曲ID
                    let previous_id = arr[song_id_subscript+1].play_later_song_id
                    // 获取歌曲信息
                    ajax(
                        // 'http://127.0.0.1:3000/song/detail?ids='+previous_id
                        this.$store.state.api_url+'song/detail?ids='+previous_id
                    ).then((res)=>{
                        console.log(res);
                        // this.$emit('audiosrc',this.$route.params.songid)
                        this.Background_map = res.songs[0].al.picUrl
                        this.$store.commit('get_music_play_id',previous_id)
                        this.music_name = res.songs[0].name
                        let home_name = res.songs[0].name+' - '+res.songs[0].ar[0].name
                        this.$store.commit('get_home_music_name', home_name)
                        this.$store.commit('get_home_music_img', this.Background_map)
                    }).catch((error)=>{
                        console.log(error);
                    })

                }else {
                    this.$toast('已经没有了');
                }


            },
            // 随机播放
            shuffle_play(){
            // 获取当前播放歌曲id
            let id = this.$route.params.songid
            // 获取当前播放歌单所有歌曲id
            let arr = this.random_order
            // 查找当前播放歌曲id下标
            let song_id_subscript = (arr).findIndex((arr) => arr.play_later_song_id == id )// 根据条件查找符号条件对象下标索引
            if (song_id_subscript < arr.length-1){
              // 跳转
              this.$router.replace({ path: `/home/musicplay/${ arr[song_id_subscript+1].play_later_song_id }`})
              if (this.$store.state.music_cover != undefined){
                this.Background_map = this.$store.state.music_cover
              }
              // 获取歌曲ID
              let previous_id = arr[song_id_subscript+1].play_later_song_id
              // 获取歌曲信息
              ajax(
                  this.$store.state.api_url+'song/detail?ids='+previous_id
              ).then((res)=>{
                console.log(res);
                this.Background_map = res.songs[0].al.picUrl
                this.$store.commit('get_music_play_id',previous_id)
                this.music_name = res.songs[0].name
                let home_name = res.songs[0].name+' - '+res.songs[0].ar[0].name
                this.$store.commit('get_home_music_name', home_name)
                this.$store.commit('get_home_music_img', this.Background_map)
              }).catch((error)=>{
                console.log(error);
              })

            }else {
              this.$toast('已经没有了');
            }
          },
            // 查看待播放列表
            to_play_list(){
                this.to_play_list_display = !this.to_play_list_display
                this.play_later_song_data = this.$store.state.play_song_information_later

            },
            //待播放列表跳转播放
            to_play_song_list_song_play_start(song_id){
                //替换当前URL 它的作用类似于 router.push，唯一不同的是，它在导航时不会向 history 添加新记录，正如它的名字所暗示的那样——它取代了当前的条目。
                this.$router.replace({ path: `/home/musicplay/${ song_id }`})
                if (this.music_playing){
                    this.music_playing = false
                }
                this.to_play_list_display = false
            },
            //删除带播放歌曲
            to_play_song_list_song_data_delete(index){
                console.log(index)
                let arr = []
                for (let i = 0; i<this.play_later_song_data.length;i++){
                    arr.push({
                        play_later_song_id:this.play_later_song_data[i].play_later_song_id,
                        play_later_song_name:this.play_later_song_data[i].play_later_song_name,
                        play_later_song_singer:this.play_later_song_data[i].play_later_song_singer
                        })
                }
                if (arr[index].play_later_song_id == this.$route.params.songid){
                    console.log(arr[index].play_later_song_id)
                }else {
                    arr.splice(index,1)
                }

                console.log(arr)
                this.play_later_song_data = arr
                // console.log(this.play_later_song_data)
            },
            //关闭菜单
            to_play_list_close(){
                this.to_play_list_display = !this.to_play_list_display
            },
            //播放歌曲
            startPlayOrPause(){
                this.music_playing = !this.music_playing
                this.$emit('home_play',this.$store.state.music_play_id)
            },
            changeCurrentTime(index){
                let key = parseInt(parseInt(index) / 100 * this.music.maxTime)
                this.$emit('changeCurrentTime',key)
            },
            // 歌曲评论
            song_comment(){
                let id = this.$route.params.songid
                this.$store.commit('advance')
                this.$router.push(`/home/songcomment/${ id }`)
            },
            async subscribed(){
                if (this.$store.state.user_cookie == undefined){
                    this.$toast('请先登录')
                }else {
                    await ajax(
                        this.$store.state.api_url + 'playlist/tracks?op=add',
                        {
                            pid: this.$store.state.subscrib_song_id,
                            tracks: this.$route.params.songid,
                            cookie: this.$store.state.user_cookie
                        },
                        'post'
                    ).then((res) => {
                        console.log(res);
                        this.subscribed_already_of_not = 1
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            },
            async no_subscribed(){
                if (this.$store.state.user_cookie == undefined){
                    this.$toast('请先登录')
                }else {
                    await ajax(
                        this.$store.state.api_url+'playlist/tracks?op=del',
                        {pid:this.$store.state.subscrib_song_id,tracks:this.$route.params.songid,cookie:this.$store.state.user_cookie},
                        'post'
                    ).then((res)=>{
                        console.log(res);
                        this.subscribed_already_of_not = -1
                    }).catch((err)=>{
                        this.$toast('请先登录')
                        console.log(err);
                    })
                }

            },
            // 播放模式选择
            playback_mode_select(){
                if (this.playback_mode<2){
                    this.playback_mode = this.playback_mode+1
                }else {
                    this.playback_mode = 0
                }
                if (this.playback_mode == 0 ){
                  this.$toast('列表播放')
                }else if (this.playback_mode == 1){
                  this.$toast('单曲循环')
                }else if (this.playback_mode == 2){
                  this.$toast('随机播放')
                  this.random_order.push({play_later_song_id:this.$route.params.songid});
                  let arr = this.$store.state.play_song_information_later;
                  while (this.random_order.length<arr.length){
                    let x =  Math.round(Math.random()*arr.length)
                    if (x>0&&x<arr.length&&this.random_order.findIndex(item=> item.play_later_song_id == arr[x].play_later_song_id) == -1){
                      this.random_order.push(arr[x])
                    }
                  }
                }
            },
          //结束播放
          onEnded(){
            console.log('fang wan le')
          },
          //获取主题次色
          get_again_color(){
            this.$nextTick(()=>{
              const img = this.$refs.song_cover
              setTimeout(()=>{
                //图片加载完成 获取主颜色
                if (img.complete) {
                  /* eslint-disable */
                  let colorthief = new ColorThief();
                  let pictures_rgb = colorthief.getPalette(img, 2)[1]
                  var r = parseInt(pictures_rgb[0]);
                  var g = parseInt(pictures_rgb[1]);
                  var b = parseInt(pictures_rgb[2]);
                  var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                   this.$store.commit('get_floats_player_background',hex)
                }
                else {
                  //图片尚未加载完成 再次执行
                  this.get_again_color()
                }
              },500)
            })
          },
        },
        mounted() {
            if (this.$store.state.theme == 'night'){
                this.theme_color = '#222225'
            }
            let id = this.$route.params.songid
            this.$store.commit('get_music_play_id',id)
            ajax(
                this.$store.state.api_url+'song/detail?ids='+id
            ).then((res)=>{
                console.log(res);
                // this.$emit('audiosrc',this.$route.params.songid)
                this.Background_map = res.songs[0].al.picUrl
                this.music_name = res.songs[0].name
                let home_name = res.songs[0].name+' - '+res.songs[0].ar[0].name
                this.$store.commit('get_home_music_name', home_name)
                this.$store.commit('get_home_music_img', this.Background_map)

                let arr = {type:'song',song_id:id,song_name:this.music_name,song_singer:res.songs[0].ar[0].name,singer_id:res.songs[0].ar[0].id}
                this.$store.commit('push_recently_played_local_data',arr)
            }).catch((error)=>{
                console.log(error);
            })
            // 判断单曲是否已经订阅 -1为未订阅 其他为已定阅
            this.subscribed_already_of_not = this.$store.state.user_collected_song_id.findIndex(item=> item.song_id == id);
            this.$emit('get_music_url',id)
            setTimeout(()=>{
                this.$emit('home_play')
            },800)

          this.$nextTick(()=>{
            const img = this.$refs.song_cover
            setTimeout(()=>{
              //图片加载完成 获取主颜色
              if (img.complete) {
                /* eslint-disable */
                let colorthief = new ColorThief();
                let pictures_rgb = colorthief.getPalette(img, 2)[1]
                var r = parseInt(pictures_rgb[0]);
                var g = parseInt(pictures_rgb[1]);
                var b = parseInt(pictures_rgb[2]);
                var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                this.$store.commit('get_floats_player_background',hex)
              }
              else {
                //图片尚未加载完成 再次执行
                this.get_again_color()
              }
            },500)
          })
        },




    })
</script>

<style scoped>
    .slider {
        display: inline-block;
        width: 16rem;
    }
    .Hover_player_box{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        overflow-y: hidden;
        overflow-x: hidden;
        /*background-color: cornflowerblue;*/
        display: flex;
        /*align-items: center;*/
        flex-direction: column;
        align-items: center;
    }
    .blur{
        position: absolute;
        top:-5%;
        left: -5%;
        right: -5%;
        width:110%;
        height: 110%;
        z-index: -1;
        /*object-fit:cover;*/
        /*模糊程度*/
        -webkit-filter: blur(70px); /* Chrome, Opera */
    }
    .Back{
        margin-top: 3rem;
    }
    .Hover_player_box .Song_cover{
        width: 13.75rem;
        height: 13.75rem;
        border: 1px solid white;
        border-radius: 5px;
        margin-top: 10rem;

    }
    .Song_cover img{
        width: 13.75rem;
        height: 13.75rem;
        border-radius: 5px;
    }
    .ccd_box{
        width: 100%;
        height: 2.5rem ;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 6rem;

    }
    .progress{
        width: 100%;
        height: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 2rem;
    }
    .progress span{
        font-size: 0.5rem;
        color: white;
    }
    .Play_button{
        width: 58%;
        display: flex;
        /*flex-direction:;*/
        /*justify-content: flex-start;*/
        justify-content: flex-end;

    }
    .music_assembly {
        width: 100%;
        height: 4.75rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .Play_button svg{
        margin-right: 15px;
    }


    .Hover_player_box .Song_name{
        margin-left: 17px;
        font-size: 20px;
        margin-right: 10px;
    }

    .to_play_song_list{
        width: 100%;
        height: 100%;
        background-color: white;
        position: absolute;
        bottom: 0;
        z-index: 1002;
        /*border-top-left-radius: 18px;*/
        /*border-top-right-radius: 18px;*/
        /*border: 1px black solid;*/
    }
    .to_play_song_list_operation{
        width: 100%;
        height: 2.5rem;
        border-bottom: 2px solid #f4f4f4;
    }
    .to_play_song_list_close{
        display: flex;
        justify-content: center;
        margin-top: 0.625rem;
    }
    .to_play_song_list_delete{
        position: absolute;
        right: 1.25rem;
    }
    .to_play_song_list_body{
        width: 100%;
        height: 100%;
        /*background-color: #409eff;*/
        overflow: auto;
    }
    .to_play_song_list_song_box{
        width: 100%;
        height: 3.125rem;
        display: flex;
        align-items: center;
        /*background-color: #525252;*/
        border-bottom: 2px solid #f4f4f4;
        position: relative;

    }
    .to_play_song_list_song_play_icon{
        margin-top: 5px;
        margin-left: 1rem;
    }
    .to_play_song_list_song_name{
        margin-left: 1.25rem;
        font-size: 18px;
        max-width: 200px;
        /*超出部分隐藏*/
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
    .to_play_song_list_singer_name{
        font-size: 15px;
        max-width: 100px;
        color: #6D6D6D;
        /*超出部分隐藏*/
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
    .to_play_song_list_song_play{
        position: absolute;
        z-index: 2;
        width: 85%;
        height: 100%;
    }
    .to_play_song_list_song_delete{
        position: absolute;
        right: 1rem;
        margin-top: 5px;
    }


    .to_play_song_list_song_name_selected{
        margin-left: 0.25rem;
        font-size: 18px;
        max-width: 190px;
        color: #5AB4F0;
        /*超出部分隐藏*/
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
    .to_play_song_list_singer_name_selected{
        font-size: 15px;
        max-width: 90px;
        color: #5AB4F0;
        /*超出部分隐藏*/
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
    .split_line{
        color:#6D6D6D;
    }
    .split_line_selected{
        color: #5AB4F0;
    }
    .to_play_song_list_body_tail{
        width: 100%;
        height: 3rem;
        background-color: white;
    }
    .to_play_song_list_box{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1000;

    }
    .to_play_song_list_background{
        position: absolute;
        z-index: 1001;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.4;
    }
    .custom-button {
        width: 0.5rem;
        height: 0.5rem;
        color: #fff;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        background-color: #409eff;
        border-radius: 1rem;
    }


    .Hover_player_body{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    .Hover_player_tail{
        width: 100%;
        height: 13rem;
    }
    .song_name_box{
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 4rem;
    }
    .song_name_box span{
        color: white;
        font-size: 25px;
        max-width: 90%;
        overflow-wrap: break-word;
    }

    .to_play_song_list_night{
        width: 100%;
        height: 100%;
        background-color: #222225;
        position: absolute;
        bottom: 0;
        z-index: 1002;
        /*border-top-left-radius: 18px;*/
        /*border-top-right-radius: 18px;*/
        color: white;
    }
    .to_play_song_list_song_box_night{
        width: 100%;
        height: 3.125rem;
        display: flex;
        align-items: center;
        /*background-color: #525252;*/
        border-bottom: 2px solid #282828;
        position: relative;

    }
    .to_play_song_list_operation_night{
        width: 100%;
        height: 2.5rem;
        border-bottom: 2px solid #282828;
    }

</style>