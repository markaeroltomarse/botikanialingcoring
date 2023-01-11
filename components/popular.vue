<template>
  <div id="best-products">
      <div class="headpop p-3">
          <strong>Popular Products</strong>
          <searchTxt v-on:SEARCH="getSearched" v-on:BEST_PRODUCTS="getbestProducts" v-on:LOADING="setLoading"/>
      </div>

      <div class="text-center p-5 " v-if="resultItems == null">
          <v-progress-circular indeterminate color="error"/>
      </div>
      <div class="listprod" v-else>
          <div 
            class="p-3 shadow-sm rounded bg-white"
            v-for="item in resultItems"
            :key="item._id"
          >
              <div v-if="item.image" class="p-5 img" :style="`background-image:url('${item.image + ' '}');`">
              </div>
              <hr>
              <div class="h-50" >
                  <small class="text-wrap">
                      <div class="d-flex justify-content-between">
                        <strong class="text-elip">
                            {{item.name}}
                        </strong>
                        <span style="font-size:10px;" class="text-secondary">Stocks: {{stocks(item.qty)}}</span>
                      </div>
                      <br>

                      <p style="font-size:10px; max-width: 500px;" class="text-secondary text-elip" >{{item.content}}</p>

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
              </div>

              <div class="text-right  " >
                <v-btn small color="primary" rounded @click="addtocart(item)">
                    ADD <v-icon small class="ml-2">mdi-cart-plus</v-icon>
                </v-btn>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import searchTxt from './products/search.vue'
export default {
    components: {
        searchTxt
    },
    props:{
        items:{
            type:Array,
        }
    },

    data() {
        return {
            resultItems: null
        }
    },

    watch:{ 
        items(value) {
            this.resultItems = value
        }
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
            return (Math.round((price * (1 - off / 100)) * 100) / 100).toFixed(2).toLocaleString()
        },

        stocks(qty){
            let total = 0
            qty.forEach(q => total += q.qty)
            return total
        },

        getSearched(data) {
            this.resultItems = data
        },

        getbestProducts() {
            this.resultItems = this.items
        },

        setLoading(data) {
            if (data) this.resultItems = null
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
        transition: all 0.1s;
    }

    .listprod > div:hover {
        box-shadow: -5px 18px 115px 27px rgba(0,0,0,0.27);
        -webkit-box-shadow: -5px 18px 115px 27px rgba(0,0,0,0.27);
        -moz-box-shadow: -5px 18px 115px 27px rgba(0,0,0,0.27);
        transition: all 0.2s;
        margin-top: -5px;
        margin-bottom: 5px;
    }

    .img{
        background-size:100%;
        background-repeat: no-repeat;
        background-position: center;
    }


    .text-elip {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
                line-clamp: 2; 
        -webkit-box-orient: vertical;
        max-height: 10000px;
    }

    @media only screen and (min-width: 1858px) {
        .listprod{
            padding:1em 10%;
        }
    }
</style>