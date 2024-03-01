<template>
    <div>
        <v-app-bar  color="dark" dark dense flat>
            <v-toolbar-title class="dialogBoxTitle"><b>Stocks List</b></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" text fab x-small @click="close"><v-icon>mdi-close</v-icon></v-btn>
        </v-app-bar>
        <v-container class="whiteBg px-0" style="min-width:100% !important">
            <v-card dark>
                <v-row class="mx-0">
                    <v-col md="12">
                        <v-card color="#292b57 !important" class="elevation-0 mb-0 px-5 py-5 valueData">
                            <v-card-actions>
                                <h2 class="">The displayed data is the most recent and up-to-date.</h2>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row class="mx-0">
                    <v-col md="12 pt-0">
                        <v-card color="#292b57 !important" class="elevation-0 mb-0 px-5 py-5 valueData">
                            <v-card-actions>
                                <span class="white--text"><b>Game<br>{{ record.game.name }}</b></span> 
                                <v-spacer></v-spacer>
                                <span class="white--text"><b>Ticket#<br>{{ record.ticket.ticket_number}}</b></span>
                                <v-spacer></v-spacer>
                                <span class="white--text"><b>Dates<br>{{  record.start_at }} to {{record.end_at  }}</b></span>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row class="mx-0">
                    <v-col md="12 pt-0">
                        <v-row class="mx-0">
                            <v-col md="12 px-0">
                                <v-card class="py-5 px-5 valueData" color="#111236" dark v-if="record.status == 1">
                                    <v-card-actions>
                                    <h4><b>Total Value <br> $ 100000.00</b></h4>
                                    <v-spacer></v-spacer>
                                    <h4><b>Current Value <br> ${{ (record.total).toFixed(2) }}</b></h4>
                                    <v-spacer></v-spacer>
                                    <span :class="(record.total.toFixed(2) - 100000) < 0 ? 'otherValue mx-3 red--text' : 'otherValue mx-3 green--text' "><b>(+)/(-)<br>{{ (record.total.toFixed(2) - 100000) >= 0 ? '+ ' : ''}} {{(((record.total.toFixed(2) - 100000)* 100) / 100000).toFixed(2) }} %</b></span>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                        <ul class="stockList2">
                            <li v-for="(stock, i) in record.stocks" :key="i">
                                <v-card color="transparent" class="elevation-0">
                                    <v-card-actions>
                                        <span class="stockName mx-3">{{stock.stock_meta.symbol}}</span>
                                    </v-card-actions>
                                    <v-card-actions>
                                        <span class="otherValue mx-3">Current Value<br>${{ Number(stock.total_value).toFixed(2) }}</span>
                                        <span :class="(Number(stock.total_value).toFixed(2) - 20000) < 0 ? 'otherValue mx-3 red--text' : 'otherValue mx-3 green--text' ">(+)/(-)<br>{{ (Number(stock.total_value).toFixed(2) - 20000) >= 0 ? '+ ' : ''}} {{(((Number(stock.total_value).toFixed(2) - 20000) * 100) / 20000).toFixed(2) }} %</span>
                                        <span class="otherValue mx-3">Open<br>{{stock.open}}</span>
                                        <span class="otherValue mx-3 highValue">High<br>{{stock.high}}</span>
                                        <span class="otherValue mx-3 lowValue">Low<br>{{stock.low}}</span>
                                        <span class="otherValue mx-3">Close<br>{{stock.close}}</span>
                                        <span class="otherValue mx-3">Volume<br>{{stock.volume}}</span>
                                    </v-card-actions>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <p class="stockFullName mb-0 mx-3">{{stock.stock_meta.name}}</p>
                                    </v-card-actions>
                                </v-card>
                            </li>
                        </ul>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import {bus} from '../main'

//import Config from "../config/index";
export default {
    props:['gameId'],
    name: 'list-stock-player',

    created(){
        this.fetchData();
    },
    watch:{
        gameId(val){
            if(val == ''){
                //
            }else{
                this.fetchData();
            }
           
        }
    },
    mounted(){
        document.title = 'StockMKT Challenge - Player Screen'
        
    },
    data(){
        return{
            // backend Fetched Data
            game:{},
            record:{},
            pageLoad:false,
            //Notifications
            notificationBar:false,
            notificationColor:'black',
            notificationText:'',
            // Start 

        }
    },
    methods:{
        close(){
            bus.$emit('close','stockList');
        },


        async fetchData(){
            try{
                this.pageload = true;
                const response = await this.$http.get(process.env.VUE_APP_API+'/gameplay/continue/'+this.gameId);
                this.game = response.data.game;
                this.record = response.data;
                this.pageload = false;
            }catch(e){
                this.action(e);
                this.pageload = false;
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
.stockList2{
    margin:0px;
    padding:0px !important;
}
.stockList2 li{
    display:table;
    width:100%;
    list-style: none;
    padding:10px 20px;
    color:#fff;
    border-radius:15px;
    margin-top:10px;
    background:rgb(22, 32, 78);
}
.stockList2 li:hover{
    background:#292b57;
}
.stockList2 li .stockName{
    font-size:15px;
    font-weight: bold;
    color:red;
    background:rgba(255, 0, 0, 0.151);
    padding:5px 15px;
    border-radius:10px;
}
.stockList2 li .otherValue{
    font-size:16px;
    text-align: center;
    color:#fff;
    width:100%;
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
.gameContinue{
    background-color: ;
}
</style>