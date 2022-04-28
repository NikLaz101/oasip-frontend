<script setup>
import { ref, onBeforeMount } from "vue";
import Schedules from "../components/Schedules.vue";

const schedules = ref([]);
const category = ref([]);

// GET
const getSchedules = async () => {
	const res = await fetch("http://localhost:5000/schedule");
	if(res.status === 200) {
		schedules.value = await res.json();
	}else console.log("error, cannot get data");
}

// GET
const getCategory = async () => {
	const res = await fetch("http://localhost:5000/category");
	if(res.status === 200) {
		schedules.value = await res.json();
	}else console.log("error, cannot get data");
}

onBeforeMount(async () => {
	await getSchedules(), getCategory();
});
</script>

<template>
	<div id="content-section">
		<schedules
			:schedules="schedules"
			:category="category"
			class="grid justify-center pt-2"
		/>
	</div>
</template>

<style scoped></style>
