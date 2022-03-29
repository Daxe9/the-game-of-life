<template>
    <v-row>
        <Cell
            :style="{
                width: `${100/cells.length}%`,
                height: `${100/cells.length}vh`
            }"
            class="cardWidth rounded-0"
            v-for="(cell, i) in cells"
            :key="i"
            :state="cell"
        />
    </v-row>
</template>

<script setup>
import Cell from "./Cell.vue"
import { defineProps } from "vue";

defineProps({
    cells: {
        type: Array,
        required: true
    }
});

</script>

