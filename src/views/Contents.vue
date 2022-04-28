<script setup>
import { ref, onBeforeMount } from "vue";
import Schedules from "../components/Schedules.vue";

const URL = "http://localhost:5000/schedules";

const schedules = ref([]);

// GET
const getSchedules = async (url) => {
	const res = await fetch(url);
	if (res.status === 200) {
		schedules.value = await res.json();
	}
};

onBeforeMount(async () => {
	await getSchedules(URL);
});
</script>

<template>
	<div id="content-section">
		<Schedules
			:schedules="schedules"
			class="grid justify-center pt-2"
		/>
	</div>
</template>

<style scoped></style>
