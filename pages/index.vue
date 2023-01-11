<template>
  <div>
      <section class="mainSection">
      <div class="services">
        
        <div class="text-center border  p-5">
          <div class="text-light bg-light p-4 rounded-circle mb-3">
            <v-icon size="130px">
              mdi-lifebuoy
            </v-icon>
          </div>
          24/7 Customer Care
        </div>

        <div class="text-center border  p-5">
          <div class="text-light bg-light p-4 rounded-circle mb-3">
            <v-icon size="130px">
              mdi-cash-check
            </v-icon>
          </div>
          CASH ON DELIVERY
        </div>
      </div>
  
      <popular :items="items"/>
    </section>
    <footering/>
  </div>
</template>

<script>
import moment from 'moment'
import popular from '@/components/popular'
import footering from '@/components/footer'
export default {
  components:{
    popular, footering,
  },
  async mounted(){
    this.fetchItems()
  },

  data(){
    return {
      items:null,
      preitems:[]
    }
  },

  methods:{
    async fetchItems(){
        //LINISIN ANG PAG ORDER NG ITEM DAHIL MAY NABAGO SA SCHEME NG ITEMS 
        let res = await this.$axios.get('/products/best-products')
        let arr = res.data.items
        for (const item of arr) {
            item.selectedqty = 0
            item.image = await this.retrieveImg(item._id);
        }        

        this.qtycopy = arr
        this.items = arr
        this.reloaded = false
        //this.copyQTY()
    },

    copyQTY(){
        this.qtycopy = []
        for (const qty of this.preitems.qty) {
            this.qtycopy.push({date:qty.date, qty:qty.qty})
        } 
    },
    async retrieveImg(filename){
        // Create a reference to the file we want to download
        const ref = this.$store.state.firebase.storage().ref()
        var retrieve = ref.child(filename);

        // Get the download URL
        let res = await retrieve.getDownloadURL()
        return res
    },

    leftDays(sched){
        try{
            var eventdate = moment([...sched.split('-').map(x=>+x)], 'YYYY-MM-DD');
            var todaysdate = moment();
            var result = eventdate.diff(todaysdate, 'days') > 0
            
            return {
                lbl: result ? eventdate.diff(todaysdate, 'days') + " days left" : Math.abs(eventdate.diff(todaysdate, 'days')) + " days ago",
                isLeft:result
            }
            //return moment([...sched.date.split('-').map(x=>+x)], 'YYYY-MM-DD').startOf('day').fromNow();
        }catch(err){
            return ''
        }
    },
  }
}
</script>

<style scoped>
  .services{
    display: grid;
    grid-template-columns:1fr 1fr;
    padding:10% 30%;
    grid-gap: 1em;
  }

  .services > div{
    background-color:#f2f2f2;
  }

</style>