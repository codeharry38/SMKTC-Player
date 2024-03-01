<template>
    <v-container color="indigo darken-4" class="px-10 py-5 mt-0">
      <div v-if="pageLoad == true">
            <v-row class="pb-15 " align="center" justify="center">
                <v-col col="12" lg="4" md="4" class="fill-height">
                    <v-skeleton-loader dark type="list-item-two-line"></v-skeleton-loader>
                </v-col>
                <v-col col="12" lg="8" md="8">
                    <v-skeleton-loader dark type="list-item"></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row class="mb-15">
                <v-col col="12" lg="4" md="4" class="py-5">
                    <v-skeleton-loader dark type="card-avatar, article, actions"></v-skeleton-loader>
                </v-col>
                <v-col col="12" lg="4" md="4" class="py-5">
                    <v-skeleton-loader dark type="card-avatar, article, actions"></v-skeleton-loader>
                </v-col>
                <v-col col="12" lg="4" md="4" class="py-5">
                    <v-skeleton-loader dark type="card-avatar, article, actions"></v-skeleton-loader>
                </v-col>
                <v-col col="12" lg="4" md="4" class="py-5">
                    <v-skeleton-loader dark type="card-avatar, article, actions"></v-skeleton-loader>
                </v-col>
                <v-col col="12" lg="4" md="4" class="py-5">
                    <v-skeleton-loader dark type="card-avatar, article, actions"></v-skeleton-loader>
                </v-col>
            </v-row>
      </div>
        <div v-else>
            <v-row class="pb-5 " align="center" justify="center">
                <v-col col="12" lg="4" md="4" class="fill-height">
                    <v-card class="align-center justify-center" color="transparent" flat>
                        <h1 class="GameBannerFont">My Games</h1>
                    </v-card>
                </v-col>
                <v-col col="12" lg="8" md="8">
                    <!-- Access Code Componets-->
                        <AccessCode class="my-5"></AccessCode>
                    <!-- Access Code Componets-->
                </v-col>
            </v-row>
            <v-row v-if="(noData == true)" class="mb-15">
                <v-col class="mx-auto text-center">
                    <v-card class="pa-5 text-center elevation-0" color="transparent" dark>
                        <h3>You didn't claim any game yet...</h3>
                        <router-link :to="{name:'game'}" class="link-text mt-5 mb-5">
                            <v-btn class="customGameButton-custom px-5 py-5"  dark >Buy Now</v-btn>
                        </router-link>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="mb-15">
                <v-col v-for="(record,i) in records" :key="i" col="12" lg="4" md="4" class="py-5">
                    <v-card dark color="GameCardColor">
                        <v-img class="white--text align-end" height="200px" :src="record.mediaImg">
                        </v-img>
                        <div class="floatchip">Ticket No. {{record.ticket_number }} <br> Access Code: {{record.access_code }}</div>
                        <v-card-subtitle class="pb-0 centered customInnerTitle">
                            <p class="gameName">{{record.game.name}}</p>
                            <v-chip class="mx-2 customChip" x-small>Start At: {{record.start_at}}</v-chip>
                            <v-chip class="mx-2 customChip" x-small>Last Entrance: {{record.entrance_deadline}}</v-chip>
                        </v-card-subtitle>
                        <v-card-actions class="centered pb-5 pt-5 px-10">
                            <router-link :to="{name:'continue', params:{game:record.id}}" class="link-text">
                                <v-btn class="customGameButton" dark >Enter Now</v-btn>
                            </router-link>
                            <v-spacer></v-spacer>
                            <router-link :to="{name:'gameinfo', params:{game:record.game.id}}" class="decorationNone">
                                <v-btn  class="customGameButton" dark>Details</v-btn>
                            </router-link>
                        </v-card-actions>
                        <h2 :class="record.status == 0 ? `hold statusBox my-5` : `playing statusBox my-5`">{{record.status == 0 ? `On Hold` : `Playing`}}</h2>
                    </v-card>
                </v-col>
            </v-row>
          </div>
    </v-container>
  </template>
  
  <script>
  import AccessCode from '../components/accesscode/index.vue'
  export default {
      name: 'mygame-main',
      components:{AccessCode},
      data () {
        return {
          records:[],
          pageLoad:true,
          noData:false,
        }
      },
      mounted(){
          this.fetchrecords();
          document.title = 'StockMKT Challenge - My Game'
      },
      methods:{
          async fetchrecords(){
            try{
                const response = await this.$http.get(process.env.VUE_APP_API+'/gameplay/mygame');
                if(response.data == ''){ 
                    this.noData = true
                }
                this.records = response.data;
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
    .statusBox{
        padding:5px;
        font-size:15px;
        text-align: center;
        text-transform: uppercase;
        color:#fff;
        font-weight: 300;
    }
    .hold{
        background:#cf0101;
    }
    .playing{
        background:rgb(0 177 9);
    }
  
  </style>