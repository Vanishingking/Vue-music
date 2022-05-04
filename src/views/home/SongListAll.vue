<template>
    <div class="SongListAll" :class="[$store.state.theme == 'night' ? 'SongListAll_night':'']">
        <div class="song_all_head" :class="[$store.state.theme == 'night' ? 'song_all_head_night':'']">
            <TitleHead title="歌单"></TitleHead>
            <div class="song_classification_box">
                <div class="song_list_classification" v-for="(item, index) in Song_list_classification" v-bind:key="item" @click="choice_song_list(index)">
                <span :class="{ span_select: song_classification_choice === index }">{{ item.types }}</span>
        <!--            <hr :class="{ hr_select: song_classification_choice === index }">-->
                    <svg v-show="song_classification_choice === index" xmlns="http://www.w3.org/2000/svg" width="10" height="3" viewBox="0 0 10 3">
                        <line id="直线_22" data-name="直线 22" x2="7" transform="translate(1.5 1.5)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-width="3"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="song_all_body">
            <SongList :Song_List="Recommended_Song_List"></SongList>
        </div>
        <!--        菜单-->
        <div>
            <Menu1 :menu_show="1"></Menu1>
        </div>
    </div>

</template>

<script>
    import ajax from "../../http";
    import SongList from "../../components/home/SongList";
    import Menu1 from "../../components/Menu1";
    import TitleHead from "../../components/TitleHead";
    export default {
        name: "SongListAll",
        components: {
            TitleHead,
            SongList,Menu1,
        },
        data(){
            return{
                Recommended_Song_List:[],
                song_classification_choice: 0,
                items: [{ message: 'Foo' }, { message: 'Bar' }],
                parentMessage: 'Parent',
                Song_list_classification:[
                    {
                        types:'最热'
                    },
                    {
                        types: '古风'
                    },
                    {
                    types:'流行'
                    },
                    {
                        types:'华语'
                    },
                    {
                        types:"摇滚"
                    },
                    {
                        types:"民谣"
                    }

                ]
            }

        },
        methods: {
            choice_song_list(index){
                this.song_classification_choice = index
                console.log(this.Song_list_classification[index])
                switch (index) {
                    case 0:
                        this.Recommended_Song_List.splice(0,this.Recommended_Song_List.length);
                    ajax(
                        // 'http://127.0.0.1:3000/top/playlist?order=hot'
                        this.$store.state.api_url+'top/playlist?order=hot'

                    ).then((res)=>{
                        console.log(res.playlists)
                        // this.$set('Recommended_Song_List',res.result)
                        for (let i = 0; i<res.playlists.length;i++){
                            this.Recommended_Song_List.push(res.playlists[i])
                        }
                        // console.log(this.Recommended_Song_List[1])
                    }).catch((error)=>{
                        console.log(error)
                    });break;
                    case 1:
                        this.Recommended_Song_List.splice(0,this.Recommended_Song_List.length);
                        ajax(
                        this.$store.state.api_url+'top/playlist?cat=古风'
                        ).then((res)=>{
                            console.log(res.playlists)
                            for (let i = 0; i<res.playlists.length;i++){
                                this.Recommended_Song_List.push(res.playlists[i])
                            }
                        }).catch((error)=>{
                            console.log(error)
                        });break;


                    case 2:
                        this.Recommended_Song_List.splice(0,this.Recommended_Song_List.length);
                    ajax(

                        this.$store.state.api_url+'top/playlist?cat=流行'
                    ).then((res)=>{
                        console.log(res.playlists)
                        for (let i = 0; i<res.playlists.length;i++){
                            this.Recommended_Song_List.push(res.playlists[i])
                        }
                    }).catch((error)=>{
                        console.log(error)
                    });break;

                    case 3:
                        this.Recommended_Song_List.splice(0,this.Recommended_Song_List.length);
                        ajax(

                            this.$store.state.api_url+'top/playlist?cat=华语'
                        ).then((res)=>{
                            console.log(res.playlists)
                            for (let i = 0; i<res.playlists.length;i++){
                                this.Recommended_Song_List.push(res.playlists[i])
                            }
                        }).catch((error)=>{
                            console.log(error)
                        });break;

                    case 4:
                        this.Recommended_Song_List.splice(0,this.Recommended_Song_List.length);
                        ajax(

                            this.$store.state.api_url+'top/playlist?cat=摇滚'
                        ).then((res)=>{
                            console.log(res.playlists)
                            for (let i = 0; i<res.playlists.length;i++){
                                this.Recommended_Song_List.push(res.playlists[i])
                            }
                        }).catch((error)=>{
                            console.log(error)
                        });break;

                    case 5:
                        this.Recommended_Song_List.splice(0,this.Recommended_Song_List.length);
                        ajax(

                            this.$store.state.api_url+'top/playlist?cat=民谣'
                        ).then((res)=>{
                            console.log(res.playlists)
                            for (let i = 0; i<res.playlists.length;i++){
                                this.Recommended_Song_List.push(res.playlists[i])
                            }
                        }).catch((error)=>{
                            console.log(error)
                        });break;
                }

            }
        },

        mounted() {
            ajax(
                // 'http://127.0.0.1:3000/top/playlist?order=hot'
            this.$store.state.api_url+'top/playlist?order=hot'
            ).then((res)=>{
                console.log(res.playlists)
                // this.$set('Recommended_Song_List',res.result)
                for (let i = 0; i<res.playlists.length;i++){
                    this.Recommended_Song_List.push(res.playlists[i])
                }
                // console.log(this.Recommended_Song_List[1])
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
</script>

<style scoped>
    .SongListAll{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        background-color: white;
    }
    /*.SongListAll::-webkit-scrollbar {*/
    /*    display: none;!*隐藏滚动条*!*/
    /*}*/

    .song_all_head{
        width: 100%;
        background-color: white;
    }
/*.title{*/
/*    font-size: 20px;*/
/*    display: flex;*/
/*    justify-content: center;*/
/*    width: 100%;*/
/*    height: 6rem;*/
/*}*/
/*    .title span{*/
/*        margin-top: 3.5rem;*/
/*        font-weight: bold;*/
/*    }*/
    .song_classification_box{
        display: flex;
        font-size: 18px;
        margin-top: 1.1rem;
        margin-bottom: 1rem;


    }
    .song_list_classification{
        margin-left: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .song_list_classification span{
        font-size: 18px;
    }
    .song_list_classification svg{
        margin-top: 0.3rem;
    }
    .span_select{
        /*color: black;*/
        font-weight: bold;
        font-size: 20px;
    }
    .song_all_body{
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }


    .SongListAll_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        background-color: #222225;
        color: white;
    }
    .song_all_head_night{
        width: 100%;
        background-color: #222225;
    }

</style>