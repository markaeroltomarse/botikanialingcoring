<template>
  <div>
      <purchasenow v-if="isPurchase" v-on:refresh="cart = []" v-on:close="isPurchase = false"/>
      <section class="mainSection">
        <h3>Cart</h3>
        <v-list >
            <v-list-item-group color="rgb(243, 77, 77)">
                <v-list-item 
                v-for="(item) in cart"
                :key="item._id"
                style="border-left:3px solid rgb(243, 77, 77);">
                    <v-list-item-avatar>
                        <v-img :src="item.image"/>
                    </v-list-item-avatar> 

                    <v-list-item-content>
                    <v-list-item-title>
                        {{item.name}}
                    </v-list-item-title>
                    
                    <v-list-item-subtitle>
                        {{item.content}}
                    </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action class="mx-5">
                        <strong>₱ {{item.price.toLocaleString()}}</strong>
                    </v-list-item-action>

                    
                    <v-divider vertical/>

                    

                    <v-list-item-action class="ml-3">
                        <div class="quantyaction">
                            <div>
                                <v-btn @click="minus(item)" color="rgb(243, 77, 77)" class="text-white">
                                    <strong>-</strong>
                                </v-btn>
                            </div>

                            <div class="text-center py-1">
                            {{item.selectedqty}}
                            </div>

                            <div>
                                <v-btn @click="add(item)" color="rgb(243, 77, 77)" class="text-white">
                                    <strong>+</strong>
                                </v-btn>
                            </div>
                        </div>
                    </v-list-item-action>

                    
                </v-list-item>
            </v-list-item-group>
        </v-list>
        
        <div class="text-right py-3">
            <v-btn @click="purchaseNow" color="orange" class="text-white">
                Purchase now - TOTAL (₱{{getTotal()}})
            </v-btn>
        </div>

        </section>
        <footering/>
  </div>
</template>

<script>
import purchasenow from '@/components/purchasenow'
import footering from '@/components/footer'
export default {
  components:{
    footering, purchasenow
  },

  

  asyncData({store}){
      store.state.cart.filter(cartitem => cartitem.selectedqty > 0)

      return {
          cart:store.state.cart,
          isPurchase:false
      }
  },

  methods:{
      purchaseNow(){
          if(this.getTotal() <= 0 || this.$store.state.cart.length == 0) return alert('Please Enter Item Quantity in your cart.')
          this.filterSelectedQTY()
          this.isPurchase = true
      },
      getTotal(){
          let total = 0
          this.$store.state.cart.forEach(item => total += (item.price * item.selectedqty))
          return total.toLocaleString()
      },
      add(item){
          if(item.selectedqty >= this.stocks(item.qty)) return alert("Out of stock.")
          item.selectedqty++
          this.cart = []
          this.cart = this.$store.state.cart
      },

      minus(item){
          item.selectedqty--
          if(item.selectedqty <= 0){
              
              item.selectedqty = 0
              this.cart = this.cart.filter(cartitem => cartitem.selectedqty != 0)
              this.$store.state.cart = this.cart
          }

          this.cart = []
          this.cart = this.$store.state.cart
      },
      
      filterSelectedQTY(){
          this.cart.forEach(item => {
              let reversed = item.qty.reverse()
              let selectedqty = item.selectedqty
              reversed.forEach(qty => {
                  if(selectedqty == 0 || qty.qty == 0) return
                  selectedqty = qty.qty - selectedqty
                     
                  qty.qty = selectedqty <= 0 ? 0 : selectedqty
                  
                  if(selectedqty <= 0) selectedqty = Math.abs(selectedqty)

              })
              
              item.qty.reverse()
          })

          this.$store.state.cart = this.cart
          
      },

      stocks(qty){
        let total = 0
        qty.forEach(q => total += q.qty)
        return total
      }
  }
}
</script>

<style scoped>
    .quantyaction{
        display: grid;
        grid-template-columns:1fr 1.5fr 1fr;
        background-color:#f2f2f2;
    }
</style>