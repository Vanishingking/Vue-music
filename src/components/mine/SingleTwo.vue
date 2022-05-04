<template>
        <div class="Single_Two">
            <div class="Single_Two_box">
                <ul v-if="SongData.length>0">
                    <li class="song" v-bind:key="item" v-for="(item,index) in SongData">
                        <p v-show="dd" class="song_number">{{ item }}</p>
                        <div class="song_singer">
                            <span class="song_name">{{ SongData[index].song_name }}</span>
                            <span class="singer_name">{{ SongData[index].song_singer }}</span>
                        </div>
                        <div class="song_svg" @click="operation(item)">
                        <svg v-show="dd" class="spacing_zero" xmlns="http://www.w3.org/2000/svg" width="0.18rem" height="0.91rem" viewBox="0 0 3.607 18.224">
                            <g id="Icon_ionic-ios-more" data-name="Icon ionic-ios-more" transform="translate(18.935 -4.5) rotate(90)">
                                <path  d="M17.118,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(-3.515 0)"/>
                                <path  d="M6.3,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(0 0)"/>
                                <path  d="M27.96,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(-7.039 0)"/>
                            </g>
                        </svg>
                        <svg v-show="!dd" class="spacing_one" xmlns="http://www.w3.org/2000/svg" width="0.18rem" height="0.91rem" viewBox="0 0 3.607 18.224">
                            <g id="Icon_ionic-ios-more" data-name="Icon ionic-ios-more" transform="translate(18.935 -4.5) rotate(90)">
                                <path  d="M17.118,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(-3.515 0)"/>
                                <path  d="M6.3,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(0 0)"/>
                                <path  d="M27.96,15.328a1.8,1.8,0,1,0,1.8,1.8,1.8,1.8,0,0,0-1.8-1.8Z" transform="translate(-7.039 0)"/>
                            </g>
                        </svg>
                        </div>
                        <div class="Touch_Pad" @click="music_play(SongData[index].song_id)"></div>
                    </li>
                    <div class="leave_blank"></div>
                </ul>
            </div>
        </div>
</template>

<script>
    export default {
        name: "Single",
        props:{
           SongData:{
               type:Array,
               default() {
                   return []
               }
           }
        },
        data() {
            return{
                dd: false,
                Music_cover:[],
                Song_list:this.SongData,
                music_information:[],
                isSelect:true,
                kk:'123',
                kkl:[]

            }
        },
        computed:{
            search_song_data(){
                return this.$store.state.search_song_data
            },

        },
        watch: {

            SongData(){
                if (this.SongData.length>0){
                    this.isSelect = true
                }
            },
        },
        methods: {
            kkp(){
                console.log(this.SongData)

            },
            music_play(id) {
                this.$store.commit('advance')
                this.$router.push({ path: `/home/musicplay/${ id }`})
                this.$store.commit('get_music_play_id',id)


            },
            operation(data) {
                this.$store.commit('show_operation_panel')
                this.$emit('boxClick',data)
                // console.log(data)
            },

        },
        mounted() {
            console.log(this.Song_list)
        }
    }
</script>

<style scoped>
    .Single_Two{
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
    }
    .play_all{
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
    }
    .play_all p{
        margin-left: 0.5rem;
        font-size: 18px;
    }
    .song{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        position: relative;
    }
    .song p{
        font-family: "宋体";
        font-weight: bold;

    }
    .spacing_zero{
        /*margin-left: 1rem;*/
        margin-top: -0.25rem;
    }
    .spacing_one{
        /*margin-left: 2rem;*/
        margin-top: -0.25rem;
    }
    .song_number{
        font-size: 21px;
        margin-left: 1.25rem;
    }
    .song_singer{
        width: 80%;
        height: 100%;
        margin-left: 1.5rem;
        /*弹性盒*/
        display: flex;
        /*上下分布*/
        flex-direction: column;
        /*居中*/
        justify-content:center ;
        /*align-items: center;*/

    }
    .song_name{
        font-size: 20px;
        /*color: black;*/
        /*width: 10rem;*/
        /*border: 1px solid black;*/
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .singer_name{
        font-size: 13px;
        color: darkgray;
    }
    .song_svg{
        z-index: 2;
        height: 100%;
        width: 2rem;
        /*background-color: #409eff;*/
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .Touch_Pad{
        width: 100%;
        height: 100%;
        position: absolute;
        margin-top: 0;
        z-index: 1;
        /*background-color: #409eff;*/
    }
    .leave_blank{
        width: 100%;
        height: 15rem;

    }
    .Single_Two_box{
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>