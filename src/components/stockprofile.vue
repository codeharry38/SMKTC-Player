<template>
  <div>
    <v-app-bar  dark color="dark" dense flat>
        <v-toolbar-title class="dialogBoxTitle">Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" text fab x-small @click="close"><v-icon>mdi-close</v-icon></v-btn>
    </v-app-bar>
    <v-card v-if="windowLoad == true" dark>
        <v-skeleton-loader dark type="article"></v-skeleton-loader>
        <v-skeleton-loader dark type="article"></v-skeleton-loader>
        <v-skeleton-loader dark type="article"></v-skeleton-loader>
    </v-card>
    <v-card v-else dark class="pa-10">
        
        <v-row>
            <v-col lg="12">
                <h2 class="aboutCompany mb-5">About</h2>
                <p class="aboutText">{{ record.description || ''}}</p>
            </v-col>
            <v-col lg="12">
                <v-card color="transparent" class="elevation-0">
                    <v-card-actions>
                        <v-chip class="mx-2" small>Country: {{record.country || '' }}</v-chip>
                        <v-chip class="mx-2" small>State: {{record.state || '' }}</v-chip>
                        <v-chip class="mx-2" small>City: {{record.city || '' }}</v-chip>
                    </v-card-actions>
                    <v-card-actions>
                        <v-chip class="mx-2" small>Industry: {{record.industry || '' }}</v-chip>
                        <v-chip class="mx-2" small>Sector: {{record.sector || '' }}</v-chip>
                    </v-card-actions>
                    <v-card-actions>
                        <v-chip class="mx-2" small>Full Time Employees: {{record.fullTimeEmployees || '' }}</v-chip>
                        <v-chip class="mx-2" small>Website: <a :href="record.website" target="_blank" class="pl-2" style="color:#fff;">{{record.website || '' }}</a></v-chip>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import {bus} from '../main'
export default {
    props:['symbole'],
    name:'stock-profile',
    data(){
        return{
            record:'',
            windowLoad:true,
        }
    },
    created(){
        this.fetchprofile();
    },
    watch:{
        symbole(val){
            if(val == ''){
                //
            }else{
                this.fetchprofile();
            }
           
        }
    },
    methods:{
        close(){
            bus.$emit('close','profile');
        },
        async fetchprofile(){
            try{
                //this.pageLoad = true;
                this.windowLoad = true;
                const response =  await this.$http.get(process.env.VUE_APP_STOCK_PROFILE_URL+this.symbole+'?apikey='+process.env.VUE_APP_STOCK_PROFILE_KEY);

                this.windowLoad = false;
                this.record = response.data[0];
                //console.log(this.record);
            }catch(e){
                alert(e);
                this.windowLoad = false;
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