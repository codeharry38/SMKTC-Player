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
                        <h1 class="GameBannerFont">Grand Winners</h1>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="pb-5">
                <v-col col="12" lg="12" md="12" class="fill-height">
                    <v-card class="align-center justify-center" color="transparent" flat>
                        <h1 class="white--text">TOTAL PRIZES: ${{ total_prize }} </h1>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-if="(noData == true)" class="mb-15">
                <v-col class="mx-auto mx-0">
                    <v-card class="py-5 elevation-0" color="transparent" dark>
                        <h1>Game has not ended.<br>Prizes are awarded after the game ends!</h1>
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
    </v-container>
  </template>
  
  <script>
  export default {
      name: 'winner-page',
      data () {
        return {
            total_prize:'',
          records:[],
          pageLoad:true,
          noData:false,
          gameHeader: [
          { text: '#Position', value: 'position', sortable:false },
            { text: 'Players', value: 'player', sortable:false },
            { text: 'Ticket No.', value: 'ticket_no', sortable:false },
            { text: 'Position Type', value: 'position_type', sortable:false },
            { text: 'Prize', value: 'dailywinner', sortable:false },
            { text: 'Game', value: 'game', sortable:false },
            { text: 'Winner Volume', value: 'grand_total', sortable:false },
            { text: '(+/-)', value: 'diff', sortable:false },
            { text: 'Prize Date', value: 'created_at', sortable:false },
        ],
        }
      },
      computed: {
        itemsWithSno() {
            return this.records.map((d, index) => ({ ...d, position: index + 1 }))
        }
},
      mounted(){
            this.gameinfo();
          this.fetchrecords();
          document.title = 'StockMKT Challenge - Grand Winners'
      },
      methods:{
          async fetchrecords(){
            try{
                const response = await this.$http.get(process.env.VUE_APP_API+'/grandwinner/'+this.$route.params.game);
                if(response.data == ''){ 
                    this.noData = true
                }
                this.records = response.data;
                this.pageLoad = false;
            }catch(error){
                this.pageLoad = false;
            }
        },
        async gameinfo(){
            try{
                const response = await this.$http.get(process.env.VUE_APP_API+'/game/info/'+this.$route.params.game);
                this.total_prize = response.data.total_prize;
            }catch(error){
                alert(error);
            }
        },
      }
  }
  </script>
  
  <style>
  
  
  </style>