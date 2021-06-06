<template>
  <div>
      <sidebar/>
      <section class="adminMainSection">
          <h1>Sales</h1>

          <div class="d-flex flex-row">
              <div class="p-5 text-white text-center rounded bg-danger mx-2" >
                  <h3>{{orders}}</h3>

                  Orders
              </div>

              <div class="p-5 text-white text-center rounded bg-danger mx-2" >
                  <h3>{{product}}</h3>

                  Product
              </div>

              <div class="p-5 text-white text-center rounded bg-danger mx-2" >
                  <h3>{{items.reduce((a, {qty}) => a + qty, 0)}}</h3>

                  Items
              </div>

              <div class="p-5 text-white text-center rounded bg-danger mx-2" >
                  <h3>₱ {{weekvalue.reduce((a, b) => a + b, 0).toLocaleString()}}</h3>

                  Income
              </div>
          </div>

          <hr>
          <v-card
            class="mx-auto text-center"
            color="error"
            dark
            max-width="100%"
            >
                <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                    :value="weekvalue"
                    color="rgba(255, 255, 255, .7)"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                    >
                    <template v-slot:label="item">
                        ₱{{ item.value.toLocaleString() }}
                    </template>
                    </v-sparkline>
                </v-sheet>
                </v-card-text>

                <v-card-text>
                <div class="text-h4 font-weight-thin">
                    Sales this Week
                </div>
                </v-card-text>

                <v-divider></v-divider>

               
            </v-card>
      </section>
  </div>
</template>

<script>
import moment from 'moment'
import sidebar from '@/components/admin/sidebar.vue'
export default {
    middleware:['admin-auth'],
    components:{
        sidebar
    },



    async asyncData({$axios}){
        try{    
            let res = await $axios.get('/admin/sales')
            console.log(res.data)
            const {weekvalue,orders,product,items} = res.data

            
            return {
                weekvalue, 
                orders,
                product,
                items
            }
        }catch(err){
            console.log(err)
        }
    },

    created(){
        
    },

    methods:{
        
    }
}
</script>

<style>

</style>