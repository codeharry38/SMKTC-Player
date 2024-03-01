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
                                <h4><span class="listHeading">Start at</span> <br> {{record.f_start_at}}</h4>
                                <v-spacer></v-spacer>
                                <h4><span class="listHeading">End at </span> <br> {{record.f_end_at}}</h4>
                                <v-spacer></v-spacer>
                                <h4><span class="listHeading">Last Entrance</span> <br> {{record.f_entrance_deadline}}</h4>
                                <v-spacer></v-spacer>
                                <h4><span class="listHeading">Grand Prize awarded after the game ends.</span> <br> ${{record.total_prize}}</h4>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col lg="12">
                        <v-card dark color="GameCardColor" class="elevation-0 infoList pa-5">
                            <v-card-actions>
                                <h4><span class="listHeading">ORGANIZATION </span> <br> {{ record.organization_meta.name }}</h4>
                                <v-spacer></v-spacer>
                                <h4><span class="listHeading">Sponser </span> <br> {{ record.sponsor }}</h4>
                                <v-spacer></v-spacer>
                                <h4><span class="listHeading">Available Offer </span><br> {{ record.offer == false ? 'No Offer' : record.offer.name }}</h4>
                                <v-spacer></v-spacer>
                                <h4><span class="listHeading">Daily Prizes </span><br> {{ record.is_daily_prize == 0 ? `Not Available` : `Available`}}</h4>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col lg="12">
                        <v-card color="transparent" class="elevation-0">
                            <v-card-actions class="centered pb-5 pt-5 px-10">
                                <v-btn v-if="record.is_time_out == true" class="customGameButton" dark :disabled="true">Time Out</v-btn>
                                <v-btn v-else-if="record.is_sold_out == true" class="customGameButton" dark :disabled="true">Sold Out</v-btn>
                                <v-btn v-else class="customGameButton px-5 py-5 " dark @click="buygame =record.id, buyNow(); ">Buy for ${{record.cost}}</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                 <!-- Prize List Daily -->
                 <v-row class="mt-15" v-if="record.offermediaImg != null">
                    <v-col lg="12" class="py-5">
                        <h2 class="GameBannerFont">Total Prizes</h2>
                    </v-col>
                </v-row>
                <v-row class="mt-5" v-if="record.offermediaImg != null">
                    <v-col lg="12" class="py-2">
                        <img style="max-width:100%" :src="record.offermediaImg">
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
                <v-row class="mt-15">
                    <v-col lg="12" class="py-5">
                        <h2 class="GameBannerFont">Leaderboard</h2>
                    </v-col>
                </v-row>

                <v-row class="mb-15 pb-15">
                    <v-col lg="12" md="12" class="py-5 pb-10">
                        <v-row>
                            <v-col cols=12 sm=6 md=8 class="pa-0 ma-0"></v-col>
                            <v-col cols=12 sm=6 md=4 class="py-0 my-0">
                                <v-text-field color="white" v-model="search" append-icon="mdi-magnify" label="Search" outlined hide-details dense dark></v-text-field>
                            </v-col>
                        </v-row>
                        <v-card color="GameCardColor" class="pa-5 mt-8 pb-15">
                            <v-data-table dark :headers="gameHeader" :sort-by="['grand_total']" :sort-desc="[true]" :items="positionLeaderBoard" class="elevation-0 mt-5 dataText transparent" :search="search">
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
                                    </tr>
                                </template>
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
            buygame:'',
            leaderBoard:[],
            pageLoad:true,
            positionLeaderBoard:[],
            search:'',
            position:'',
            ticket:'',
            Position:  [
                { text: '#Position', value: 'position', sortable:false },
                { text: 'Prize Type', value: 'prize_type', sortable:false },
                { text: 'Prize', value: 'prize_value', sortable:false },
            ],
            gameHeader: [
                { text: '#Position', value: 'position', sortable:false, filter: value => {
                    if (!this.position) return true;
                    return value == parseInt(this.position);
                }},
                { text: 'Ticket No.', value: 'ticket', sortable:false, filter: value => {
                    if (!this.ticket) return true;
                    return value == parseInt(this.ticket);
                }},
                { text: 'Players', value: 'player', sortable:false },
                { text: 'Highest/Lowest', value: 'grand_total', sortable:true },
                { text: '(+/-)', value: 'diff', sortable:false },
                { text: 'Last Update', value: 'date', sortable:false },
            ],
        }
      },
      created(){
        this.fetchleaderBoard().then(() => {
            this.positionLeaderBoard = this.leaderBoard.map((d, index) => ({ ...d, position: index + 1 }));
        });
        this.fetchrecords();
          
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
        async fetchleaderBoard(){
            try{
                const response = await this.$http.get(process.env.VUE_APP_API+'/leaderboard/'+this.$route.params.game);
                if(response.data == ''){ 
                    this.noData = true
                }
                this.leaderBoard = response.data;
            }catch(error){
               // this.pageLoad = false;
            }
        },
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