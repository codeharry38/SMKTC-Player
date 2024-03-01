<template>
    <v-row>
        <v-col>
            <v-card class="accessCodeBar px-5 py-5" >
                <v-row>
                    <v-col lg="12" md="12" col="12" >
                        <v-text-field v-model="access_code" dense rounded hide-details 
                        color="white" dark append-outer-icon="mdi-send" 
                        outlined filled label="I have access code" type="text">
                        <template v-slot:append-outer>
                            <v-btn class="claimBtn ml-5 elevation-0"  :loading="isLoading" @click="SearchGame">Submit</v-btn>
                        </template>
                    
                    </v-text-field>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name:'access-codeindex',
    data(){
        return{
            isLoading:false,
            access_code:this.$route.params.code
        }
    },
    
    methods:{
        async SearchGame(){
            //this.isLoading = true;
            //window.location.replace();
            location.href = '/claim/'+this.access_code;
            //this.$router.push({ name: 'claimnow', params: { code: this.access_code } })
        }
    }
}
</script>

<style>

</style>