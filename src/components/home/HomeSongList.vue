<template>
<div class="music_box">

    <div class="music_box_btn" @click="open_song_list">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.6rem" viewBox="0 0 36 32">
            <g transform="translate(-6 -8)">
                <path d="M24,19H40" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                <path d="M24,10H40" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                <path d="M8,38H40" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                <path d="M8,28H40" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                <path d="M8,10l8,5L8,20Z" fill="none" stroke="#5ab4f0" stroke-linejoin="round" stroke-width="4"/>
            </g>
        </svg>
        <span>歌单</span>
    </div>

    <div class="music_box_btn" @click="open_private_fm">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" viewBox="0 0 30.849 30.849">
            <g  transform="translate(-348.485 -343.576)">
                <path id="Icon_metro-headphones" data-name="Icon metro-headphones" d="M11.247,19.28H9.319v13.5h1.928a.967.967,0,0,0,.964-.964V20.244a.967.967,0,0,0-.964-.964Zm13.5,0a.967.967,0,0,0-.964.964V31.813a.967.967,0,0,0,.964.964h1.928V19.28Zm8.676-1.928A15.424,15.424,0,1,0,3.494,22.62,6.75,6.75,0,0,0,8.355,32.708V19.35a6.707,6.707,0,0,0-2.644.975,12.532,12.532,0,1,1,24.568,0,6.709,6.709,0,0,0-2.644-.977V32.708A6.75,6.75,0,0,0,32.5,22.62a15.394,15.394,0,0,0,.923-5.268Z" transform="translate(345.914 341.648)" fill="#5ab4f0"/>
                <path i d="M16,29.417h2.278L19.417,26,21.7,32.835l1.139-3.417h2.278" transform="translate(343.352 338)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
            </g>
        </svg>
        <span>个性音乐</span>
    </div>

    <div class="music_box_btn" @click="open_rest">
        <svg xmlns="http://www.w3.org/2000/svg" width="2.4rem" height="2.4rem" viewBox="0 0 65.777 65.777">
            <path id="路径_249" data-name="路径 249" d="M244.621,241.333a3.289,3.289,0,0,1-3.289-3.289V211.733a3.289,3.289,0,0,1,6.578,0v26.311A3.289,3.289,0,0,1,244.621,241.333Zm9.867-6.578a3.289,3.289,0,0,1-3.289-3.289V218.311a3.289,3.289,0,0,1,6.578,0v13.155A3.289,3.289,0,0,1,254.488,234.755Zm-49.333,9.867a3.289,3.289,0,0,1-3.289-3.289V208.444a3.289,3.289,0,0,1,6.578,0v32.888A3.289,3.289,0,0,1,205.155,244.621Zm9.867,13.155a3.289,3.289,0,0,1-3.289-3.289v-59.2a3.289,3.289,0,1,1,6.578,0v59.2A3.289,3.289,0,0,1,215.022,257.777Zm9.867-13.155a3.289,3.289,0,0,1-3.289-3.289V208.444a3.289,3.289,0,0,1,6.578,0v32.888A3.289,3.289,0,0,1,224.888,244.621Zm9.867-9.867a3.289,3.289,0,0,1-3.289-3.289V218.311a3.289,3.289,0,0,1,6.578,0v13.155A3.289,3.289,0,0,1,234.755,234.755Zm-39.466,0A3.289,3.289,0,0,1,192,231.466V218.311a3.289,3.289,0,0,1,6.578,0v13.155A3.289,3.289,0,0,1,195.289,234.755Z" transform="translate(-192 -192)" fill="#5ab4f0"/>
        </svg>
        <span>白噪音</span>
    </div>


</div>
</template>

<script>


    import ajax from "../../http";

    export default {
        name: "HomePage",
        components: {
        },
        data(){
          return{
              private_fm_song_data:[]
          }
        },
        methods: {
            open_song_list() {
                this.$store.commit('advance')
                this.$router.push('/home/songlistall')
            },
            async open_private_fm() {
                this.$store.commit('advance')
               await ajax(
                    this.$store.state.api_url+'personal_fm',
                    {cookie:this.$store.state.user_cookie}
                ).then((res)=>{
                    // console.log(res);
                    for (let i = 0; i<res.data.length;i++){
                        this.private_fm_song_data.push({
                            song_name:res.data[i].name,
                            song_id:res.data[i].id,
                            song_cover:res.data[i].album.picUrl,
                            song_singer:res.data[i].album.artists[0].name,
                            song_singer_id:res.data[i].album.artists[0].id
                        })
                    }
                   this.$store.commit('get_may_like_music',this.private_fm_song_data)
                }).catch((err)=>{
                    console.log(err);
                })
                this.$router.push(`/home/privatefm/${this.private_fm_song_data[0].song_id}`)

            },
            open_rest() {
                this.$store.commit('advance')
                this.$router.push(`/home/rest/${0}`)
            }

        },
        mounted() {
        },

    }
</script>

<style scoped>
.music_box{
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

    .music_box_btn{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .music_box_btn span {
      margin-top: 0.5rem;
        font-size: 15px;
    }

</style>