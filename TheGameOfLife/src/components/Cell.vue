<template>
    <v-card :style="{backgroundColor: color}" />
</template>

<script setup>
import { watch, ref } from "vue";
// receive cell state from parent component
const props = defineProps({
    state: {
        type: String,
        required: true
    }
});

// set cell color based on state
const color = ref("")
watch(props, () => {
    color.value = props.state === "#" ? "green" : "white"
}, {immediate: true})

</script>
