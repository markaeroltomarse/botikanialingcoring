<template>
  <div>
    <sidebar/> 
    <section class="adminMainSection">
      <h1>HOME</h1>

      <div class="bg-white p-3 orders" style="border-top:5px solid rgb(248, 108, 108);">
        <h4>Orders</h4>

        <div class="text-center p-5" v-if="loader">
          <v-progress-circular indeterminate color="error"/>
          <br>
          Processing..
        </div>
        <v-list nav v-else >
          <v-list-item-group color="rgb(248, 108, 108)">
            <v-list-item 
              v-for="order in orders"
              :key="order._id"
              style="border-left:3px solid rgb(243, 77, 77);">
                  <v-list-item-avatar color="silver">
                      <v-icon color="error">
                        mdi-account
                      </v-icon>
                  </v-list-item-avatar> 

                  <v-list-item-content>
                    <v-list-item-title>
                        {{order.address}}
                    </v-list-item-title>
                    
                    <v-list-item-subtitle>
                        From: {{(order.lname + ', ' + order.fname).toLowerCase()}}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="mx-3">
                      <v-btn class="text-white" color="rgb(243, 77, 77)">VIEW ITEMS<v-icon>mdi-cart</v-icon></v-btn>
                  </v-list-item-action>

                  <v-list-item-action class="mx-3" v-if="!order.delivered">
                      <v-btn color="warning" @click="deliverNow(order)">DELIVER NOW<v-icon>mdi-motorbike</v-icon></v-btn>
                  </v-list-item-action>

                  <v-list-item-action class="mx-3" v-else>
                      <v-btn color="success">DELIVERED<v-icon>mdi-cash-check</v-icon></v-btn>
                  </v-list-item-action>

                  
                  <v-divider vertical/>

                  <v-list-item-action class="mx-3" >
                      <h4>TOTAL: ₱ {{order.items.map(item => (item.selectedqty * item.price)).toLocaleString()}} ({{order.items.length}} item)</h4>
                  </v-list-item-action>
              </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </section> 
  </div>
</template>

<script>

import sidebar from '@/components/admin/sidebar.vue'
export default {
    middleware:['admin-auth'],
    components:{
        sidebar
    },

    
    async asyncData({$axios}){
      try{
        let res = await $axios.get('/admin/orders')

        return {
          orders:res.data.orders,
          loader:false,
        }
      }catch(err){
        console.log(err)
        return {
          orders:[]
        }
      }
    },

    methods:{
      async deliverNow(order){
        this.loader = true
        try{
          let res = await this.$axios.post('/admin/orders/delivernow', {_id:order._id})

          alert('Done!')
          this.fetchOrders()
        }catch(err){
          alert('Something wrong.')
          console.log(err)
        }
        
      },

      async fetchOrders(){
        try{
          let res = await this.$axios.get('/admin/orders')

          this.orders = res.data.orders
        }catch(err){
          console.log(err)
        }

        this.loader = false
      }
      
    }
}
</script>

<style scoped>
  .orders{
    height:70vh;
  }
</style>