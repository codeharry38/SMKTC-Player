<template>
    <v-container color="indigo darken-4 " class="px-10 py-5 mt-15 d-flex align-content-center flex-wrap justify-center" style="min-height:80vh;">
        <div>
            <v-row class="pb-15" align="center" justify="center">
                <v-col col="4" class="mx-auto">
                    <h2 class="WaitingContent">Processing...</h2>
                    <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
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
                //
            }
        },
        created(){
            setTimeout( () => this.$router.push({ name: 'signin' }), 5000);
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