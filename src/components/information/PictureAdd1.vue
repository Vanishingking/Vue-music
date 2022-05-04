
<template>
    <div class="about">
        <!-- 上传图片 -->
        <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none" ref="upload"/>
        <div class="add-img">
            <!-- <p class="font14">图片(最多6张，还可上传<span v-text="3-imgList.length"></span>张)</p> -->
            <div class="img-list" v-if="account_img!=''">
                <img :src="account_img" class="user_avatar">
            </div>
        </div>
    </div>
    <div class="add" @click="chooseType">
        <svg xmlns="http://www.w3.org/2000/svg" width="19.353" height="4.173" viewBox="0 0 19.353 4.173">
            <path id="路径_185" data-name="路径 185" d="M143.087,436.173a2.087,2.087,0,1,1,2.087-2.087A2.087,2.087,0,0,1,143.087,436.173Zm7.59,0a2.087,2.087,0,1,1,2.087-2.087A2.087,2.087,0,0,1,150.676,436.173Zm7.59,0a2.087,2.087,0,1,1,2.087-2.087A2.087,2.087,0,0,1,158.266,436.173Z" transform="translate(-141 -432)" fill="#dbdbdb"/>
        </svg>
    </div>

    <button style="margin-top: 700px;z-index: 10;position: fixed" @click="kkp">++++</button>
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

            }
        },
        props:{
            account_img:String
        },
        methods: {
            async kkp(){
                console.log(this.imgList[0].file )
                var imgSize = this.imgList[0].file.width
                var formData = new FormData()
                formData.append('imgFile', this.imgList[0].file)
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                await axios.post(this.$store.state.api_url+'avatar/upload?imgSize='+imgSize,formData,config)
                console.log(this.imgList[0].file.width)
            },
            sumit(){
                console.log(this.name)
                console.log(this.textarea)
                console.log(this.imgList)
            },
            chooseType() {
                document.getElementById('upload_file').click();

            },


            fileChange(el) {
                if (!el.target.files[0].size) return;
                this.fileList(el.target);
                el.target.value = ''
            },
            fileList(fileList) {
                let files = fileList.files;
                for (let i = 0; i < files.length; i++) {
                    //判断是否为文件夹
                    if (files[i].type != '') {
                        this.fileAdd(files[i]);
                    } else {
                        //文件夹处理
                        this.folders(fileList.items[i]);
                    }
                }
            },
            //文件夹处理
            folders(files) {
                let _this = this;
                //判断是否为原生file
                if (files.kind) {
                    files = files.webkitGetAsEntry();
                }
                files.createReader().readEntries(function (file) {
                    for (let i = 0; i < file.length; i++) {
                        if (file[i].isFile) {
                            _this.foldersAdd(file[i]);
                        } else {
                            _this.folders(file[i]);
                        }
                    }
                });
            },
            foldersAdd(entry) {
                let _this = this;
                entry.file(function (file) {
                    _this.fileAdd(file)
                })
            },
            fileAdd(file) {
                if (this.limit !== undefined) this.limit--;
                if (this.limit !== undefined && this.limit < 0) return;
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf('image') == -1) {
                    this.$dialog.toast({mes: '请选择图片文件'});
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
            delImg(index) {
                this.size = this.size - this.imgList[index].file.size;//总大小
                this.imgList.splice(index, 1);
                if (this.limit !== undefined) this.limit = 3-this.imgList.length;
            },
            displayImg() {
            }
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

</style>