<template>
    <div>
        <v-app-bar v-if="this.$route.name != 'checkout'" :class="(this.$route.name == 'continue' || this.$route.name == 'cart' || this.$route.name == 'home') ? `headerColor header` :  `headerColor header mb-5`" flat dark max-height="70px">
            <v-toolbar-title class="StockLOGO">SMKTC</v-toolbar-title>
            <v-spacer></v-spacer>
            <ul class="topMenu">
                <li> <router-link :to="{name:'home'}" class="decorationNone">Home</router-link> </li>
                <li> <a href="/#rules" class="decorationNone">Rules </a> </li>
                <li> <a href="/#game" class="decorationNone">Games </a> </li>
                <li> <router-link :to="{name:'game'}" class="decorationNone">New Games </router-link> </li>
                <li v-if="store.getters.loggedIn"> <router-link :to="{name:'mygame'}" class="decorationNone">Enter Access Code</router-link> </li>
                <li v-if="store.getters.loggedIn"> <router-link :to="{name:'mygame'}" class="decorationNone">My Games</router-link> </li>
                <li v-if="store.getters.loggedIn"> <router-link :to="{name:'ticket'}" class="decorationNone">My Tickets</router-link> </li>
                <li> <router-link :to="{name:'stocklist'}" class="decorationNone">Stocks</router-link></li>
                <!----<li> <router-link :to="{name:'soon'}" class="decorationNone">How to play</router-link></li>-->
            </ul>
            <v-spacer></v-spacer>

            <v-menu v-if="store.getters.loggedIn" bottom left flat class="menuSetting">
                    <template v-slot:activator="{ on, attrs }">
                        <v-avatar color="white" size="36"  v-bind="attrs" v-on="on" light><span class="text-red" style="text-transform:uppercase;">{{headIcon}}</span></v-avatar>
                    </template>
                    <v-list flat>
                        <v-list-item-group  color="indigo">
                        <router-link :to="{name:'profile'}" class="SidebarLink">
                            <v-list-item>
                                <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
                                <v-list-item-content><v-list-item-title>My Profile</v-list-item-title></v-list-item-content>
                            </v-list-item>
                        </router-link>
                        <router-link :to="{name:'historypage'}" class="SidebarLink">
                            <v-list-item>
                                <v-list-item-icon><v-icon>mdi-history</v-icon></v-list-item-icon>
                                <v-list-item-content><v-list-item-title>Payment History</v-list-item-title></v-list-item-content>
                            </v-list-item>
                        </router-link>
                        <router-link :to="{name:'ticket'}" class="SidebarLink">
                            <v-list-item>
                                <v-list-item-icon><v-icon>mdi-ticket</v-icon></v-list-item-icon>
                                <v-list-item-content><v-list-item-title>My Tickets</v-list-item-title></v-list-item-content>
                            </v-list-item>
                        </router-link>
                        <v-list-item @click="logout">
                            <v-list-item-icon><v-icon>mdi-power</v-icon></v-list-item-icon>
                            <v-list-item-content>
                                    <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        </v-list-item-group>
                    </v-list>
            </v-menu>
            <div v-else>
                <router-link :to="{name:'signup'}" class="decorationNone">
                    <v-btn class="customGameButton mr-1">SIGN UP</v-btn>
                </router-link>
                <router-link :to="{name:'signin'}" class="decorationNone">
                    <v-btn class="customGameButton ml-1">LOGIN</v-btn>
                </router-link>
            </div>
    </v-app-bar>
    <v-container v-if="this.$route.name != 'home' && this.$route.name != 'signin' && this.$route.name != 'signup' && this.$route.name != 'continue'">
        <v-row class="py-5">
            <div md="12">
                <v-btn @click="goBack" color="transparent" class="white--text elevation-0" x-small><v-icon class="mr-2" color="white" small>mdi-arrow-left</v-icon>Go Back</v-btn>
                <br>
            </div>
        </v-row>
    </v-container>
</div>
</template>

<script>
import {store} from '../../store'
    export default {
        name: 'HomeHeader',
      data () {
        return {
            store:store,
            currentRouter: this.$route.name,
          drawer: true,
          items: [],
          headIcon: ''
        }
      },
      methods: {
        goBack(){
                history.back();
            },
            async logout() {
                await this.$store.dispatch('destroyToken');
                alert('You have been logged out.');
                location.reload();
            },
            getname(){
                this.headIcon = store.state.uName[0];
            }
      },
      created(){
        this.getname();
      }
    }
</script>
<style scoped>
.topMenu{
    margin:0px;
    padding:0px;
}
.topMenu li{
    list-style-type: none;
    display: inline-block;
    margin: 0px 30px;
}
.topMenu li a{
    color:#fff;
    padding:0px 10px;
    text-decoration:none;
}
.topMenu li a:hover{
    color:red;
}
.text-red{
    color:red;
    font-weight: bold;
}
.router-link-exact-active{
    color: red !important;
}
</style>