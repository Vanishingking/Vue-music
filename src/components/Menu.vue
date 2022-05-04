<template>
    <div class="menu" v-show="isSelected">
    <TabBar>
        <TabBarItem path="/home" selectedColor="#5AB4F0">
            <!--  图标-->
            <template v-slot:item-icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.625rem" height="1.51rem" viewBox="0 0 32.502 30.245" >
                    <path id="Icon_ionic-ios-pulse" data-name="Icon ionic-ios-pulse" d="M30.558,19.132a3.394,3.394,0,0,0-3.389,2.313H24.434l-2-6a1.125,1.125,0,0,0-1.069-.773h-.021a1.112,1.112,0,0,0-1.055.816L17.163,26.4,13.486,4.317a1.129,1.129,0,0,0-2.208-.091L7.552,21.445H3.375A1.128,1.128,0,0,0,2.25,22.57h0A1.128,1.128,0,0,0,3.375,23.7H8.438a1.121,1.121,0,0,0,1.09-.851l2.63-12.811,3.607,21.649a1.117,1.117,0,0,0,1.048.935h.063a1.129,1.129,0,0,0,1.083-.816L21.452,19.6l1.1,3.326a1.134,1.134,0,0,0,1.069.773h3.593a3.376,3.376,0,1,0,3.34-4.563Z" transform="translate(-1.75 -2.873)" fill="none" stroke="#000" stroke-width="1"/>
                </svg>
            </template >
            <template v-slot:item-icon-selected>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.625rem" height="1.51rem" viewBox="0 0 31.502 29.244">
                    <path id="Icon_ionic-ios-pulse" data-name="Icon ionic-ios-pulse" d="M30.558,19.132a3.394,3.394,0,0,0-3.389,2.313H24.434l-2-6a1.125,1.125,0,0,0-1.069-.773h-.021a1.112,1.112,0,0,0-1.055.816L17.163,26.4,13.486,4.317a1.129,1.129,0,0,0-2.208-.091L7.552,21.445H3.375A1.128,1.128,0,0,0,2.25,22.57h0A1.128,1.128,0,0,0,3.375,23.7H8.438a1.121,1.121,0,0,0,1.09-.851l2.63-12.811,3.607,21.649a1.117,1.117,0,0,0,1.048.935h.063a1.129,1.129,0,0,0,1.083-.816L21.452,19.6l1.1,3.326a1.134,1.134,0,0,0,1.069.773h3.593a3.376,3.376,0,1,0,3.34-4.563Z" transform="translate(-2.25 -3.374)" fill="#5ab4f0"/>
                </svg>
            </template>
            <!--  标题-->
            <template v-slot:item-title>
                <p>发现</p>
            </template>
        </TabBarItem>
        <TabBarItem path="/video" selectedColor="#5AB4F0">
            <!--  图标-->
            <template v-slot:item-icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.55rem" height="1.55rem" viewBox="0 0 30.977 30.961">
                    <path id="Icon_material-slow-motion-video" data-name="Icon material-slow-motion-video" d="M19.575,14.685,15,11.25v13.5l4.575-3.435L24,18Zm0,0L15,11.25v13.5l4.575-3.435L24,18Zm0,0L15,11.25v13.5l4.575-3.435L24,18ZM16.5,6.105V3.075A14.923,14.923,0,0,0,8.52,6.39l2.13,2.145A11.912,11.912,0,0,1,16.5,6.1ZM8.535,10.65,6.39,8.52A14.923,14.923,0,0,0,3.075,16.5h3.03A11.912,11.912,0,0,1,8.535,10.65ZM6.105,19.5H3.075A14.923,14.923,0,0,0,6.39,27.48l2.145-2.145A11.8,11.8,0,0,1,6.1,19.5ZM8.52,29.61a14.972,14.972,0,0,0,7.98,3.315v-3.03a11.912,11.912,0,0,1-5.85-2.43L8.52,29.61ZM33,18A15.022,15.022,0,0,1,19.575,32.925v-3.03a12,12,0,0,0,0-23.79V3.075A15.022,15.022,0,0,1,33,18Z" transform="translate(-2.523 -2.52)" fill="none" stroke="#000" stroke-width="1"/>
                </svg>
            </template>
            <template v-slot:item-icon-selected>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 29.925 29.85">
                    <path id="Icon_material-slow-motion-video" data-name="Icon material-slow-motion-video" d="M19.575,14.685,15,11.25v13.5l4.575-3.435L24,18Zm0,0L15,11.25v13.5l4.575-3.435L24,18Zm0,0L15,11.25v13.5l4.575-3.435L24,18ZM16.5,6.105V3.075A14.923,14.923,0,0,0,8.52,6.39l2.13,2.145A11.912,11.912,0,0,1,16.5,6.1ZM8.535,10.65,6.39,8.52A14.923,14.923,0,0,0,3.075,16.5h3.03A11.912,11.912,0,0,1,8.535,10.65ZM6.105,19.5H3.075A14.923,14.923,0,0,0,6.39,27.48l2.145-2.145A11.8,11.8,0,0,1,6.1,19.5ZM8.52,29.61a14.972,14.972,0,0,0,7.98,3.315v-3.03a11.912,11.912,0,0,1-5.85-2.43L8.52,29.61ZM33,18A15.022,15.022,0,0,1,19.575,32.925v-3.03a12,12,0,0,0,0-23.79V3.075A15.022,15.022,0,0,1,33,18Z" transform="translate(-3.075 -3.075)" fill="#5ab4f0"/>
                </svg>

            </template>
            <!--  标题-->
            <template v-slot:item-title>
                <p>视频</p>
            </template>
        </TabBarItem>
<!--        <TabBarItem path="/mine" selectedColor="#5AB4F0">-->
<!--            &lt;!&ndash;  图标&ndash;&gt;-->
<!--            <template v-slot:item-icon>-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="1.175rem" height="1.51rem" viewBox="0 0 23.507 30.252">-->
<!--                    <g id="Icon_ionic-ios-musical-notes" data-name="Icon ionic-ios-musical-notes" transform="translate(0.5 0.502)">-->
<!--                        <path id="Icon_ionic-ios-musical-notes-2" data-name="Icon ionic-ios-musical-notes" d="M28.568,3.389c-.33.063-14.2,2.756-14.5,2.813a.623.623,0,0,0-.57.563V23.646a1.939,1.939,0,0,1-.169.823,1.874,1.874,0,0,1-1.132.893c-.232.077-.548.148-.921.232-1.695.38-4.528,1.027-4.528,3.642a3.219,3.219,0,0,0,2.932,3.34,3.428,3.428,0,0,0,.5.049h0a8.679,8.679,0,0,0,3.6-.928,3.788,3.788,0,0,0,1.695-3.361V13.395a.558.558,0,0,1,.45-.548l10.688-2.159a.562.562,0,0,1,.675.548v9.2a2.016,2.016,0,0,1-.176.942,1.869,1.869,0,0,1-1.139.893c-.232.077-.619.148-.991.232-1.695.38-4.528,1.02-4.528,3.635a3.225,3.225,0,0,0,2.939,3.4,5.811,5.811,0,0,0,1.364-.063,8.061,8.061,0,0,0,2.566-.914,3.706,3.706,0,0,0,1.934-3.389V3.93A.557.557,0,0,0,28.568,3.389Z" transform="translate(-6.75 -3.375)" fill="none" stroke="#000" stroke-width="1"/>-->
<!--                    </g>-->
<!--                </svg>-->
<!--            </template>-->
<!--            <template v-slot:item-icon-selected>-->
<!--                <svg id="Icon_ionic-ios-musical-notes" data-name="Icon ionic-ios-musical-notes" xmlns="http://www.w3.org/2000/svg" width="1.125rem" height="1.4625rem" viewBox="0 0 22.507 29.25">-->
<!--                    <path id="Icon_ionic-ios-musical-notes-2" data-name="Icon ionic-ios-musical-notes" d="M28.568,3.389c-.33.063-14.2,2.756-14.5,2.813a.623.623,0,0,0-.57.563V23.646a1.939,1.939,0,0,1-.169.823,1.874,1.874,0,0,1-1.132.893c-.232.077-.548.148-.921.232-1.695.38-4.528,1.027-4.528,3.642a3.219,3.219,0,0,0,2.932,3.34,3.428,3.428,0,0,0,.5.049h0a8.679,8.679,0,0,0,3.6-.928,3.788,3.788,0,0,0,1.695-3.361V13.395a.558.558,0,0,1,.45-.548l10.688-2.159a.562.562,0,0,1,.675.548v9.2a2.016,2.016,0,0,1-.176.942,1.869,1.869,0,0,1-1.139.893c-.232.077-.619.148-.991.232-1.695.38-4.528,1.02-4.528,3.635a3.225,3.225,0,0,0,2.939,3.4,5.811,5.811,0,0,0,1.364-.063,8.061,8.061,0,0,0,2.566-.914,3.706,3.706,0,0,0,1.934-3.389V3.93A.557.557,0,0,0,28.568,3.389Z" transform="translate(-6.75 -3.375)" fill="#5ab4f0"/>-->
<!--                </svg>-->
<!--            </template>-->
<!--            &lt;!&ndash;  标题&ndash;&gt;-->
<!--            <template v-slot:item-title>-->
<!--                <p>我的</p>-->
<!--            </template>-->
<!--        </TabBarItem>-->
        <TabBarItem path="/information" selectedColor="#5AB4F0">
            <!--  图标-->
            <template v-slot:item-icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.51rem" height="1.51rem" viewBox="0 0 30.243 30.254">
                    <g id="Icon_ionic-ios-chatboxes" data-name="Icon ionic-ios-chatboxes" transform="translate(0.5 0.5)">
                        <path id="路径_20" data-name="路径 20" d="M29.946,11.981H14.365a2.683,2.683,0,0,0-2.679,2.679V25.509a2.677,2.677,0,0,0,2.679,2.672H23.28a.768.768,0,0,1,.534.225l4.43,4.085c.246.239.654.141.654-.2V28.73c0-.422.267-.555.689-.555h.07a2.927,2.927,0,0,0,2.96-2.672V14.66A2.668,2.668,0,0,0,29.946,11.981Z" transform="translate(-3.375 -3.375)" fill="none" stroke="#000" stroke-width="1"/>
                        <path id="路径_21" data-name="路径 21" d="M12.262,10.259H24.736V5.667a2.293,2.293,0,0,0-2.292-2.292H5.667A2.293,2.293,0,0,0,3.375,5.667V17.283a2.293,2.293,0,0,0,2.292,2.292h4.3V12.551A2.3,2.3,0,0,1,12.262,10.259Z" transform="translate(-3.375 -3.375)" fill="none" stroke="#000" stroke-width="1"/>
                    </g>
                </svg>
            </template>
            <template v-slot:item-icon-selected>
                <svg id="Icon_ionic-ios-chatboxes" data-name="Icon ionic-ios-chatboxes" xmlns="http://www.w3.org/2000/svg" width="1.4625rem" height="1.4625rem" viewBox="0 0 29.243 29.248">
                    <path id="路径_20" data-name="路径 20" d="M29.946,11.981H14.365a2.683,2.683,0,0,0-2.679,2.679V25.509a2.677,2.677,0,0,0,2.679,2.672H23.28a.768.768,0,0,1,.534.225l4.43,4.085c.246.239.654.141.654-.2V28.73c0-.422.267-.555.689-.555h.07a2.927,2.927,0,0,0,2.96-2.672V14.66A2.668,2.668,0,0,0,29.946,11.981Z" transform="translate(-3.375 -3.375)" fill="#5ab4f0"/>
                    <path id="路径_21" data-name="路径 21" d="M12.262,10.259H24.736V5.667a2.293,2.293,0,0,0-2.292-2.292H5.667A2.293,2.293,0,0,0,3.375,5.667V17.283a2.293,2.293,0,0,0,2.292,2.292h4.3V12.551A2.3,2.3,0,0,1,12.262,10.259Z" transform="translate(-3.375 -3.375)" fill="#5ab4f0"/>
                </svg>

            </template>
            <!--  标题-->
            <template v-slot:item-title>
                <p>消息</p>
            </template>
        </TabBarItem>
        <TabBarItem path="/user" selectedColor="#5AB4F0">
            <!--  图标-->
            <template v-slot:item-icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.4rem" viewBox="0 0 25 28">
                    <g id="Icon_feather-user" data-name="Icon feather-user" transform="translate(0.5 0.5)">
                        <path id="路径_9" data-name="路径 9" d="M30,31.5v-3a6,6,0,0,0-6-6H12a6,6,0,0,0-6,6v3" transform="translate(-6 -4.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <path id="路径_10" data-name="路径 10" d="M24,10.5a6,6,0,1,1-6-6A6,6,0,0,1,24,10.5Z" transform="translate(-6 -4.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                    </g>
                </svg>
            </template>
            <template v-slot:item-icon-selected>
                <svg id="Icon_feather-user" data-name="Icon feather-user" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.35rem" viewBox="0 0 24 27">
                    <path id="路径_9" data-name="路径 9" d="M30,31.5v-3a6,6,0,0,0-6-6H12a6,6,0,0,0-6,6v3" transform="translate(-6 -4.5)" fill="#5ab4f0"/>
                    <path id="路径_10" data-name="路径 10" d="M24,10.5a6,6,0,1,1-6-6A6,6,0,0,1,24,10.5Z" transform="translate(-6 -4.5)" fill="#5ab4f0"/>
                </svg>

            </template>
            <!--  标题-->
            <template v-slot:item-title>
                <p>用户</p>
            </template>
        </TabBarItem>
    </TabBar>
    </div>
</template>

<script>
    import TabBarItem from "./menu/TabBarItem";
    import TabBar from "./menu/TabBar";
    import {useRoute} from "vue-router";
    import {computed} from "vue";
    export default {
        name: "Menu",
        components: {
            TabBarItem,
            TabBar
        },
        setup() {
            const route = useRoute()
            const  isSelected = computed( ()=>{
                let route_url = '/'
                if (route.path.includes('/rest')){
                    route_url = '/xxxx'
                }else
                if (route.path.includes('/musicplay')){
                    route_url = '/xxxx'
                }
                else
                if (route.path.includes('/privatefm')){
                    route_url = '/xxxx'
                }
                else
                if (route.path.includes('/rest')){
                    route_url = '/xxxx'
                }
                return route.path.includes(route_url)
            })



            return{
                isSelected,
            }
        }
    }
</script>

<style scoped>
.menu{
    height: 4.75rem;
    width: 100%;
    background-color: white;
    border: 1px solid darkgray;
    /*透明*/
    opacity:95%;
    /*固定定位*/
    position:fixed ;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;

}
    p{
        font-family: '华文宋体';
        font-size: 10px;
    }
</style>