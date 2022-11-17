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

  computed: {
    async resultProducts() {
      this.loading = true
      console.log(process.env.baseURL)
      if(this.keyword) {
        let obj = { take: 10, page: 1, keyword: this.keyword }
        const url = new URL(`${process.env.baseURL}/products/search`);
        url.search = new URLSearchParams(obj);
        const res = await this.$axios.get(url.href)
        this.$emit('SEARCH', res.data.items)
        this.loading = false
        return res.data.items
      }
      this.loading = false
      this.$emit("BEST_PRODUCTS")
      return []
    }
  },

  watch: {
    async keyword(newValue) {
      this.loading = true
      this.$emit("LOADING", true)
      console.log(process.env.baseURL)
      if(newValue) {
        let obj = { take: 10, page: 1, keyword: newValue }
        const url = new URL(`${process.env.baseURL}/products/search`);
        url.search = new URLSearchParams(obj);
        const res = await this.$axios.get(url.href)
        this.$emit('SEARCH', res.data.items)
        this.loading = false
        return res.data.items
      }
      this.loading = false
      this.$emit("BEST_PRODUCTS")
      return []
    }
  }
}
</script>

<style>

</style>