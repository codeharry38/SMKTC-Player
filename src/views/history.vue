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
                        <h2 class="profileHeadings">Payment History</h2>
                        <v-divider color="#212477" class="mt-2"></v-divider>
                        <v-card class="elevation-0">
                            <v-card-text class="pt-5">
                                <v-row>
                                    <v-col md=12>
                                        <v-data-table :headers="historyHeader" :items="records" class="elevation-0 pr-5 dataText">
                                            <template v-slot:[`item.id`]="{ item }">
                                               {{ item.status == 'succeeded' ? item.charges.data[0].receipt_number : 'Null' }}
                                            </template>
                                            <template v-slot:[`item.created`]="{ item }">
                                                {{ orderDate(item.created) }}
                                            </template>
                                            <template v-slot:[`item.amount`]="{ item }">
                                                $ {{ Number(item.amount / 100).toFixed(2) }}
                                            </template>
                                            <template v-slot:[`item.status`]="{ item }">
                                                {{ item.status }}
                                            </template>
                                            <template  v-slot:[`item.download`]="{ item }">
                                                <a v-if="item.status == 'succeeded'" target="_blank" :href="item.charges.data[0].receipt_url" style="text-decoration: none;"><v-btn x-small rounded class="elevation-0" dark>Download</v-btn></a>
                                            </template>
                                            
                                        
                                        </v-data-table>
                                    </v-col>                                    
                                </v-row>
                            </v-card-text>
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
        name: 'history-temp',
        data () {
            return {
                pageLoad:false,
                records:[],
                isLoading:false,
                historyHeader: [
                    { text: 'Order Date', value: 'created', sortable:false },
                    { text: 'Amount', value: 'amount', sortable:false },
                    { text: 'Status', value: 'status', sortable:false },
                    { text: 'Download', value: 'download', sortable:false },
                ],
                //Notifications
                notificationBar:false,
                notificationColor:'black',
                notificationText:''
            }
        },
        mounted(){
           this.history();
           document.title = 'StockMKT Challenge - Payment History'
        },
        methods:{
            orderDate(data){
                let final = (data * 1000);
                let excut =  new Date(final);
                let day = excut.getDate();
                let month = excut.getMonth() + 1;
                let year = excut.getFullYear();
                return month+'-'+day+'-'+year;
            },
            async history(){
                try{
                    this.pageLoad = true;
                    const response = await this.$http.get(process.env.VUE_APP_API+'/player/invoce');
                    //console.log( response);
                    this.records = response.data.record.data
                    //console.log( response);
                    this.pageLoad = false;
                }catch(error){
                    alert(error);
                    this.pageLoad = false;
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
            }
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