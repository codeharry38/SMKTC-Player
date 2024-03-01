<template>
    <v-container fluid class="gameContinue" style="min-width:100% !important; min-height: 90vh;">
        <v-container v-if="pageLoad == false" color="indigo darken-4" class="px-10 py-5 mt-15">
            <v-card v-if="cart != null" class="wholeCard pa-5 elevation-0">
                <v-row class="mb-0">
                    <v-col md="8">
                        <v-card class="py-5 px-5 elevation-0" color="transparent" dark>
                            <v-row>
                                <v-col cols="12">
                                    <h4 class="offerText text-start">Cart Details</h4>
                                    <v-divider color="#212477" class="mt-2 mb-5"></v-divider>
                                    <v-card dark class="elevation-0 CartCard" color="#3732fd">
                                        <div class="d-flex flex-no-wrap">
                                            <v-avatar class="ma-3" size="125">
                                                <v-img class="white--text align-end" height="200px" :src="record.mediaImg"></v-img>
                                            </v-avatar>
                                            <div>
                                                <v-card-title class="cartGameTitle text-start">{{record.name}}</v-card-title>
                                                <v-chip class="mx-2 customChip" x-small>Start At: {{record.f_start_at}}</v-chip>
                                                <v-chip class="mx-2 customChip" x-small>Last Entrance: {{record.f_entrance_deadline}}</v-chip>
                                                <v-card-actions class="my-2 ">
                                                    <v-chip v-if="cart.ticket_type =='reserve'" class="mx-2 black--text" color="white" label>{{`Access Code: `+ cart.ticket }}</v-chip>
                                                    <div style="width:140px">
                                                        <v-text-field  v-if="cart.ticket_type !='reserve'" class="customFieldText" :max="maxval" @input="cartMovement" dense v-model="cart['paid']" label="Paid tickets" outlined type="number" hide-details ></v-text-field>
                                                    </div>
                                                    <v-chip v-if="cart.free > 0" class="mx-2 customChip" color="green" x-small>{{ cart.free }} Ticket Free</v-chip>
                                                    
                                                </v-card-actions>
                                            </div>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col md="4">
                        <v-card class="py-5 px-0 elevation-0" color="transparent" dark v-if="isOffer && cart.ticket_type !='reserve'">
                            <h4 class="offerText">Offer</h4>
                            <v-divider color="#212477" class="mt-2 mb-5"></v-divider>
                            <v-row>
                                <v-col lg="12">
                                    <div class="offer light">
                                        <div class="offer-body">
                                            <p class="pb-0 mb-0">{{ offer.name }}</p>
                                            <h4>Buy {{offer.buy}} Get <span class="text-red">{{offer.free}} Free</span> <v-icon color="#c6119d" class="ml-2" size="20">mdi-tag</v-icon></h4>
                                            <v-chip class="mt-2 offerChip" color="#fff" xs-small outlined>
                                                Available Till: {{offer.last}}
                                            </v-chip>
                                        </div>
                                        <div class="footer">
                                            <div class="disclaimer">
                                                <v-card class="pa-0 ma-0 elevation-0" color="transparent">
                                                    <v-card-actions class="px-0">
                                                        Get this offer now!
                                                        <v-spacer></v-spacer>
                                                        <v-btn xs-small class="customOfferButton" :disabled="applied" type="submit" @click="offerApply">Apply</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </div>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-card class="py-5 px-0 elevation-0" color="transparent" dark >
                            <h4 class="offerText">Order Review</h4>
                            <v-divider color="#212477" class="mt-2 mb-0"></v-divider>
                        </v-card>
                        <v-card class="py-5 px-5 CartCard elevation-0" color="#3732fd" dark >
                            <ul class="reviewList">
                                <li> 
                                    <v-card class="py-0 px-0 elevation-0" color="transparent" dark >
                                        <v-card-actions>
                                            Items <v-spacer></v-spacer>
                                            Qty * Cost
                                             <v-spacer></v-spacer> $Total
                                        </v-card-actions>
                                    </v-card>
                                </li>
                                <li> 
                                    <v-card class="py-0 px-0 elevation-0" color="transparent" dark >
                                        <v-card-actions>
                                            Ticket <v-spacer></v-spacer>
                                            <v-chip class="mx-2 customChip" x-small>{{ cart.paid }} X {{record.cost}}</v-chip>
                                             <v-spacer></v-spacer> ${{ cart.paid *  record.cost}}
                                        </v-card-actions>
                                    </v-card>
                                </li>
                                <li v-if="cart.free > 0"> 
                                    <v-card class="py-0 px-0 elevation-0" color="transparent" dark >
                                        <v-card-actions>
                                            Ticket <v-spacer></v-spacer> 
                                            <v-chip class="mx-2 customChip" x-small>{{ cart.free }} X 0</v-chip>
                                            <v-spacer></v-spacer> ${{ cart.free *  0}}
                                        </v-card-actions>
                                    </v-card>
                                </li>
                                <li> 
                                    <v-card class="py-0 px-0 elevation-0" color="transparent" dark >
                                        <v-card-actions>
                                            Total Payable <v-spacer></v-spacer>  ${{ cart.paid *  record.cost}}
                                        </v-card-actions>
                                    </v-card>
                                </li>
                            </ul>
                        </v-card>
                        <stripe-checkout
                            ref="checkoutRef"
                            pk="evn"
                            :session-id="sessionId"
                        />
                        <v-btn class="customGameButton mt-5 py-5" block type="submit" :loading="checkOutLoading" dark @click="checkOut">CHECKOUT</v-btn>
                    </v-col>
                </v-row>    
            </v-card>
            <v-card v-else class="nothingCard pa-5 elevation-0 text-center" dark>
                <h3 class="text-center">Nothing is here.</h3>
                <router-link :to="{name:'game'}" class="link-text mt-5 mb-5">
                    <v-btn class="customGameButton"  dark >Back to the Games</v-btn>
                </router-link>
            </v-card>
            <!-- Notifications -->
            <v-snackbar v-model="notificationBar" :timeout="10000" top center :color="notificationColor" multi-line class="mt-2 mr-8" :vertical="true"> {{ notificationText }}
                <template v-slot:action="{ attrs }">
                    <v-btn color="white" text v-bind="attrs" @click="notificationBar = false">Close</v-btn>
                </template>
            </v-snackbar>
        </v-container>
    </v-container>

</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe'
export default {
    components: {StripeCheckout},
    name:'product-cart',
    created() {
        if(this.cart != null){
            this.fetchgame().then(() => {
                this.pageLoad = false;
            })
        }
    },
    mounted(){
        document.title = 'StockMKT Challenge - Cart'
    },
    data(){
        this.publishableKey = `${process.env.STRIPE_PUBLISHABLE_KEY}`;
        return{
            checkOutLoading:false,
            //publishableKey: `${process.env.STRIPE_PUBLISHABLE_KEY}`,
            end_at: '31/12/2022',
            cart: this.$store.state.cart != null ? JSON.parse(this.$store.state.cart) : null,
            publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
            checkCart: '',
            applied:false,
            record: {},
            pageLoad:false,
            offer:{
                buy:0,
                free:0,
                name:'',
                last:''
            },
            isOffer:true,
            maxval:10,
            loading: false,
            sessionId: '', // session id from backend
            //Notifications
            notificationBar:false,
            notificationColor:'black',
            notificationText:'',
        }
    },
    watch:{
        'cart.free':function(){
            this.$store.dispatch('setCart',this.cart);
        },
        'cart.paid':function(){
            if(this.cart['paid'] < 1){
               this.$store.dispatch('removeCart');
               this.cart = null;
            }
            if(this.cart['paid'] < this.offer['buy']){
                this.cart.free = 0;
                this.applied = false;
                this.$store.dispatch('setCart',this.cart);
            }
        },
    },
    methods:{
        // Genrate Session and Checkout
        async checkOut() {
            try{
                this.checkOutLoading = true;
                const response = await this.$http.post(process.env.VUE_APP_API+'/checkout/session',{
                    quantity: this.cart.paid,
                    paid: this.cart.paid,
                    free: this.cart.free,
                    game:this.cart.game,
                    ticket_type:this.cart.ticket_type
                });
                if(response.data.action == false){
                    this.action(response.data);
                    this.$store.dispatch('removeCart');
                    location.reload();
                }else{
                    this.sessionId = response.data;
                    this.$refs.checkoutRef.redirectToCheckout();
                }
                this.checkOutLoading = false;
            }catch(error){
              this.pageLoad = false;
            }
        },
       /* gotoCheckout(){
            return this.$refs.checkoutRef.redirectToCheckout();
        },*/
        increment () {
            this.cart.paid = this.cart.paid > 4 ? this.cart.paid : this.cart.paid + 1;
        },
        decrement () {
            if(this.cart.paid > 1){
                 this.$store.dispatch('removeCart');
               this.cart = null;
            }
            if(this.cart.paid < this.offer.buy){
                this.cart.free = 0;
                this.applied = false;
                this.$store.dispatch('setCart',this.cart);
            }
            this.cart.paid = this.cart.paid - 1;
        },
        offerApply(){
            this.cart.paid = this.offer.buy;
            this.cart.free = this.offer.free;
            this.applied = true;
        },

        cartMovement(){
            this.checkCart = this.cart.paid;
            this.$store.dispatch('setCart',this.cart);
        },
        async fetchgame(){
          try{
                this.pageLoad = true;
                const response = await this.$http.get(process.env.VUE_APP_API+'/game/id/'+this.cart.game);
                this.record = response.data;
                this.offer['buy'] = response.data.offer.paidticket;
                this.offer['free'] = response.data.offer.freeticket;
                this.offer['name'] = response.data.offer.name;
                this.offer['last'] = response.data.offer.end_at;
                this.maxval = response.data.avilable_ticket >  5 ? 10 : response.data.avilable_ticket;
                this.isOffer = response.data.is_offer;
                this.pageLoad = false;
            }catch(error){
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
                this.notificationText = e.message;
            }
        },
    }
}
</script>

<style>
.CartCard{
    border-radius:15px !important;
}
.CartCard h4{
    font-weight: 100 !important;
}
.nothingCard{
    background:rgb(22, 32, 78) !important;
    border-radius:30px !important;
    border:1px solid rgb(22, 32, 78) !important;
}
.wholeCard{
    background:rgb(17 18 54) !important ;
    border-radius:30px !important;
    box-shadow: none !important;
}
.offerText{
    font-size:20px;
    font-weight: 300;
}
.text-red{
    color:#c6119d;
}
.customOfferButton{
    background-color: #c6119d !important;
    height: 22px !important;
    box-shadow: none !important;
    border-radius: 20px !important;
    font-size: 11px !important;
    text-transform: capitalize !important;
    font-weight: 300 !important;
    margin:0px auto !important;
    text-decoration: none !important;
}
.offerChip{
    border-radius: 15px !important;
    font-size: 11px !important;
    height: 24px !important;
    text-transform: none !important;
}
.cartGameTitle{
    font-size: 20px;
    color:#fff;
    font-weight: 300;
    text-transform:capitalize;
}
.reviewList{
    width:100%;
    margin:0px !important;
    padding:0px !important;
}
.reviewList li{
    list-style:none;
    display:block;
    padding:10px 5px;
    color:#fff;
    font-size: 15px;
    border-bottom: 1px dashed #111236;
}

</style>