<template>
  <div>
    <section class="mainSection">
      <div class="login">

          <v-btn @click="insert" hidden>Insert Test Admin</v-btn>
          <strong style="color:rgb(248, 108, 108);"><h4>LOGIN</h4></strong>
          <form @submit.prevent="submit">
              <v-text-field 
                type="text" 
                label="Username" 
                dense 
                outlined 
                color="rgb(248, 108, 108)"
                required
                v-model="login.username"
              />

              <v-text-field 
                type="password" 
                label="Username" 
                dense outlined 
                color="rgb(248, 108, 108)"
                required
                v-model="login.password"
              />

              <v-btn type="submit" small block color="rgb(248, 108, 108)" class="text-white">
                  LOGIN
              </v-btn>

          </form>

      </div>
    </section>
    <footering/>
  </div>
</template>

<script>

import popular from '@/components/popular'
import footering from '@/components/footer'
export default {
  components:{
    popular, footering
  },

  data(){
      return {
          login:{
              username:'',
              password:'',
          }
      }
  },

  methods:{
      async submit(){
          try{
            let res = await this.$axios.post('/authen/login', this.login) 
            if(res.data.result){
                this.$auth.setUser(res.data.admin)
                this.$auth.$storage.setCookie(process.env.AUTH_KEY, res.data.admin, false)
                return this.$router.replace({path:'/admin'})
                .catch(err => this.$router.replace({path:'/admin'}))
            }
          }catch(err){
              this.$store.commit('LOAD_TOASTER', err.response.data.message)
          }
      },

      async insert(){
          let res = await this.$axios.get('/authen/insertAdmin')
      }
      
  }
}
</script>

<style scoped>

    .login {
        padding:3em;
        border-top:3px solid rgb(248, 108, 108);
        background-color:#f2f2f2;
        margin:10% 35%;
    }
</style>