<template>
  <section class="overlay d-flex justify-content-between align-item-center">
      <div data-aos="zoom-up" class="bg-white shadow border p-4 rounded ">
          <div class="d-flex justify-content-between">
              <strong>Delivery Information</strong>
              <v-btn @click="$emit('close')" x-small fab>
                  <v-icon>
                      mdi-close
                  </v-icon>
              </v-btn>
          </div>
          
          <hr>
          <div class="text-center p-5" v-if="loader">
              <v-progress-circular color="error" indeterminate/>
          </div>
          <form @submit.prevent="purchaseNow" v-else>
              <v-text-field
                type="number"
                :rules="['Required']"
                required
                autofocus
                outlined
                color="error"
                dense
                clearable
                label="Mobile Number"
                v-model="customer.phonenumber"
                
              >

              <template #label>
                <span class="red--text"><strong>* </strong></span>Phone number
              </template>

              </v-text-field>

              <div class="d-flex justify-content-between">
                  <v-text-field
                    type="text"
                    :rules="['Required']"
                    required
                    outlined
                    color="error"
                    dense
                    clearable
                    label="Last name"
                    v-model="customer.lname"
                    >

                <template #label>
                    <span class="red--text"><strong>* </strong></span>Last Name
                </template>

                </v-text-field>

                <div class="mx-5">

                </div>

                <v-text-field
                    type="text"
                    :rules="['Required']"
                    required
                    outlined
                    color="error"
                    dense
                    clearable
                    label="First name"
                    v-model="customer.fname"
                >

                <template #label>
                    <span class="red--text"><strong>* </strong></span>First Name
                </template>

                </v-text-field>
              </div>

              <v-text-field
                type="text"
                :rules="['Required']"
                required
                outlined
                color="error"
                dense
                clearable
                label="City"
                v-model="customer.city"
              >

                <template #label>
                    <span class="red--text"><strong>* </strong></span>City
                </template>

              </v-text-field>

              <v-text-field
                type="text"
                :rules="['Required']"
                required
                outlined
                color="error"
                dense
                clearable
                label="Home Address"
                v-model="customer.address"
              >

                <template #label>
                    <span class="red--text"><strong>* </strong></span>Home Address
                </template>

              </v-text-field>
              

              <div class="border rounded bg-light p-5">
                  <span class="text-secondary">Total:</span>
                  <h3>₱{{getTotal()}}</h3>
              </div>

              <div class="text-right py-4">
                  <v-btn  type="submit" color="orange" class="text-white">
                      Check Out
                  </v-btn>
              </div>
          </form>
      </div>
  </section>
</template>

<script>
export default {
    data(){
        return {
            customer:{
                fname:'',
                lname:'',
                phonenumber:null,
                address:'',
                items:this.$store.state.cart,
                
            },

            loader:false,
        }
    },
    methods:{
        async purchaseNow(){
            
            try{
                let res = await this.$axios.post('/orders/purchaseItem', {
                    customer:this.customer
                })

                alert(res.data.msg)
                
                this.$store.state.cart = []
                this.$emit('close')
                this.$emit('refresh')
            }catch(err){
                console.log(err)
                alert('Something wrong purchasing items.')
            }
        },
        getTotal(){
            let total = 0
            this.$store.state.cart.forEach(item => total += (item.price * item.selectedqty))
            return total.toLocaleString()
        },
    }
}
</script>

<style scoped>
    .overlay{
        background-color: rgba(243, 86, 86, 0.281);
    }

    .overlay > div{
        height: 90vh;
        width:80%;
    }
</style>