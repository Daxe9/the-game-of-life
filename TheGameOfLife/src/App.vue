<template>
  <v-app>
    <v-main>
        <Grid />
    </v-main>
  </v-app>
</template>

<script>
import Grid from "./components/Grid.vue";

export default {
  name: 'App',

  components: {
      Grid
  },
}
</script>
<style>
body, html {
  height: 100vh;
  margin: 0;
}
</style>