<template>
    <div class="search_box">
        <div class="search">
            <i class="van-badge__wrapper van-icon van-icon-search"></i>
            <span>{{ value }}</span>
        </div>
    </div>
</template>

<script>
    // import ajax from '../../http/index'
    export default {
        props:{
            value:String
        },
        data() {
        return{

        }
        }




    }
</script>

<style scoped>
    .search_box{
        width: 100%;
        height: 54px;
        background-color: #222225;
        display: flex;
        justify-content: center;
        align-items: center;
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
    .search span{
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #545457;
    }
</style>