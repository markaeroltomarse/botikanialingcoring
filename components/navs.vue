<template>
  <div class="rootnav" v-if="!$auth.loggedIn">
      <div class="bg-secondary px py-4 text-white d-flex justify-content-between">
            <div class="d-flex flex-row">
                <nuxt-link to="/" class="text-white">
                    HOME
                </nuxt-link>

                <nuxt-link to="/" class="mx-5 text-white">
                    CONTACT
                </nuxt-link>
            </div>

            <div class="text-right">
                <v-icon size="30px">
                    mdi-email
                </v-icon>
                BotikaNiCoring@gmail.com   
            </div>
     </div>
     <header class="px py-3 bg-white">
        
        <div class="d-flex justify-content-between align-center">
            <div>
                <h1>
                    <v-icon size="40px">
                        mdi-cart
                    </v-icon>
                    <strong >BOTIKA NI ALING KORING</strong>
                </h1>
            </div>

            <div class="pt-2 ">
                <div style="background-color:#f2f2f2;" class="d-flex justify-content-between rounded p-2">
                    <div >
                        <v-btn to="/cart" class="border" fab small color="rgb(248, 108, 108)">
                            <v-icon color="white" size="20px">mdi-cart</v-icon>
                        </v-btn>
                    </div>

                    <div class="text-center p-2 ">
                        <small>My Cart ({{$store.state.cart.length}})</small>
                    </div>
                </div>
            </div>
        </div>
     </header>
    <nav class="shadow px py-2">
        <nuxt-link to="/" class="text-white">
            HOME
        </nuxt-link>

        <nuxt-link to="#best-products" class="mx-5 text-white">
            BEST PRODUCTS
        </nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .rootnav{
        position:fixed;
        top:0;
        left:0;
        width: 100%;
        z-index:1;
    }
</style>