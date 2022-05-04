<template>
<div class="MinePage">
    <div class="Placeholder">
        <p>我的音乐</p>
    </div>
    <ul>
        <li @click="localmusic">
            <div class="mine_box">
                <div class="mine_music_box">
                    <svg class="mine_ico" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 30 30">
                        <g id="Icon_feather-music" data-name="Icon feather-music" transform="translate(-3 -3)">
                            <path id="路径_60" data-name="路径 60" d="M13.5,27V7.5l18-3V24" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                            <path id="路径_61" data-name="路径 61" d="M13.5,27A4.5,4.5,0,1,1,9,22.5,4.5,4.5,0,0,1,13.5,27Z" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                            <path id="路径_62" data-name="路径 62" d="M31.5,24A4.5,4.5,0,1,1,27,19.5,4.5,4.5,0,0,1,31.5,24Z" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        </g>
                    </svg>
                    <span>本地音乐</span>
                    <svg class="mine_next" xmlns="http://www.w3.org/2000/svg" width="8.234" height="15.816" viewBox="0 0 8.234 15.816">
                        <path id="Icon_ionic-ios-arrow-forward" data-name="Icon ionic-ios-arrow-forward" d="M17,14.1l-5.45-5.98a1.2,1.2,0,0,1,0-1.6.973.973,0,0,1,1.458,0L19.181,13.3a1.21,1.21,0,0,1,.03,1.559l-6.2,6.823a.971.971,0,0,1-1.458,0,1.2,1.2,0,0,1,0-1.6Z" transform="translate(-11.246 -6.196)" fill="#505050"/>
                    </svg>
                </div>
                <div class="mine_hr">
                <svg xmlns="http://www.w3.org/2000/svg" width="331" height="1" viewBox="0 0 331 1">
                    <line id="直线_6" data-name="直线 6" x2="331" transform="translate(0 0.5)" fill="none" stroke="#707070" stroke-width="1"/>
                </svg>
                </div>
            </div>
        </li>
        <li @click="recentlyplayed">
            <div class="mine_box">
                <div class="mine_music_box">
                    <svg class="mine_ico" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.05rem" viewBox="0 0 28.5 21">
                        <path id="Icon_material-queue-music" data-name="Icon material-queue-music" d="M22.5,9H4.5v3h18Zm0,6H4.5v3h18Zm-18,9h12V21H4.5Zm21-15V21.27a4.493,4.493,0,1,0,3,4.23V12H33V9Z" transform="translate(-4.5 -9)" fill="#5ab4f0"/>
                    </svg>
                    <span>最近播放</span>
                    <svg class="mine_next" xmlns="http://www.w3.org/2000/svg" width="8.234" height="15.816" viewBox="0 0 8.234 15.816">
                        <path id="Icon_ionic-ios-arrow-forward" data-name="Icon ionic-ios-arrow-forward" d="M17,14.1l-5.45-5.98a1.2,1.2,0,0,1,0-1.6.973.973,0,0,1,1.458,0L19.181,13.3a1.21,1.21,0,0,1,.03,1.559l-6.2,6.823a.971.971,0,0,1-1.458,0,1.2,1.2,0,0,1,0-1.6Z" transform="translate(-11.246 -6.196)" fill="#505050"/>
                    </svg>
                </div>
                <div class="mine_hr">
                    <svg xmlns="http://www.w3.org/2000/svg" width="331" height="1" viewBox="0 0 331 1">
                        <line id="直线_6" data-name="直线 6" x2="331" transform="translate(0 0.5)" fill="none" stroke="#707070" stroke-width="1"/>
                    </svg>
                </div>
            </div>
        </li>
        <li @click="mycollection">
            <div class="mine_box">
                <div class="mine_music_box">
                    <svg class="mine_ico" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 30 30">
                        <path id="Icon_material-library-music" data-name="Icon material-library-music" d="M30,3H12A3.009,3.009,0,0,0,9,6V24a3.009,3.009,0,0,0,3,3H30a3.009,3.009,0,0,0,3-3V6A3.009,3.009,0,0,0,30,3Zm-3,7.5H22.5v8.25A3.75,3.75,0,1,1,18.75,15a3.671,3.671,0,0,1,2.25.765V7.5h6ZM6,9H3V30a3.009,3.009,0,0,0,3,3H27V30H6Z" transform="translate(-3 -3)" fill="#5ab4f0"/>
                    </svg>
                    <span>我的收藏</span>
                    <svg class="mine_next" xmlns="http://www.w3.org/2000/svg" width="8.234" height="15.816" viewBox="0 0 8.234 15.816">
                        <path id="Icon_ionic-ios-arrow-forward" data-name="Icon ionic-ios-arrow-forward" d="M17,14.1l-5.45-5.98a1.2,1.2,0,0,1,0-1.6.973.973,0,0,1,1.458,0L19.181,13.3a1.21,1.21,0,0,1,.03,1.559l-6.2,6.823a.971.971,0,0,1-1.458,0,1.2,1.2,0,0,1,0-1.6Z" transform="translate(-11.246 -6.196)" fill="#505050"/>
                    </svg>
                </div>
                <div class="mine_hr">
                    <svg xmlns="http://www.w3.org/2000/svg" width="331" height="1" viewBox="0 0 331 1">
                        <line id="直线_6" data-name="直线 6" x2="331" transform="translate(0 0.5)" fill="none" stroke="#707070" stroke-width="1"/>
                    </svg>
                </div>
            </div>
        </li>
    </ul>
<div class="my_song_list">
    <svg xmlns="http://www.w3.org/2000/svg" width="1.175rem" height="0.675rem" viewBox="0 0 23.616 13.503">
        <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M18,20.679l8.93-8.937a1.681,1.681,0,0,1,2.384,0,1.7,1.7,0,0,1,0,2.391L19.2,24.258a1.685,1.685,0,0,1-2.327.049L6.68,14.14a1.688,1.688,0,0,1,2.384-2.391Z" transform="translate(-6.188 -11.246)"/>
    </svg>
    <span>我的歌单</span>

</div>
</div>
</template>

<script>
    export default {
        name: "MinePage",
        methods: {
            localmusic() {
                this.$store.commit('advance')
                this.$router.push('/mine/localmusic')

            },
            recentlyplayed() {
                this.$store.commit('advance')
                this.$router.push('/mine/recentlyplayed')
            },
            mycollection() {
                this.$store.commit('advance')
                this.$router.push('/mine/mycollection')
            }
        }

    }
</script>

<style scoped>
    .Placeholder p{
        width: 100%;
        text-align: center;
        z-index: 1001;
        font-size: 20px;
        margin-top: 3rem;

    }
.mine_music_box{
    width: 100%;
    height: 4rem;
    display: flex;
   align-items: center;

}
.mine_music_box span{
    font-size: 20px;
}


    .mine_ico{
        margin-left: 1.5rem;
        margin-right: 1.5rem;
    }
    .mine_next{
        margin-left: 11.25rem;
    }
    .mine_hr{
        display: flex;
        justify-content: center;
    }

    .my_song_list{
        width: 100%;
        height: 3.5rem;
        display: flex;
        align-items: center;
        margin-top: 1rem;
    }
    .my_song_list span{
        font-size: 22px;
        margin-left: 1.8rem;
    }
    .my_song_list svg{
        margin-left: 1.75rem;

    }
</style>