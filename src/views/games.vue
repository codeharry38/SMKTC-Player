<template>
  <v-container color="indigo darken-4" class="px-10 py-5 mt-15">
    <div v-if="pageLoad == true">
        <v-row class="pb-15 " align="center" justify="center">
            <v-col col="12" lg="4" md="4" class="fill-height">
                <v-skeleton-loader dark type="list-item-two-line"></v-skeleton-loader>
            </v-col>
            <v-col col="12" lg="8" md="8">
                <v-skeleton-loader dark type="image"></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row>
            <v-col lg="12">
                <v-divider color="#312cbe"></v-divider>
            </v-col>
            <v-col lg="12">
                <v-skeleton-loader dark type="heading"></v-skeleton-loader>
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
        <v-row class="pb-15 " align="center" justify="center">
            <v-col col="12" lg="4" md="4" class="fill-height">
                <v-card class="align-center justify-center" color="transparent" flat>
                    <h1 class="GameBannerFont">
                    Let's Play and win prizes
                    </h1>
                </v-card>
            </v-col>
            <v-col col="12" lg="8" md="8">
                <v-carousel hide-delimiters :show-arrows="false" class="customCarousel" height="230px">
                    <v-carousel-item v-for="(item,i) in banners" :key="i" :src="item.mediaImg" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
        <!-- Access Code Componets-->
        <AccessCode class="my-5"></AccessCode>
        <!-- Access Code Componets-->
        <v-row>
            <v-col lg="12">
                <h2 class="white--text customGameHeading">Let's Play</h2>
            </v-col>
        </v-row>
            <v-row class="mb-15">
                <v-col v-for="(record,i) in records" :key="i" col="12" lg="4" md="4" class="py-5">
                    <v-card dark color="GameCardColor" :style="(record.is_sold_out == true || record.is_time_out == true) ? `opacity:0.7` : ``">
                        <v-img class="white--text align-end" height="200px" :src="record.mediaImg">
                        </v-img>
                        <div v-if="(record.is_sold_out == false && record.is_time_out == false && record.avilable_ticket < 6)" class="floatchip"> Only {{ record.avilable_ticket }} Left</div>
                        <v-card-subtitle class="pb-0 centered customInnerTitle">
                            <p class="gameName">{{record.name}}</p>
                            <v-chip class="mx-2 customChip" x-small>Start At: {{record.f_start_at}}</v-chip>
                            <v-chip class="mx-2 customChip" x-small>Last Entrance: {{record.f_entrance_deadline}}</v-chip>
                        </v-card-subtitle>
                        <v-card-actions class="centered pb-5 pt-5 px-10">
                            <router-link to="#" class="decorationNone">
                                <v-btn v-if="record.is_time_out == true" class="customGameButton" dark :disabled="true">Time Out</v-btn>
                                <v-btn v-else-if="record.is_sold_out == true" class="customGameButton" dark :disabled="true">Sold Out</v-btn>
                                <v-btn v-else class="customGameButton" dark @click="buygame =record.id, buyNow(); ">Buy for ${{record.cost}}</v-btn>
                            </router-link>
                            <v-spacer></v-spacer>
                            <router-link :to="{name:'gameinfo', params:{game:record.id}}" class="decorationNone">
                                <v-btn  class="customGameButton" dark>Details</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
  </v-container>
</template>

<script>
import AccessCode from '../components/accesscode/index.vue'
export default {
    name: 'game-main',
    components:{AccessCode},
    data () {
      return {
        items: [{ src: '/images/winner-banner.png'},{src: '/images/winner-banner.png'},{src: '/images/winner-banner.png'}],
        records:[],
        banners:[],
        pageLoad:true,
        buygame:'',
      }
    },
    mounted(){
        this.fetchrecords();
        this.fetchbanners();
        document.title = 'StockMKT Challenge - Game List'
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
        async fetchrecords(){
          try{
              const response = await this.$http.get(process.env.VUE_APP_API+'/player/game');
              this.records = response.data;
              this.pageLoad = false;
          }catch(error){
              this.pageLoad = false;
              alert('Something Went wrong!! Kindly refresh the page.')
              //bus.$emit('error',error);
          }
      },
      async fetchbanners(){
          try{
              const response = await this.$http.get(process.env.VUE_APP_API+'/banner/active/mini/records');
              this.banners = response.data;
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
.floatchip{
    padding: 6px 8px;
    color: #010101;
    background: #ffffff;
    position: absolute;
    top: 10px;
    font-weight: bold;
    left: 10px;
    font-size: 12px;
    border-radius: 10px;
}

</style>