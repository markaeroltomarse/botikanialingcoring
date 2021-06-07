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
    popular, footering
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
           
        let res = await this.$axios.get('/admin/getitems')
        let arr = res.data.items
        arr = arr.filter(item => this.leftDays(item.expirationDate).isLeft)
        this.preitems = arr

        for (const item of this.preitems) {
            item.selectedqty = 1
            item.image = await this.retrieveImg(item._id);
        }        

       
        console.log('ITEMS', this.preitems)

        this.copyQTY()
    },

    copyQTY(){
        this.qtycopy = []
        for (const item of this.preitems) {
          
            this.qtycopy.push({_id:item._id, qty:item.qty})
        } 

        this.items = this.preitems
        this.reloaded = false

        
    },
    async retrieveImg(filename){
        // Create a reference to the file we want to download
        const ref = this.$store.state.firebase.storage().ref()
        var retrieve = ref.child(filename);

        // Get the download URL
        let res = await retrieve.getDownloadURL()
        console.log(filename, res)
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