<template>
    <div>
        <!-- Slider For Homepage -->
        <div v-if="banners.length > 0">
            <carousel :autoplay="true" :autoplayTimeout="10000" :responsive="{0:{items:1,nav:false,dots:false},600:{items:1,nav:false,dots:true}}">
                <img v-for="(item,i) in banners" :key="i" :src="item.mediaImg">
            </carousel>
        </div>
        <!-- Slider For Homepage -->
        <v-container id="rules">
            <v-row class="pt-15">
                <v-col lg="12" class="text-center">
                    <h2 class="white--text mt-3"> Welcome to Stock Mkt Challenge Good Luck! </h2>
                        <img src="images/logo.png" width="300" class="mt-3">
                    <h1 class="homeHeading text-center">OFFICIAL RULES</h1>
                    <h3 class="white--text text-center">Last updated: 04/24/2023</h3>
                </v-col>
            </v-row>
            <v-row class="pb-15">
                <v-col lg="6">
                    
                        <h3 class="white--text"><u>GAME</u> </h3>
                        <p class="homeContent"> Entry into the Stock Mkt Challenge game gives every player 5 stocks from the Nasdaq or New York Stock Exchange to start the game. Players keep their 5 stocks or trade their stocks at any time during the game. The object of the game is to have the 5 stocks with the Highest or Lowest 5 stock valuation each day and when the game ends.
                        </p>
                        <h3 class="white--text"><u>$100,000 PORTFOLIO</u> </h3>
                        <p class="homeContent"> Each stock is worth $20,000 to begin the game.  The total valuation of each 5-stock portfolio is $100,000 to begin the game.
                        </p>
                        <h3 class="white--text"><u>PRIZES</u> </h3>
                        <p class="homeContent"><b><i>DAILY PRIZES</i></b>(Option)  - Prizes are awarded to the player(s) with the Highest (and Lowest) 5-stock portfolio valuation every day Monday through Friday. <br>
                            <b><i>GRAND PRIZES</i></b> – Grand Prizes are awarded to the players with the Highest and Lowest 5-stock portfolio valuations when the game ends. <br>
                            <b><i>TIES </i></b> – If there are ties, prize distribution is determined by the sponsor(s).<br>
                            <b><i>PRIZE CATEGORIES  -</i></b> Prizes can be cash, points or items of value. The number of prize categories and the amounts can vary. Prizes are awarded within 10 days after the contest ends.
                        </p>
                        <h3 class="white--text"><u>ENTRY</u> </h3>
                        <p class="homeContent">
                            ALL players are required to login to <a href="https://stockmktchallenge.com/">www.StockMktChallenge.com</a>, register and enter an access
                            code. If your entry is free or paid, click on CLAIM NOW and then ENTER NOW. If you are
                            purchasing an entry, click on BUY and follow the CART DETAILS. You will receive an
                            email confirming your entry.
            
                        </p>
                        <h3 class="white--text"><u>EARLY ENTRY</u> </h3>
                        <p class="homeContent">You can enter the game prior to the start date of the game. Stock valuations
do not change until the start date.</p>
                        <h3 class="white--text"><u>PLAYAGAIN</u> </h3>
                        <p class="homeContent">You can email tickets purchased online. Check spam folder if recipient does not receive their access code.</p>
                        
                        <h3 class="white--text"><u>DATES OF CONTEST</u> </h3>
                        <p class="homeContent">Stock Mkt Challenge game dates vary. Start and End dates are stated on the entry.</p>


                        <h3 class="white--text"><u>TRADE or AUTOTRADE</u> </h3>
                        <p class="homeContent"> You can trade your stocks at any time by clicking on TRADE or AUTOTRADE. When you click on TRADE, you select one stock from the approximately 500 stocks available to choose from. When you click on AUTOTRADE, your stock will be traded with another stock at random. When a stock is traded, the total value of the new stock is equal to the stock traded away. The game has no fees for trading.</p>
                        <h3 class="white--text"><u>LEADERBOARD</u> </h3>
                        <p class="homeContent">The LEADERBOARD lists the 5-stock portfolio valuation ranking of all entries from High to Low and is updated daily. Click on “Amount” to toggle between the High and Low stock valuations.</p>
                        
                </v-col>
                <v-col lg="6">
                    <p class="white--text homeContent"><b><u>STOCK VALUE UPDATES</u>:</b>All stock values are updated daily Monday-Friday.</p>
                        <p class="white--text homeContent"><b><u>ODDS OF WINNING</u>:</b>Odds of winning are determined by the number of entries.</p>
                        <p class="white--text homeContent"><b><u>RESULTS</u>:</b>Grand Prize results will be posted online with the total valuation of the stock portfolios, ticket numbers, winners, and prize amounts following the close of the contest.</p>
                        <p class="white--text homeContent"><b><u>STOCK TRENDS</u>:</b>A bar graph shows the stock price trend of a selected stock and gives a short history of each stock’s performance to help make decisions when trading stocks.</p>
                        <h3 class="white--text"><u>DETAILS</u> </h3>
                        <p class="homeContent">Click on DETAILS to find information on each company’s products or services.</p>

                        <h3 class="white--text"><u>EDUCATIONAL TOOL</u> </h3>
                        <p class="homeContent">The Stock Mkt Challenge game is an educational tool. It helps all players learn about the ups and downs of the stock market.</p>
                        <h3 class="white--text"><u>ERRORS</u> </h3>
                        <p class="homeContent">If there are any errors in printing, stock prices, access codes, valuations, or if any stocks have been removed from the stock exchange, split, altered, tampered, or forged in any way, the sponsor(s) reserves the right to disqualify these entries. If there is any error or alteration with the Stock Mkt Challenge software or if prizes cannot be awarded as stated for any reason, the sponsor(s) reserves the right to distribute prizes in an alternate method.  The sponsor(s) also reserves the right to terminate or modify the game at any time without prior notice. All decisions made by the sponsor(s) concerning all aspects of this contest are final.
                        </p>
                        <h3 class="white--text"><u>OWNERSHIP</u> </h3>
                        <p class="homeContent">There is no ownership or inferred ownership of any stocks by any players or the sponsoring organization.  Stock Mkt Challenge is a skill-based game. There is no affiliation with any stock market or broker. Stock Mkt Challenge is a fundraising or promotional game. All entries grant the sponsor(s) the right to use and publish their name, state, or any other media in connection with this game except where prohibited.  
                        </p>
                        <h3 class="white--text"><u>INFORMATION</u> </h3>
                        <p class="homeContent">For fundraising or promotional information about this and other programs go to 
                            <a href="http://www.greenbeefundraising.com/" target="_blank">www.greenbeefundraising.com</a> or send an email to <a href="mailto:info@GreenBeeFundraising.com">info@GreenBeeFundraising.com</a>. Entry into a Sweepstakes program allows for a free alternative method of entry.  Mail a postcard with your request to the sponsor listed here.  Include your name, address, phone and email.  One request per household. Thank you for playing. GOOD LUCK!
                        </p>
                        <br><br>
                        <p class="text-center">
                            <a href="images/rules.pdf" target="_blank" class="decorationNone customGameButton pa-3 px-10 white--text mt-5">Download Rules</a>
                        </p>
                       
                </v-col>
            </v-row>
        </v-container>
            <v-divider class="my-10 homeDvider" color="purple"></v-divider>
        <v-container id="game">
            <v-row>
                <v-col lg="12">
                    <h2 class="white--text homeHeading">Games</h2>
                </v-col>
            </v-row>
            <v-row class="mb-15">
                <v-col v-for="(record,i) in records" :key="i" col="12" lg="4" md="4" class="py-5">
                    <v-card dark color="GameCardColor" :style="(record.is_sold_out == true || record.is_time_out == true) ? `opacity:0.7` : ``">
                        <v-img class="white--text align-end" height="200px" :src="record.mediaImg">
                        </v-img>
                        <div v-if="(record.is_sold_out == false && record.is_time_out == false && record.avilable_ticket < 6)" class="floatchip"> Only {{ record.avilable_ticket }} Left</div>
                        <v-card-subtitle class="pb-0 centered customInnerTitle">
                            <p class="gameName">{{record.name}}</p>
                            <v-chip class="mx-2 customChip" x-small>Start At: {{record.f_start_at}}</v-chip>
                            <v-chip class="mx-2 customChip" x-small>Last Entrance: {{record.f_entrance_deadline}}</v-chip>
                        </v-card-subtitle>
                        <v-card-actions class="centered pb-5 pt-5 px-10">
                            <router-link to="#" class="decorationNone">
                                <v-btn v-if="record.is_time_out == true" class="customGameButton" dark :disabled="true">Time Out</v-btn>
                                <v-btn v-else-if="record.is_sold_out == true" class="customGameButton" dark :disabled="true">Sold Out</v-btn>
                                <v-btn v-else class="customGameButton" dark @click="buygame =record.id, buyNow(); ">Buy for ${{record.cost}}</v-btn>
                            </router-link>
                            <v-spacer></v-spacer>
                            <router-link :to="{name:'gameinfo', params:{game:record.id}}" class="decorationNone">
                                <v-btn  class="customGameButton" dark>Details</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-divider class="my-10 homeDvider" color="purple"></v-divider>
        <v-container>
            <v-row>
                <v-col lg="12">
                    <p class="termCondition">All information is provided on an "as-is" basis for informational purposes only, and is not intended for actual trading purposes or market advice. Quote data may be delayed at least 15 minutes. Quotes provided by Xignite and QuoteMedia. Neither Stock-Trak nor any of its independent data providers or partners, are liable for incomplete information, delays, or any actions taken in reliance upon information contained herein. By accessing this site, you agree not to redistribute the information found within. This site is a product of Stock-Trak, a provider of web-based financial simulations for information and education.

This is a financial simulation, no real accounts are being opened, jobs being offered and nothing of monetary value is being exchanged or placed in any accounts</p>
                </v-col>
            </v-row>
        </v-container>

    </div>
    
</template>

<script>
import carousel from "vue-owl-carousel";
export default {
    name:'home-main',
    components: {carousel},
    data(){
        return {
            records:[],
            banners:[],
            pageLoad:true,
            buygame:''
        }
    },
    mounted(){
        this.fetchrecords();
        this.fetchbanners();
        document.title = 'StockMKT Challenge - Home'
    },
    methods:{
        async buyNow() {
            this.isLoading = true;
            const response = await this.$store.dispatch('setCart', {
                game: this.buygame,
                qty: 1,
                paid:1,
                free:0
            });
            location.href = '/cart';
            console.log(response);
        },
        async fetchrecords(){
          try{
              const response = await this.$http.get(process.env.VUE_APP_API+'/player/game');
              this.records = response.data;
              this.pageLoad = false;
          }catch(error){
              this.pageLoad = false;
              //bus.$emit('error',error);
          }
      },

      async fetchbanners(){
          try{
              const response = await this.$http.get(process.env.VUE_APP_API+'/banner/active/records');
              this.banners = response.data;
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
.homeHeading{
    font-size:50px;
    color:#fff;
    margin-bottom:15px;
    font-weight:400;
}
.homeContent{
    font-size:18px;
    color:#fff;
    font-weight: 300;
    line-height:30px;
}
</style>