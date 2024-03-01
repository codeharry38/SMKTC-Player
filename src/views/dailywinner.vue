<template>
    <v-container color="indigo darken-4" class="px-10 py-5 mt-0">
      <div v-if="pageLoad == true">
            <v-row class="mb-15">
                <v-col col="12" lg="12" md="12" class="py-5">
                    <v-skeleton-loader dark type="table"></v-skeleton-loader>
                </v-col>
            </v-row>
      </div>
        <div v-else>
            <v-row class="pb-5">
                <v-col col="12" lg="12" md="12" class="fill-height">
                    <v-card class="align-center justify-center" color="transparent" flat>
                        <h1 class="GameBannerFont">Daily Winners</h1>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-if="(is_daily == 0)" class="mb-15">
                <v-col class="mx-auto text-center">
                    <v-card class="pa-5 text-center elevation-0" color="transparent" dark>
                        <h3>This game is not selected for daily prizes.</h3>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-else class="mb-15">
                <v-col lg="12" md="12" class="py-5">
                    <v-data-table dark :headers="gameHeader" :items="records" class="elevation-0 pr-5 dataText">
                        <template v-slot:[`item.player`]="{ item }">
                            <v-list-item>
                                <v-avatar color="white" size="30" light class="mr-5"><span class="text-red" style="text-transform:uppercase;"><b>{{item.player[0]}}</b></span></v-avatar>
                                <!---<v-list-item-avatar  color="white" size="35" dark class="black--text" style="text-transform:uppercase;">{{item.player_meta.name[0]}}</v-list-item-avatar>-->
                                <v-list-item-content>
                                    <v-list-item-title style="text-transform:capitalize;">{{ item.player }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <template v-slot:[`item.stocks`]="{item}">
                            <v-btn color="success" x-small @click="gameId=item.gameplayId;stockList=true">View All</v-btn>
                        </template>
                        <template v-slot:[`item.grand_total`]="{ item }">
                            $ {{Number(item.grand_total).toFixed(2)}}
                        </template>
                         <template v-slot:[`item.position_type`]="{ item }">
                            {{ item.Prize.position_type }}
                        </template>

                        <template v-slot:[`item.dailywinner`]="{ item }">
                            {{ item.Prize.prize_type == 'cash' ? `$`+item.Prize.prize_value : item.Prize.prize_value}}
                        </template>
                        <template v-slot:[`item.ticket_no`]="{ item }">
                            {{item.Ticket.ticket_number}}
                        </template>
                        <template v-slot:[`item.diff`]="{ item }">
                            <span :class="(Number(item.grand_total).toFixed(2) - 100000) < 0 ? 'otherValue mx-3 red--text' : 'otherValue mx-3 green--text' ">{{ (Number(item.grand_total).toFixed(2) - 100000) >= 0 ? '+' : ''}} {{(((Number(item.grand_total).toFixed(2) - 100000) * 100) / 100000).toFixed(2) }} %</span>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </div>
        <v-dialog v-model="stockList" scrollable persistent max-width="1200px" transition="dialog-transition">
            <playerStockList :gameId="gameId"></playerStockList>
        </v-dialog>
    </v-container>
  </template>
  
  <script>
     import {bus} from '../main'
    import playerStockList from '../components/playerStock.vue'
  export default {
      name: 'Daily-page',
      components: {playerStockList},
      data () {
        return {
            stockList: false,
            gameId:'',
          records:[],
          is_daily:0,
          pageLoad:true,
          gameHeader: [
            { text: '#Position', value: 'position', sortable:false },
            { text: 'Players', value: 'player', sortable:false },
            { text: 'Ticket No.', value: 'ticket_no', sortable:false },
            { text: 'Position Type', value: 'position_type', sortable:false },
            { text: 'Prize', value: 'dailywinner', sortable:false },
            { text: 'Winner Volume', value: 'grand_total', sortable:false },
            { text: '(+/-)', value: 'diff', sortable:false },
            { text: 'Prize Date', value: 'created_at', sortable:false },
            { text: 'View Stocks', value: 'stocks', sortable:false },
        ],
        }
      },
      mounted(){
          this.fetchrecords();
          this.daily_prize();
      },
      created() {
        bus.$on('close',(data) =>  {
            if(data == 'stockList'){
                this.gameId='';
                this.stockList= false;
            }           
      });
    },
      methods:{
        async daily_prize(){
            try{
                const response = await this.$http.get(process.env.VUE_APP_API+'/game/info/'+this.$route.params.game);
                this.is_daily = response.data.is_daily_prize;
                this.pageLoad = false;
            }catch(error){
                this.pageLoad = false;
                //bus.$emit('error',error);
            }
        },
          async fetchrecords(){
            try{
                const response = await this.$http.get(process.env.VUE_APP_API+'/dailywinner/'+this.$route.params.game);
                this.records = response.data;
                this.pageLoad = false;
            }catch(error){
                this.pageLoad = false;
            }
        },
      }
  }
  </script>
  
  <style>
  
  
  </style>