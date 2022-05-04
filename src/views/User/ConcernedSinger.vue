<template>
    <div class="concerned_singer_box" :class="[$store.state.theme == 'night' ? 'concerned_singer_box_night':'']">
        <div class="concerned_singer_title">
            <TitleHead title="关注"></TitleHead>
        </div>
        <div class="concerned_singer_body">
        <Singer :Singer-data="concerned_singer_data"></Singer>
        <div class="Placeholder"></div>
        </div>
        <div>
            <Menu1 :menu_show="4"></Menu1>
        </div>
    </div>
</template>

<script>
    import Menu1 from "../../components/Menu1";
    import Singer from "../../components/home/Singer";
    import ajax from "../../http"
    import TitleHead from "../../components/TitleHeadTwo";
    export default {
        name: "ConcernedSinger",
        components: {TitleHead, Singer,Menu1},
        data(){
            return{
                concerned_singer_data:[]
            }
        },
        mounted() {
            console.log(this.$store.state.user_id_followed)
            let id = this.$route.params.id
            ajax(
                this.$store.state.api_url+'user/follows',
                {uid:id,cookie:this.$store.state.user_cookie}
            ).then((res)=>{
                console.log(res);
                for (let i = 0; i<res.follow.length;i++){
                    this.concerned_singer_data.push({
                        singer_image:res.follow[i].avatarUrl,
                        singer_name:res.follow[i].nickname,
                        user_id:res.follow[i].userId,
                        account_gender:res.follow[i].gender
                    })
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
</script>

<style scoped>
.concerned_singer_box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;

}
    .concerned_singer_title{
        width: 100%;
        height: 6rem;
        display: flex;
        justify-content: center;

    }
    .concerned_singer_title_div{
        display: flex;
        margin-top: 3.5rem;
        align-items: center;
    }
    .concerned_singer_title span{
        font-size: 20px;
        font-weight: bold;
        margin-left: 0.5rem;
    }
    .concerned_singer_body{
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }


    .concerned_singer_box_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        background-color: #222225;
        color: white;

    }
</style>