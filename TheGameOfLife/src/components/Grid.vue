<template>
    <v-container>
        <transition
            :appear="true"
            :css="false"
            @enter="enter"
            @before-enter="beforeEnter"
        >
            <v-alert ref="alert" v-show="board.isDead" outlined shaped text type="success">
                Everybody died.
            </v-alert>
        </transition>
        <v-container id="control-panel">
            <v-row>
                <v-col
                >
                    <v-btn @click="singleUpdate">Single Update</v-btn>
                    <v-btn @click="runUpdates">Start</v-btn>
                    <v-btn @click="addRandomCells">Add</v-btn>
                    <v-btn @click="stopUpdates">Stop</v-btn>
                    <v-btn @click="clearGrid">Clear</v-btn>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="width"
                        :disabled="hasInput"
                        label="Width"
                        @change="change"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        <h3 class="text-center">Generation: <span class="red lighten-1">{{ board.generation }}</span></h3>
        <v-container
            :style="{ height: '80vh', width: '80vh' }"
            class="flex-column elevation-9"
        >
            <Rows
                v-for="(row, rowIndex) in board.matrix"
                :key="rowIndex"
                :cells="row"
                @updateSingleCell="updateSingleCell"
            />
        </v-container>
    </v-container>
</template>

<script setup>
import gsap from "gsap";
import {ref} from "vue";
import GameGrid from "../modules/GameGrid";
import Rows from "./Rows.vue";

// setup
const isStopped = ref(false);
const width = ref(null);
const hasInput = ref(false);
let board = ref(new GameGrid(parseInt(width.value)));

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
    hasInput.value = false;
    board.value.emptyGrid();
    board.value.generation = 0;
    board.value.isDead = false;
}

function change() {
    board.value = new GameGrid(parseInt(width.value));
    hasInput.value = true;
}

function beforeEnter(el) {
    el.style.opacity = 0;
    el.style.transform = "scale(0, -10px)";
}

function enter(el, done) {
    gsap.to(el, {
        duration: 1,
        opacity: 1,
        scale: 1,
        ease: "power4.out",
        onComplete: done,
    })
}
function updateSingleCell(id) {
    board.value.updateSingleCell(id);
}
</script>
