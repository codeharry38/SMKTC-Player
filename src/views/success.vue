<template>
    <v-container color="indigo darken-4 " class="px-10 py-5 mt-15 d-flex align-content-center flex-wrap justify-center" style="min-height:80vh;">
        <div v-if="pageLoad == true">
            <v-row class="pb-15" align="center" justify="center">
                <v-col col="4" class="mx-auto">
                    <h2 class="WaitingContent">We are generating tickets for you.</h2>
                    <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-row class="pb-15" align="center" justify="center">
                <v-col col="4" class="mx-auto text-center">
                    <h2 class="WaitingContent">Thank you for playing the StockMKTChallenge game.<br> Click on my Tickets. Good Luck</h2>
                    <router-link :to="{name:'ticket'}" class="link-text mt-5 mb-5">
                        <v-btn class="customGameButton-custom px-5 py-5"  dark >My Tickets</v-btn>
                    </router-link>
                </v-col>
            </v-row>
            </div>
    </v-container>
</template>
  
  <script>
    export default {
        name: 'checkout-success',
        data () {
            return {
            pageLoad:false,
            }
        },
        mounted(){
           this.assignTicket();
           document.title = 'StockMKT Challenge - Success'
        },
        methods:{
            async assignTicket(){
                try{
                    this.pageLoad = true;
                    const response = await this.$http.post(process.env.VUE_APP_API+'/checkout/assign/tickets',{
                        free: JSON.parse(this.$store.state.cart).free,
                        paid: JSON.parse(this.$store.state.cart).paid,
                        game: JSON.parse(this.$store.state.cart).game,
                        ticket: JSON.parse(this.$store.state.cart).ticket,
                        ticket_type: JSON.parse(this.$store.state.cart).ticket_type
                    });
                    alert(response.data.message);
                    this.$store.dispatch('removeCart');
                    this.pageLoad = false;
                }catch(error){
                    alert(error);
                    this.pageLoad = false;
                    //bus.$emit('error',error);
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
  
  </style>