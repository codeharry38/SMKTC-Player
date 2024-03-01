<template>
    <v-container color="indigo darken-4 " class="px-10 py-5 mt-15">
        <v-card class="pa-0 ma-0 elevation-0" >
            <v-row class="ma-0">
                <v-col md="3" class="ma-0 pa-0">
                    <Sidebar></Sidebar>
                </v-col>
                <v-col md="9" class="px-10 py-5">
                    Coming Soon.
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>
  
  <script>
  import Sidebar from '../components/inc/sidebar.vue'
    export default {
        components:{Sidebar},
        name: 'coming-soon',
       
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