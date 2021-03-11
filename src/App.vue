<template>
  <div id="app">
    <ImageConverter />
  </div>
</template>

<script>
import ImageConverter from './components/ImageConverter.vue';

export default {
  name: 'App',
  components: {
    ImageConverter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background-color: #efefef;
}
</style>
