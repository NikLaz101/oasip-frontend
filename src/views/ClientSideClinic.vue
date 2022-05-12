<script setup>
import { ref, onBeforeMount } from "vue";
import ClientSideClinic from "../components/ClientSideContents.vue";

const URL = "http://localhost:5000/schedules/ClientSideClinic";

const schedules = ref([]);

// GET
const getSchedules = async (url) => {
	const res = await fetch(url);
	if (res.status === 200) {
		schedules.value = await res.json();
		schedules.value = schedules.value.reverse();
	}
};

onBeforeMount(async () => {
	await getSchedules(URL);
});
</script>

<template>
	<div id="content-section">
		<ClientSideClinic
			:entries="schedules"
			class="grid justify-center pt-2"
		/>
	</div>
</template>

<style scoped></style>
