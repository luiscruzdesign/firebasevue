<template>
  <div id="app">
    <h1>ICE Score</h1>
    <Cadastro/>
  </div>
</template>

<script>
import Cadastro from './components/Cadastro'

export default {
  name: 'App',
  components: {
    Cadastro
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  margin: 0;
  background: #0b6ebd;
  color: #ffffff;
  padding: 20px 0;
  margin-bottom: 20px;
}
</style>
