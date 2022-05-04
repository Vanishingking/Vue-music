<template>
<div class="FavoritePlaylist" v-if="favorite_playlist_data.length>0">
    <ul v-for="(item,index) in favorite_playlist_data" :key="item">
      <li>
          <van-swipe-cell>
            <div class="collection_music_list_box" @click="music_list(item.song_list_id)">
                      <div class="music_list_cover">
                        <img :src="item.coverImgUrl">
                      </div>
                      <div class="music_list_name">
                          <div class="list_name">{{ item.song_list_name }}</div>
                          <div class="songs">{{ item.trackCount }}首</div>
                      </div>

                      <div class="music_list_svg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="7.191" height="12.823" viewBox="0 0 7.191 12.823">
                          <path id="路径_246" data-name="路径 246" d="M350.652,235.282a.663.663,0,0,1-.464-1.137l5.382-5.274-5.382-5.274a.663.663,0,1,1,.928-.947l5.865,5.748a.663.663,0,0,1,0,.947l-5.865,5.748A.661.661,0,0,1,350.652,235.282Z" transform="translate(-349.989 -222.459)" fill="#989898"/>
                        </svg>
                      </div>
            </div>
            <template #right>
              <van-button square text="取消收藏" type="danger" class="delete-button" @click="delete_song_list(index)"/>
            </template>
          </van-swipe-cell>
      </li>
    </ul>
</div>
</template>

<script>
export default {
  name: "FavoritePlaylist",
  props:{
    favorite_playlist_data:Array
  },
  methods:{
    delete_song_list(index){
      this.$emit('cancel_collection',index)
    },
    music_list(id){
      this.$store.commit('advance')
      this.$router.push(`/user/songlistdetails/${id}`)
    }
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.FavoritePlaylist{
  width: 100%;
  height: 100%;
}
li{
  margin-top: 1rem;
}
.collection_music_list_box{
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
}
.music_list_cover{
  width: 23%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.music_list_cover img{
  height: 80%;
  border-radius: 1rem;
}
.music_list_name{
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.list_name{
  font-size: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.songs{
  color: #989898;
}
.music_list_svg{
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-button {
  height: 100%;
  margin-left: 0.1rem;
  width: 4rem;
}
</style>