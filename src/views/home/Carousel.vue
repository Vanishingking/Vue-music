<template>
    <div class="Carousel_box">
    <el-carousel class="Carousel" height="7rem">
        <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
    </div>
</template>

<style>
    *{
        margin: 0;
        padding: 0;

    }
    .Carousel_box{
        display: flex;
        justify-content: center;

    }
    .Carousel{
        width: 18.7rem;
        border-radius: 10px;
        margin-top: 1rem;

    }

    /*控制器样式*/
    .Carousel .el-carousel__button{
            width: 5px;
            height: 5px;
            border-radius: 5px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 15rem;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>