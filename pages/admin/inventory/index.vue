<template>
  <div>
      <sidebar/>
      <newitem v-if="newitemSet" v-on:close="newitemSet = false" v-on:refresh="fetchItems"/>
       <quantities v-if="quantitiesModal" v-on:refresh="refresh" v-on:close="quantitiesModal = false" :item="item"/>
      <section v-if="isdeleteItem" class="overlay d-flex justify-content-center align-items-center" style="background-color: rgba(243, 77, 77, 0.363);">
          <div data-aos="zoom-in" class="shaodw bg-white rounded p-5 " style="height:15%; margin:">
              Quantity are will deleted?
              <div class="text-right my-1">
                  <v-btn @click="isdeleteItem = false" small class="mx-2" color="error" outlined>
                      No
                  </v-btn>

                  <v-btn @click="deleteNow" small color="error" >
                      Yes
                  </v-btn>
              </div>
          </div>
      </section>


      <section class="adminMainSection" style="z-index:0;">
          <div class="p-5 text-center" v-if="reloaded">
              <v-progress-circular indeterminate color="red " />
          </div>
          <div v-else>
              <div class="d-flex justify-content-between">
                    <h1>Inventory</h1>

                    <div>
                        <v-btn @click="newitemSet = true" color="rgb(243, 77, 77)" class="text-white" style="float:right;">
                            ADD NEW ITEM + 
                        </v-btn>
                    </div>
              </div>
              
              
              <div class="border rounded bg-white p-5 listitem">
                  <v-list >
                      <v-list-item-group color="rgb(243, 77, 77)">
                          <v-list-item 
                          v-for="(item) in items"
                          :key="item._id"
                          style="border-left:3px solid rgb(243, 77, 77);">
                             <v-list-item-avatar>
                                 <v-img :src="item.image"/>
                             </v-list-item-avatar> 

                             <v-list-item-content>
                                <v-list-item-title>
                                    {{item.name}} - <span class="text-success">{{item.percentOff}} % OFF </span>
                                </v-list-item-title>
                                
                                
                             </v-list-item-content>

                             <v-list-item-action class="mx-3">
                                 <h4>₱ {{item.price}}</h4>
                             </v-list-item-action>

                             <v-divider vertical/>

                             <v-list-item-action class="mx-3">
                                 <v-btn color="error" outlined @click="deleteItem(item)">DELETE ITEM <v-icon>mdi-delete</v-icon></v-btn>
                             </v-list-item-action>

                             <v-list-item-action class="mx-3" hidden>
                                 <v-btn color="rgb(243, 77, 77)" outlined>EDIT <v-icon>mdi-brush</v-icon></v-btn>
                             </v-list-item-action>
                             <v-divider vertical/>

                             

                             
                             

                             <v-list-item-action>
                                 <v-btn color="error" @click="openItem(item)">
                                     OPEN
                                 </v-btn>
                             </v-list-item-action>

                            

                             
                          </v-list-item>
                      </v-list-item-group>
                  </v-list>
              </div>

              <div class="text-right py-3">
                  <v-btn outlined color="rgb(243, 77, 77)">
                      TOTAL PRODUCTS: {{items.length}}
                  </v-btn>

                  <v-btn outlined color="rgb(243, 77, 77)">
                      <!-- TOTAL QUANTITY: {{items.qty.reduce((a, b) => a.qty + b.qty, 0)}} -->
                  </v-btn>
              </div>
          </div>
      </section>
  </div>
</template>

<script>
import sidebar from '@/components/admin/sidebar.vue'
import newitem from '@/components/admin/newitem.vue'
import quantities from '@/components/admin/quantities.vue'
import moment from 'moment'
export default {
    middleware:['admin-auth'],
    components:{sidebar, newitem, quantities},

    data(){
        return {
            newitemSet:false,
            images:[],
            items:[],
            qtycopy:[],

            reloaded:true,
            isdeleteItem:false,
            selectedItemToDelete:null,

            quantitiesModal:false,

            item:null
        }
    },

    async mounted(){
        this.fetchItems()
    },



    methods:{
        
        

        async fetchItems(){
            this.reloaded = true
            let res = await this.$axios.get('/admin/getitems')

            this.items = res.data.items

            for (const item of this.items) {
                
                const image = await this.retrieveImg(item._id);
                item.image = image
            }        

            console.log('ITEMS', this.items)
            this.reloaded = false
            //this.copyQTY()
        },

        // copyQTY(){
        //     this.qtycopy = []
        //     for (const item of this.items) {
        //         this.qtycopy.push({_id:item._id, qty:item.qty})
        //     } 

        //     this.reloaded = false

            
        // },
        async retrieveImg(filename){
            // Create a reference to the file we want to download
            const ref = this.$store.state.firebase.storage().ref()
            var retrieve = ref.child(filename);

            // Get the download URL
            let res = await retrieve.getDownloadURL()
            console.log(filename, res)
            return res
        },

        monitorChanges(){
            this.qtycopy.filter(copy => {
                return this.items.some(item => item.qty == copy.qty)
            }).length > 0
        },


        minus(item){
          //let itemcopy = this.qtycopy.find(qty => qty._id == item._id)
          if(item.qty <= 0) return alert('BAWAL')

          item.qty--
        },

        add(item){
            item.qty++
        },

        

        deleteItem(item){
            this.selectedItemToDelete = item
            this.isdeleteItem = true
        },

        async deleteNow(){
            try{
                let res = await this.$axios.post('/admin/deleteitem', {item:this.selectedItemToDelete})

                alert(res.data.msg)

                this.fetchItems()
                this.isdeleteItem = false
            }catch(err){
                console.log(err)
                alert('Something wrong deleting this item.')
            }
        },

        openItem(item){
            this.item = item
            this.quantitiesModal = true
        },

        refresh(id){
            
            
            this.fetchItems()
            let item = this.items.find(item => item._id == id)
            if(item != null) return this.openItem(item)
            
        }

        


    }
}
</script>

<style scoped>
    .listitem{
        height:80vh;
        overflow-y:scroll;
    }

    .quantyaction{
        display: grid;
        grid-template-columns:1fr 1.5fr 1fr;
        background-color:#f2f2f2;
    }
</style>