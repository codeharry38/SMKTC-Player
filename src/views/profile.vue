<template>
    <v-container color="indigo darken-4 " class="px-10 py-5 mt-15">
        <div v-if="pageLoad == true">
            <v-row class="pb-15" align="center" justify="center">
                <v-col col="4" class="mx-auto">
                    <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-card class="pa-0 ma-0 elevation-0" >
                <v-row class="ma-0">
                    <v-col md="3" class="ma-0 pa-0">
                        <Sidebar></Sidebar>
                    </v-col>
                    <v-col md="9" class="px-10 py-5">
                        <h2 class="profileHeadings">My Profile</h2>
                        <v-divider color="#212477" class="mt-2"></v-divider>
                        <v-card class="elevation-0">
                            <v-card-text class="pt-5">
                                <v-row>
                                    <v-col md=12>
                                        <v-text-field v-model="name" outlined rounded label="Name" class="customField" color="black" hide-details dense></v-text-field>
                                    </v-col>                                    
                                </v-row>
                                <v-row>
                                    <v-col md=6>
                                        <v-text-field v-model="email" outlined rounded label="Email" class="customField" color="black" hide-details dense></v-text-field>
                                    </v-col>
                                    <v-col md=6>
                                        <v-text-field v-model="phone" outlined rounded label="Phone" class="customField" color="black" hide-details dense></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md=6>
                                        <v-text-field v-model="username" outlined rounded label="Username" class="customField" color="black" hide-details dense></v-text-field>
                                    </v-col>
                                    <v-col md=6>
                                        <v-text-field v-model="password" outlined rounded label="Password" class="customField" color="black" hide-details dense></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md=12>
                                        <v-textarea v-model="address" outlined rounded label="Full Address" class="customField" color="black" hide-details dense></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="text--center">
                                <v-spacer></v-spacer>
                                <v-btn  dark class="mx-5 customGameButton-profile" :loading="isLoading" @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>  
                    </v-col>
                </v-row>
            </v-card>
        </div>
        <!-- Notifications -->
        <v-snackbar v-model="notificationBar" :timeout="10000" top right :color="notificationColor" multi-line class="mt-15 mr-8" :vertical="true"> {{ notificationText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="notificationBar = false">Close</v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>
  
  <script>
  import Sidebar from '../components/inc/sidebar.vue'
    export default {
        components:{Sidebar},
        name: 'checkout-success',
        data () {
            return {
                pageLoad:false,
                name:'',
                email:'',
                phone:'',
                username:'',
                password:'',
                address:'',
                isLoading:false,    
                //Notifications
                notificationBar:false,
                notificationColor:'black',
                notificationText:''
            }
        },
        mounted(){
           this.myProfile();
           document.title = 'StockMKT Challenge - My Profile'
        },
        methods:{
            SearchGame(){
                location.href = '/claim/'+this.access_code;
            },
            async myProfile(){
                try{
                    this.pageLoad = true;
                    const response = await this.$http.get(process.env.VUE_APP_API+'/myprofile');
                    this.name = response.data.name;
                    this.email = response.data.email;
                    this.phone = response.data.phone;
                    this.username = response.data.username;
                    //this.password = response.data.name;
                    this.address = response.data.address;
                    this.pageLoad = false;
                }catch(error){
                    alert(error);
                    this.pageLoad = false;
                }
            },
            async save(){
                try{
                    this.isLoading = true;
                    const response = await this.$http.put(process.env.VUE_APP_API+'/myprofile/update',{
                        name: this.name,
                        email: this.email,
                        phone: this.phone,
                        password: this.password,
                        address: this.address,
                    });
                    this.isLoading = false;
                    this.action(response.data);
                    this.isLoading = false;
                    
                }catch(error){
                    this.action(error);
                    this.isLoading = false;
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
                        let name = ar[0].name !== undefined ? ar[0].name : ' ';
                        let phone =  ar[0].phone !== undefined ?  ar[0].phone : ' ';
                        let email =   ar[0].email !== undefined ?  ar[0].email : ' ';

                        return name+' '+email+' '+phone;
                    }else{
                        return error.response.data.message;
                    }
                }else{
                    return error;
                }
            },

        }
    }
  </script>
  
  <style>
  .WaitingContent{
    font-size:30px;
    color:#fff;
    padding:20px;
    margin-bottom:20px;
    text-align: center;
    font-weight:normal;
  }
  .customGameButton-profile{
  background-color: #c6119d !important;
  border-radius: 30px !important;
  font-size: 15px !important;
  text-transform: capitalize !important;
  font-weight: 300 !important;
  margin:0px auto !important;
  text-decoration: none !important;
}
  
  </style>