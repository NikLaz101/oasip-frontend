<script setup>
import { ref, onBeforeMount } from "vue";
import Schedules from "../components/Schedules.vue";

const schedules = ref([]);

// GET
const getSchedules = async () => {
	// const res = await fetch("http://localhost:5000/schedule");
	const res = await fetch("http://localhost:8080/api/event");
	if(res.status === 200) {
		schedules.value = await res.json();
		console.log(schedules.value);
	}else console.log("error, cannot get data");
}


onBeforeMount(async () => {
	await getSchedules();
});
</script>

<template>
	<div id="content-section">
		<schedules
			:schedules="schedules"
			class="grid justify-center pt-2"
		/>
	</div>
</template>

<style scoped></style>
