//1.引入
import {createStore} from "vuex"

//创建store对象

const store = createStore({
    strict: process.env.NODE_ENV !== 'production',
    //全局共享的状态(数据)存放
    state() {
        return{
            stop: false,
            skip_mode: 'right_left',
            send_dynamic:false,
            music_display: true,
            music_play:false,
            music_isPlaying:false,
            music_isPaused:false,
            operation_panel:false,
            menu_display:true,
            music_cover:[],
            song_list_comment:'',
            music:[
                {
                    Played_time:'00:00',
                    Total_time:'00:00'
                }
            ],
            search_music_data:[],
            play_music_information:[],
            search_result:[],
            search_song_data:[],
            search_mv_data:[],
            search_singer_data:[],
            search_intermediate_value:'',
            music_play_id:0,
            music_play_name:'Musicplayer',

            // 稍后播放歌曲信息
            play_song_information_later:[],
            // API接口前缀
            // api_url:'https://netease-cloud-music-api-eight-delta.vercel.app/',
            api_url:'http://127.0.0.1:3000/',
            user_cookie:undefined,
            // 分享音乐播放
            share_music_id:'',
            // 分享动态内容
            share_dynamic_data:[],
            // 可能喜欢的音乐
            may_like_music:[],
            subscrib_song_id:'',
            user_collected_song_id:[],
            // 本人用户ID
            my_user_id:'',
            // 已关注的用户ID
            concerned_users_id:[],
            theme:'white',
            home_music_name:'',
            home_music_img:'',
            home_music_playing:false,
            post_dynamics_data:[],
            audio_paused:false,
            recently_played_local_data:{'song':[],'video':[]},
            user_id_followed:[],
            favorite_singer_id:[],
            floats_player_background:'#000000'

            // theme:'night',
        }
    },
    getters: {},
    //放入所有能操作state中的数据的函数
    //同步提交状态
    mutations: {

        stop () {
            if (store.stop == false){
                store.stop = true
            }else {
                store.stop = false
            }
        },
        advance(state) {
            state.skip_mode = 'right_left'

        },
        router_back (state) {
            state.skip_mode = 'left_right'

        },
        send_permission(state) {
            state.send_dynamic = true
        },
        send_disabled(state) {
            state.send_dynamic = false
        },
        music_display_show(state) {
            state.music_display = true
        },
        music_display_hide(state) {
            state.music_display = false
        },
        // 点击歌曲后自动播放
        music_playing(state){
            state.music_play = true
        },
        music_stop(state){
            state.music_play = false
        },
        music_paused_true(state){
            state.music_isPaused = true
        },
        music_paused_false(state){
            state.music_isPaused = false
        },
        music_isPlaying_true(state) {
            state.music_isPlaying = true
        },
        music_isPlaying_false(state){
            state.music_isPlaying = false
        },
        show_operation_panel(state){
            state.operation_panel = true
        },
        hide_operation_panel(state){
            state.operation_panel = false
        },
        show_menu_display(state) {
            state.menu_display = true
        },
        hide_menu_display(state) {
            state.menu_display = false
        },
        get_music_cover(state,data) {
            state.music_cover = data
        },
        get_search_music_data(state,data){
            if (data!= null){
                state.search_music_data.splice(0,state.search_music_data.length);
                for (let i = 0; i<data.result.songs.length;i++){
                    state.search_music_data.push(data.result.songs[i])
                }
            }
        },
        get_play_music_information(state,data){
            if (data!=null){
                state.play_music_information = data
            }
            console.log(state.play_music_information)
        },
        get_search_result(state,data){
                state.search_result = data
        },
        get_search_song_data(state,data){
            state.search_song_data = data
        },
        get_search_mv_data(state,data){
            state.search_mv_data = data
        },
        get_search_singer_data(state,data){
            state.search_singer_data = data
        },
        get_search_intermediate_value(state,data){
            state.search_intermediate_value = data
            console.log(state.search_intermediate_value)
        },
        get_music_play_id(state,data){
            if (state.music_play_id != data){
                state.music_play_id = data
            }
        },


        cache_music_play_name(state){
            state.music_play_name = 'Musicplayer'
        },
        destroy_music_play_name(state){
            state.music_play_name = 'xxx'
        },

        // 获取歌单稍后播放所有歌曲信息
        get_play_song_information_later(state,data){
            state.play_song_information_later = data
        },
        //获取cookie
        get_user_cookie(state,data){
            state.user_cookie = data
        },
        // 清空cookie
        delete_user_cookie(state){
            state.user_cookie = undefined
        },
        get_share_music_id(state,data){
            state.share_music_id = data
        },
        // 获取分享动态内容数据
        get_share_dynamic_data(state,data){
            state.share_dynamic_data = data
        },
        get_may_like_music(state,data){
            state.may_like_music = []
            state.may_like_music = data
        },
        get_subscrib_song_id(state,data){
            state.subscrib_song_id = data
        },
        get_user_collected_song_id(state,data){
            state.user_collected_song_id = data
        },
        get_my_user_id(state,data){
            state.my_user_id = data
        },
        delete_my_user_id(state){
            state.my_user_id = ''
            console.log("shan le")
        },
        get_concerned_users_id(state,data){
            state.concerned_users_id = data
        },
        transform_theme(state,data){
            state.theme = data
        },
        get_home_music_name(state,data){
            state.home_music_name = data
        },
        get_home_music_img(state,data){
            state.home_music_img = data
        },
        home_music_playing_false(state){
            state.home_music_playing = false
        },
        home_music_playing_true(state){
            state.home_music_playing = true
        },
        // 获取发生动态内容
        obtain_post_dynamics_data(state,data){
            state.post_dynamics_data = data
        },
        //清除发生动态内容
        delete_post_dynamics_data(state){
            state.post_dynamics_data = []
        },

        audio_paused_false(state){
            state.audio_paused = false
        },
        audio_paused_true(state){
            state.audio_paused = true
        },
        push_recently_played_local_data(state,data){
           if (data.type == 'song'){
               let local_data_id = state.recently_played_local_data.song.findIndex(item=> item.song_id == data.song_id)
                //local_data_id = -1 ,没有当前数据
                if (local_data_id == -1){
                    state.recently_played_local_data.song.unshift(data)
                }else {
                    state.recently_played_local_data.song.splice(local_data_id,1)
                    state.recently_played_local_data.song.unshift(data)
                }
           }else {
               let local_data_id = state.recently_played_local_data.video.findIndex(item=> item.id == data.id)
               //local_data_id = -1 ,没有当前数据
               if (local_data_id == -1){
                   state.recently_played_local_data.video.unshift(data)
               }else {
                   state.recently_played_local_data.video.splice(local_data_id,1)
                   state.recently_played_local_data.video.unshift(data)
               }
           }
            console.log(data)
           // let local_data_id = state.recently_played_local_data.findIndex(item=> item.id == data.id)
           //  //local_data_id = -1 ,没有当前数据
           //  if (local_data_id == -1){
           //      state.recently_played_local_data.unshift(data)
           //  }else {
           //      state.recently_played_local_data.splice(local_data_id,1)
           //      state.recently_played_local_data.unshift(data)
           //  }
        },
        // // 获取已关注用户id
        // get_user_id_followed(state,data){
        //     state.user_id_followed = data
        // }
        // // 获取已收藏歌手id
        get_favorite_singer_id(state,data){
            state.favorite_singer_id = data
        },
        // 获取悬浮播放器的背景色
        get_floats_player_background(state,data){
            state.floats_player_background = data
        }
    },
    //提交操作给mutations,可以同步操作也可异步操作
    actions: {

    }

})

//3.导出
export default store
