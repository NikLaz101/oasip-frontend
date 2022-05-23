<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
defineEmits(["option"]);

const schedules = ref([]);
const appRouter = useRouter();
const URL_EVENT = "http://intproj21.sit.kmutt.ac.th/at1/api/event";

// GET
const getSchedules = async () => {
  const res = await fetch(URL_EVENT);
  if (res.status === 200) {
    schedules.value = await res.json();
  } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
    await getSchedules();
});

const scheduleRouter = () =>appRouter.push({name: "contents"});
const categoryRouter = () => appRouter.push({ name: "categoryContents"});
</script>

<template>
    <th class="text-xl font-extrabold px-10">
        <div class="dropdown dropdown-hover">
            <button tabindex="0" class="m-1 text-xl font-extrabold">
                CATEGORY
            </button>
            <ul
                tabindex="0"
                class="dropdown-content menu p-2 bg-base-300 shadow rounded-box w-64"
            >
                <li>
                    <button class="text-xl" @click="scheduleRouter">Name</button>
                </li>
                <li>
                    <button class="text-xl" @click="categoryRouter">Category</button>
                </li>
            </ul>
        </div>
    </th>
    <th class="text-xl font-extrabold px-10">DESCRIPTION</th>
    <th class="text-xl font-extrabold px-10">DURATION</th>
</template>

<style></style>
