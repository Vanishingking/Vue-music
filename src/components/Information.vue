<template>
   <router-view v-slot="{ Component }"  >
      <transition :name="$store.state.skip_mode"  >
         <component :is="Component" />
      </transition>
   </router-view>
</template>

<script>

    export default {
        name: "information",
       components: {},
       data(){
         return{

         }
       },
       watch:{

       },
       methods:{
          startPlay(){
             this.$emit('PlayMusic')
          },

       }
    }
</script>

<style scoped>

   /*进入开始时*/
   .right_left-enter-from{;
      transform: translateX(100%);
      z-index: 1;
   }

   .right_left-enter-active{
      transform: translatex(50%);
      transition: all 0.5s ease-out;
      z-index: 2;

   }
   /*进入结束*/
   .right_left-enter-to{
      transform: translatex(0);
      z-index: 3;


   }
   /*离开开始时动效*/
   .right_left-leave-from{
      /*opacity: 1;*/
      z-index: 1;
      transform: scale(1)

   }
   .right_left-leave-active{
      /*opacity: 0.5;*/
      transition: all 0.5s ease-out;
      z-index: -1;
      transform: scale(0.95)

   }
   /*离开结束时动效*/
   .right_left-leave-to{
      z-index: -2;
      transform: scale(0.9)
   }




   /*进入开始时*/
   .left_right-enter-from{;
      transform: scale(0.9);
      z-index: -2;

   }

   .left_right-enter-active{

      transform: scale(0.95);
      transition: all 0.4s ease-out;
      z-index: -1;

   }
   /*进入结束*/
   .left_right-enter-to{

      transform: scale(1);
      z-index: 1;


   }
   /*离开开始时动效*/
   .left_right-leave-from{

      transform: translatex(0%);
      z-index: 3;
   }
   .left_right-leave-active{

      transform: translatex(50%);
      transition: all 0.2s ease-out;
      z-index: 2;
   }
   /*离开结束时动效*/
   .left_right-leave-to{

      transform: translatex(100%);
      z-index: 1;
   }


</style>