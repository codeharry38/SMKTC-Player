<template>
    <div>
        <v-container v-if="pageLoad == false">
        <v-row class="py-0" align="center">
            <v-col md="4">
                <v-btn @click="goBack" color="transparent" class="white--text elevation-0" x-small><v-icon class="mr-2" color="white" small>mdi-arrow-left</v-icon>Go Back</v-btn>
                <br>
            </v-col>
            <v-col md="4">
                <router-link :to="{name:'leaderboard', params:{game:record.game.id}}" class="decorationNone">
                    <v-btn class="mt-2 mx-3 elevation-0" v-if="record.status == 1" color="red" block dark>Leader Board</v-btn>
                </router-link>
            </v-col>
            <v-col md="4">
                <router-link :to="{name:'prizelist', params:{game:record.game.id}}" class="decorationNone">
                    <v-btn class="mt-2 mx-3 elevation-0" v-if="record.status == 1" color="red" block dark>Prizes  </v-btn>
                </router-link>
            </v-col>    
        </v-row>
    </v-container>
        <v-container v-if="pageLoad == true" fluid class="gameContinue d-flex align-content-center flex-wrap justify-center"  style="min-width:100% !important; min-height:90vh;">
            <v-row align="center" justify="center">
                <v-col lg="8" >

                    <h2 class="WaitingContent">Fetching...</h2>   
                    <div style="width:450px" class="mx-auto"><v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear></div>

                </v-col>
                <v-col md="4">
                    <v-skeleton-loader dark 
                        type="divider, list-item-three-line, actions, card-heading,divider, list-item-three-line, card-heading,divider, list-item-three-line, card-heading"></v-skeleton-loader>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else fluid class="gameContinue" style="min-width:100% !important">
            <v-row>
                <v-col md="12">
                    <v-card color="#292b57 !important" class="elevation-0 mb-5 px-5 py-5">
                        <v-card-actions>
                            <span class="white--text">Game<br>{{ record.game.name }}</span> 
                            <v-spacer></v-spacer>
                            <span class="white--text">Ticket#<br>{{ record.ticket.ticket_number}}</span>
                            <v-spacer></v-spacer>
                            <span class="white--text">Access Code<br>{{record.ticket.access_code}}</span>
                            <v-spacer></v-spacer>
                            <span class="white--text">Dates<br>{{  record.start_at }} to {{record.end_at  }}</span>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>


                <!-- Cart and Details-->
                <v-col lg="4">
                    <v-card dark class="pa-5" color="rgb(22, 32, 78)">
                        <div v-if="(chartLoad == true)">
                            <h2 class="WaitingContent">Fetching...</h2>   
                            <div style="width:450px" class="mx-auto"><v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear></div>
                        </div>
                        <highcharts v-else :constructorType="'stockChart'" class="hc mt-5" :options="chartData" ref="chart"></highcharts>
                        <br>
                        <p v-if="(chartLoad == false) && stockProfileData" class="aboutText">{{ stockProfileData.description || '' }}</p>
                        <v-card-actions v-if="(chartLoad == false)  && stockProfileData.assetProfile">
                            <v-chip class="mx-2" small>Country: {{stockProfileData.country || '' }}</v-chip>
                            <v-chip class="mx-2" small>State: {{stockProfileData.state || '' }}</v-chip>
                            <v-chip class="mx-2" small>City: {{stockProfileData.city || '' }}</v-chip>
                        </v-card-actions>
                        <v-card-actions v-if="(chartLoad == false)  && stockProfileData">
                            <v-chip class="mx-2" small>Industry: {{stockProfileData.industry || '' }}</v-chip>
                            <v-chip class="mx-2" small>Sector: {{stockProfileData.sector || '' }}</v-chip>
                        </v-card-actions>
                        <v-card-actions v-if="(chartLoad == false)  && stockProfileData">
                            <v-chip class="mx-2" small>Full Time Employees: {{stockProfileData.fullTimeEmployees || '' }}</v-chip>
                            <v-chip class="mx-2" small>Website: <a :href="stockProfileData.website" target="_blank" class="pl-2" style="color:#fff;">{{stockProfileData.website || ''}}</a></v-chip>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col md="8">
                    <v-card color="transparent" class="elevation-0 mt-3 mb-5 px-5">
                        <v-row>
                            <v-col md="12" v-if="record.is_end == 0">
                            <h2 class="fiveStockHeading text-center">Your 5 stocks with current valuation. You can keep or trade your 5 stocks.</h2>
                            </v-col>
                            <v-col md="12" v-if="record.is_end == 1">
                                <h1 class="GameBannerFont">Game Ended</h1>
                            </v-col>
                        </v-row>
                        <v-row v-if="record.is_end == 0">
                            <v-col v-if="record.is_start == 1" md="4">
                                <v-btn class="mt-2 mx-3 elevation-0" color="green" dark block >Active Game</v-btn>
                            </v-col>
                            <v-col v-else md="12">
                                <h2 class="red--text h3 text-center">Keep the excitement going, we'll begin this game on {{  record.start_at }}</h2>
                            </v-col>
                            <v-col md="4" v-if="record.is_start == 1">
                                <router-link :to="{name:'dailywinner', params:{game:record.game.id}}" class="decorationNone">
                                    <v-btn class="mt-2 mx-3 elevation-0" v-if="record.status == 1" color="white" block>Daily Prizes</v-btn>
                                </router-link>
                            </v-col>
                            <v-col md="4" v-if="record.is_start == 1">
                                <router-link :to="{name:'winner', params:{game:record.game.id}}" class="decorationNone">
                                    <v-btn class="mt-2 mx-3 elevation-0" v-if="record.status == 1" color="white" block>Grand Prize</v-btn>
                                </router-link>
                            </v-col>
                        </v-row>
                        <v-row v-if="record.is_end == 1">
                            <v-col md="6">
                                <router-link :to="{name:'dailywinner', params:{game:record.game.id}}" class="decorationNone">
                                    <v-btn class="mt-2 mx-3 elevation-0" v-if="record.status == 1" color="white" block>Daily Prizes</v-btn>
                                </router-link>
                            </v-col>
                            <v-col md="6">
                                <router-link :to="{name:'winner', params:{game:record.game.id}}" class="decorationNone">
                                    <v-btn class="mt-2 mx-3 elevation-0" v-if="record.status == 1" color="white" block>Grand Prize</v-btn>
                                </router-link>
                            </v-col>
                        </v-row>
                        
                    </v-card>
                    <v-divider color="#212477" class="my-5 ml-8"></v-divider>
                    <v-row class="pl-8">
                        <v-col md="12">
                            <v-card class="py-5 px-5 valueData" color="#111236" dark v-if="record.status == 1">
                                <v-card-actions>
                                <h4>Total Value <br> $ 100000.00</h4>
                                <v-spacer></v-spacer>
                                <h4>Current Value <br> ${{ (record.total).toFixed(2) }}</h4>
                                <v-spacer></v-spacer>
                                <span :class="(record.total.toFixed(2) - 100000) < 0 ? 'otherValue mx-3 red--text' : 'otherValue mx-3 green--text' ">(+)/(-)<br>{{ (record.total.toFixed(2) - 100000) >= 0 ? '+ ' : ''}} {{(((record.total.toFixed(2) - 100000)* 100) / 100000).toFixed(2) }} %</span>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-divider color="#212477" class="my-5 ml-8"></v-divider>
                    <ul class="stockList">
                        <li v-for="(stock, i) in record.stocks" :key="i" :class="currentSymbole==stock.stock_meta.symbol ? `activeStock` : ``">
                            <v-card color="transparent" class="elevation-0" @click="(currentSymbole = stock.stock_meta.symbol, stockId = stock.id, currentTab = i)">
                                <v-card-actions>
                                    <span class="stockName mx-3">{{stock.stock_meta.symbol}}</span>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="currentSymbole != stock.stock_meta.symbol" class="mx-3 elevation-0 customTrandBtn" color="red" dark small @click="stockProfile = true, selectedStock = stock.stock_meta.symbol;">Details</v-btn>                          
                                </v-card-actions>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <span class="otherValue mx-3">Start Value<br>$20000</span> 
                                    <span class="otherValue mx-3">Current Value<br>${{ Number(stock.total_value).toFixed(2) }}</span>
                                    <span :class="(Number(stock.total_value).toFixed(2) - 20000) < 0 ? 'otherValue mx-3 red--text' : 'otherValue mx-3 green--text' ">(+)/(-)<br>{{ (Number(stock.total_value).toFixed(2) - 20000) >= 0 ? '+ ' : ''}} {{(((Number(stock.total_value).toFixed(2) - 20000) * 100) / 20000).toFixed(2) }} %</span>
                                    <span class="otherValue mx-3">Open<br>{{stock.open}}</span>
                                    <span class="otherValue mx-3 highValue">High<br>{{stock.high}}</span>
                                    <span class="otherValue mx-3 lowValue">Low<br>{{stock.low}}</span>
                                    <span class="otherValue mx-3">Close<br>{{stock.close}}</span>
                                    <span class="otherValue mx-3">Volume<br>{{stock.volume}}</span>
                                </v-card-actions>
                            </v-card>
                            <div v-if="currentSymbole==stock.stock_meta.symbol" class="actionList">
                                <v-card color="transparent" class="elevation-0 border-top-action-panel">
                                    <v-card-actions>
                                        <v-btn v-if="record.is_end == 0" class="mt-2 mx-3 elevation-0 customTrandBtn" dark @click="(manualStock=stock.id, stockBox = true)">Manual Pick</v-btn>
                                        <v-btn v-if="record.is_end == 0" class="mt-2 mx-3 elevation-0 customTrandBtn" dark :loading="autopicLoad" @click="(changestock=stock.id, autopick())">Auto Pick</v-btn>
                                        <v-spacer></v-spacer>
                                        <p class="stockFullName mb-0">{{stock.stock_meta.name}}</p>
                                    </v-card-actions>
                                </v-card>
                            </div>
                        </li>
                    </ul>
                </v-col>
            </v-row>

            <v-dialog v-model="stockProfile" scrollable persistent max-width="1200px" transition="dialog-transition">
                <StockProfileBox :symbole="selectedStock"></StockProfileBox>
            </v-dialog>
            <v-dialog v-model="stockBox" scrollable persistent max-width="1500px" transition="dialog-transition">
                <StockListBox :selectStock="manualStock" :gameplay="gamepalyId"></StockListBox>
            </v-dialog>
            <!-- Notifications -->
            <v-snackbar v-model="notificationBar" :timeout="10000" top center :color="notificationColor" multi-line class="mt-2 mr-8" :vertical="true"> {{ notificationText }}
                    <template v-slot:action="{ attrs }">
                        <v-btn color="white" text v-bind="attrs" @click="notificationBar = false">Close</v-btn>
                    </template>
                </v-snackbar>
        </v-container>
  </div>
</template>

<script>
import {bus} from '../main'
//import TradingVue from 'trading-vue-js'
import StockProfileBox from '../components/stockprofile.vue'
import StockListBox from '../components/stockList.vue'
//import Config from "../config/index";
export default {
    name: 'continue-game',
    components: {StockProfileBox,StockListBox },
    created() {
        bus.$on('close',(data) =>  {
            if(data == 'profile'){
                this.selectedStock='';
                this.stockProfile= false;
            }
            if(data == 'listBox'){
                this.manualStock = '';
                this.stockBox = false;
            }            
      });
      bus.$on('stockUpdate',(data) =>  {
            if(data == 'listBox'){
                this.manualStock = '';
                this.stockBox = false;
                this.fetchData();
            }            
      });
      
        
        this.fetchData().then(() => {
            //this.fetchMap().then(() => { this.pageLoad = false; });
            //Config.fetchlocalGameRecords(this.$route.params.game, this.stockId ,this.currentSymbole,this.chartData)
            //console.log(this.record);
            if(this.record.status == 0){
                this.startNow();
                //this.fetchData();
            }else{
                return false;
            }

        })

       
    },
    mounted(){
        document.title = 'StockMKT Challenge - Game Screen'
        
    },
    data(){
        return{
            // backend Fetched Data
            game:{},
            record:{},
            currentSymbole:'',
            pageLoad:true,
            chartLoad:true,
            navbar:1,
            chartData:{
                subtitle:'aapl',
                series: [
                    {
                        data: []
                    }
                ]
            },
            stockId:'',
            currentTab:0,
            totalCount:'',
            changestock:'',
            autopicLoad:false,
            //Notifications
            notificationBar:false,
            notificationColor:'black',
            notificationText:'',
            // Start 
            startIsLoading:false,
            selectedStock:'',
            stockProfile:false,
            gamepalyId:this.$route.params.game,
            stockBox:false,
            manualStock:'',
            stockProfileData:''

        }
    },
    watch:{
        currentSymbole(){
            return this.fetchMap();
        },
    },
    methods:{
        goBack(){
                history.back();
            },
        //Start game
        async startNow(){
            try{
                this.startIsLoading = true;
                const response = await this.$http.post(process.env.VUE_APP_API+'/gameplay/start',{
                    id:this.$route.params.game,
                });
                this.action(response.data);
                this.fetchData();
                this.startIsLoading = false;
            }catch(e){
                this.action(e);
                this.startIsLoading = false;
            }
        },
        // Auto pic Stock
        async autopick(){

            try{
                this.autopicLoad = true;
                const response = await this.$http.post(process.env.VUE_APP_API+'/gameplay/autopick',{
                    selectedStock: this.changestock
                });
                this.action(response.data);
                this.fetchData();
                this.autopicLoad = false;
            }catch(e){
                this.action(e);
                this.autopicLoad = false;
            }

        },

        async fetchprofile(){
            try{
                //this.pageLoad = true;
                //this.windowLoad = true;
                const response =  await this.$http.get(process.env.VUE_APP_STOCK_PROFILE_URL+this.currentSymbole+'?apikey='+process.env.VUE_APP_STOCK_PROFILE_KEY);
                //this.windowLoad = false;
                this.stockProfileData = response.data[0];
                //console.log( this.stockProfileData);
            }catch(e){
                alert(e);
                //this.windowLoad = false;
            }
        },

        async fetchData(){
            try{
                this.pageload = true;
                const response = await this.$http.get(process.env.VUE_APP_API+'/gameplay/continue/'+this.$route.params.game);
                this.game = response.data.game;
                this.record = response.data;
                this.currentSymbole = response.data.stocks[0].stock_meta.symbol;
                this.stockId = response.data.stocks[0].id;
                this.pageload = false;
            }catch(e){
                this.action(e);
                this.pageload = false;
            }
        },
        async fetchMap(){
            try{
                //console.log(this.chartData);
                
                //this.pageLoad = true;
                this.chartLoad = true;
                const response =  await this.$http.get(process.env.VUE_APP_STOCK_URL+'/intraday', {
                    params: {symbol: this.currentSymbole, interval: '60min', maxreturn: '100'},
                    headers: {
                        'X-RapidAPI-Key': process.env.VUE_APP_STOCK_KEY,
                        'X-RapidAPI-Host': process.env.VUE_APP_STOCK_HOST
                    }
                });
                this.fetchprofile();
                const converted = response.data['Results'];
                //console.log(response.data['Results']);
                let praisData = []
                converted.forEach((i) => {
                    praisData.push([Number(new Date(i.Date).getTime()), Number(i.Open), Number(i.High), Number(i.Low), Number(i.Close), Number(i.Volume)]);
                });
                praisData.sort(function(a,b){return a[0] - b[0]});
                //this.chartData.series[0].data = [];
                this.chartData.series[0].data = praisData;
                //console.log(this.chartData.series.data);
                this.totalCount = this.chartData.series[0].data.length -1;
                this.pageLoad = false;
                //console.log(this.chartData);
                this.chartLoad = false;
            }catch(e){
                this.action(e);
                this.chartLoad = false;
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
.stockList{
    margin:0px;
    padding:0px;
}
.stockList li{
    display:table;
    width:100%;
    list-style: none;
    padding:10px 20px;
    color:#fff;
    border-radius:15px;
    margin-top:10px;
    background:rgb(22, 32, 78);
}
.stockList li:hover{
    background:#292b57;
}
.stockList li .stockName{
    font-size:15px;
    font-weight: bold;
    color:red;
    background:rgba(255, 0, 0, 0.151);
    padding:5px 15px;
    border-radius:10px;
}
.stockList li .otherValue{
    font-size:16px;
    text-align: center;
    color:#fff;
}
.stockList li span{
    display:inline-block;
    float:left;
}
.totalValue{
    font-size:20px;
}
.highValue{
    color:rgb(0, 189, 0) !important;
}
.lowValue{
    color:red !important;
}
.activeStock{
    background:#292b57 !important;
}
.border-top-action-panel{
    border-top:1px solid #000;
}
.customTrandBtn{
    border-radius:15px !important;
    font-size:13px !important;
    text-transform:capitalize !important;
    background:#111236 !important;
    padding:10px 15px !important;
}
.valueData{
    border-radius:15px !important;
    box-shadow: inset 0px 0px 25px #111236 !important;
    border: 1px solid !important;
}
.valueData h4{
    font-weight: 100 !important;
}
.font-ban{
    font-size:20px !important;
    padding:20px !important;
}
</style>