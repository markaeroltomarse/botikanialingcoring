<template>
  <div>
      <sidebar/>
      <section class="adminMainSection">
          <h1>Sales</h1>

          <div class="d-flex flex-row">
              <div class="p-5 text-white text-center rounded bg-danger mx-2" >
                  <h3>{{orders.length}}</h3>

                  Orders
              </div>

              <div class="p-5 text-white text-center rounded bg-danger mx-2" >
                  <h3>{{product}}</h3>

                  Product
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
                    :labels="weekvaluewithlbl"
                    :value="weekvalue"
                    color="rgba(255, 255, 255, .7)"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                    >
                    <template v-slot:label="item">
                        ₱{{ parseInt(item.value).toLocaleString() }}
                        
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


            <v-divider></v-divider>

            <h4 class="text-danger">Calendar</h4>

            <vue-scheduler
                :events="events"
                :event-display="eventDisplay"
            />


            
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

    data(){
        
        return {
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        }
    },

    async asyncData({$axios}){
        try{    
            let res = await $axios.get('/admin/sales')
            const {weekvalue,orders,product,items} = res.data
            let days  = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

            let i = -1
            let weekvaluewithlbl = weekvalue.map(day => {
                i++
                return day + ` ${days[i]}`
            })

            let total = 0
            let getTotal = (items) => {
                let mappedToTotal = items.map(item => item.selectedqty * item.price)
                total += mappedToTotal.reduce((a, b) => a + b, 0)
            }
            
            
            let events = []
            let notallow = []

            
            orders.forEach(order => {
                let date = order.formattedDate.year + '-' + order.formattedDate.month + '-' + order.formattedDate.day
                if(notallow.some(d => d == date)) return 
                let orderscopy = orders

                orderscopy.filter(o => date == o.formattedDate.year + '-' + o.formattedDate.month + '-' + o.formattedDate.day)

                orderscopy.forEach(o => {
                    getTotal(o.items)
                })

                events.push({
                    date:date,
                    label:'₱'+total.toLocaleString(),
                    startTime:'1:00',
                    endTime:'2:00'
                })

                total = 0
                

                notallow.push(date)
            })

            
            

            return {
                weekvaluewithlbl,
                weekvalue, 
                orders,
                product,
                items,
                events
            }
        }catch(err){
            console.log(err)
        }
    },

    created(){
        
    },

    methods:{
      eventDisplay(event) {
            try{
                return event.label
            }catch(err){
                return 'Loading...'
            }
        },

        
    }
}
</script>

<style>

</style>