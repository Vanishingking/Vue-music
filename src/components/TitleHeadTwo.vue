<template>
    <div class="title_head">
        <div class="title_head_box">
            <div class="title_head_two_box">
<!--                最近播放icon-->
                <svg v-if="title == '最近播放'" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 25 24.918">
                    <g id="组_32" data-name="组 32" transform="translate(-92.245 -79.616)">
                        <path id="路径_238" data-name="路径 238" d="M104.708,79.616a12.459,12.459,0,1,0,12.463,12.459A12.461,12.461,0,0,0,104.708,79.616Zm0,18.688a6.229,6.229,0,1,1,6.232-6.229A6.231,6.231,0,0,1,104.708,98.3Z" transform="translate(0 0)" fill="#5ab4f0"/>
                        <path id="路径_239" data-name="路径 239" d="M435.8,431.707m-2.224,0a2.224,2.224,0,1,0,2.224-2.224A2.224,2.224,0,0,0,433.579,431.707Z" transform="translate(-331.1 -339.376)" fill="#5ab4f0"/>
                        <path id="路径_240" data-name="路径 240" d="M480.09,546.133l-6.642,6.635h-4.422c-.056-.32-.222-.556-.425-.556s-.369.236-.425.556h-.465v.222h.445c0,.429.2.779.445.779s.445-.349.445-.779h4.491l6.7-6.706Z" transform="translate(-362.996 -451.682)" fill="#fff"/>
                    </g>
                </svg>

                <svg v-if="title == '我的收藏'" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 22.218 21.296">
                    <path id="_收藏2小" d="M6.135,13.28,2.181,8.756,8.036,7.423l3.074-5.16,3.073,5.162,5.854,1.332-3.955,4.524.592,6.526a.926.926,0,0,0,1.844-.168L18,13.9l3.789-4.333a1.469,1.469,0,0,0-.812-2.5L15.366,5.8,12.422.848A1.468,1.468,0,0,0,9.8.848L6.851,5.794,1.243,7.07a1.47,1.47,0,0,0-.812,2.5L4.22,13.9,3.7,19.638a1.467,1.467,0,0,0,2.124,1.543l5.652-2.425a.926.926,0,1,0-.731-1.7L5.592,19.266l.543-5.986Z" transform="translate(0 -0.036)" fill="#5ab4f0"/>
                </svg>

                <svg v-if="title == '关注'" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 30 30">
                        <path id="路径_262" data-name="路径 262" d="M115.471,101l-2.112,2.1a.085.085,0,0,1,.02.013l-1.105,1.085a2.266,2.266,0,1,0,1.288,1.287l2.468-2.468h0l.727-.726,4.41.67,5.3-5.3-5.547-.794-2.59,2.579-.007-.006,2.621-2.619L120.1,91.3l-5.3,5.3Zm6.082,3.131-.469.588a7.543,7.543,0,0,1,.135,1.575,9.588,9.588,0,1,1-8.407-9.677l4.278-4.222a15.012,15.012,0,1,0,8.274,8.264Zm-10.084-1.562a3.822,3.822,0,0,1,.684.068l1.937-1.943-.358-2.349a8.31,8.31,0,1,0,5.727,5.841l-2.417-.493-1.916,1.918a3.724,3.724,0,1,1-3.658-3.041Z" transform="translate(-96.469 -91.296)" fill="#5AB4F0"/>
                </svg>

                <span class="title">{{ title }}</span>
            </div>
            <div class="go_back">
                <Back :color="1"></Back>
            </div>
        </div>
    </div>
</template>

<script>
    import Back from "./menu/Back";
    export default {
        name: "TitleHead",
        components: {Back},
        props:{
            title:String
        }
    }
</script>

<style scoped>
    .title_head{
        width: 100%;
        height: 6rem;
        display: flex;
        justify-content: center;
    }
    .title_head_box{
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3rem;

    }
    .title_head_two_box{
        height: 2rem;
        display: flex;
        align-items: center;

    }
    .title{
        margin-left: 0.25rem;
        font-size: 18px;
        font-weight: bold;
        letter-spacing:2px;
    }
    .go_back{
        position: absolute;
        width: 1.5rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 1rem;
    }
</style>