<template>
    <!--            歌手视频-->
    <div class="Singer_video_box">
        <ul class="Singer_video_box_ul">
            <li v-for="(item,index) in VideoResult" :key="item">
                <div class="Singer_video" @click="video_play(VideoResult[index].video_id)" >
                    <div class="Singer_video_cover">
                        <img :src="VideoResult[index].video_image">
                    </div>
                    <span class="Singer_video_name">{{ VideoResult[index].video_name }}</span>
                    <span class="Singer_video_singer_name">{{ VideoResult[index].video_user_name }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SingerVideo",
        props:{
            VideoResult:Array,
            default(){
                return []
            }
        },
        data(){
            return{

            }
        },
        methods:{
            kkp(){
                console.log(this.VideoResult)
            },
            video_play(id){
                this.$store.commit('advance')
                this.$router.push(`/video/mv/${id}`)
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .Singer_video_box{
        width: 95%;
        border-radius: 1rem;
        margin-top: 1rem;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

    }
    ul{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-left: 1rem;
    }
    li{
        list-style: none;
    }
    .Singer_video{
        display: flex;
        flex-direction:column;

    }
    .Singer_video_cover{
        width: 9.5rem;
        height: 5.5rem;
        background-color: #409eff;
        border-radius: 0.5rem;
        margin-top: 0.5rem;
    }
    .Singer_video_cover img {
        width: 9.5rem;
        height: 5.5rem;
        border-radius: 0.5rem;
    }
    .Singer_video_name{
        font-size: 15px;
        margin-top: 0.5rem;
        width: 9.5rem;
        /*height: 2.5rem;*/
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;

    }
    .Singer_video_singer_name{
        font-size: 13px;
        width: 9.5rem;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:1;
    }
    .Singer_video span{
        margin-left: 0.5rem;
    }
</style>