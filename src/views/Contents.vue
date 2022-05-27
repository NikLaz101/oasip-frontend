<script setup>
import Schedules from "../components/Schedules.vue";
import SortDate from "../components/buttons/scheduleBtn/SortDate.vue";
import {ref} from 'vue';
const sortdate = ref();

</script>

<template>
  <div id="content-section">
    <h1 class="inline-block text-5xl font-medium pt-5 pl-32 pr-5">
      Schedules Event</h1>
    <schedules />
  </div>
</template>

<style scoped></style>
