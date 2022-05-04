<template>
    <div class="Played_MV">
        <ul v-if="recently_played_videos_data.length>0">
            <li v-for="item in recently_played_videos_data" :key="item">
        <div class="Video_cover">
            <img :src="item.video_image" style="width:7.25rem;height: 4.0625rem">
        </div>
        <div class="video_material">
            <span class="video_material_name">{{ item.video_name }}</span>
            <div class="time_singer">
                <span>00:00</span>
                <span>{{ item.video_singer }}</span>
                <div v-if="item.video_play_time!=''" class="Watch_time">{{ formatDate(item.video_play_time) }}</div>
            </div>
        </div>
            </li>
    </ul>
<!--&lt;!&ndash;        <button @click="kkp">+++</button>&ndash;&gt;-->
<!--        <button @click="kkpl">&#45;&#45;&#45;&#45;&#45;&#45;</button>-->
<!--        <p>{{ formatDate() }}</p>-->
    </div>
</template>

<script>
    export default {
        name: "PlayedMv",
        data(){
            return{
                // 最近播放视频数据
                // recently_played_videos_data:[],
                timer:''
            }
        },
        props:{
            // 最近播放视频数据
            recently_played_videos_data:Array
        },
        methods:{
          kkp(){

          },
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
    .Played_MV{
        /*margin-top: 4rem;*/

    }
.Video_cover{
   width: 7.25rem;
    height: 4rem;
    border-radius: 0.5rem;
    margin-left: 2.5rem;
}
    .Played_MV li{
        width: 100%;
        height: 5.5rem;
        display: flex;
        align-items: center;
    }
    .video_material{
        width: 45%;
        margin-left: 0.5rem;
    }

    .video_material_name{
        font-size: 18px;
        max-height:4rem ;
        text-align: left;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .time_singer{
        width: 100%;
        display: flex;
        justify-content:space-around ;
        font-size: 13px;
    }
    .Watch_time{
        font-size: 13px;
    }
</style>