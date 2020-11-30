<template>
  <div id="app">
     <transition name="slide-up" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import TimerComponent from './components/TimerComponent';
import TimerEditComponent from './components/TimerEditComponent';

const router = new VueRouter({
routes: [
  { path: '/', name: "timer-page", component: TimerComponent},
  { path: '/edit', name: "edit-page",component: TimerEditComponent} 
]});

Vue.use(VueRouter);



export default {
  name: 'App',
  router,
  render: h => h(TimerComponent)
}
</script>

<style>
@charset "utf-8";
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ol, ul {
    list-style: none;
  }

  a {
      outline: none;
      text-decoration: none;
      color:#555;
  }
  img {
      border:0;
  }
  body {
      font-family: 'Noto Sans KR', sans-serif;
      user-select:none;
  }

  #app {
    padding: 5px 20px;
  }

  .red-text {
      color: #da0f0f;
  }
  .bord-text {
    margin: 15px 0 10px 0;
    font-weight: bold;
  }
</style>
