<template>
    <game :game="game2"/>
</template>

<script lang="ts">

import { defineComponent, reactive } from 'vue';
import { createGame } from '../game'  
import Game from './Game.vue'

export default defineComponent({
    name: 'Medium',
    components: {
        Game,
    },
    setup(){
        const game2 = reactive(createGame(10, 2*10));
        return{
            game2,
        }
    }
});

</script>