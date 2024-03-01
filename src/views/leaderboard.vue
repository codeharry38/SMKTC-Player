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
                        <h1 class="GameBannerFont">Leader Board</h1>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-if="(noData == true)" class="mb-15">
                <v-col class="mx-auto text-center">
                    <v-card class="pa-5 text-center elevation-0" color="transparent" dark>
                        <h3>Game did't start Yet</h3>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-else class="mb-15">
                <v-col lg="12" md="12" class="py-5 pb-15 mb-15">
                    <v-data-table dark :headers="gameHeader" :sort-by="['grand_total']" :sort-desc="[true]" :items="itemsWithSno" class="elevation-0 pr-5 dataText mt-8 mb-15" :search="search">
                        <template v-slot:[`item.player`]="{ item }">
                            <v-list-item>
                                <v-avatar color="white" size="30" light class="mr-5"><span class="text-red" style="text-transform:uppercase;"><b>{{item.player[0]}}</b></span></v-avatar>
                                <!---<v-list-item-avatar  color="white" size="35" dark class="black--text" style="text-transform:uppercase;">{{item.player_meta.name[0]}}</v-list-item-avatar>-->
                                <v-list-item-content>
                                    <v-list-item-title style="text-transform:capitalize;">{{ item.player }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <template v-slot:[`item.grand_total`]="{ item }">
                            $ {{(item.grand_total).toFixed(2)}}
                        </template>
                        <template v-slot:[`item.diff`]="{ item }">
                            <span :class="(Number(item.grand_total).toFixed(2) - 100000) < 0 ? 'otherValue mx-3 red--text' : 'otherValue mx-3 green--text' ">{{ (Number(item.grand_total).toFixed(2) - 100000) >= 0 ? '+' : ''}} {{(((Number(item.grand_total).toFixed(2) - 100000) * 100) / 100000).toFixed(2) }} %</span>
                        </template>
                        <template v-slot:[`item.stocks`]="{item}">
                            <v-btn color="success" x-small @click="gameId=item.gameplayId;stockList=true">View All</v-btn>
                        </template>

                        <template v-slot:[`body.prepend`]>
                            <tr>
                            <td style="width:200px">
                                <v-text-field v-model="position" type="number" label="Position" append-icon="mdi-magnify" outlined hide-details dense dark class="my-3"></v-text-field>
                            </td>
                            <td style="width:200px">
                                <v-text-field v-model="ticket" type="number" label="Ticket No" append-icon="mdi-magnify" outlined hide-details dense dark class="my-3"></v-text-field>
                            </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            </tr>
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
      name: 'leader-board',
      components: {playerStockList},
      data () {
        return {
            // Box Open
            stockList: false,
            records:[],
            gameId:'',
            pageLoad:true,
            noData:false,
            search:'',
            position:'',
            ticket:'',
            gameHeader: [
                { text: '#Position', value: 'position', sortable:false, filter: value => {
                if (!this.position) return true;
                return value == parseInt(this.position);
            }},
                { text: 'Ticket No.', value: 'ticket', sortable:false, filter: value => {
                if (!this.ticket) return true;
                return value == parseInt(this.ticket);
            } },
                { text: 'Players', value: 'player', sortable:false },
                { text: 'Amount', value: 'grand_total', sortable:true },
                { text: '(+/-)', value: 'diff', sortable:false },
                { text: 'Last Update', value: 'date', sortable:false },
                { text: 'View Stocks', value: 'stocks', sortable:false },
            ],
        }
      },
      created() {
        bus.$on('close',(data) =>  {
            if(data == 'stockList'){
                this.gameId='';
                this.stockList= false;
            }           
      });
    },
    computed: {
        itemsWithSno() {
            return this.records.map((d, index) => ({ ...d, position: index + 1 }))
        }
    },
    mounted(){
        this.fetchrecords();
        document.title = 'StockMKT Challenge - Leaderboard'
    },
    methods:{
        async fetchrecords(){
          try{
              const response = await this.$http.get(process.env.VUE_APP_API+'/leaderboard/'+this.$route.params.game);
              if(response.data == ''){ 
                  this.noData = true
              }
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