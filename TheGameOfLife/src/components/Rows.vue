<template>
    <div class="stocazzo">
        <Cell
            :style="{
                width: `${parseInt(ratio.split('%')[0])}%`,
                height: `100%`
            }"
            class="cardWidth rounded-0"
            v-for="(cell, i) in cells"
            :key="i"
            :state="cell"
        />
    </div>
</template>

<script setup>
import Cell from "./Cell.vue"
const props = defineProps({
    cells: {
        type: Array,
        required: true
    }
});

const ratio = (100 / props.cells.length) + "%";
console.log(ratio);
</script>
<style>
.stocazzo {
    display: flex;
    flex-flow: row nowrap;
    height: v-bind(ratio);
    width: 100%;
}
</style>
