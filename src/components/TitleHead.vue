<template>
    <div class="title_head">
        <div class="title_head_box">
            <span class="title">{{ title }}</span>
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
    .title{
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