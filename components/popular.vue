<template>
  <div>
      <div class="headpop p-3">
          <strong>Popular Products</strong>
      </div>
      <div class="text-center p-5 " v-if="items == null">
          <v-progress-circular indeterminate color="error"/>
      </div>
      <div class="listprod" v-else>
          <div 
            class="p-3 shadow-sm rounded bg-white"
            v-for="item in items"
            :key="item._id"
          >
              <div v-if="item.image" class="p-5 img" :style="`background-image:url('${item.image + ' '}');`">

              </div>
              <hr>
              <div >
                  <small>
                      <div class="d-flex justify-content-between">
                          <strong>
                            {{item.name}}
                        </strong>

                        <span style="font-size:10px;" class="text-secondary">Stocks: {{stocks(item.qty)}}</span>
                      </div>
                      <br>
                      <span style="font-size:10px;" class="text-secondary">{{item.content}}</span>
                      <br>

                      <span class="text-secondary">{{item.company}}</span>
                      <br>

                      <span class="text-secondary">{{item.itemcategory}}</span>
                      <br>
                      

                      <strong>
                          ₱ {{percentOff(item.price, item.percentOff)}}
                      </strong>
                      <div v-if="item.percentOff > 0">
                        <strike class="text-secondary" >₱{{item.price}}</strike>
                        <span class="text-success">{{item.percentOff}}% OFF</span>
                      </div>
                      
                  </small>

                  <div class="text-right" >
                      

                      <v-btn small color="primary" rounded @click="addtocart(item)">
                          ADD
                      </v-btn>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    
    props:{
        items:{
            type:Array,
        }
    },
    mounted(){
        
    },

    methods:{
        addtocart(item){
            let selecteitem = this.$store.state.cart.find(itemcart => itemcart._id == item._id)
            if(selecteitem != null) {
                selecteitem.selectedqty++
            }else{
                this.$store.state.cart.push(item)
            }
            
            return this.$router.replace({path:'/cart'})
            .catch(err => this.$router.replace({path:'/cart'}))
        },

        

        percentOff(price, off){
            return Math.round((price * (1 - off / 100)) * 100) / 100

        },

        stocks(qty){
            let total = 0
            qty.forEach(q => total += q.qty)
            return total
        }
    },

    
}
</script>

<style scoped>
    .headpop {
        border-left:5px solid rgb(248, 108, 108);
        background-color:#f2f2f2;
    }
    .listprod{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 1em;
        padding:1em 0%;
    }

    .img{
        background-size:100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    @media only screen and (min-width: 1858px) {
        .listprod{
            padding:1em 10%;
        }
    }
</style>