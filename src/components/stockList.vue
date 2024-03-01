<template>
    <div>
      <v-app-bar  dark color="dark" dense flat>
          <v-toolbar-title class="dialogBoxTitle">Replace Stock</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" text fab x-small @click="close"><v-icon>mdi-close</v-icon></v-btn>
      </v-app-bar>
      <v-card v-if="windowLoad == true" dark>
          <v-skeleton-loader dark type="article"></v-skeleton-loader>
          <v-skeleton-loader dark type="article"></v-skeleton-loader>
          <v-skeleton-loader dark type="article"></v-skeleton-loader>
      </v-card>
        <v-card v-else dark class="pa-10">
            <v-card-title>
                <v-row>
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
                    <v-btn color="red" class="white--text elevation-0 ml-5" x-small @click="newStock=item.id, setup();" :disabled="autopicLoad">Select Now</v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="stockProfile" scrollable persistent max-width="1200px" transition="dialog-transition">
          <StockProfileBox :symbole="selectedStockProfile"></StockProfileBox>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import {bus} from '../main'
  import StockProfileBox from './stockprofile.vue'
  export default {
    components: {StockProfileBox },
      props:['selectStock','gameplay'],
      name:'stock-list',
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
                const response = await this.$http.post(process.env.VUE_APP_API+'/stocks/list',{
                    gameplay: this.gameplay,
                });
                this.records = response.data;
                this.windowLoad = false;
            }catch(error){
                this.pageLoad = false;
                alert(error);
            }
        },
        async setup(){
            try{
                this.autopicLoad = true;
                await this.$http.post(process.env.VUE_APP_API+'/gameplay/manualpick',{
                    selectedStock: this.selectStock,
                    newStock: this.newStock
                });
                //this.action(response.data);
                bus.$emit('stockUpdate','listBox');
                this.autopicLoad = false;
            }catch(e){
                //this.action(e);
                this.autopicLoad = false;
            }

            },
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