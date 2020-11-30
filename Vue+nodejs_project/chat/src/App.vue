<template>
  <div class="chat-container">
      <chat-component ref="chat"></chat-component>
      <list-component></list-component>
  </div>
</template>

<script>
import ChatComponent from './components/ChatComponent';
import ListComponent from './components/ListComponent';

export default {
  name: 'App',
  components:{
    'chat-component': ChatComponent,
    'list-component': ListComponent,
  },
  mounted(){
    // console.log(this.$refs.chat.$el);
    this.resizeChatHeight();
  },
  methods:{
    resizeChatHeight() {
      this.$refs.chat.$el.style.height = `${window.innerHeight}px`;
    }
  },
  created: function () {
    window.addEventListener('resize', this.resizeChatHeight);
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .chat-container {
    width: 1000px;
    margin: auto;
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
</style>
