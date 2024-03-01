<template>
    <v-container color="indigo darken-4" class="px-10 py-5 mt-15" style="max-width:800px !important;">
        <div v-if="pageLoad == true">
            <v-row class="pb-15 " align="center" justify="center">
                <v-col col="12" lg="4" md="4" class="fill-height">
                    <v-skeleton-loader dark type="image"></v-skeleton-loader>
                </v-col>
                <v-col col="12" lg="8" md="8">
                    <v-skeleton-loader dark type="list-item-two-line,action"></v-skeleton-loader>                    
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <AccessCode class="mb-5"></AccessCode>
            <div v-if="record == ''">
                <v-card dark color="red">
                    <v-row class="ma-0" align="center" justify="center">
                        <v-col lg="12">
                            <p class="text-center py-5 mb-0">Incorrect access code. Please enter a valid access code and try again.</p>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
            <div v-else>
                <v-card dark color="GameCardColor">
                    <v-row class="ma-0" align="center" justify="center">
                        <v-col lg="4">
                            <v-img :src="record.mediaImg" style="width:100%;height:200px"></v-img>
                        </v-col>
                        <v-col lg="8">
                            <h5 class="text-h6">{{record.game.name}} - ${{(ticketType == 'online' || ticketType == 'reserve') ? record.cost : 0}}</h5>
                            <v-chip class="my-8 customChipClaim" x-small>Start At: {{record.start_at}}</v-chip>
                            <v-chip class="my-8 customChipRed ml-3" x-small>Last Entrance: {{record.entrance_deadline}}</v-chip>
                            <v-chip class="my-8 customChipClaim ml-3" x-small>End At: {{record.end_at}}</v-chip>
                            
                            <v-card-actions v-if="record.is_time_out == true">
                                <p class="errorMessage"><v-icon class="mr-5">mdi-cancel</v-icon> Sorry! Time is out :( </p>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                            <v-card-actions v-else-if="record.can_claim == true">
                                <v-btn class="customGameButton mt-2" :loading="isLoading" dark block @click="claimNow">Claim Now</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                            <v-card-actions v-else>
                                <v-btn v-if="record.can_buy == true" class="customGameButton" dark @click="buygame =record.game.id, buyNow();" block>Buy for ${{record.game.cost}}</v-btn>
                                <p v-else class="errorMessage"><v-icon class="mr-5">mdi-cancel</v-icon> {{record.message}}</p>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </div>
        <!-- Notifications -->
        <v-snackbar v-model="notificationBar" :timeout="10000" top center :color="notificationColor" multi-line class="mt-2 mr-8" :vertical="true"> {{ notificationText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="notificationBar = false">Close</v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
import AccessCode from '../components/accesscode/index.vue'
export default {
    name:'claim-code',
    components:{AccessCode},
    data(){
        return{
            isLoading:false,
            pageLoad:false,
            access_code:'',
            ticketType:'',
            game:'',
            player:'',
            ticket:'',
            prize:'',
            start_at:'',
            end_at:'',
            record:{},
            //Notifications
          notificationBar:false,
          notificationColor:'black',
          notificationText:'',
          buygame:''
        }
    },
    created(){
        this.getTicket();
    },
    mounted(){
        document.title = 'StockMKT Challenge - Claim Ticket'
    },
    methods:{
        async buyNow() {
            this.isLoading = true;
            const response = await this.$store.dispatch('setCart', {
                game: this.buygame,
                qty: 1,
                paid:1,
                ticket:this.access_code,
                ticket_type:this.ticketType,
                free:0
            });
            location.href = '/cart';
            console.log(response);
        },
        async getTicket(){
            try{
            this.pageLoad = true;
            const response = await this.$http.get(process.env.VUE_APP_API+'/gameplay/ticket/'+this.$route.params.code);
            this.pageLoad = false;
            this.record = response.data;
            this.access_code = response.data.access_code;
            this.ticketType = response.data.ticket_type;
            
            }catch(e){
                this.pageLoad = false;
            }
        },

        async claimNow(){
            try{
            this.isLoading = true;
            const response = await this.$http.post(process.env.VUE_APP_API+'/gameplay/claim',{
                game: this.record.game.id,
                ticket: this.record.id,
                prize: this.record.prize,
                start_at: this.record.start_at,
                end_at: this.record.end_at,
            });
            this.record = response.data
            this.isLoading = false;
            this.action(response.data);
            this.$router.push({ name: 'mygame' });
        }catch(error){
            this.isLoading = false;
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
            },
    }
}
</script>

<style>

</style>