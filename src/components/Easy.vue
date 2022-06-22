<template>
    <game :game="game1"/>
</template>

<script lang="ts">

import { defineComponent, reactive } from 'vue';
import { createGame } from '../game'  
import Game from './Game.vue'

export default defineComponent({
    name: 'Easy',
    components: {
        Game,
    },
    setup(){
        const game1 = reactive(createGame(5, 2*5));
        return{
            game1,
        }
    }
});

</script>