<template>
    <div class="minemusichead">
<!--        本地音乐-->
    <div v-show="isSelected1" class="Localmusic">
        <div class="local_music_box">
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 22.218 21.296">
                <path id="_收藏2小" d="M6.135,13.28,2.181,8.756,8.036,7.423l3.074-5.16,3.073,5.162,5.854,1.332-3.955,4.524.592,6.526a.926.926,0,0,0,1.844-.168L18,13.9l3.789-4.333a1.469,1.469,0,0,0-.812-2.5L15.366,5.8,12.422.848A1.468,1.468,0,0,0,9.8.848L6.851,5.794,1.243,7.07a1.47,1.47,0,0,0-.812,2.5L4.22,13.9,3.7,19.638a1.467,1.467,0,0,0,2.124,1.543l5.652-2.425a.926.926,0,1,0-.731-1.7L5.592,19.266l.543-5.986Z" transform="translate(0 -0.036)" fill="#5ab4f0"/>
            </svg>
            <span>我的收藏</span>
        </div>
    </div>
        <!--最近播放-->
        <div v-show="isSelected3" class="recentlyplayed">
            <div class="local_music_box">
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 22.769 22.762">
                    <g id="音乐_乐符" data-name="音乐、乐符" transform="translate(-54.23 -63.864)">
                        <path id="路径_160" data-name="路径 160" d="M57.38,715.667a3.15,3.15,0,1,1,3.15-3.15A3.153,3.153,0,0,1,57.38,715.667Zm0-5.294a2.144,2.144,0,1,0,2.144,2.144A2.147,2.147,0,0,0,57.38,710.373Zm16.47,5.046A3.15,3.15,0,1,1,77,712.27,3.153,3.153,0,0,1,73.849,715.419Zm0-5.294a2.144,2.144,0,1,0,2.144,2.144A2.147,2.147,0,0,0,73.849,710.125Z" transform="translate(0 -629.041)" fill="#5ab4f0"/>
                        <path id="路径_161" data-name="路径 161" d="M281.872,186.553a.5.5,0,0,1-.5-.5V169.933a.5.5,0,1,1,1.005,0v16.118A.5.5,0,0,1,281.872,186.553Zm-16.47.254a.5.5,0,0,1-.5-.5v-13.95a.5.5,0,0,1,1.005,0v13.951A.5.5,0,0,1,265.4,186.807Z" transform="translate(-205.376 -102.914)" fill="#5ab4f0"/>
                        <path id="路径_162" data-name="路径 162" d="M265.526,69.588a.5.5,0,0,1,.332-.628l16.43-5.073a.5.5,0,1,1,.3.96l-16.43,5.073A.5.5,0,0,1,265.526,69.588Z" transform="translate(-205.964)" fill="#5ab4f0"/>
                    </g>
                </svg>

            <span>最近播放</span>
            </div>
        </div>
<!--        我的收藏-->
        <div v-show="isSelected2" class="mycollection">
            <div class="local_music_box">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                    <path id="Icon_material-library-music" data-name="Icon material-library-music" d="M30,3H12A3.009,3.009,0,0,0,9,6V24a3.009,3.009,0,0,0,3,3H30a3.009,3.009,0,0,0,3-3V6A3.009,3.009,0,0,0,30,3Zm-3,7.5H22.5v8.25A3.75,3.75,0,1,1,18.75,15a3.671,3.671,0,0,1,2.25.765V7.5h6ZM6,9H3V30a3.009,3.009,0,0,0,3,3H27V30H6Z" transform="translate(-3 -3)" fill="#5ab4f0"/>
                </svg>
                <span>我的收藏</span>
            </div>
        </div>

    </div>
</template>

<script>
    import {useRoute} from 'vue-router'
    import {computed} from "vue";
    export default {
        name: "LocalMusic",
        data() {
            return {
                localmusic: '/localmusic',
                mycollection: '/mycollection',
                recentlyplayed: '/recentlyplayed',

            }
        },
        setup() {

            //选项是否选中
            const route = useRoute()
            //ture false
            //判断本地音乐
            const isSelected1 = computed(()=>{
                return route.path.includes('/localmusic')
            })
            //判断最近播放
            const isSelected2 = computed(()=>{
                return route.path.includes('/mycollection')
            })
            //判断我的收藏
            const isSelected3 = computed(()=>{
                return route.path.includes('/recentlyplayed')
            })
            return{
                isSelected1,
                isSelected2,
                isSelected3

            }
        }

    }

</script>

<style scoped>
    .Localmusic{
        width: 100%;
        height: 3rem;
        /*background-color: white;*/
    }
    .recentlyplayed{
        width: 100%;
        height: 3rem;
        background-color: white;
    }
    .mycollection{
        /*position: fixed;*/
        /*top: 0;*/
        width: 100%;
        height: 3rem;
        /*background-color: white;*/
    }
    .local_music_box{
        width: 100%;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3rem;
    }
    .local_music_box span{
        font-size: 20px;
        margin-left: 0.5rem;
        font-weight: bold;
    }
</style>