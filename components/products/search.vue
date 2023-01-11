<template>
  <div class=" d-flex align-center">
    <v-text-field
        style="width:100px; color:#e15f41; font-family: 'Poppins', sans-serif;"
        outlined
        label="Search products"
        append-icon="mdi-shopping-search"
        color="rgb(248, 108, 108)"
        class="mt-1"
        v-model="keyword"
        :loading="loading"
        @keyup="searchedProducts"
    ></v-text-field>

  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      loading:false,
    }
  },

 

  methods: {
    async retrieveImg(filename){
        // Create a reference to the file we want to download
        const ref = this.$store.state.firebase.storage().ref()
        var retrieve = ref.child(filename);

        // Get the download URL
        let res = await retrieve.getDownloadURL()
        return res
    },

    async searchedProducts() {
      this.loading = true
      this.$emit("LOADING", true)
      if(this.keyword) {
        let obj = { take: 10, page: 1, keyword: this.keyword }
        const url = new URL(`${process.env.baseURL}/products/search`);
        url.search = new URLSearchParams(obj);
        const res = await this.$axios.get(url.href)
        const items = res.data.items
        for (const item of items) {
            item.selectedqty = 0
            item.image = await this.retrieveImg(item._id);
        } 
        this.$emit('SEARCH', items)
        this.loading = false
      } else {
        this.loading = false
        this.$emit("BEST_PRODUCTS")
      }
      
    }
  },
}
</script>

<style>

</style>