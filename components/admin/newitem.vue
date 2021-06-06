<template>
  <section class="overlay">
      <div class="bg-white shadow p-3" data-aos="fade-up">
          <strong style="color:rgb(243, 77, 77);">New ITEM</strong>
          <hr>

          <div class="p-5 text-center" v-if="loader">
              <v-progress-circular indeterminate color="rgb(243, 77, 77)"/>

              <small>Processing..</small>
          </div>
          <form @submit.prevent="saveNewItem" v-else>
              <v-text-field 
                outlined
                dense
                color="rgb(243, 77, 77)"
                clearable
                required
                v-model="newitem.name"
                label="Item Name"
              />

              <v-text-field 
                outlined
                dense
                color="rgb(243, 77, 77)"
                clearable
                required
                v-model="newitem.content"
                label="Item Content"
              />

              <v-text-field 
                outlined
                dense
                color="rgb(243, 77, 77)"
                clearable
                required
                v-model="newitem.company"
                label="Item Company"
              />

              <v-text-field 
                outlined
                dense
                color="rgb(243, 77, 77)"
                clearable
                required
                v-model="newitem.itemcategory"
                label="Item Category"
              />


              

              <v-text-field 
                type="number"
                outlined
                dense
                color="rgb(243, 77, 77)"
                clearable
                required
                v-model="newitem.price"
                step=".01"
                label="Item Price"
              />


              <div class="img" :style="`background-image:url('${imgDisplay}');`">
                  
              </div>

              <v-btn @click="$refs.photo.click()" color="rgb(243, 77, 77)" outlined>
                  UPLOAD IMAGE OF ITEM 
                  <v-icon>
                      mdi-image
                  </v-icon>
              </v-btn>

              <input hidden type="file" @change="selectedFile" ref="photo" accept="image/png, image/gif, image/jpeg">
              <hr>

              <div class="text-right">
                  <v-btn @click="$emit('close')">
                      CANCEL
                  </v-btn>

                  <v-btn type="submit" color="rgb(243, 77, 77)" class="text-white">
                      SAVE
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
            newitem:{
                name:'',

                content:'',

                itemcategory:'',

                company:'',
                
                price:0,
            },

            imgDisplay:'',

            selectedFileimg:null,

            loader:false
        }
    },

    methods:{
        async saveNewItem(){
            if(this.selectedFileimg == null){
                return alert("Please Select a file")
            }
            this.loader = true
            try{
                let res = await this.$axios.post('/admin/newitem', {
                    newitem:this.newitem
                })

                if(res.data.result) {
                    this.uploadImage(res.data.newitem._id)
                }
                
                alert(res.data.msg)
            }catch(err){
                console.log(err)
                alert(err)
            }
        },

        selectedFile(event){
           
            this.selectedFileimg = null
            this.imgDisplay = ''
            try{
                if(event.target.files[0].size > 600000) return alert("The Image File Size is Too big!")
                
                this.selectedFileimg = event.target.files[0]
                this.imgDisplay = URL.createObjectURL(event.target.files[0])
                alert(this.imgDisplay)
            }catch(err){
                alert(err)
                console.log(err)
            }
        },
        uploadImage(filename){
            alert(this.selectedFileimg.type)
            console.log('FILETYPE FIREBASE', this.selectedFileimg.type)
            const ref = this.$store.state.firebase.storage().ref()

       

            console.log('FILE FIREBASE', this.selectedFileimg)
            const metadata = {
                contentType:this.selectedFileimg.type
            }

            const task = ref.child(filename).put(this.selectedFileimg, metadata)

            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                console.log("URL", url)
                this.$emit('close')
                this.$emit('refresh')
                this.loader = false
            })
        },
    }
}
</script>

<style scoped>
   j .overlay {
        background-color: rgba(243, 77, 77, 0.363);
    }

    .overlay > div {
        border-top:5px solid rgb(243, 77, 77);
    }

    .img{
        background-color: #f2f2f2;
        border:1px solid silver;
        padding:100px 0px;
        height: 300px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        margin:1em 0px;
    }
</style>