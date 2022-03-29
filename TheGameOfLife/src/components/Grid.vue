<template>
    <v-container>
        <v-alert
            v-show="board.isDead"
            outlined
            shaped
            text
            type="success"
        >
            Everybody died.
        </v-alert>
        <v-container id="control-panel">
            <!--            TODO: add controls -->
            <v-btn @click="singleUpdate">Single Update</v-btn>

            <v-btn @click="runUpdates">Start</v-btn>

        </v-container>

        <v-container id="grid" class="rounded-lg">
            <Rows
                v-for="(row, rowIndex) in board.matrix"
                :key="rowIndex"
                :cells="row"
            />
        </v-container>
        <p>Generation: {{ board.generation }}</p>
    </v-container>
</template>

<script setup>
import {ref} from 'vue'
import GameGrid from "../modules/GameGrid";
import Rows from "./Rows.vue";

const board = ref(new GameGrid(10));
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function singleUpdate() {
    board.value.gridUpdate();
}

async function runUpdates() {
    while (!board.value.isDead) {
        board.value.gridUpdate();
        await sleep(1000);
    }
}

</script>

<style scoped>
#grid {
    border: 2px solid black
}
</style>