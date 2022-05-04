<template>
    <div class="Song_List">
        <div class="Song_List_box" @click="song_sheet(index)" v-bind:key="item" v-for="(item,index) in Song_List">
            <div class="Song_List_img">
                <img :src="Song_List[index].coverImgUrl" alt="">
            </div>
            <p class="Song_List_name">{{ Song_List[index].name }}</p>
        </div>
        <div class="seize"></div>
    </div>
</template>

<script>
    export default {
        name: "SongList",
        props:{
            Song_List:Array
        },
        data(){
            return{
                path: String,


            }
        },

        methods: {
            song_sheet(index){
                this.$store.commit('advance')
                this.$router.push({ path: `/home/songlistdetails/${this.Song_List[index].id}`})
            }
        }
    }
</script>

<style scoped>
    p{
        /*字体*/
        /*font-family: "Segoe UI";*/
        font-family: "宋体";
        line-height: 20px;
        /*粗细*/
        /*font-weight: bold;*/
        /*字与字间距*/
        /*letter-spacing: 3px;*/
    }
    .Song_List{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        /*position: absolute;*/
        /*overflow-x: hidden;*/
        /*overflow-y: scroll;*/
    }
    .Song_List_box{
        width: 7rem;
        height: 11rem;
        display: flex;
        /*上下分布*/
        flex-direction: column;
        /*居中*/
        justify-content: center;
        align-items: center;
    }
    .Song_List_img{
        width: 6.25rem;
        height: 6.25rem;
        border-radius: 10px;
        /*margin-top: 50px;*/
        /*background-color: #409eff;*/
    }
    .Song_List_img img{
        width: 6.25rem;
        height: 6.25rem;
        border-radius: 10px;
    }
    .Song_List_name{
        font-size: 14px;
        margin-top:0.5rem ;
        width: 6.5rem;
        height: 2.6rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;

    }
    .title{
        font-size: 25px;
        margin-left: 27px;
        margin-top: 10px;
    }
    .seize{
        width: 100%;
        height: 6rem;
        /*background-color: cornflowerblue;*/
    }
</style>