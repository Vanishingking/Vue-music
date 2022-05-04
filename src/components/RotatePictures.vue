<template>
<div class="RotatePictures">
  <div class="recommend_box" :style="{backgroundColor: pictures_color}">
    <div class="recommend_word">
      <span class="rotatePictures_song_name" style="font-size: 25px">{{ song_name }}</span>
      <span style="font-size: 15px">{{ song_singer }}</span>
    </div>
    <div class="recommend_cover">
      <img :src="pictures" style="width:100%;height: 100%" ref="img" crossorigin="anonymous" v-if="!empty_img">
      <img src="../../public/img/empty_image.png" style="width:100%;height: 100%" ref="img" crossorigin="anonymous" v-if="empty_img">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Cs",
  data() {
    return {
      mes: 'ddd',
      img: 'img',
      pictures_rgb:[0,0,0],
      pictures_color:'',
      empty_img:true

    }

  },
  props:{
    pictures:String,
    song_name:String,
    song_singer:String,

  },
  mounted() {
    if (this.pictures == 'empty_image'){
      this.empty_img = true
    }else {
      this.empty_img = false
      this.$nextTick(()=>{
        const img = this.$refs.img
        //如果img加载完成
        if (img.complete) {
          /* eslint-disable */
          let colorthief = new ColorThief();
          this.pictures_rgb = colorthief.getPalette(img, 2)[0]
          var r = parseInt(this.pictures_rgb[0]);
          var g = parseInt(this.pictures_rgb[1]);
          var b = parseInt(this.pictures_rgb[2]);
          var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
          this.pictures_color = hex
        }else {
          //再次获取主颜色
          this.get_again_color()
        }
      })
    }

  },

  methods:{
    get_again_color(){
      this.$nextTick(()=>{
        const img = this.$refs.img
        setTimeout(()=>{
          //图片加载完成 获取主颜色
            if (img.complete) {
              /* eslint-disable */
              let colorthief = new ColorThief();
              this.pictures_rgb = colorthief.getPalette(img, 2)[0]
              var r = parseInt(this.pictures_rgb[0]);
              var g = parseInt(this.pictures_rgb[1]);
              var b = parseInt(this.pictures_rgb[2]);
              var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
              this.pictures_color = hex
            }
          else {
              //图片尚未加载完成 再次执行
            this.get_again_color()
          }
        },500)
      })
    },
  }

}
</script>

<style scoped>
.RotatePictures{
  width: 100%;
  height: 100%;
}
.recommend_box{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  /*background-color: #E7E0CB;*/
}
.recommend_word{
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height:1.5rem
}
.recommend_cover{
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.recommend_cover img{
  border-radius: 1rem;
}

.rotatePictures_song_name{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>