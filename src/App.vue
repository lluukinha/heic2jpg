<template>
  <div id="app">
    <ImageConverter />
    <Footer />
  </div>
</template>

<script>
import ImageConverter from './components/ImageConverter.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    ImageConverter,
    Footer,
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
  margin-top: 30px;
}

body {
  background-color: #efefef;
}
</style>
