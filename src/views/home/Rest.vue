<template>
    <div class="Rest">
        <div class="break" @click="revert">
            <svg xmlns="http://www.w3.org/2000/svg" width="0.675rem" height="1.175rem" viewBox="0 0 13.503 23.619">
                <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M15.321,18l8.937-8.93a1.688,1.688,0,0,0-2.391-2.384L11.742,16.8a1.685,1.685,0,0,0-.049,2.327L21.86,29.32a1.688,1.688,0,0,0,2.391-2.384Z" transform="translate(-11.251 -6.194)" fill="#fff"/>
            </svg>
        </div>
        <div class="title">
            <span>休息</span>
        </div>
        <div class="CD_box">
            <Music_cd></Music_cd>
        </div>

        <div class="White_noise">
<!--            柴火声-->
            <div class="White_noise_box" @click="Jump('fire')">
                <svg v-show="!isSelect('fire')" xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 98 98">
                    <path  d="M62.821,38.537a26.411,26.411,0,1,1-52.821,0C10,23.951,20.158,18.221,24.221,4c16.253,7.11,16.253,28.442,16.253,28.442s4.063-12.19,16.253-15.237C57.743,28.379,62.821,32.309,62.821,38.537Z" transform="translate(10.316 4.126)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path  d="M7,36,72.011,52.253" transform="translate(7.221 37.137)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path  d="M7,52.253,72.011,36" transform="translate(7.221 37.137)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                </svg>

                <svg v-show="isSelect('fire')" xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 98 98">
                    <path d="M62.821,38.537a26.411,26.411,0,1,1-52.821,0C10,23.951,20.158,18.221,24.221,4c16.253,7.11,16.253,28.442,16.253,28.442s4.063-12.19,16.253-15.237C57.743,28.379,62.821,32.309,62.821,38.537Z" transform="translate(10.316 4.126)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M7,36,72.011,52.253" transform="translate(7.221 37.137)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M7,52.253,72.011,36" transform="translate(7.221 37.137)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                </svg>

            </div>
<!--            雷雨声-->
            <div class="White_noise_box" @click="Jump('thunder')">
                <svg v-show="!isSelect('thunder')" xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 86 86">
                    <path  d="M13.773,50.781A24.992,24.992,0,0,1,4,30.877,24.658,24.658,0,0,1,28.432,6,24.52,24.52,0,0,1,52.019,24.37a15.983,15.983,0,0,1,7.359-1.786,16.638,16.638,0,0,1,6.515,31.79" transform="translate(3.167 4.75)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path  d="M19.653,22.586l-5.068,5.068" transform="translate(11.547 17.88)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path  d="M33.333,24,19,38.335H36.924L22.584,52.7" transform="translate(15.042 19)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path  d="M35.653,38.586l-5.068,5.068" transform="translate(24.214 30.547)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                </svg>

                <svg v-show="isSelect('thunder')" xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 86 86">
                    <path d="M13.773,50.781A24.992,24.992,0,0,1,4,30.877,24.658,24.658,0,0,1,28.432,6,24.52,24.52,0,0,1,52.019,24.37a15.983,15.983,0,0,1,7.359-1.786,16.638,16.638,0,0,1,6.515,31.79" transform="translate(3.167 4.75)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M19.653,22.586l-5.068,5.068" transform="translate(11.547 17.88)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M33.333,24,19,38.335H36.924L22.584,52.7" transform="translate(15.042 19)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M35.653,38.586l-5.068,5.068" transform="translate(24.214 30.547)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                </svg>

            </div>
<!--            森林声-->
            <div class="White_noise_box" @click="Jump('forest')">
                <svg v-show="!isSelect('forest')" xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 83 83">
                <path id="路径_133" data-name="路径 133" d="M28.021,21.292,21.1,17.833,34.938,4,48.771,17.833l-6.917,3.458L55.688,35.125,45.313,38.583,60.875,55.875H9L22.833,38.583l-8.646-3.458Z" transform="translate(6.563 2.917)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                <path id="路径_134" data-name="路径 134" d="M41.208,44H17" transform="translate(12.396 32.083)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                <path id="路径_135" data-name="路径 135" d="M21.729,34,20,51.292" transform="translate(14.583 24.792)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                <path id="路径_136" data-name="路径 136" d="M27,34l1.729,17.292" transform="translate(19.688 24.792)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
            </svg>

                <svg v-show="isSelect('forest')" xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 83 83">
                    <path d="M28.021,21.292,21.1,17.833,34.938,4,48.771,17.833l-6.917,3.458L55.688,35.125,45.313,38.583,60.875,55.875H9L22.833,38.583l-8.646-3.458Z" transform="translate(6.563 2.917)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M41.208,44H17" transform="translate(12.396 32.083)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M21.729,34,20,51.292" transform="translate(14.583 24.792)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                    <path d="M27,34l1.729,17.292" transform="translate(19.688 24.792)" fill="none" stroke="#5ab4f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                </svg>

            </div>
<!--            海水声-->
            <div class="White_noise_box" @click="Jump('seawater')">
                <svg v-show="!isSelect('seawater')" xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="2.3rem" viewBox="0 0 68.842 45.892">
                <path id="Icon_awesome-water" data-name="Icon awesome-water" d="M67.193,42.738A13.806,13.806,0,0,1,60.271,40a4.635,4.635,0,0,0-5.762,0c-4.531,3.634-12.815,3.634-17.417-.179a4.436,4.436,0,0,0-5.582.215c-4.542,3.6-12.779,3.586-17.357-.2a4.506,4.506,0,0,0-5.63.239,13.554,13.554,0,0,1-6.9,2.678A1.857,1.857,0,0,0,0,44.627v3.849a1.887,1.887,0,0,0,2,1.913,21.484,21.484,0,0,0,9.491-3.1,22.92,22.92,0,0,0,22.951,0,22.92,22.92,0,0,0,22.951,0,22.1,22.1,0,0,0,9.455,3.084,1.887,1.887,0,0,0,2-1.913V44.686a1.919,1.919,0,0,0-1.65-1.948Zm0-17.214a13.806,13.806,0,0,1-6.921-2.737,4.635,4.635,0,0,0-5.762,0c-4.531,3.634-12.815,3.634-17.417-.179a4.436,4.436,0,0,0-5.582.215c-4.542,3.6-12.779,3.586-17.357-.2a4.506,4.506,0,0,0-5.63.239,13.554,13.554,0,0,1-6.9,2.678A1.857,1.857,0,0,0,0,27.413v3.849a1.887,1.887,0,0,0,2,1.913,21.484,21.484,0,0,0,9.491-3.1,22.92,22.92,0,0,0,22.951,0,22.92,22.92,0,0,0,22.951,0,22.1,22.1,0,0,0,9.455,3.084,1.887,1.887,0,0,0,2-1.913V27.473a1.919,1.919,0,0,0-1.65-1.948Zm0-17.214a13.916,13.916,0,0,1-6.921-2.737,4.635,4.635,0,0,0-5.762,0C49.979,9.207,41.7,9.207,37.093,5.394a4.436,4.436,0,0,0-5.582.215c-4.542,3.6-12.779,3.586-17.357-.2a4.506,4.506,0,0,0-5.63.239,13.554,13.554,0,0,1-6.9,2.678A1.857,1.857,0,0,0,0,10.2v3.849a1.887,1.887,0,0,0,2,1.913,21.484,21.484,0,0,0,9.491-3.1,22.92,22.92,0,0,0,22.951,0,22.92,22.92,0,0,0,22.951,0,22.1,22.1,0,0,0,9.455,3.084,1.887,1.887,0,0,0,2-1.913V10.259a1.919,1.919,0,0,0-1.65-1.948Z" transform="translate(0 -4.503)" fill="#fff"/>
            </svg>

                <svg v-show="isSelect('seawater')" xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="2.3rem" viewBox="0 0 68.842 45.892">
                    <path id="Icon_awesome-water" data-name="Icon awesome-water" d="M67.193,42.738A13.806,13.806,0,0,1,60.271,40a4.635,4.635,0,0,0-5.762,0c-4.531,3.634-12.815,3.634-17.417-.179a4.436,4.436,0,0,0-5.582.215c-4.542,3.6-12.779,3.586-17.357-.2a4.506,4.506,0,0,0-5.63.239,13.554,13.554,0,0,1-6.9,2.678A1.857,1.857,0,0,0,0,44.627v3.849a1.887,1.887,0,0,0,2,1.913,21.484,21.484,0,0,0,9.491-3.1,22.92,22.92,0,0,0,22.951,0,22.92,22.92,0,0,0,22.951,0,22.1,22.1,0,0,0,9.455,3.084,1.887,1.887,0,0,0,2-1.913V44.686a1.919,1.919,0,0,0-1.65-1.948Zm0-17.214a13.806,13.806,0,0,1-6.921-2.737,4.635,4.635,0,0,0-5.762,0c-4.531,3.634-12.815,3.634-17.417-.179a4.436,4.436,0,0,0-5.582.215c-4.542,3.6-12.779,3.586-17.357-.2a4.506,4.506,0,0,0-5.63.239,13.554,13.554,0,0,1-6.9,2.678A1.857,1.857,0,0,0,0,27.413v3.849a1.887,1.887,0,0,0,2,1.913,21.484,21.484,0,0,0,9.491-3.1,22.92,22.92,0,0,0,22.951,0,22.92,22.92,0,0,0,22.951,0,22.1,22.1,0,0,0,9.455,3.084,1.887,1.887,0,0,0,2-1.913V27.473a1.919,1.919,0,0,0-1.65-1.948Zm0-17.214a13.916,13.916,0,0,1-6.921-2.737,4.635,4.635,0,0,0-5.762,0C49.979,9.207,41.7,9.207,37.093,5.394a4.436,4.436,0,0,0-5.582.215c-4.542,3.6-12.779,3.586-17.357-.2a4.506,4.506,0,0,0-5.63.239,13.554,13.554,0,0,1-6.9,2.678A1.857,1.857,0,0,0,0,10.2v3.849a1.887,1.887,0,0,0,2,1.913,21.484,21.484,0,0,0,9.491-3.1,22.92,22.92,0,0,0,22.951,0,22.92,22.92,0,0,0,22.951,0,22.1,22.1,0,0,0,9.455,3.084,1.887,1.887,0,0,0,2-1.913V10.259a1.919,1.919,0,0,0-1.65-1.948Z" transform="translate(0 -4.503)" fill="#5ab4f0"/>
                </svg>

            </div>
        </div>
    </div>
</template>

<script>
    import Music_cd from "../../components/home/Music_cd";
    // import {useRoute} from 'vue-router'
    // import {computed} from "vue";
    export default {
        name: "Rest",
        components: {Music_cd},
        data(){
          return{
              isSelected:false
          }
        },
        methods:{
            revert(){
              this.$router.go(-1)
                this.$store.commit('router_back')

            },
            Jump(data){
                this.$router.replace('/home/rest/'+data)
                if (this.$route.params.id != data){
                    this.isSelected = true
                }else {
                    this.isSelected = !this.isSelected
                }
                if (this.isSelect){
                    this.$store.commit('music_stop')
                    this.$store.commit('music_paused_true')
                }
            },
            isSelect(data){
               if (this.$route.params.id == data && this.isSelected){
                   this.$store.commit('music_playing')
                   this.$store.commit('music_isPlaying_true')
                   this.$store.commit('music_paused_false')
                   return true
               }else {

                   return false
               }
            }
        },

    }
</script>

<style scoped>
.Rest{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;

}
.break{
    position: absolute;
    top: 3.5rem;
    left: 1rem;
    z-index: 1000;
}
    .title{
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 20px;
        margin-top: 3rem;
        color: white;
        font-weight: bold;
    }
    .CD_box{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 11rem;
    }
    .White_noise{
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 6.5rem;
    }
    .White_noise_box{
        height: 5.5rem;
        display: flex;
        align-items: center;
    }
</style>