<template>
    <div class="compile_user_box" :class="[$store.state.theme == 'night' ? 'compile_user_box_night':'']">
        <div class="compile_user_title" :class="[$store.state.theme == 'night' ? 'compile_user_title_night':'']">
            <TitleHead title="我的资料"></TitleHead>
        </div>
        <div class="compile_user_body">

            <div class="compile_user_data_box" :class="[$store.state.theme == 'night' ? 'compile_user_data_box_night':'']" style="margin-top: 0.5rem">
                <!--            用户头像-->
                <div class="compile_user_portrait" :class="[$store.state.theme == 'night' ? 'compile_user_portrait_night':'']" @click="modify_portrait">
                    <span class="compile_user_span">头像</span>
                    <div class="compile_user_div">
                    <img :src="account_img">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10.026" height="18" viewBox="0 0 10.026 18">
                            <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M14.974,9l-1,1,8.239,8-8.239,8,1,1L24,18Z" transform="translate(-13.974 -9)" fill="#d9d9d9"/>
                    </svg>
                    </div>
                </div>
            </div>

            <div class="compile_user_data_box" :class="[$store.state.theme == 'night' ? 'compile_user_data_box_night':'']">
                <!--            用户名字-->
                <div class="compile_user_name" :class="[$store.state.theme == 'night' ? 'compile_user_name_night':'']" @click="nickname_modify(account_name)">
                    <span class="compile_user_span">昵称</span>
                    <div class="compile_user_div">
                        <span class="compile_user_name_data">{{ account_name }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.026" height="18" viewBox="0 0 10.026 18">
                            <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M14.974,9l-1,1,8.239,8-8.239,8,1,1L24,18Z" transform="translate(-13.974 -9)" fill="#d9d9d9"/>
                        </svg>
                    </div>
                </div>
            </div>
            <van-popup v-model:show="nameshowPopup" position="right" :style="{ height: '100%',width:'100%'}">
                <!--            昵称修改-->
                <div class="nickname_modify_box" :class="[$store.state.theme == 'night' ? 'nickname_modify_box_night':'']">
                    <svg class="modify_back" @click="onCancel" xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 14.238 25.562">
                        <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M15.394,9l-1.42,1.42,11.7,11.361-11.7,11.361,1.42,1.42L28.212,21.781Z" transform="translate(28.212 34.562) rotate(180)"/>
                    </svg>
                    <div class="nickname_modify_title" :class="[$store.state.theme == 'night' ? 'nickname_modify_title_night':'']">
                        <span>修改昵称</span>
                    </div>
                    <div class="nickname_modify_body" :class="[$store.state.theme == 'night' ? 'nickname_modify_body_night':'']">
                        <input type="text" ref="kk" name="nickname_data" maxlength="16" v-model="nickname_data" autocomplete="off" v-focus="focusing" @focus="empty_show" @blur="empty_hide"/>
                        <div class="nickname_modify_tips" v-if="empty_state">
                            <svg @click="empty_nickname" style="margin-right: 0.5rem" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25">
                                <path id="路径_184" data-name="路径 184" d="M44.5,32A12.5,12.5,0,1,0,57,44.5,12.654,12.654,0,0,0,44.5,32Zm5.357,16.071a1.136,1.136,0,1,1-1.607,1.607l-3.571-3.571-3.75,3.75a1.263,1.263,0,0,1-1.786-1.786l3.75-3.75L39.321,40.75a1.136,1.136,0,0,1,1.607-1.607L44.5,42.714l3.75-3.75a1.263,1.263,0,0,1,1.786,1.786l-3.75,3.75Z" transform="translate(-32 -32)" fill="#999"/>
                            </svg>
                        </div>
                    </div>
                    <p class="err_warning">{{ limit_exceeded }}</p>
                    <div class="nickname_modify_tail">
                        <ul>
                            <li>昵称只支持中文、英文、数字、以及-_两个符号</li>
                            <li>最大长度是个字符</li>
                            <li>禁止输入色情、广告、虚假信息等</li>
                        </ul>
                    </div>
                    <button v-if="$store.state.theme == 'white'" :class="[account_name!=nickname_data&&nickname_data!='' ? 'nickname_modify_confirm':'nickname_modify_confirm_ban']" @click="nickname_modify_confirm">确定</button>
                    <button v-if="$store.state.theme == 'night'" :class="[account_name!=nickname_data&&nickname_data!='' ? 'nickname_modify_confirm_night':'nickname_modify_confirm_ban_night']" @click="nickname_modify_confirm">确定</button>
                </div>
            </van-popup>


            <div class="compile_user_data_box" :class="[$store.state.theme == 'night' ? 'compile_user_data_box_night':'']">
                <!--            用户性别-->
                <div class="compile_user_gender" @click="modify_gender(account_gender)">
                    <span class="compile_user_span">性别</span>
                    <div class="compile_user_div">
                        <span v-if="account_gender == 2">女</span>
                        <span v-if="account_gender == 1">男</span>
                        <span v-if="account_gender == 0">保密</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.026" height="18" viewBox="0 0 10.026 18">
                            <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M14.974,9l-1,1,8.239,8-8.239,8,1,1L24,18Z" transform="translate(-13.974 -9)" fill="#d9d9d9"/>
                        </svg>
                    </div>
                </div>
            </div>
            <van-popup v-model:show="gendershowPopup" position="bottom" :style="{ height: '40%'  }" round>
                <!--            性别选择-->
                <div class="gender_select_box">
                    <van-picker
                            title="性别"
                            show-toolbar
                            :columns="genders"
                            @confirm="onConfirm_gender"
                            @cancel="onCancel"
                            @change="onChange"
                            ref="picker_g"
                    />
                </div>
            </van-popup>

            <!--            用户生日-->
            <div class="compile_user_data_box" :class="[$store.state.theme == 'night' ? 'compile_user_data_box_night':'']" style="margin-top: 0.5rem">
                <div class="compile_user_birthday" :class="[$store.state.theme == 'night' ? 'compile_user_birthday_night':'']" @click="modify_birthday(account_birthday)">
                    <span class="compile_user_span">生日</span>
                    <div class="compile_user_div">
                        <span>{{formatDate(account_birthday) }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.026" height="18" viewBox="0 0 10.026 18">
                            <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M14.974,9l-1,1,8.239,8-8.239,8,1,1L24,18Z" transform="translate(-13.974 -9)" fill="#d9d9d9"/>
                        </svg>
                    </div>
                </div>
            </div>
            <van-popup v-model:show="birthdayshowPopup" position="bottom" :style="{ height: '40%'  }" round>
                <!--            时间选择-->
                <div class="time_select">
                    <van-datetime-picker
                            style="z-index: 3;"
                            v-model="currentDate"
                            type="date"
                            title="选择年月日"
                            :min-date="minDate"
                            :max-date="maxDate"
                            :formatter="formatter"
                            @confirm="onConfirm_time"
                            @cancel="onCancel"
                    />
                </div>
            </van-popup>

            <!--            用户签名-->
            <div class="compile_user_data_box" :class="[$store.state.theme == 'night' ? 'compile_user_data_box_night':'']">
                <div class="compile_user_autograph" @click="modify_signature(account_signature)">
                    <span class="compile_user_span">签名</span>
                    <div class="compile_user_div">
                        <span>{{ account_signature }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.026" height="18" viewBox="0 0 10.026 18">
                            <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M14.974,9l-1,1,8.239,8-8.239,8,1,1L24,18Z" transform="translate(-13.974 -9)" fill="#d9d9d9"/>
                        </svg>
                    </div>
                </div>
            </div>
            <van-popup v-model:show="autographshowPopup" position="right" :style="{ height: '100%',width:'100%'}">
                <!--            修改签名-->
                <div class="modify_signature_box" :class="[$store.state.theme == 'night' ? 'modify_signature_box_night':'']">
                    <svg class="modify_back" @click="onCancel" xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 14.238 25.562">
                        <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M15.394,9l-1.42,1.42,11.7,11.361-11.7,11.361,1.42,1.42L28.212,21.781Z" transform="translate(28.212 34.562) rotate(180)"/>
                    </svg>
                    <div class="nickname_modify_title" :class="[$store.state.theme == 'night' ? 'nickname_modify_title_night':'']">
                        <span>修改签名</span>
                    </div>
                    <div class="modify_signature_body" :class="[$store.state.theme == 'night' ? 'modify_signature_body_night':'']">
                        <textarea v-model="autograph_data" maxlength="50"></textarea>
                        <div class="word_remaining_box">
                            <span>{{ autograph_data.length }}/50</span>
                        </div>
                    </div>
                    <div class="nickname_modify_tail">
                        <ul>
                            <li>禁止输入色情、广告、虚假信息等</li>
                        </ul>
                    </div>
                    <div class="modify_signature_determine" >
                        <button @click="modify_signature_submit">确定</button>
                    </div>

                </div>
            </van-popup>
            <div class="compile_user_data_box" :class="[$store.state.theme == 'night' ? 'compile_user_data_box_night':'']" style="margin-top: 0.5rem">
                <!--            地区-->
                <div class="compile_user_birthday" @click="modify_region">
                    <span class="compile_user_span">地区</span>
                    <div class="compile_user_div">
                        <span v-if="account_province != ''">{{ number_region(account_province,account_city) }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.026" height="18" viewBox="0 0 10.026 18">
                            <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M14.974,9l-1,1,8.239,8-8.239,8,1,1L24,18Z" transform="translate(-13.974 -9)" fill="#d9d9d9"/>
                        </svg>
                    </div>
                </div>
            </div>
            <van-popup v-model:show="regionshowPopup" position="bottom" :style="{ height: '40%'  }" round>
                <!--            地区选择-->
                <div class="region_select" v-if="regions !=undefined||regions!=null">
                    <van-picker
                            title="地区"
                            show-toolbar
                            :columns="regions"
                            @confirm="onConfirm_region"
                            @cancel="onCancel"
                            @change="onChange"
                            ref="picker"
                            :default-index="default_province_index"
                    />
                </div>
            </van-popup>

        </div>
<!--     picker选择器 修改窗口   -->
        <div class="picker_box" v-show="selector !=''">
<!--            修改头像-->
            <div class="modify_portrait_box" v-if="selector == 'portrait'">
                <div class="modify_cancel" @click="onCancel">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.238" height="25.562" viewBox="0 0 14.238 25.562">
                        <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M15.394,9l-1.42,1.42,11.7,11.361-11.7,11.361,1.42,1.42L28.212,21.781Z" transform="translate(28.212 34.562) rotate(180)" fill="#d9d9d9"/>
                    </svg>
                </div>
                <div class="modify_portrait_title">
                    <span>个人头像</span>
                </div>
                <div class="modify_portrait_body">
                    <PictureAdd :account_img="account_img" @fileChange="fileChange"></PictureAdd>
                </div>
            </div>
            <div class="picker_box_background" @click="onCancel"></div>
        </div>
    </div>
</template>

<script>
    import PictureAdd from "../../components/information/PictureAdd";
    import ajax from '../../http'
    import regions_data from '../../../public/2020年8月中华人民共和国县以上行政区划代码.json'
    import TitleHead from "../../components/TitleHead";

    export default {
        name: "CompileUser",
        components:{TitleHead, PictureAdd},
        data() {
            return {
                regions:[],
                minDate: new Date(1960, 0, 1),
                maxDate: new Date(2035, 10, 1),
                currentDate: new Date(2021, 0, 17),
                selector:'',
                nickname_data:'',
                limit_exceeded:'',
                focusing:false,
                genders:[{
                    text:'男',
                    gender:1
                    },
                    {
                        text: '女',
                        gender: 2
                    },
                    {
                        text: '保密',
                        gender: 0
                    }],
                autograph_data:'',
                account_name:'',
                account_img:'',
                account_gender:'',
                account_id:'',
                account_birthday:'',
                account_province:'',
                account_city:'',
                account_signature:'',
                default_province_index:0,
                default_city_index:0,
                klk:'',
                empty_state:false,
                birthdayshowPopup:false,
                regionshowPopup:false,
                autographshowPopup:false,
                gendershowPopup:false,
                nameshowPopup:false,
                theme_color:'#ffffff'
            };
        },
        methods:{

            onChange(text) {
                console.log(text)
            },
            // 取消
            onCancel() {
                this.selector = ''
                this.birthdayshowPopup = false
                this.regionshowPopup = false
                this.autographshowPopup = false
                this.gendershowPopup = false
                this.nameshowPopup = false
            },
            // 修改生日
            modify_birthday(value){
                this.birthdayshowPopup = true
                this.currentDate = new Date(value);
            },
            // 日期选择器---确定
            onConfirm_time(value){
                // 转换成时间戳
                let time = Date.parse(value)
                console.log(time)
                ajax(
                    this.$store.state.api_url+'user/update',
                    {cookie:this.$store.state.user_cookie,birthday:time},
                ).then((res)=>{
                    console.log(res);
                    this.account_birthday = time

                }).catch((err)=>{
                    console.log(err);
                    this.$toast('修改失败');
                })
                this.birthdayshowPopup = false
            },
            // 日期选择器显示格式
            formatter(type, val){
                if (type === 'year') {
                    return `${val}年`;
                } else if (type === 'month') {
                    return `${val}月`;
                }
                return val;
            },

            // 修改地区
            modify_region(){
                // this.selector = 'region'
                this.regionshowPopup = true
                this.$nextTick(() => {
                    // dom元素更新后执行，因此这里能正确打印更改之后的值
                    this.$refs.picker.setColumnIndex(0,this.default_province_index)
                    this.$refs.picker.setColumnIndex(1,this.default_city_index)
                })

            },
            // 地区选择器--- 确定
            onConfirm_region(value) {
                ajax(
                    this.$store.state.api_url+'user/update',
                    {cookie:this.$store.state.user_cookie,province:value[0].province,city:value[1].province},
                ).then((res)=>{
                    console.log(res);
                    this.account_province = value[0].province
                    this.account_city = value[1].province
                }).catch((err)=>{
                    this.$toast('修改失败');
                    console.log(err);
                })
                this.regionshowPopup = false
            },
            // 修改昵称
            nickname_modify(value){
                // this.selector = 'nickname'
                this.nameshowPopup = true
                this.nickname_data = value
            },
            // 修改名称确定
            nickname_modify_confirm(){
                ajax(
                    this.$store.state.api_url+'user/update',
                    {cookie:this.$store.state.user_cookie,nickname:this.nickname_data},

                ).then((res)=>{
                    console.log(res);
                    this.account_name = this.nickname_data
                    this.nameshowPopup = false
                }).catch((err)=>{
                    console.log(err);
                    this.$dialog.alert({
                        message: '昵称已被占用',
                    });
                    console.log('昵称已被占用')
                })


            },
            //修改性别
            modify_gender(value){
                this.gendershowPopup = true
                this.$nextTick(() => {
                    // dom元素更新后执行，因此这里能正确打印更改之后的值
                    if (value == 1){
                        this.$refs.picker_g.setColumnIndex(0,0)
                    }else if (value == 2){
                        this.$refs.picker_g.setColumnIndex(0,1)
                    }else {
                        this.$refs.picker_g.setColumnIndex(0,2)
                    }
                })
            },
            // 性别选择--确定
            onConfirm_gender(value){
                console.log(value.gender)
                ajax(
                    this.$store.state.api_url+'user/update',
                    {cookie:this.$store.state.user_cookie,gender:value.gender},
                ).then((res)=>{
                    console.log(res);
                    switch (value.gender) {
                    case 1:this.account_gender = 1;break;
                    case 2:this.account_gender = 2;break;
                    case 0:this.account_gender = 0;break;
                    }
                }).catch((err)=>{
                    this.$toast('修改失败');
                    console.log(err);
                })
                this.gendershowPopup = false
            },



            // 修改头像
            modify_portrait(){
                this.selector = 'portrait'
            },
            //修改头像--确定
            fileChange(fill){
                var that = this;
                const inputFile = fill;
                const reader = new FileReader();
                reader.readAsDataURL(inputFile);
                reader.onload = function () {
                    that.imgSrc = this.result;
                    let url = this.result.substring(this.result.indexOf(',')+1);
                    that.account_img = 'data:image/jpeg;base64,'+url
                }
            },
            // 修改签名
            modify_signature(value){
                // this.selector = 'signature'
                this.autographshowPopup = true
                this.autograph_data = value
            },
            // 修改签名确定
            modify_signature_submit(){
                ajax(
                    this.$store.state.api_url+'user/update',
                    {cookie:this.$store.state.user_cookie,signature:this.autograph_data},
                ).then((res)=>{
                    console.log(res);
                    this.account_signature = this.autograph_data
                }).catch((err)=>{
                    console.log(err);
                    this.$toast('修改失败');
                })
                this.autographshowPopup = false
            },
            // 清空昵称
            empty_nickname(){
                this.nickname_data = ''
                this.limit_exceeded = '超出字数限制'
                this.focusing = true
            },
            // 隐藏清空按钮
            empty_hide(){
                this.empty_state = false
            },
            empty_show(){
                this.empty_state = true
            }
        },
        async mounted() {
            if (this.$store.state.theme == 'night'){
                this.theme_color = '#222225'
            }

            // 获取地区数据
            for (let i = 0; i<regions_data.length;i++){
                let cs=[]
                for (let j = 0; j<regions_data[i].cityList.length; j++){
                    cs.push({
                        text: regions_data[i].cityList[j].name,
                        province:regions_data[i].cityList[j].code,
                    })
                }
                this.regions.push({
                    text: regions_data[i].name,
                    province:regions_data[i].code,
                    children:cs

                })
            }
            ajax(
                this.$store.state.api_url+'user/account',
                {cookie:this.$store.state.user_cookie},
            ).then((res)=>{
                console.log(res);
                this.account_name = res.profile.nickname
                this.account_img = res.profile.avatarUrl
                this.account_gender = res.profile.gender
                this.account_id = res.account.id
                this.account_birthday = res.profile.birthday
                this.account_province = res.profile.province
                this.account_city = res.profile.city
                this.account_signature = res.profile.signature
            }).catch((err)=>{
                console.log(err);
            })
            this.klk = this.$refs.picker

        },
        watch:{
            nickname_data(){
                if (this.nickname_data.length>15){
                    this.limit_exceeded = '超出字数限制'
                }else {
                    this.limit_exceeded = ''
                }
            },
        },
        directives:{
            focus: {
                beforeUpdate(el,binding){
                    if (binding.value){
                        el.focus()
                    }
                }
            }
        },
        setup(){
            // 时间戳转换成时间格式
            function formatDate(value) {
                let date = new Date(value);
                let y = date.getFullYear();// 年
                let MM = date.getMonth() + 1;// 月
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();// 日
                d = d < 10 ? ('0' + d) : d;
                var time = y + '年' + MM + '月' + d+'日';

                return time
            }
            //地区--编号
            function number_region(p,c){
                let provinces = []
                let city
                let province
                for (let i = 0; i<regions_data.length;i++){
                    let cs=[]
                    for (let j = 0; j<regions_data[i].cityList.length; j++){
                        cs.push({
                            text: regions_data[i].cityList[j].name,
                            province:regions_data[i].cityList[j].code,
                        })
                    }
                    provinces.push({
                        text: regions_data[i].name,
                        province:regions_data[i].code,
                        children:cs
                    })
                }
                if (p == c){
                    province = provinces.find(item=> item.province == p);
                    this.default_province_index = provinces.findIndex(item=> item.province == p);
                    return province.text
                }else {
                    province = provinces.find(item=> item.province == p);
                    this.default_province_index = provinces.findIndex(item=> item.province == p);
                    if (province){
                        city = province.children.find(item=> item.province == c);
                        this.default_city_index = province.children.findIndex(item=> item.province == c);
                    }
                    return province.text+"-"+city.text
                }

            }

            return{
                formatDate,
                number_region,

            }
        }
    }
</script>

<style scoped>
.compile_user_box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: #F6F6F6;

}
    .compile_user_title{
        width: 100%;
        height: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        background-color: white;
    }
    .compile_user_title span{
        margin-top: 0.75rem;
    }
    .compile_user_data_box{
        width: 100%;
        height: 4.25rem;
        background-color: white;
        display: flex;
        justify-content: flex-end;
    }
    .compile_user_portrait{
        width: 94%;
        height: 100%;
        border-bottom: 2px solid #F6F6F6;
        display: flex;
        align-items: center;

    }
    .compile_user_name_data{
        font-size: 16px;
    }
    .compile_user_span{
        width: 3rem;
        height: 4.25rem;
        line-height: 4.25rem;
        font-size: 18px;
        /*color: black;*/
        font-weight: bold;
    }
    .compile_user_div{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .compile_user_div img{
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        margin-right: 0.5rem;
    }
.compile_user_div svg{
    margin-right: 1rem;
}
.compile_user_div span{
    margin-right: 0.5rem;
    color: #9E9E9E;
    /*font-weight: bold;*/
}
    .compile_user_name{
        width: 94%;
        height: 100%;
        border-bottom: 2px solid #F6F6F6;
        display: flex;
        align-items: center;
    }
    .compile_user_gender{
        width: 94%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .compile_user_birthday{
        width: 94%;
        height: 100%;
        /*border-bottom: 2px solid #F6F6F6;*/
        display: flex;
        align-items: center;
    }
.compile_user_autograph{
    width: 94%;
    height: 100%;
    display: flex;
    align-items: center;
}
.picker_box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 2;
}
    .region_select{
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 3;
    }
    .time_select{
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 3;
    }
    .picker_box_background{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: black;
        z-index: 2;
        opacity: 0.3;
    }
    .nickname_modify_box{
        width: 100%;
        height: 100%;
        background-color: #ECEDF1;
        position: fixed;
        top: 0;
        z-index: 3;
       overflow-x:hidden;
    }
    .modify_back{
        position: absolute;
        z-index: 3;
        margin-top: 4rem;
        margin-left: 1rem;
    }
    .nickname_modify_title{
        width: 100%;
        height: 6.25rem;
        background-color: white;
        display: flex;
        justify-content: center;
    }
    .nickname_modify_title span{
        margin-top: 3.75rem;
        font-size: 21px;
        font-weight: bold;
    }
    .nickname_modify_body{
        width: 100%;
        height: 3.75rem;
        background-color: white;
        margin-top: 1rem;
        display: flex;
    }
    .nickname_modify_body input{
        width: 90%;
        height: 100%;
        font-size: 18px;
        border: none;
        margin-left: 1rem;
        font-weight: bold;
    }
    .nickname_modify_tail ul{
        list-style-type: square;
        margin-top: 0.5rem;

    }
.nickname_modify_tail li{
        font-weight: bold;
        font-size: 14px;
        color: #B7B7B7;
        margin-left: 2rem;
    }
    .nickname_modify_tips{
        width: 10%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .nickname_modify_confirm{
        width: 4rem;
        height: 2rem;
        position: fixed;
        z-index: 4;
        top: 3.55rem;
        right: 0.5rem;
        border: none;
        background-color: white;
        font-size: 18px;
    }
.nickname_modify_confirm_ban{
    width: 4rem;
    height: 2rem;
    position: fixed;
    z-index: 4;
    top: 3.55rem;
    right: 0.5rem;
    border: none;
    background-color: white;
    font-size: 18px;
    color: #B7B7B7;
    /*禁止点击*/
    pointer-events:none;
}
    .err_warning{
        width: 100%;
        height: 1rem;
        color: #D7676C;
        margin-left: 1rem;
        margin-top:0.5rem;
    }
    .gender_select_box{
        width: 100%;
        position: fixed;
        bottom: 0;
        background-color: white;
        z-index: 3;
    }
.modify_signature_box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: white;
    z-index: 3;
}
    .modify_signature_body{
        width: 100%;
        height: 11rem;
        background-color: #F7F7F7;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .modify_signature_body textarea{
        width: 90%;
        height: 90%;
        border: none;
        background-color: #F7F7F7;
        margin-top: 1rem;
        resize: none;
        font-size: 18px;

    }
    .word_remaining_box{
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .word_remaining_box span{
        margin-right: 1rem;
        color: #B7B7B7;
    }
    .modify_signature_determine{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .modify_signature_determine button{
        width:6.25rem ;
        height: 2rem;
        background-color: #5AB4F0;
        border: none;
        border-radius: 1rem;
        color: white;
        margin-top: 1rem;

    }
    .modify_portrait_box{
        width: 100%;
        height: 100%;
        background-color: black;
        position: fixed;
        top: 0;
        z-index: 3;
        display: flex;
        flex-direction: column;
    }
.modify_portrait_title{
    width: 100%;
    height: 6.25rem;
    display: flex;
    justify-content: center;
    z-index: 3;
}
.modify_portrait_title span{
    margin-top: 3.75rem;
    font-size: 21px;
    /*font-weight: bold;*/
    color: white;
}
    .modify_portrait_body{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        /*background-color: black;*/
        z-index: 3;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
    }
.modify_cancel{
    width: 1.5rem;
    position: fixed;
    z-index: 4;
    top: 3.75rem;
    left: 1rem;
}



    .compile_user_box_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: #2B2B2B;
        color: white;

    }

    .compile_user_title_night{
        width: 100%;
        height: 6.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        background-color: #222225;
    }

    .compile_user_data_box_night{
        width: 100%;
        height: 4.25rem;
        background-color: #222225;
        display: flex;
        justify-content: flex-end;
    }

    .compile_user_portrait_night{
        width: 94%;
        height: 100%;
        border-bottom: 2px solid #2B2B2B;
        display: flex;
        align-items: center;

    }
    .compile_user_name_night{
        width: 94%;
        height: 100%;
        border-bottom: 2px solid #2B2B2B;
        display: flex;
        align-items: center;
    }

    .compile_user_birthday_night{
        width: 94%;
        height: 100%;
        border-bottom: 2px solid #2B2B2B;
        display: flex;
        align-items: center;
    }

        .nickname_modify_box_night{
            width: 100%;
            height: 100%;
            background-color: #2B2B2B;
            position: fixed;
            top: 0;
            z-index: 3;
        }

    .nickname_modify_title_night{
        width: 100%;
        height: 6.25rem;
        background-color: #222225;
        display: flex;
        justify-content: center;
    }

    .nickname_modify_body_night{
        width: 100%;
        height: 3.75rem;
        background-color: #222225;
        margin-top: 1rem;
        display: flex;
    }
    .nickname_modify_body_night input{
        width: 90%;
        height: 100%;
        font-size: 18px;
        border: none;
        margin-left: 1rem;
        font-weight: bold;
        background-color: #222225;
    }

    .nickname_modify_confirm_night{
        width: 4rem;
        height: 2rem;
        position: fixed;
        z-index: 4;
        top: 3.55rem;
        right: 0.5rem;
        border: none;
        background-color: #222225;
        font-size: 18px;
    }
    .nickname_modify_confirm_ban_night{
        width: 4rem;
        height: 2rem;
        position: fixed;
        z-index: 4;
        top: 3.55rem;
        right: 0.5rem;
        border: none;
        background-color: #222225;
        font-size: 18px;
        color: #B7B7B7;
        /*禁止点击*/
        pointer-events:none;
    }

    .modify_signature_box_night{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: #222225;
        z-index: 3;
    }
    .modify_signature_body_night{
        width: 100%;
        height: 11rem;
        background-color: #2B2B2B;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .modify_signature_body_night textarea{
        width: 90%;
        height: 90%;
        border: none;
        background-color: #2B2B2B;
        margin-top: 1rem;
        resize: none;
        font-size: 18px;

    }

</style>