import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo, faPlay, faExpandAlt, faAngleUp, faAngleDown, faPause} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './app.css';

library.add(faRedo, faPlay, faExpandAlt, faAngleUp, faAngleDown,faPause)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  el:"#app",
  render: h => h(App),
})