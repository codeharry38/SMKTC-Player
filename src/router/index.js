//Pags
//import Dashboard from '../views/dashboard.vue'
import Signin from '../views/auth/signin.vue'
import Signup from '../views/auth/signup.vue'
import Game from '../views/games.vue'
import Mygame from '../views/mygame.vue'
import Claim from '../views/claim.vue'
import Continue from '../views/continue.vue'
import Cart from '../views/cart.vue'
import Checkout from '../views/checkout.vue'
import Success from '../views/success.vue'
import Cancel from '../views/cancel.vue'
import Ticket from '../views/tickets.vue'
import Profile from '../views/profile.vue'
import ComingSoon from '../views/cominsoon.vue'
import Soon from '../views/soon.vue'
import forgotPassword from '../views/auth/forgot.vue'
import updatePassword from '../views/auth/reset.vue'
import Processing from '../views/loading.vue'
import Home from '../views/home.vue'
import leaderBoard from '../views/leaderboard.vue'
import gameInfo from '../views/gameinfo.vue'
import stockList from '../views/stockList.vue'
import Winner from '../views/winner.vue'
import DailyPrizes from '../views/dailywinner.vue'
import PrizeList from '../views/prizelist.vue'
import history from '../views/history.vue'
export default [
    //Pages
    {path:'/game', component:Game, name:'game'},
    {path:'/mygames', component:Mygame, name:'mygame', meta: { requiresAuth: true}},
    {path:'/claim/:code', component:Claim, name:'claimnow', meta: { requiresAuth: true}},
    {path:'/continue/:game', component:Continue, name:'continue', meta: { requiresAuth: true}},
    {path:'/checkout', component:Checkout, name:'checkout', meta: { requiresAuth: true}},
    {path:'/cart', component:Cart, name:'cart', meta: { requiresAuth: true}},
    {path:'/checkout/success', component:Success, name:'success', meta: { requiresAuth: true}},
    {path:'/chekout/cancel', component:Cancel, name:'cancel', meta: { requiresAuth: true}},
    {path:'/tickets', component:Ticket, name:'ticket', meta: { requiresAuth: true}},
    {path:'/profile', component:Profile, name:'profile', meta: { requiresAuth: true}},
    {path:'/comingsoon', component:ComingSoon, name:'comingsoon', meta: { requiresAuth: true}},
    {path:'/leaderboard/:game', component:leaderBoard, name:'leaderboard', meta: { requiresAuth: true}},
    {path:'/prizelList/:game', component:PrizeList, name:'prizelist', meta: { requiresAuth: true}},
    {path:'/history', component:history, name:'historypage', meta: { requiresAuth: true}},
    
    {path:'/winner/:game', component:Winner, name:'winner', meta: { requiresAuth: true}},
    {path:'/soon', component:Soon, name:'soon'},
    {path:'/loading', component:Processing, name:'loading'},
    {path:'/gameinfo/:game', component:gameInfo, name:'gameinfo'},
    {path:'/stocklist', component:stockList, name:'stocklist'},
    {path:'/dailywinner/:game', component:DailyPrizes, name:'dailywinner'},
    // Without Login
    {path:'/', component:Home, name:'home'},
    {path:'/signin', component:Signin, name:'signin',  meta: { requiresVisitor: true }},
    {path:'/signup', component:Signup, name:'signup',  meta: { requiresVisitor: true }},
    {path:'/forgot/password', component:forgotPassword, name:'forgotpassword',  meta: { requiresVisitor: true }},
    {path:'/update/password', component:updatePassword, name:'updatepassword',  meta: { requiresVisitor: true }},

]