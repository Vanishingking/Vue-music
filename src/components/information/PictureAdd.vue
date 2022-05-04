
<template>
    <div class="about">
        <!-- 上传图片 -->
        <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none" ref="upload"/>
        <div class="add-img">
            <div class="img-list" v-if="account_img!=''">
                <img :src="account_img" class="user_avatar">
            </div>
        </div>
        <div class="img_upload_loading" v-if="loading">
            <svg class="upload_loading_icon" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                <path id="路径_187" data-name="路径 187" d="M192,242a5,5,0,0,1,10,0,40,40,0,1,0,40-40,5,5,0,0,1,0-10,50,50,0,1,1-50,50Z" transform="translate(-192 -192)" fill="#b7b7b7"/>
            </svg>
        </div>
    </div>
    <div class="add" @click="chooseType">
        <svg xmlns="http://www.w3.org/2000/svg" width="19.353" height="4.173" viewBox="0 0 19.353 4.173">
            <path id="路径_185" data-name="路径 185" d="M143.087,436.173a2.087,2.087,0,1,1,2.087-2.087A2.087,2.087,0,0,1,143.087,436.173Zm7.59,0a2.087,2.087,0,1,1,2.087-2.087A2.087,2.087,0,0,1,150.676,436.173Zm7.59,0a2.087,2.087,0,1,1,2.087-2.087A2.087,2.087,0,0,1,158.266,436.173Z" transform="translate(-141 -432)" fill="#dbdbdb"/>
        </svg>
    </div>


<!--    <button style="margin-top: 700px;z-index: 10;position: fixed" @click="kk">++++</button>-->
<!--    <input style="margin-top: 600px;z-index: 10;position: fixed" type="file" ref="kk">-->

</template>
<script>
    import axios from 'axios'
    export default {
        name: "Feedback",
        data() {
            return {
                name:'',
                textarea:'',
                showFace: false,
                imgList: [],
                size: 0,
                limit:6, //限制图片上传的数量
                tempImgs:[],
                loading:false

            }
        },
        props:{
            account_img:String
        },
        methods: {
            kk(){
                console.log(this.$refs.upload.files)
                // var that = this;
                // this.$refs['imgimg'].setAttribute('src','data:image/jpeg;base64,'+url);
                // const reader = new FileReader();
                // reader.readAsDataURL(inputFile);
                // reader.onload = function (e) {
                //     that.imgSrc = this.result;
                //     let url=this.result.substring(this.result.indexOf(',')+1);
                //     // that.mg_url = 'data:image/png;base64,'+url
                //     that.$refs['imgimg'].setAttribute('src','data:image/jpeg;base64,'+url);
                //     // that.img_url = 'data:image/png;base64,'+url
                //     that.$refs['imggrzp'].setAttribute('src','data:image/jpeg;base64,'+url);
                //     console.log( this.mg_url)
                // }
            },
            async kkp(){
                console.log(this.imgList[0].file )
                var imgSize = this.imgList[0].file.width
                var formData = new FormData()
                formData.append('imgFile', this.imgList[0].file)
                // await axios.post(this.$store.state.api_url+'avatar/upload?imgSize='+imgSize,formData,config)
                await axios({
                   method: 'post',
                   url: this.$store.state.api_url+'avatar/upload?imgSize='+imgSize+'&cookie='+this.$store.state.user_cookie,
                   data:formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                   }).then((res)=>{
                   console.log(res);
               }).catch((err)=>{
                   console.log(err);
               })

                console.log(this.imgList[0].file.width)
            },
            chooseType() {
                document.getElementById('upload_file').click();
            },
            async fileChange(){
                this.fileAdd(this.$refs.upload.files[0]);
                this.loading = true
                 setTimeout(()=>{
                    this.loading = false
                     // this.imgList = []
                },1000)

                // 0.3秒后执行
                setTimeout(()=>{
                    var imgSize = this.imgList[0].file.width
                    var formData = new FormData()
                        formData.append('imgFile', this.imgList[0].file)
                    axios({
                        method: 'post',
                        url: this.$store.state.api_url+'avatar/upload?imgSize='+imgSize+'&cookie='+this.$store.state.user_cookie,
                        data:formData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }).then((res)=>{
                        console.log(res);
                        this.$emit('fileChange',this.$refs.upload.files[0])
                    }).catch((err)=>{
                        console.log(err);
                        this.$toast('修改失败');
                    })
                },300)



            },
            fileAdd(file) {
                if (this.limit !== undefined) this.limit--;
                if (this.limit !== undefined && this.limit < 0) return;
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf('image') == -1) {
                    // this.$dialog.toast({mes: '请选择图片文件'});
                } else {
                    let reader = new FileReader();
                    let image = new Image();
                    let _this = this;
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        file.src = this.result;
                        image.onload = function(){
                            let width = image.width;
                            let height = image.height;
                            file.width = width;
                            file.height = height;
                            _this.imgList.push({
                                file
                            });
                            console.log( _this.imgList);
                        };
                        image.src= file.src;
                    }
                }
            },

        }
    }
</script>
<style scoped>


    input {
        border: none;
        outline-style: none;
    }
    * {
        margin: 0;
        padding: 0;
    }
    .about {
        width: 100%;
        height: 100%;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        z-index: 1;

    }

    .add-img {
        width: 100%;
    }
    .add-img p {
        color: #999;
    }
    .add {
        position: fixed;
        top: 3.75rem;
        right: 1rem;
        width: 2.5rem;
        height: 1.5rem;
        /*background-color: #409eff;*/
        /*display: inline-block;*/
        display: flex;
        justify-content: center;
        align-items: center;
        /*margin-bottom: 20px;*/
        z-index: 2;
    }

    /*九宫格*/
    .img-list {
        display: flex;
        justify-content: center;
    }
    .user_avatar{
        width: 100%;
        /*height: 22rem;*/

    }
    .img_upload_loading{
        width: 100%;
        height: 10rem;
        position: fixed;
        z-index: 4;
        display: flex;
        justify-content: center;
        align-items: center;
    }
.upload_loading_icon{
    animation: rotate 1.5s linear infinite;
}
</style>