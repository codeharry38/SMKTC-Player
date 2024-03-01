<template>
    <v-container color="indigo darken-4" class="px-10 py-5 mt-15">
        <div v-if="pageLoad == true">
            <v-row class="pb-15" align="center" justify="center">
                <v-col col="4" class="mx-auto">
                    <h2 class="WaitingContent">Loading...</h2>
                    <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-row>
                <v-col lg="12" class="py-10">
                    <h2 class="GameBannerFont">Game Information</h2>
                </v-col>
            </v-row>
            <v-card color="transparent" class="pa-0 elevation-0">
                <v-row>
                    <v-col lg="12" md="12" sm="12">
                        <v-card dark color="GameCardColor" class="elevation-0 infoList pa-5">
                            <v-card-actions>
                                <h4><span class="listHeading">Game</span> <br> {{record.name}}</h4>
                                <v-spacer></v-spacer>
                                <h4><span class="listHeading">Start at</span> <br> {{record.start_at}}</h4>
                                <v-spacer></v-spacer>
                                <h4><span class="listHeading">End at </span> <br> {{record.end_at}}</h4>
                                <v-spacer></v-spacer>
                                <h4><span class="listHeading">Entrance Deadline</span> <br> {{record.entrance_deadline}}</h4>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <!-- Prize List Daily -->
                <v-row class="mt-15" v-if="record.is_daily_prize == 1">
                    <v-col lg="12" class="py-5">
                        <h2 class="GameBannerFont">Daily Prize List</h2>
                    </v-col>
                </v-row>
                <v-row class="my-3" v-if="record.is_daily_prize == 1">
                    <v-col lg="6" md="6" class="py-5">
                        <v-card color="GameCardColor" class="pa-5">
                        <h2 class="gameInfoHeading">Higher Position</h2>
                        <v-data-table :headers="Position" dark :items="record.high_prize_daily" class="elevation-0 mt-5 dataText transparent" hide-default-footer>
                            <template v-slot:[`item.prize_value`]="{ item }">{{item.prize_type == 'cash' ? '$ ' : ''}} {{ item.prize_value }}</template>
                        </v-data-table>
                        </v-card>
                    </v-col>

                    <v-col lg="6" md="6" class="py-5">
                        <v-card color="GameCardColor" class="pa-5">
                            <h2 class="gameInfoHeading">Lower Position</h2>
                            <v-data-table dark :headers="Position" :items="record.low_prize_daily" class="elevation-0 mt-5 dataText transparent" hide-default-footer>
                                <template v-slot:[`item.prize_value`]="{ item }">{{item.prize_type == 'cash' ? '$ ' : ''}} {{ item.prize_value }}</template>
                            </v-data-table>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row class="mt-15">
                    <v-col lg="12" class="py-5">
                        <h2 class="GameBannerFont">Grand Prize List</h2>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col lg="6" md="6" class="py-5">
                        <v-card color="GameCardColor" class="pa-5">
                        <h2 class="gameInfoHeading">Higher Position</h2>
                        <v-data-table :headers="Position" dark :items="record.high_prize" class="elevation-0 mt-5 dataText transparent" hide-default-footer>
                            <template v-slot:[`item.prize_value`]="{ item }">{{item.prize_type == 'cash' ? '$ ' : ''}} {{ item.prize_value }}</template>
                        </v-data-table>
                        </v-card>
                    </v-col>

                    <v-col lg="6" md="6" class="py-5">
                        <v-card color="GameCardColor" class="pa-5">
                            <h2 class="gameInfoHeading">Lower Position</h2>
                            <v-data-table dark :headers="Position" :items="record.low_prize" class="elevation-0 mt-5 dataText transparent" hide-default-footer>
                                <template v-slot:[`item.prize_value`]="{ item }">{{item.prize_type == 'cash' ? '$ ' : ''}} {{ item.prize_value }}</template>
                            </v-data-table>
                        </v-card>
                    </v-col>
                </v-row>

            </v-card>
        </div>
    </v-container>
  </template>
  
  <script>
  export default {
      name: 'game-info',
      data () {
        return {
            record:{},
            pageLoad:true,
            Position:  [
                { text: '#Position', value: 'position', sortable:false },
                { text: 'Prize Type', value: 'prize_type', sortable:false },
                { text: 'Prize', value: 'prize_value', sortable:false },
            ],
        }
      },
      mounted(){
        document.title = 'StockMKT Challenge - Prize List'
      },
      created(){
        this.fetchrecords();
      },
      methods:{
          async fetchrecords(){
            try{
                const response = await this.$http.get(process.env.VUE_APP_API+'/game/info/'+this.$route.params.game);
                this.record = response.data;
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
  .gameInfoHeading{
    font-size:25px !important;
    color:#fff !important;
    font-weight: 500 !important;
  }
  .infoList h4{
    color:#fff;
    font-size:18px !important;
    font-weight: 400 !important;
  }
  .listHeading{
    font-size:11px !important;
    font-weight: 300 !important;
    text-transform: uppercase !important;
  }
  
  </style>