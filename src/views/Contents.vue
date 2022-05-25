<script setup>
import Schedules from "../components/Schedules.vue";
import SortDate from "../components/SortDate.vue";
import {ref} from 'vue';
const sortdate = ref();

const getSortDate = async(date) => {
    const res = await fetch(import.meta.env.VITE_EVENT_URL + '/sort-date/' + date );
  if (res.status === 200) {
    sortdate.value = await res.json();
  } else console.log("error, cannot get data");
}
</script>

<template>
  <div id="content-section">
    <h1 class="text-5xl font-medium pt-5 px-32">
      Schedules Event <sort-date @sort-date="getSortDate" />
    </h1>
    <schedules :date="sortdate" />
  </div>
</template>

<style scoped></style>
