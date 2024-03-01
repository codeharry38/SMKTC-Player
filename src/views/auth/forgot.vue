<template>
    <v-container color="indigo darken-4" class="px-10 py-5 mt-15">
        <v-row class="mb-0">
            <v-col col="12" lg="5" md="5" class=" mt-5 py-5 mx-auto">
                <v-card dark flat class="GameCardColor form-card py-15 px-5">
                    <h2 class="SignupText mb-5 centered">Enter your registered email</h2>
                    <form @submit.prevent="send">
                        <v-text-field outlined rounded required class="customFieldText" type="email" dense v-model="email" label="Email" ></v-text-field>
                        <v-btn :loading="isLoading" class="customGameButton" block type="submit">Send Link</v-btn>
                    </form>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mt-0">
            <v-col col="12" lg="5" md="5" class="mx-auto">
                <p class="text-center">
                    <router-link :to="{name:'signin'}" class="SidebarLink pr-3 mx-auto">Want to Login?</router-link>
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
        name: 'forgot-password',
        data () {
            return {
                password:'',
                // Other useful objects
                isLoading:false,
                //Notifications
                notificationBar:false,
                notificationColor:'black',
                notificationText:''
            }
        },
        mounted(){
            document.title = 'StockMKT Challenge - Forgot Password'
        },
        methods:{
            async send(){
                try{
                    this.isLoading =  true;
                    const response = await this.$http.post(process.env.VUE_APP_API+'/reset/password',{
                        email:this.email
                    });
                    this.action(response.data);
                    this.isLoading = false;
                    setTimeout( () => this.$router.push({ name: 'signin' }), 3000);
                }catch(error){
                    this.isLoading =  false;
                    this.action(error);
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
                    this.notificationText = e;
                }
            }
        }
    } 
</script>
  
  <style>
  
  
  </style>