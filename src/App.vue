<template>
    <div id="app">
        <app-header></app-header>
        <app-content></app-content>
        <app-footer></app-footer>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
        
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
