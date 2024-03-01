<template>
    <v-container color="indigo darken-4 " class="px-10 py-5 mt-15 d-flex align-content-center flex-wrap justify-center" style="min-height:80vh;">
        <div>
            <v-row class="pb-15" align="center" justify="center">
                <v-col col="4" class="mx-auto text-center">
                    <h2 class="WaitingContent">Something went wrong, Try agian later</h2>
                    <router-link :to="{name:'game'}" class="link-text mt-5 mb-5">
                        <v-btn class="customGameButton-custom px-5 py-5"  dark >New Games</v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
  
  <script>
    export default {
        name: 'checkout-success',
        data () {
            return {
            }
        },
        created(){
            this.$store.dispatch('removeCart');
        }
    }
  </script>
  
  <style>
  .WaitingContent{
    font-size:30px;
    color:#fff;
    padding:20px;
    margin-bottom:20px;
    text-align: center;
    font-weight:normal;
  }
  .customGameButton-custom{
  background-color: #c6119d !important;
  border: 3px solid #181747 !important;
  border-radius: 30px !important;
  font-size: 15px !important;
  text-transform: capitalize !important;
  font-weight: 300 !important;
  margin:0px auto !important;
  text-decoration: none !important;
}
  
  </style>