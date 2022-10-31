<template>
  <section class="overlay">
      <div class="bg-white rounded shadow p-4" data-aos="fade-up">
        <strong>
            Surgitech
        </strong>

        <hr>

        <div class="text-center p-5" v-if="reload">
            <v-progress-circular indeterminate color="error"/>
        </div>

        <div style="min-height: 80vh;" v-else>
            <v-list >
                <v-list-item-group color="rgb(243, 77, 77)">
                    <v-list-item 
                    v-for="qty in item.qty"
                    :key="qty.date"
                    style="border-left:3px solid rgb(243, 77, 77);">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{displayDate(qty.date)}} 
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action data-aos="fade-left" class="mx-3" v-if="qtycopy.some(copy => copy.date == qty.date && copy.qty != qty.qty)">
                            <v-btn  color="primary" outlined>FROM {{qtycopy.find(copy => copy.date == qty.date).qty}} TO <strong>{{qty.qty}}?</strong></v-btn>
                        </v-list-item-action>
                    
                        <v-divider vertical/>
                        <v-list-item-action class="ml-3">
                            <div class="quantyaction">
                                <div>
                                    <v-btn @click="minus(qty)" color="rgb(243, 77, 77)" class="text-white">
                                        <strong>-</strong>
                                    </v-btn>
                                </div>

                                <div class="text-center py-1">
                                    {{qty.qty}}
                                </div>

                                <div>
                                    <v-btn @click="add(qty)" color="rgb(243, 77, 77)" class="text-white">
                                        <strong>+</strong>
                                    </v-btn>
                                </div>
                            </div>
                        </v-list-item-action>
                        

                        <v-list-item-action class="mx-3" >
                            <v-btn color="rgb(243, 77, 77)" outlined> DISPOSE <v-icon>mdi-delete</v-icon></v-btn>
                        </v-list-item-action>

                        
                    </v-list-item>


                    <v-list-item style="border-left:3px solid #ce22b7;">
                
                        <v-list-item-action>
                            <v-text-field 
                                
                                outlined
                                dense
                                color="rgb(243, 77, 77)"
                                clearable
                                required
                                readonly
                                v-model="newitem.date"
                                label="Item Expiration date"
                            />
                        </v-list-item-action>

                        <v-divider vertical/>

                        <v-list-item-action class="ml-3">
                            <div class="quantyaction">
                                <div>
                                    <v-btn @click="newitemMinus(item)" color="rgb(243, 77, 77)" class="text-white">
                                        <strong>-</strong>
                                    </v-btn>
                                </div>

                                <div class="text-center py-1">
                                {{newitem.qty}}
                                </div>

                                <div>
                                    <v-btn @click="newitemAdd(item)" color="rgb(243, 77, 77)" class="text-white">
                                        <strong>+</strong>
                                    </v-btn>
                                </div>
                            </div>
                        </v-list-item-action>
                        
                      
                        
                        <v-list-item-action @click="newQTY()" class="mx-3" v-if="newitem.qty > 0 || newitem.date != ''">
                            <v-btn color="success" outlined>ADD QTY </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-item-group>
            </v-list>

            <v-date-picker
                v-model="datepicker"
                year-icon="mdi-calendar-blank"
                prev-icon="mdi-skip-previous"
                next-icon="mdi-skip-next"
                color="error"
                :min="item.qty.length > 0 ? item.qty[item.qty.length-1].date : null"
                show-adjacent-months
            ></v-date-picker>
        </div>

        <div class="py-3 text-right">

            <v-btn @click="$emit('close')" color="error">
                CLOSE 
            </v-btn>

            <v-btn @click="updateQTY" v-if="JSON.parse(JSON.stringify(qtycopy)).filter(copy => {
                return this.item.qty.some(item =>item.date == copy.date && item.qty != copy.qty)
            }).length > 0" color="success">
                SAVE
            </v-btn>
            
        </div>
      </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
    data(){
        return {
            datepicker:null,
            qtycopy:[],
            today:moment().format('YYYY-MM-DD'),

            newitem:{
                date:'',
                qty:0,
            },

            reload:false,
        }
        
    },
    props:{
        item:Object
    },

    mounted(){
        this.qtycopy = JSON.parse(JSON.stringify(this.item.qty)) // {date, qty}
    },
    methods:{
        
        async newQTY(){
            try{
                if(this.newitem.date == '') return this.$store.commit("LOAD_TOASTER", 'Select a date for expiration.')
                this.reload = true
                await this.$axios.post('/admin/inventory/newqty', {_id:this.item._id, newitem:this.newitem})
                this.$emit('refresh', this.item._id)
                this.$emit('close')
            }catch(err){
                this.$store.commit("LOAD_TOASTER", err.response.data.message)
            }
        },


        async updateQTY(){
            this.reload = true
            let copyitem = JSON.parse(JSON.stringify(this.item.qty))
            copyitem = copyitem.filter(item => {
                return this.qtycopy.some(copy => item.date == copy.date && item.qty != copy.qty)
            })
            
            if(copyitem.length <= 0) return this.$store.commit("LOAD_TOASTER", "No Changes Quantity Products")
            
            try{
                await this.$axios.post('/admin/updateqty', {_id:this.item._id, items:copyitem})
                this.$emit('refresh', this.item._id)
                return this.$emit('close')
            }catch(err){
                console.log(err)
                this.$store.commit("LOAD_TOASTER", err.response.data.message)
                this.reloaded = false
            }  
        },

        minus(qty){
          //let itemcopy = this.qtycopy.find(qty => qty._id == item._id)
          if(qty.qty <= 0) return this.$store.commit("LOAD_TOASTER", "Unable")

          qty.qty--
        },

        add(qty){
            qty.qty++
        },

        newitemMinus(){
            if(this.newitem.qty <= 0) return this.$store.commit("LOAD_TOASTER", "Unable")
            this.newitem.qty--
        },

        newitemAdd(){
            this.newitem.qty++
        },

        monitorChanges(){
            this.qtycopy.filter(copy => {
                return this.items.some(item => item.qty == copy.qty)
            }).length > 0
        },

        displayDate(date){
            return moment([...date.split('-').map(x=>+x)], 'YYYY-MM-DD').format('MMMM Do YYYY')
        },
    },

    watch:{
        datepicker(val){
            this.newitem.date = val
        }
    }
}
</script>

<style>
    .overlay {
        background-color: rgba(243, 77, 77, 0.363);
        overflow-y:scroll;
        padding:3% 20%;
    }
    .quantyaction{
        display: grid;
        grid-template-columns:1fr 1.5fr 1fr;
        background-color:#f2f2f2;
    }
</style>