import Vue from 'vue'
import App from './App.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Content from './Content.vue'

Vue.component( 'app-header', Header );
Vue.component( 'app-footer', Footer );
Vue.component( 'app-content', Content );

new Vue({
  el: '#app',
  render: h => h(App)
})
