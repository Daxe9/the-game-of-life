<template>
    <v-card :style="{backgroundColor: color}">
        {{state}}
    </v-card>
</template>

<script setup>
import { watch, ref } from "vue";
const props = defineProps({
    state: {
        type: String,
        required: true
    }
});
let color = ref("")
watch(props, () => {
    color.value = props.state === "#" ? "green" : "white"
}, {immediate: true})
</script>

<style scoped>

</style>