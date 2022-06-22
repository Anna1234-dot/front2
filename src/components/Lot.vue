<template>
    <td 
    :class="getClass(bomb)" 
    @click="leftClicked(bomb)"
    @contextmenu.prevent="rightClicked(bomb)"
    >{{ text }}</td>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Bomb } from '../game';

const textBomb = '💣';
const textFlag = '🚩';

export default defineComponent({
    props: {
        bomb: {
            type: Object as PropType<Bomb>,
            required: true
        }
    },
    setup(props, { emit }){
        const bomb = props.bomb;
        const nearby = computed(() => `${bomb.nearByBombs}`);
        const xy = computed(() => `${bomb.x}/${bomb.y}`);

        const getText = (bomb: Bomb) => {
            if (!bomb.hidden && bomb.bomb){
                return textBomb;
            }
            if (bomb.pinned){
                return textFlag;
            }
            if (bomb.hidden){
                return '';
            }
            
            return `${bomb.nearByBombs}`;
        }

        const text = computed(() => getText(bomb));

        const getClass = (bomb: Bomb) => {
            return {
            };
        };

        const leftClicked = (bomb: Bomb) => {
            emit('left-click', bomb);
        }

        const rightClicked = (bomb: Bomb) => {
            emit('right-click', bomb);
        }

        return {
            text : text,
            getClass,
            leftClicked,
            rightClicked,
        };
    },
});
</script>

<style scoped>
    td{
        border: 3px solid blue;
        border-radius: 5px;
        width: 23px;
        height: 23px;
    }
</style>