<template>
  <section class="overlay">
      <div data-aos="zoom-in" class="bg-white p-3 shadow rounded" >
          <strong>Following Items:</strong>
          
          <v-list style="height:70vh; overflow-y:scroll;">
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
                        {{item.name}}
                    </v-list-item-title>
                    
                    <v-list-item-subtitle>
                        {{item.content}}
                    </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action class="mx-3">
                        <h4>Quantity: {{item.selectedqty}}</h4>
                    </v-list-item-action>
                    

                    <v-divider vertical/>

                    

                    
                    <v-list-item-action class="mx-3">
                        <h4>₱ {{item.price * item.selectedqty.toLocaleString()}}</h4>
                    </v-list-item-action>

                    
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <div class="py-4 text-right">
            <v-btn @click="$emit('close')">
                CLOSE
            </v-btn>
        </div>

      </div>
  </section>
</template>

<script>
export default {
    props:{
        items:Array
    }
}
</script>

<style>

</style>