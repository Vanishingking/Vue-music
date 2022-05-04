<template>
    <div class="Singer">
        <ul>
            <li v-for="(item) in UserData" :key="item">
                <div class="Singer_box">
                    <img :src="item.user_image" class="Singer_image">
                    <span>{{ item.user_name }}</span>
                    <div class="gender">
                        <!--             性别-->
                        <!--                      女-->
                        <svg v-show="item.user_gender == 2" xmlns="http://www.w3.org/2000/svg" width="0.72rem" height="0.72rem" viewBox="0 0 14.621 14.622">
                            <path id="Icon_ionic-ios-female" data-name="Icon ionic-ios-female" d="M3.854,18a.468.468,0,0,0,.338-.141l1.575-1.575,1.3,1.3a.474.474,0,0,0,.338.141.468.468,0,0,0,.338-.141.477.477,0,0,0,0-.675l-1.3-1.3L8.2,13.855a5.943,5.943,0,1,0-.675-.675L5.767,14.938l-1.3-1.3a.474.474,0,0,0-.338-.141.468.468,0,0,0-.338.141.477.477,0,0,0,0,.675l1.3,1.3L3.517,17.188A.478.478,0,0,0,3.854,18ZM8.526,5.8A4.986,4.986,0,1,1,7.067,9.324,4.963,4.963,0,0,1,8.526,5.8Z" transform="translate(-3.377 -3.382)" fill="#ff6dc0"/>
                        </svg>
                        <!--                      男-->
                        <svg v-show="item.user_gender == 1" xmlns="http://www.w3.org/2000/svg" width="0.72rem" height="0.72rem" viewBox="0 0 14.724 14.728">
                            <path id="Icon_ionic-ios-male" data-name="Icon ionic-ios-male" d="M17.621,3.375H13.766a.481.481,0,0,0,0,.963h2.669L13.242,7.553a6.023,6.023,0,1,0,.68.683l3.215-3.2V7.708a.481.481,0,0,0,.963,0V3.856A.477.477,0,0,0,17.621,3.375Zm-3.236,8.741a5.028,5.028,0,1,1-1.473-3.551A4.989,4.989,0,0,1,14.385,12.116Z" transform="translate(-3.375 -3.375)" fill="#5ab4f0"/>
                        </svg>
                    </div>
                    <div v-if="item.user_id != null" class="user_btn" @click="User_next(item.user_id)"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Singer",
        data(){
          return{
              follow:-1
          }
        },
        props:{
            UserData:Array
        },
        methods:{
            User_next(id){
                this.$store.commit('advance')
                this.$router.push( `/home/userdynamic/${id}`)
            },
            kk(){
                console.log(this.UserData)
            }

        }
    }
</script>

<style scoped>
    .Singer_box{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
        position: relative;
    }
.Singer_image{
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    margin-left: 1rem;
}
    .Singer_box span{
        max-width: 60%;
        margin-left: 0.5rem;
        font-size: 18px;
    }
    .Singer_btn{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .user_btn{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .gender{
    margin-left: 0.5rem;
    }
    .follow{
        position: absolute;
        right: 1rem;
    }
</style>