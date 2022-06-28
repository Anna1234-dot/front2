<template>
<h1>Minesweeper</h1>
<div>
  <button @click="reload()" class="float">Try again</button>
  <router-link to="/Easy"><button class="float">Easy</button></router-link>
  <router-link to="/Medium"><button class="float">Medium</button></router-link>
  <router-link to="/Hard"><button class="float">Hard</button></router-link>
  <router-link to="/Results"><button class="float">Results</button></router-link>
  <router-view v-if="isRouterAlive"></router-view>
  
</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { createGame } from './game';
import Game from './components/Game.vue' ;
import Easy from './components/Easy.vue';
import Medium from './components/Medium.vue';
import Hard from './components/Hard.vue';
import Results from './components/Results.vue';


export default defineComponent({
  name: 'App',
  components: {
    Game, Easy, Medium, Hard, Results
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  },
  setup() {
    const game = reactive(createGame(10, 2*10));

    return {
      game,
    }
  }
});

</script>

<style scoped>
  .choice{
    display: inline;
    margin-left: auto;
    margin-right: auto;
  }
  
  .float{
    text-decoration: none;
    display: inline-block;
    width: 140px;
    height: 45px;
    line-height: 45px;
    border-radius: 15px;
    margin: 10px 20px;
    
    font-size: 11px;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 3px;
    font-weight: 600;
    color: #0c0b0b;
    background: rgba(0, 81, 255, 0.882);
    box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
    transition: .3s;
  }  
  .float:hover{
      background: rgba(0, 81, 255, 0.882);
      box-shadow: 0 15px 20px rgba(0, 81, 255, 0.882);
      color: white;
      transform: translateY(-7px);
    }
  
</style>
