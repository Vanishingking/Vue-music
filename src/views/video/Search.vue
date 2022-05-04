<template>
    <div class="search_box">
    <div class="search">
        <div class="icon iconfont" v-show="icon=='搜索MV'||search_value!=''" >&#xe623;</div>
        <input type="text" id="search_box" class="icon iconfont" v-ggfocus="kks === '1'"
               @blur="icon_centered"
               v-model="search_value"
               :placeholder='icon'
               @focus="icon_move">
        <div class="search_cancel"  @click="situation_content" v-show="icon=='搜索MV'||search_value!=''" >
            <svg xmlns="http://www.w3.org/2000/svg" width="13.027" height="13.027" viewBox="0 0 13.027 13.027">
                <path id="Icon_ionic-ios-close-circle" data-name="Icon ionic-ios-close-circle" d="M9.889,3.375A6.514,6.514,0,1,0,16.4,9.889,6.513,6.513,0,0,0,9.889,3.375Zm1.65,8.872L9.889,10.6l-1.65,1.65a.5.5,0,1,1-.708-.708l1.65-1.65-1.65-1.65a.5.5,0,0,1,.708-.708l1.65,1.65,1.65-1.65a.5.5,0,1,1,.708.708L10.6,9.889l1.65,1.65a.5.5,0,0,1,0,.708A.5.5,0,0,1,11.539,12.247Z" transform="translate(-3.375 -3.375)" fill="rgba(0,0,0,0.28)"/>
            </svg>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "Cscs",
        data() {
        return{
            kks: '',
            icon: '\ue623 搜索MV',
            search_value: '',
            kk: false
        }
        },
        directives:{
            ggfocus: {
                beforeUpdate(el,binding){
                    if (binding.value){
                        el.focus()
                    }
                }
            }
        },
        methods: {

            situation_content(){
                    this.kks = '1'
                    this.search_value = ''
                },

            icon_centered(){
                this.icon = '\ue623 搜索MV'
                this.kks = ''

            },
            icon_move(){
                this.icon = '搜索MV'

            }
        }

    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;

    }
    input{
        box-sizing: border-box;
    }

    input::-ms-input-placeholder{
        text-align: center;
    }
    input::-webkit-input-placeholder{
        text-align: center;
    }
    input:focus{outline:none;}
    .search_box{
        width: 100%;
        height: 5.5rem;
        background-color: white;
        position: fixed;
        top: 0;
        z-index: 997;
        display: flex;
        justify-content: center;
    }
    .search{
        width: 14.75rem;
        height: 1.9rem;
        border-radius: 20px;
        border: 1px solid black;
        display: flex;
        /*子元素水平方向中间对其*/
        justify-content: center;
        /*子元素垂直方向居中*/
        align-items: center;
        margin-top: 3rem;
    }

    #search_box{
        width: 10rem;
        height: 1.8rem;
        border: none;
        font-size: 15px;
        margin-left: 10px;
    }
    .search_cancel{
        float:left;
        margin-left: 10px;
    }

</style>