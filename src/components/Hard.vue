<template>
    <game :game="game3"/>
</template>

<script lang="ts">

import { defineComponent, reactive } from 'vue';
import { createGame } from '../game'  
import Game from './Game.vue'

export default defineComponent({
    name: 'Hard',
    components: {
        Game,
    },
    setup(){
        const game3 = reactive(createGame(15, 2*15));
        return{
            game3,
        }
    }
});

</script>