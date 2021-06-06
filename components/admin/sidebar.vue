<template>
  <div class="sidebar shadow-sm">
      <div class="bg-white rounded p-2 m-3 text-center">
          <strong>
              <h4 style="color:rgb(253, 97, 97);">BOTIKA NI ALING CORING</h4>
          </strong>
      </div>

      <v-list dense nav style="border-right:1px solid rgb(243, 77, 77);">
          <v-list-item-group color="rgb(253, 97, 97)">

              <v-list-item to="/admin">
                  <v-list-item-avatar>
                      <v-icon color="color:rgb(253, 97, 97)">
                          mdi-home
                      </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-title>
                          HOME
                      </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

              <v-list-item to="/admin/inventory">
                  <v-list-item-avatar>
                      <v-icon color="color:rgb(253, 97, 97)">
                          mdi-view-list
                      </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-title>
                          INVENTORY
                      </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

              <v-list-item to="/admin/sales">
                  <v-list-item-avatar>
                      <v-icon color="color:rgb(253, 97, 97)">
                          mdi-chart-box-outline
                      </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-title>
                          SALES
                      </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

              <v-divider/>
              <v-list-item @click="logout">
                  <v-list-item-avatar>
                      <v-icon color="color:rgb(253, 97, 97)">
                          mdi-logout
                      </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-title>
                          LOGOUT
                      </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list-item-group>
      </v-list>
  </div>
</template>

<script>
export default {
    methods:{
        logout(){
            console.log('DATA LOGGING OUT')
            console.log( this.$auth.$storage.getCookie(process.env.AUTH_KEY))
            this.$auth.$storage.setCookie(process.env.AUTH_KEY, null, false)
            this.$auth.logout()
        },
    }
}
</script>

<style scoped>
    .sidebar{
        position:fixed;
        top:0;
        left:0;
        width:15%;
        background-color: rgb(243, 77, 77);
        height: 100vh;
        
    }
</style>