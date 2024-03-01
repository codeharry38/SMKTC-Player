<template>
    <v-container color="indigo darken-4" class="px-5 py-5 mt-15">
        <v-row class="pb-5">
            <v-col col="12" lg="12" md="12" class="fill-height">
                <v-card class="align-center justify-center" color="transparent" flat>
                    <h1 class="GameBannerFont">Listed Stocks</h1>
                </v-card>
            </v-col>
        </v-row>
      <v-card v-if="windowLoad == true" dark>
          <v-skeleton-loader dark type="article"></v-skeleton-loader>
          <v-skeleton-loader dark type="article"></v-skeleton-loader>
          <v-skeleton-loader dark type="article"></v-skeleton-loader>
      </v-card>
        <v-card v-else dark class="py-5">
            <v-card-title>
                <v-row class="mx-0">
                    <v-col cols=12 sm=6 md=8 class="pa-0 ma-0"></v-col>
                    <v-col cols=12 sm=6 md=4 class="py-0 my-0">
                        <v-text-field color="white" v-model="search" append-icon="mdi-magnify" label="Search" outlined hide-details dense></v-text-field>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-data-table :headers="header" :items="records" item-key="id" :search="search" :items-per-page="20">
                <template v-slot:[`item.name`]="{ item }">
                    <v-tooltip top color="black">
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                            {{gloabl.$config.stringTrimer(item.name,20)}}
                            </span>
                        </template>
                        <span>{{item.name}}</span>
                    </v-tooltip>
                </template>
                <template v-slot:[`item.action`]="{ item }">
                    <v-btn color="green" class="white--text elevation-0 ml-5" x-small @click="stockProfile = true, selectedStockProfile = item.symbol;">Details</v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="stockProfile" scrollable persistent max-width="1200px" transition="dialog-transition">
          <StockProfileBox :symbole="selectedStockProfile"></StockProfileBox>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import {bus} from '../main'
  import StockProfileBox from '../components/stockprofile.vue'
  export default {
    components: {StockProfileBox },
      props:['selectStock','gameplay'],
      name:'stock-list',
      mounted(){
        document.title = 'StockMKT Challenge - Stock List'
      },
      data(){
          return{
                gloabl:this,
              record:{},
              windowLoad:true,
              newStock:'',
              records:'',
              search:'',
              autopicLoad:false,
              header:[
                {text:'Symbol',value:'symbol'},
                {text:'Name',value:'name'},
                {text:'Action',value:'action'},
            ],
            selectedStockProfile:'',
            stockProfile:false,
          }
      },
      created(){
          //this.fetchprofile();
          bus.$on('close',(data) =>  {
            if(data == 'profile'){
                this.selectedStockProfile='';
                this.stockProfile= false;
            }
        });
            this.fetchrecords();
      },
      watch:{
        selectStock(val){
              if(val == ''){
                  //
              }else{
                  this.fetchrecords();
              }
             
          }
      },
      methods:{
          close(){
              bus.$emit('close','listBox');
          },
          async fetchrecords(){
            try{
                this.windowLoad = true;
                const response = await this.$http.get(process.env.VUE_APP_API+'/stocks',{
                    gameplay: this.gameplay,
                });
                this.records = response.data;
                this.windowLoad = false;
            }catch(error){
                this.pageLoad = false;
                alert(error);
            }
        }
      }
  }
  </script>
  
  <style>
  .aboutCompany{
      font: size 18px;
      color:#fff;
      font-weight: 600;
  }
  .aboutText{
      color:#fff;
      font-size:15px;
      font-weight: 300;
  }
  </style>