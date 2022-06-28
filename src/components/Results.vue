<template>
    <h1>Best time results by levels</h1>
    <div>
        <h2>Easy: {{ time1 }}</h2>
        <h2>Medium:  {{ time2 }}</h2>
        <h2>Hard: {{ time3 }} </h2>
    </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import { Playing, time1, time2, time3 } from '../game'
import Game from './Game.vue'

export default defineComponent({
    name: 'Results',
    setup(){
        return{
            time1,
            time2,
            time3
        }
    }
});

</script>