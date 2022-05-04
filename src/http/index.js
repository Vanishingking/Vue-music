import axios from "axios";
//封装

//axios全局配置
//基础URL地址
axios.defaults.baseURL = 'http://127.0.0.1:3000'
//请求超时
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//拦截
//请求拦截
axios.interceptors.request.use((config)=>{
    console.log(config);
    return config;
},(error)=>{
    return Promise.error(error)
})

//响应拦截
axios.interceptors.response.use((response)=>{
    console.log(response);
    return response.data;
},(error)=>{
    return Promise.error(error)
})

export default function ajax(url = '',params = {},type = 'GET') {
    return new Promise((resolve,reject)=>{
        //变量
        let promise

        //1.判断请求类型
        if (type.toUpperCase() ==='GET'){
            //GET请求
            promise = axios({
                url,
                params
            })

        }else if (type.toUpperCase() ==='POST'){
            //  post请求
            promise = axios({
                method: 'post',
                url,
                data: params
            })
        }
        //3.处理返回
        promise.then((res)=>{
            resolve(res)
        }).catch((error)=>{
            reject(error)
        })


    })

}