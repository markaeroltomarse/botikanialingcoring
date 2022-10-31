<template>
  <v-app class="mainFont bg-light">
    <navs>
    </navs>
    <gloader/>
    <nuxt class="text-dark bg-light " />
    <toaster />
  </v-app>
</template>

<script>
import navs from '@/components/navs'
import gloader from '@/components/gloader'
import toaster from '@/components/global/toaster'
export default {
  head() {
      return {
        script: [
            { 
              src: 'https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js' 
            },
            { 
              src:"https://www.gstatic.com/firebasejs/8.6.2/firebase-storage.js" 
            },
        ]
      }
  },
  beforeMount(){
    this.initFirebase()
  },
  data () {
    return {
      userSB:false
    }
  },
  components:{
    navs, gloader, toaster
  },

  methods:{
    
    initFirebase(){
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
          apiKey: "AIzaSyDXZJssJL9AFFduoLyExK3OhvS_-xkC8TA",
          authDomain: "botika-a762d.firebaseapp.com",
          projectId: "botika-a762d",
          storageBucket: "botika-a762d.appspot.com",
          messagingSenderId: "839336313294",
          appId: "1:839336313294:web:3efedc1bb72420075a2b9f",
          measurementId: "G-3R3XNE7TW4"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.$store.state.firebase = firebase
        console.log('FIREBASE MOUNTED', this.$store.state.firebase)
    },
  }
}
</script>

<style>
  
</style>
