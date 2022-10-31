<template>
  <v-alert
    v-if="$store.state.toasterError"
    color="red"
    dismissible
    type="success"
    class="toaster"
   >{{$store.state.toasterError}}</v-alert>
</template>

<script>
export default {
    data: () => ({
        
    })
}
</script>

<style scoped>
    .toaster{
        position: fixed;
        bottom: 5%;
        right: 5%;
        z-index: 1000;
    }
</style>