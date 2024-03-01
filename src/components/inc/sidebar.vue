<template>
    <v-list dense class="playerSideBar overflow-y-auto" style="min-height: 100%" color="#111236" dark>
        <router-link v-for="(item, i ) in items" :key="i" :to="{name:item.link}" class="SidebarLink">
            <v-list-item :class="item.is_active ? `active`: ``">
                <v-list-item-action>
                    <v-icon>{{ item.Ficon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ item.title }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </router-link>
        <v-list-item @click="logout">
            <v-list-item-icon><v-icon>mdi-power</v-icon></v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
         </v-list-item>
    </v-list>
</template>

<script>
    export default {
        name: 'HomeHeader',
      data () {
        return {
            currentRouter: this.$route.name,
          items: [
            { title: 'My Profile', Ficon: 'mdi-account', link:'profile' , is_active: this.$route.name == 'profile' ? true : false },
            //{ title: 'Payment Methods', Ficon: 'mdi-card', link:'comingsoon', is_active: this.$route.name == 'comingsoon' ? true : false},
            { title: 'Payment History', Ficon: 'mdi-history', link:'historypage', is_active: this.$route.name == 'historypage' ? true : false },
            { title: 'My Tickets', Ficon: 'mdi-ticket', link:'ticket', is_active: this.$route.name == 'ticket' ? true : false },
          ],
        }
      },
      methods:{
        async logout() {
            await this.$store.dispatch('destroyToken');
            alert('You have been logout.');
            location.reload();
        },
      }
    }
</script>
<style scoped>
.SidebarLink{
    text-decoration:none;
}
.router-link-exact-active .v-list-item__action i{
    color:red !important
}
.router-link-exact-active .v-list-item__content .v-list-item__title{
    color:red !important
}
</style>