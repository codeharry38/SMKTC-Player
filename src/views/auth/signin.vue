<template>
    <v-container color="indigo darken-4" class="px-10 py-5 mt-15">
        <v-row class="mb-0">
            <v-col col="12" lg="5" md="5" class=" mt-5 py-5 mx-auto">
                <v-card dark flat class="GameCardColor form-card py-15 px-5">
                    <h2 class="SignupText mb-5 centered">Sign In</h2>
                    <form @submit.prevent="signin">
                        <v-text-field outlined rounded class="customFieldText" dense v-model="username" label="Username" required></v-text-field>  
                        <v-text-field outlined rounded class="customFieldText" :type="fieldType" dense v-model="password" label="Password" required
                        :append-icon="fieldType == 'password' ? `mdi-eye` : `mdi-eye-off`" @click:append="changeType"                       
                        ></v-text-field>
                        <v-btn :loading="isLoading" class="customGameButton" block type="submit">Sign in</v-btn>
                    </form>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mt-0">
            <v-col col="12" lg="5" md="5" class="mx-auto">
                <p class="text-center">
                    <router-link :to="{name:'signup'}" class="SidebarLink pr-3 mx-auto">Don't have account?</router-link>
                    <router-link :to="{name:'forgotpassword'}" class="SidebarLink pr-3 mx-auto">Forgot password?</router-link>
                </p>
            </v-col>
        </v-row>
        <!-- Notifications -->
        <v-snackbar v-model="notificationBar" :timeout="10000" top center :color="notificationColor" multi-line class="mt-2 mr-8" :vertical="true"> {{ notificationText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="notificationBar = false">Close</v-btn>
            </template>
        </v-snackbar>
    </v-container>
  </template>
  
  <script>
  export default {
      name: 'game-main',
      data () {
        return {
          items: [{ src: '/images/winner-banner.png'},{src: '/images/winner-banner.png'},{src: '/images/winner-banner.png'}],
          records:[],
          pageLoad:true,
          username:'',
          password:'',
          fieldType:'password',
          // Other useful objects
            isLoading:false,
            //Notifications
          notificationBar:false,
          notificationColor:'black',
          notificationText:''
        }
      },
      mounted(){
       //   this.fetchrecords();
       document.title = 'StockMKT Challenge - Signin'
      },
      methods:{
        changeType(){
            if(this.fieldType == 'password'){
                this.fieldType = 'text';
            }else{
                this.fieldType = 'password';
            }
        },
        async signin() {
            try{
                this.isLoading = true;
                const response = await this.$store.dispatch('retrieveToken', {
                    username: this.username,
                    password: this.password,
                });
                if(response.data.action == true){
                    this.action(response.data);
                    location.reload();
                }
                else{
                    this.notificationColor = 'red';
                    this.notificationBar = true;
                    this.notificationText = response.data.message;
                    
                }
                this.isLoading = false;
            }catch(e){
                this.action(e);
                this.isLoading = false;
            }
        },
        action(e){
            if(e.action == true){
                this.notificationColor = 'black';
                this.notificationBar = true;
                this.notificationText = e.message;
            }else{
                this.notificationColor = 'red';
                this.notificationBar = true;
                this.notificationText = this.makeMessage(e);
            }
        },
        makeMessage(error){
            if(error.response){
                let ar = [];
                if(error.response.data.errors){
                    ar.push(error.response.data.errors);
                    let username = ar[0].username !== undefined ? ar[0].username : ' ';
                    let password = ar[0].password !== undefined ?  ar[0].password : ' ';
                    return username+' '+password;
                }else{
                    return error.response.data.message;
                }
            }else{
                return error;
            }
        },
        async fetchrecords(){
            try{ 
                const response = await this.$http.get(process.env.VUE_APP_API+'/game/active/records');
                this.records = response.data;
                this.pageLoad = false;
            }catch(error){
                this.pageLoad = false;
                //bus.$emit('error',error);
            }
        },
      }
  }
  </script>
  
  <style>
  .customFieldText button{
    font-size:14px !important;
  }
  
  </style>