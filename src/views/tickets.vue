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
                        <h2 class="profileHeadings">My Tickets</h2>
                        <v-divider color="#212477" class="mt-2"></v-divider>
                        <v-row class="mt-5" v-if="records.length">
                            <v-col v-for="(record, i) in records" md="6" class="mb-5" :key="i">
                                <div class="ticket light" :style="record.is_used == 1 ? `opacity:0.9` : `` " >
                                    <div class="ticket-body">
                                        <p class="gameTitleTicket">Game: {{ record.game }}</p>
                                        <p class="pb-0 mb-0">Ticket No. {{ record.ticket_number }}</p>
                                        <h4 class="access_code">{{ record.access_code }}</h4>
                                        <v-chip class="mt-2 offerChip" color="#fff" xs-small outlined>
                                            Start Date: {{ record.start_at }} 
                                        </v-chip>
                                        <v-chip class="mt-2 mx-2 offerChip" color="#fff" xs-small outlined>
                                            End Date: {{ record.end_at }} 
                                        </v-chip>
                                        <v-chip class="mt-2 offerChip" color="#fff" xs-small outlined>
                                            Last Entrance: {{ record.entrance_deadline }} 
                                        </v-chip>
                                    </div>
                                    <div class="footer">
                                        <div class="disclaimer">
                                            <v-card class="pa-0 ma-0 elevation-0" color="transparent">
                                                <v-card-actions v-if="record.is_used == 1" class="px-0">
                                                    <v-btn xs-small color="white" block disabled>Claimed</v-btn>
                                                </v-card-actions>
                                                <v-card-actions v-else class="px-0">
                                                    <v-btn xs-small class="customTicketButton" type="submit" @click="access_code = record.access_code,SearchGame();">Claim Now</v-btn>
                                                        <v-spacer></v-spacer>
                                                    <v-btn xs-small class="customTicketButton" @click="ticket_id=record.id, ticketBox = true" type="submit">Send to Friend</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row class="mt-5" v-else>
                            <v-col class="mx-auto text-center">
                                <router-link :to="{name:'game'}" class="link-text mt-5 mb-5">
                                    <v-btn class="customGameButton-custom px-5 py-5"  dark >Buy Now</v-btn>
                                </router-link>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </div>
        <!-- SEND TICKET TO FRIEND-->
        <!-- Create -->
        <v-dialog v-model="ticketBox" scrollable persistent max-width="500px" transition="dialog-transition">
                <v-row class="mb-0 mx-0">
                    <v-app-bar  dark color="#c6119d" dense flat>
                        <v-toolbar-title class="dialogBoxTitle pt-4">Share Ticket with Friend</v-toolbar-title>
                            <v-spacer></v-spacer>
                        <v-btn color="white" text fab x-small @click="ticketBox=false,ticket_id='',message='',email='';" class="pt-4"><v-icon>mdi-close</v-icon></v-btn>
                    </v-app-bar>
                    <v-col lg="12" class="pa-0 mx-auto">
                        <v-card dark flat class="form-card py-15 px-5" color="#242177">
                            <form @submit.prevent="sendTicket">
                                <v-text-field outlined rounded class="customFieldText" dense v-model="email" label="Friend's email" required type="email"></v-text-field>
                                <v-textarea outlined rounded class="customFieldText" dense v-model="message" label="Message to your friend" ></v-textarea> 
                                <v-btn :loading="isLoading" class="customGameButton" block type="submit">Send</v-btn>
                            </form>
                        </v-card>
                    </v-col>
            </v-row>
        </v-dialog>
        <!-- Update -->
        <!-- Notifications -->
        <v-snackbar v-model="notificationBar" :timeout="10000" top center :color="notificationColor" multi-line class="mt-2 mr-8" :vertical="true"> {{ notificationText }}
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
                records:[],
                access_code:'',
                message:'',
                ticket_id:'',
                email:'',
                ticketBox:false,
                isLoading:false,
                 //Notifications
                notificationBar:false,
                notificationColor:'black',
                notificationText:''
            }
        },
        mounted(){
           this.fetchTicket();
           document.title = 'StockMKT Challenge - My Tickets'
        },
        methods:{
            SearchGame(){
                location.href = '/claim/'+this.access_code;
            },
            async sendTicket(){
                try{
                    this.isLoading = true;
                    const response = await this.$http.post(process.env.VUE_APP_API+'/send/ticket',{
                        id:this.ticket_id,
                        message:this.message,
                        email:this.email
                    });
                    this.message = '';
                    this.ticket_id = '';
                    this.email = '';
                    this.ticketBox = false;
                    this.action(response.data);
                    this.isLoading = false;
                }catch(error){
                    alert(error);
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
            async fetchTicket(){
                try{
                    this.pageLoad = true;
                    const response = await this.$http.get(process.env.VUE_APP_API+'/mytickets');
                    this.records = response.data;
                    this.pageLoad = false;
                }catch(error){
                    alert(error);
                    this.pageLoad = false;
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
  .customGameButton-custom{
  background-color: #c6119d !important;
  border: 3px solid #181747 !important;
  border-radius: 30px !important;
  font-size: 15px !important;
  text-transform: capitalize !important;
  font-weight: 300 !important;
  margin:0px auto !important;
  text-decoration: none !important;
}
  .gameTitleTicket{
    font-size: 13px !important;
    color: #fff !important;
    padding: 7px 15px;
    text-align: center;
    background: #181747;
    margin-bottom: 15px !important;
    border-radius: 15px;

  }
  </style>