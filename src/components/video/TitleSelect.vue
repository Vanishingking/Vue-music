<template>
  <div>
    <div class="title_select" v-if="$store.state.theme != 'night'">
      <div :class="[select_title == index ? 'title_span_box_select':'title_span_box']" v-for="(item,index) in title" :key="item" @click="selectde(index)">
        <span>{{ item.type }}</span>
      </div>
    </div>

    <div class="title_select" v-else>
      <div :class="[select_title == index ? 'title_span_box_select_night':'title_span_box_night']" v-for="(item,index) in title" :key="item" @click="selectde(index)">
        <span>{{ item.type }}</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "TitleSelect",
  props:{
    title:Array
  },
  data(){
    return{
      select_title:0
    }
  },
  methods:{
    selectde(index){
      this.select_title = index
      this.$emit('change_topics',index)
    }
  }
}
</script>

<style scoped>
.title_select{
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  font-size: 15px;

}
.title_span_box_select{
  width: auto;
  height: 2rem;
  background-color: #F5F5F5;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  /*font-weight: bold;*/
}
.title_span_box_select span{
  margin-left: 1rem;
  margin-right: 1rem;
}
.title_span_box{
  width: auto;
  height: 2rem;
  /*background-color: #F5F5F5;*/
  /*border-radius: 1rem;*/
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  color: #888888;
}
.title_span_box span{
  margin-left: 1rem;
  margin-right: 1rem;
}

.title_span_box_select_night{
  width: auto;
  height: 2rem;
  background-color: #2B2B2B;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  /*font-weight: bold;*/
  color: white;
}
.title_span_box_night{
  width: auto;
  height: 2rem;
  /*background-color: #F5F5F5;*/
  /*border-radius: 1rem;*/
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  color: #888888;
}
.title_span_box_select_night span{
  margin-left: 1rem;
  margin-right: 1rem;
}
.title_span_box_night span{
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>