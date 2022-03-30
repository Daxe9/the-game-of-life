<template>
    <v-container>
        <v-alert v-show="board.isDead" outlined shaped text type="success">
            Everybody died.
        </v-alert>
        <v-container id="control-panel">
            <v-row>
                <v-col
                    ><v-btn @click="singleUpdate">Single Update</v-btn>
                    <v-btn @click="runUpdates">Start</v-btn>
                    <v-btn @click="addRandomCells">Add</v-btn>
                    <v-btn @click="stopUpdates">Stop</v-btn>
                    <v-btn @click="clearGrid">Clear</v-btn>
                </v-col>
                <v-col>
                    <v-text-field
                        label="Width"
                        v-model="width"
                        :disabled="hasInput"
                        @change="change"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>

        <v-container
            class="rounded-lg flex-column elevation-9"
            :style="{ height: '80vh', width: '80vh' }"
        >
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
import { ref, watch } from "vue";
import GameGrid from "../modules/GameGrid";
import Rows from "./Rows.vue";

// setup
const isStopped = ref(false);
const width = ref(0);
const hasInput = ref(false);
const board = ref(new GameGrid(parseInt(width.value)));

// functions
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function singleUpdate() {
    board.value.gridUpdate();
}
async function runUpdates() {
    isStopped.value = false;
    while (!board.value.isDead && !isStopped.value) {
        board.value.gridUpdate();
        await sleep(1000);
    }
}
function stopUpdates() {
    isStopped.value = true;
}
function addRandomCells() {
    board.value.generateRandomCoordinate();
}
function clearGrid() {
    isStopped.value = true;
    board.value.emptyGrid();
    board.value.generation = 0;
    board.value.isDead = false;
}
function change() {
    console.log(width.value);
    console.log(typeof width.value);
    hasInput.value = true;
}
</script>
