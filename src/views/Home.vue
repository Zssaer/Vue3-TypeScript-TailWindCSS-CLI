<template>
  <h2>{{ home }}</h2>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getHome } from "@/api/home";

const home = ref("");
getHome().then((res) => {
  home.value = res.data
})

</script>

<style scoped>
</style>