//1.引入
import { createRouter, createWebHashHistory} from 'vue-router'
import LocalMusic from "../views/mine/LocalMusic";
import RecentlyPlayed from "../views/mine/RecentlyPlayed";
import DynamicDetails from "../views/information/DynamicDetails";
import PostDynamics from "../views/information/PostDynamics";
import SingerInformation from "../views/home/SingerInformation";
import SearchInterface from "../views/home/SearchInterface";
import PrivateFM from "../views/home/PrivateFM";
import Rest from "../views/home/RestTow";
import SongListComment from "../views/home/SongListComment";
import LoginHome from "../components/LoginHome";
const InformationPage= ()=> import( "../views/information/InformationPage");
const SongComment =()=> import( "../views/home/SongComment")
//懒加载
const Home = ()=>import('./../components/Home')
// const RotatePictures = ()=>import('../components/RotatePictures')
const HomePage = ()=>import('./../views/home/HomePage')
const Video = ()=>import('./../components/Video')
const User = ()=>import('./../components/User')
const SongListAll = ()=>import('../views/home/SongListAll')
//
const Information = ()=>import('./../components/Information')
const SongListDetails = ()=>import('../views/home/SongListDetails')
const MusicPlayInterface = ()=>import('./../components/home/MusicPlayInterface')
const VideoPage = ()=> import('../views/video/VideoPage')
const MVDetailed = ()=> import('../views/video/MVDetailed')
const UserPage = ()=>import('../views/User/UserPage')
const Login = ()=>import('../views/User/Login')
const Log = ()=>import('../views/User/Log')
const Sign = ()=>import('../views/User/Sign')
const UserDynamic = ()=>import('../views/home/UserDynamicTwo')
const ConcernedSinger = ()=>import('../views/User/ConcernedSinger')
const CompileUser = ()=>import('../views/User/CompileUser')
const SetUp = ()=>import('../views/User/SetUp')
const WhiteNoiseReview = ()=>import('../views/home/WhiteNoiseReview')

//2.创建路由对象
const routes = [
    {
        path: '/',redirect: '/home'
    },
    {
        path: '/home',component: Home,
        children:[
            {
            path: '',component:HomePage
            },
            {
                path: 'songlistall',component: SongListAll,
            },
            {
                path: 'songlistdetails/:id',component: SongListDetails,
            },
            {
                path: 'musicplay/:songid',component: MusicPlayInterface,
                name:'kkp'
            },
            {
                path: 'songcomment/:id',component: SongComment,
            },
            {
                path: 'singerinformation/:id',component:SingerInformation
            },
            {
                path: 'searchinterface/:value',component:SearchInterface
            },
            {
                path: 'privatefm/:songid',component:PrivateFM
            },
            {
                path: 'rest/:id',component:Rest,

            },
            {
                path: 'songlistcomment/:id',component: SongListComment,
            },
            {
                path: 'userdynamic/:id',component:UserDynamic,
            },
            {
                path: 'WhiteNoiseReviews/:type',component:WhiteNoiseReview
            }
        ]

    },
    {
        path: '/video',component: Video,
        children:[
            {
                path: '',component: VideoPage
            },
            {
                path: 'mv/:id',  component:MVDetailed
            },
            {
                path: 'searchinterface/:value',component:SearchInterface
            }
        ]
    },

    {
        path: '/information',component: Information,
        children:[
            {
               path: '',component:InformationPage
            },
            {
                path: 'details/:id',component:DynamicDetails
            },
            {
                path: 'postdynamics',component:PostDynamics
            }
        ]
    },

    {
        path: '/user',component:User,
        children:[
            {
                path: '',component:UserPage
            },
            {
                path: 'localmusic/:id',component:LocalMusic
            },
            {
                path: 'recentlyplayed',component:RecentlyPlayed,
            },
            {
                path: 'userdynamic/:id',component:UserDynamic,
            },
            {
              path: 'concernedsinger/:id' ,component:ConcernedSinger
            },
            {
              path: 'compileuser'  ,component:CompileUser
            },
            {
              path: 'setup',component:SetUp
            },
            {
                path: 'singerinformation/:id',component:SingerInformation
            },
            {
                path: 'songlistdetails/:id',component: SongListDetails,
            }

        ]
    },

    {
        path: '/login',component:LoginHome,
        children:[
            {
                path: '',component:Login,
            },
            {
                path: 'sign',component:Sign
            },
            {
                path: 'log',component:Log
            },
        ]
    },

    // {
    //     path: '/sign',component:Sign
    // },
    // {
    //     path: '/log',component:Log
    // },


]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router