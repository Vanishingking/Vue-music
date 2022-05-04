<template>
    <div class="SearchGuide" :class="[$store.state.theme == 'night' ? 'SearchGuide_night':'']">
        <div class="search_head_box" :class="[$store.state.theme == 'night' ? 'search_head_box_night':'']">
            <div style="width: 80%;">
                <van-search v-if="$store.state.theme =='white'" v-model="search_value" placeholder="请输入搜索关键词" input-align="left"  shape="round" @search="search_originally" ref="van_search" autocomplete="off"/>
                <div v-if="$store.state.theme =='night'" class="search">
                    <i class="van-badge__wrapper van-icon van-icon-search"></i>
                    <input type="text" v-model="search_value" ref="search_input" placeholder="请输入搜索关键词">
                </div>

            </div>
            <span @click="clear_search">取消</span>
        </div>
        <div class="search_body_box">
            <ul class="search_suggestions">
                <li v-if="search_value !=undefined & search_value !=''" @click="search_originally">
                    <span class="original_sample_search">搜索</span>
                    <span class="original_sample">{{ search_value }}</span>
                </li>
                <li v-for="item in search_proposal" :key="item" @click="search_suggest(item)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16.027" viewBox="0 0 16 16.027">
                        <path id="路径_205" data-name="路径 205" d="M92.544,98.907a6.363,6.363,0,1,0-6.363-6.363A6.363,6.363,0,0,0,92.544,98.907Zm0,.848a7.211,7.211,0,1,1,7.211-7.211A7.211,7.211,0,0,1,92.544,99.755Zm6.063-.548a.424.424,0,1,1,.6-.6l2,2.029a.424.424,0,1,1-.6.6l-2-2.029Z" transform="translate(-85.333 -85.333)" fill="#a6a6a6"/>
                    </svg>
                    <span style="margin-left: 0.5rem">{{ item }}</span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import ajax from '../../http'
    export default {
        name: "SearchGuide",
        data(){
            return{
                search_value:'',
                search_proposal:[],
            }
        },
        props:{
            search_type:Number
        },
        methods:{
            clear_search(){
                this.search_value = ''
                this.$emit('CancelSearch')
                this.$store.commit('router_back')
                this.$router.go(-1)

            },
            //搜索输入框的值---原本值
            search_originally(){
                this.$store.commit('advance')

                let url_search =  this.$route.path.split('/');
                let url_search_index = url_search.findIndex(item =>item == 'searchinterface')

                if (url_search_index ==-1){
                    // 搜索单曲结果
                    if (this.search_type == 1){
                        this.$router.push(`/home/searchinterface/${this.search_value}`)
                    }else if (this.search_type == 1014){ //搜索视频结果
                        this.$router.push(`/video/searchinterface/${this.search_value}`)
                    }
                    // this.$store.state.commit('get_search_result',this.search_value)
                    this.$emit('search_originally')
                }else {
                    if (this.search_type == 1){
                        this.$router.replace(`/home/searchinterface/${this.search_value}`)
                    }else if (this.search_type == 1014){ //搜索视频结果
                        this.$router.replace(`/video/searchinterface/${this.search_value}`)
                    }
                    // this.$store.state.commit('get_search_result',this.search_value)
                    this.$emit('search_originally')
                }

            },
            //搜索搜索建议里的值
            search_suggest(value){
                this.$store.commit('advance')
                let url_search =  this.$route.path.split('/');
                let url_search_index = url_search.findIndex(item =>item == 'searchinterface')
                // 在首页
                if (url_search_index ==-1){

                    // 搜索单曲结果
                    if (this.search_type == 1){
                        this.$router.push(`/home/searchinterface/${value}`)
                    }else if (this.search_type == 1014){ //搜索视频结果
                        this.$router.push(`/video/searchinterface/${value}`)
                    }
                    this.$emit('search_suggest')
                }else {
                    if (this.search_type == 1){
                        this.$router.replace(`/home/searchinterface/${value}`)
                    }else if (this.search_type == 1014){ //搜索视频结果
                        this.$router.replace(`/video/searchinterface/${value}`)
                    }
                    this.$emit('search_suggest')
                }

            }
        },
        watch:{
            search_value(val){
               if (val !=''){
                   ajax(
                       this.$store.state.api_url+'search/suggest',
                       {keywords:this.search_value,type:'mobile'}
                   ).then((res)=>{
                       console.log(res);
                        for (let i = 0; i<res.result.allMatch.length;i++){
                            this.search_proposal.push(res.result.allMatch[i].keyword)
                        }

                   }).catch((err)=>{
                       console.log(err);
                   })
               }else {
                   this.search_proposal = []
               }
            }
        },
        mounted() {
            this.search_value = this.$route.params.value
            this.$nextTick(()=>{
                if (this.$refs.van_search != undefined){
                    this.$refs.van_search.focus()
                }else if (this.$refs.search_input !=undefined){
                    this.$refs.search_input.focus()
                }

            })
        },
    }
</script>

<style scoped>
    .SearchGuide{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 2;
        background-color: white;
    }
    .search_head_box{
        width: 100%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3.5rem;
    }
    .search_body_box{
        width: 100%;
        height: 100%;
    }
    .search_suggestions{
        width: 100%;
        height: 100%;

    }
    .search_suggestions li{
        width: 100%;
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 1rem;
    }
    .original_sample_search{
        color: #409eff;
    }
    .original_sample{
        color: #409eff;
        margin-left: 0.5rem;
    }


    .SearchGuide_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 2;
        background-color: #222225;
        color: white;
    }

    .search{
        width: 90%;
        height: 34px;
        background-color: #2A2A2D;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: var(--van-padding-sm);
    }
    .search_head_box_night{
        width: 100%;
        background-color: #222225;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3.5rem;
    }
    .search input{
        width: 100%;
        height: 100%;
        font-size: 18px;
        color: white;
        border: none;
        background-color: #2A2A2D;
        text-align: left;
        margin-left: 0.5rem;
        border-radius: 2rem;
    }
</style>