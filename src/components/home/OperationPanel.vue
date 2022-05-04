<template>
    <div class="OperationPanel">
            <div class="OperationPanel_frame" @click="Hide_operation_panel"></div>
            <div class="OperationPanel_box">
                <div class="song_box">
                    <span>{{ operation_song_information.song_name }}</span>
                </div>
                   <div>
<!--                       收藏-->
                       <div v-show="subscribed_already_of_not == -1" class="Operation_options" @click="collection_song">
                          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M40 22C40 12.0589 31.9411 4 22 4C12.0589 4 4 12.0589 4 22C4 31.9411 12.0589 40 22 40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M33.3 30C31.4775 30 30 31.7217 30 33.8455C30 37.6909 33.9 41.1868 36 42C38.1 41.1868 42 37.6909 42 33.8455C42 31.7217 40.5225 30 38.7 30C37.5839 30 36.5972 30.6457 36 31.6339C35.4028 30.6457 34.4161 30 33.3 30Z" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M22 27C24.7614 27 27 24.7614 27 22C27 19.2386 24.7614 17 22 17C19.2386 17 17 19.2386 17 22C17 24.7614 19.2386 27 22 27Z" fill="none" stroke="#333" stroke-width="4"/>
                          </svg>
                           <span>收藏</span>
                       </div>
<!--                       已收藏-->
                       <div v-show="subscribed_already_of_not == 1" class="Operation_options" @click="no_collection_song">
                           <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M40 22C40 12.0589 31.9411 4 22 4C12.0589 4 4 12.0589 4 22C4 31.9411 12.0589 40 22 40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                               <path d="M33.3 30C31.4775 30 30 31.7217 30 33.8455C30 37.6909 33.9 41.1868 36 42C38.1 41.1868 42 37.6909 42 33.8455C42 31.7217 40.5225 30 38.7 30C37.5839 30 36.5972 30.6457 36 31.6339C35.4028 30.6457 34.4161 30 33.3 30Z" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                               <path d="M22 27C24.7614 27 27 24.7614 27 22C27 19.2386 24.7614 17 22 17C19.2386 17 17 19.2386 17 22C17 24.7614 19.2386 27 22 27Z" fill="none" stroke="#333" stroke-width="4"/>
                           </svg>
                           <span>已收藏</span>
                       </div>
<!--                        歌手-->
                       <div class="Operation_options" @click="view_singer">
                           <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <circle cx="24" cy="12" r="8" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                               <path d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                           <span>查看歌手</span>
                       </div>
<!--                        评论-->
                       <div class="Operation_options" @click="song_comment">
                           <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M44 6H4V36H13V41L23 36H44V6Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                               <path d="M14 19.5V22.5" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                               <path d="M24 19.5V22.5" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                               <path d="M34 19.5V22.5" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                           <span>评论</span>
                       </div>
<!--                            删除-->
                       <div class="Operation_options" @click="kk">
                       <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M9 10V44H39V10H9Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
                           <path d="M20 20V33" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                           <path d="M28 20V33" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                           <path d="M4 10H44" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                           <path d="M16 10L19.289 4H28.7771L32 10H16Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
                       </svg>
                           <span>删除</span>
                       </div>
                   </div>
            </div>
    </div>
</template>

<script>
    import ajax from "../../http";

    export default {
        name: "OperationPanel",
        data(){
          return{
              subscribed_already_of_not:-1,
              // arr:[]
          }
        },
        methods:{
            kk(){
                console.log(this.operation_song_information)
                console.log(this.subscribed_already_of_not)

            },
            Hide_operation_panel(){
                this.$store.commit('hide_operation_panel')
            },
            // 查看评论
            async song_comment(){
                let id = this.operation_song_information.song_id
               await ajax(
                    this.$store.state.api_url+'song/detail',
                    {ids:id}
                ).then((res)=>{
                    console.log(res.songs[0].name);
                    let arr = []
                   arr.push({
                       music_name:res.songs[0].name,
                       music_image:res.songs[0].al.picUrl,
                       music_id:res.songs[0].al.id,
                       music_singer:res.songs[0].ar[0].name
                   })
                   this.$store.commit('get_play_music_information',arr)
                }).catch((err)=>{
                    console.log(err);
                })
                this.$store.commit('advance')
                this.$router.push(`/home/songcomment/${ id }`)
                this.$store.commit('hide_operation_panel')
            },
            // 查看歌手
            view_singer() {
                let id = this.operation_song_information.singer_id
                // let id = '14059875'
                this.$store.commit('advance')
                this.$router.push(`/home/singerinformation/${ id }`)
                this.$store.commit('hide_operation_panel')
            },
            async collection_song(){
                let id = this.operation_song_information.song_id
               await ajax(
                    this.$store.state.api_url+'playlist/tracks?op=add',
                    {pid:this.$store.state.subscrib_song_id,tracks:id,cookie:this.$store.state.user_cookie},
                    'post'
                ).then((res)=>{
                    console.log(res);
                    this.subscribed_already_of_not = 1
                }).catch((err)=>{
                    console.log(err);
                })
                console.log(id)
            },
            async no_collection_song(){
                let id = this.operation_song_information.song_id
               await ajax(
                    this.$store.state.api_url+'playlist/tracks?op=del',
                    {pid:this.$store.state.subscrib_song_id,tracks:id,cookie:this.$store.state.user_cookie},
                    'post'
                ).then((res)=>{
                    console.log(res);
                    this.subscribed_already_of_not = -1
                }).catch((err)=>{
                    console.log(err);
                })
                console.log(id)
            },

        },
        props: {
            operation_song_information:{
                type:Array,
                default(){
                    return []
                }
            },
            // song_information:{
            //     type:Array,
            //     default(){
            //         return []
            //     }
            // },
        },

        mounted() {
            let id = this.operation_song_information.song_id
            this.subscribed_already_of_not = this.$store.state.user_collected_song_id.findIndex(item=> item.song_id == id);
        }

    }
</script>

<style scoped>
    .OperationPanel{
        width: 100%;
        height: 812px;
        position: absolute;
        z-index: 99;
        top: 0;

    }
.OperationPanel_frame{
    position: fixed;
    z-index: 98;
    top: 0;
    width: 100%;
    height: 100%;
    opacity:0.5;
    background-color: black;

}
    .OperationPanel_box{
        position: absolute;
        z-index: 99;
        top: 45%;
        width: 100%;
        height: 60%;
        border-radius: 2rem;
        background-color: white;
    }
    .song_box{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        font-size: 18px;
        border-bottom: 0.2rem solid #f4f4f4;
    }
    .song_box span{
        margin-left: 2rem;
    }
    .Operation_options{
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
        border-bottom: 0.2rem solid #f4f4f4;
    }
    .Operation_options svg{
         margin-left: 1.5rem;
        margin-right: 1rem;
    }
</style>