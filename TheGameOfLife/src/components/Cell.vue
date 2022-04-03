<template>
    <v-card :style="{ backgroundColor: color }" @click="updateState" />
</template>

<script setup>
import { watch, ref } from "vue";
// define emits
const emit = defineEmits(["updateSingleCell"]);
// receive cell state from parent component
const props = defineProps({
    cell: {
        type: Object,
        required: true
    }
});

// set cell color based on state
const color = ref("");
watch(
    props,
    () => {
        color.value = props.cell.state ? "green" : "white";
    },
    { immediate: true }
);

function updateState() {
    emit("updateSingleCell", props.cell.id);
}
</script>
