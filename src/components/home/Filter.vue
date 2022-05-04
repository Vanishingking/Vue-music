<template>
    <div class="filter" :class="[$store.state.theme == 'night' ? 'filter_night':'']">
        <!--        分类-->
        <div class="local_Classification">
            <div class="local_classification" v-for="(item, index) in content" v-bind:key="item" @click="choice_song_list(index)">
                <span :class="{ span_select: song_classification_choice === index }">{{ item.types }}</span>
                <svg v-show="song_classification_choice === index" xmlns="http://www.w3.org/2000/svg" width="10" height="3" viewBox="0 0 10 3">
                    <line id="直线_22" data-name="直线 22" x2="7" transform="translate(1.5 1.5)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-width="3"/>
                </svg>
            </div>
        </div>
        <!--        分类-->
    </div>
</template>

<script>
    export default {
        name: "Filter",
        props: {
            content:Array,
            default(){
                return []
            }
        },
        data() {
            return{
                song_classification_choice: 0,
            }
        },
        mounted() {
            if (this.$route.path.includes('/home')){
                this. song_classification_choice = 0
            }else if(this.$route.path.includes('/video')){
                this. song_classification_choice = 2
            }
        },
        methods: {
            choice_song_list(index){
                this.song_classification_choice = index
                this.$emit('boxClick',this.content[index].types)

            },

        },

    }
</script>

<style scoped>
    *{
        font-family: 宋体;
    }
    .local_Classification{
        display: flex;
        font-size: 18px;
        /*margin-top: 1.1rem;*/
        margin-bottom: 1rem;
        /*border-bottom: 1px solid black;*/
        justify-content: space-around;
    }
    .local_classification{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.5rem;

    }
    .song_list_classification>hr{
        margin-top: 0.5rem;
        border: 0;/*是去掉fierfoxf的一条阴影线*/
        height: 0.2rem;/* 水平高度*/
    }
    .song_list_classification span{
        font-size: 18px;
    }
    .span_select{
        /*color: black;*/
        font-weight: bold;
    }


    .filter_night{
        background-color: #222225;
    }
</style>