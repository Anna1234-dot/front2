<template>
    <div class="time-class">
       <button class="time"><p>⏱️  {{game.duration }}</p></button>
    </div>
    <table>
        <tr v-for="(row, y) in game.field" :key="y">
            <lot v-for="(bomb, x) in row" :key="x" :bomb="bomb" @left-click="leftClicked" @right-click="rightClicked"/>
        </tr>
    </table>
    <h1>{{ game.final }}</h1>
</template>

<script lang="ts">
import { defineComponent, PropType, VueElement } from "vue";
import Lot from './Lot.vue';
import { Bomb, useGame, Playing } from '../game';

export default defineComponent({
    components: {
        Lot,
    },
    props: {
        game: {
            type: Object as PropType<Playing>,
            required: true,
        }
    },
    setup(props){
        const game = useGame(props.game);
        return {
            leftClicked: game.leftClicked,
            rightClicked: game.rightClicked,
        }
    }
})
</script>

<style scoped>
    table{
        border: 4px solid red;
        padding: 0;
        border-radius: 6px;
        margin-left: auto;
        margin-right: auto;
    }
    .time-class{
        margin-top: 10px;
        margin-bottom: 15px;
    }
    .time{
        background-color: red;
        width: 140px;
        height: 45px;
        margin-right: auto;
        margin-left: auto;
        border-radius: 15px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        letter-spacing: 3px;
        font-weight: 600;
        box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
        transition: .3s;
  }
  .time:hover{
        background: red;
        box-shadow: 0 15px 20px rgba(239, 6, 60, 0.882);
        color: white;
        transform: translateY(-7px);
    }
</style>