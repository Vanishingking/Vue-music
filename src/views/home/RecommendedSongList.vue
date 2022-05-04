<template>
    <div class="SL">
        <p class="title">推荐歌单</p>

        <div class="Song_List">
            <div class="Song_List_box" @click="song_sheet(index)" v-bind:key="item" v-for="(item,index) in Recommended_Song_List">
                <div class="Song_List_img">
                    <img :src="item.picUrl" alt="">
                </div>
                <p class="Song_List_name">{{ item.name }}</p>
            </div>
        </div>
        <div class="seize"></div>
    </div>
</template>

<script>
    import ajax from "../../http";
    export default {
        name: "SongList",
        // props:{
        //     Recommended_Song_List:[]
        // },
        data(){
            return{
                path: String,
                Recommended_Song_List:[],
                img_url:'109951164726735349.jpg',


            }
        },

        methods: {
            song_sheet(index){
                // this.$router.push({ path: `/mine`})
                let id = this.Recommended_Song_List[index].id
                this.$store.commit('advance')
                this.$router.push({ path: `/home/songlistdetails/${id}`})
            }
        },
        components: {

        },
        mounted() {
            ajax(
                // 'http://127.0.0.1:3000/personalized'
                this.$store.state.api_url+'personalized'
            ).then((res)=>{
                // this.$set('Recommended_Song_List',res.result)
                // for (let i = 0; i<res.result.length;i++){
                //     this.Recommended_Song_List.push(res.result[i])
                // }
                this.Recommended_Song_List.push(res.result[2])
                this.Recommended_Song_List.push(res.result[3])
                this.Recommended_Song_List.push(res.result[4])
                this.Recommended_Song_List.push(res.result[5])
                this.Recommended_Song_List.push(res.result[7])
                this.Recommended_Song_List.push(res.result[8])
                this.Recommended_Song_List.push(res.result[9])
                this.Recommended_Song_List.push(res.result[10])
                this.Recommended_Song_List.push(res.result[11])

                console.log(this.Recommended_Song_List[1])
                console.log(this.Recommended_Song_List[2])
                console.log(this.Recommended_Song_List[3])
                console.log(this.Recommended_Song_List[4])
                console.log(this.Recommended_Song_List[6])
                console.log(this.Recommended_Song_List[7])
                console.log(this.Recommended_Song_List[8])
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;

    }
    p{
        /*字体*/
        /*font-family: "Segoe UI";*/
        font-family: "宋体";
        /*粗细*/
        /*字与字间距*/
        /*letter-spacing: 3px;*/
    }
    /*.SL{*/
    /*    position: absolute;*/
    /*    overflow-x: hidden;*/
    /*    overflow-y: scroll;*/
    /*    height: 130%;*/
    /*}*/
    /*.SL::-webkit-scrollbar {*/
    /*    display: none;!*隐藏滚动条*!*/
    /*}*/
    .Song_List{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .Song_List_box{
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
    margin-top: 50px;
    /*background-color: #409eff;*/
}
.Song_List_img img{
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 10px;
}
.Song_List_name{
    font-size: 16px;
    margin-top:0.5rem ;
    width: 6.5rem;
    height: 2.6rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 20px;
}
.title{
    font-size: 25px;
    margin-left: 27px;
    margin-top: 10px;
    font-weight: bold;
    }
    .seize{
        width: 100%;
        height: 6rem;
        /*background-color: cornflowerblue;*/
    }
</style>