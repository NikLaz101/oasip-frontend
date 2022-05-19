<script setup>
import { ref, onBeforeMount } from "vue";
defineEmits(["option"]);
const category = ref([]);

// GET
const getCategories = async () => {
  const res = await fetch(import.meta.env.BASE_URL + "api/category");
  if (res.status === 200) {
    category.value = await res.json();
  } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
  await getCategories();
});
</script>

<template>
  <th class="text-xl font-extrabold px-10">NAME</th>
  <th class="px-10">
    <div class="dropdown">
      <button tabindex="0" class="m-1 text-xl font-extrabold">CLINIC</button>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 bg-base-300 shadow rounded-box w-64 mt-7"
      >
      <li><button @click="$emit('option',0)" class="text-xl">All Clinic</button></li>
        <li v-for="content in category">
          <button @click="$emit('option',content.id)" class="text-xl">{{ content.eventCategoryName.substring(0,content.eventCategoryName.length - 7) }} </button>
        </li>
      </ul>
    </div>
  </th>
<th class="px-10">
    <div class="dropdown">
      <button tabindex="0" class="m-1 text-xl font-extrabold">DATE</button>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 bg-base-300 shadow rounded-box w-36 mt-7"
      >
      <li><button class="text-xl">Upcoming</button></li>
      <li><button class="text-xl">Past</button></li>
      </ul>
    </div>
  </th>  <th class="text-xl font-extrabold px-10">DURATION</th>
</template>

<style></style>
