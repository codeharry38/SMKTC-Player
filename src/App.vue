<template>
  <v-app class="stockBackground">
    <Header/>
    <v-main><router-view></router-view></v-main>
  </v-app>
</template>

<script>
import Header from './components/inc/header.vue';

export default {
  name: 'App',

  components: {
    Header,
  },

  data: () => ({
    
  }),
  async created(){
    // Check if some one signup from email ticket
      if(this.$route.query.s_t && this.$route.query.s_t =='claim' && this.$route.query.a_c){
        await this.$store.dispatch('setClaim', {
          access_code: this.$route.query.a_c,
        });
      }
      if(this.$store.getters.loggedIn && this.$store.state.claim != null){
        if(this.$route.name != 'claimnow'){
          location.href = '/claim/'+JSON.parse(this.$store.state.claim).access_code;  
        }  
        if(this.$route.name == 'claimnow'){
          this.$store.dispatch('removeClaim');
        }      
      }
  }
};
</script>
