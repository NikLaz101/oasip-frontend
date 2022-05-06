<script setup>
import { ref, onBeforeMount } from "vue";
import Schedules from "../components/Schedules.vue";
const schedules = ref([]);

// GET
const getSchedules = async () => {
	// const res = await fetch("http://localhost:5000/schedule");
		const res = await fetch("http://ip21at1.sit.kmutt.ac.th:5000/api/event");
		// const res = await fetch("http://localhost:8080/api/event/");
	if(res.status === 200) {
		schedules.value = await res.json();
		console.log(schedules.value);
	}else console.log("error, cannot get data");
}

//DELETE
const removeSchedules = async (removeContentID) => {
  if (confirm("Do you really want to delete")) {
    const res = await fetch(
      `http://ip21at1.sit.kmutt.ac.th:5000/api/event/${removeContentID}`,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      schedules.value = schedules.value.filter(
        (schedules) => schedules.id !== removeContentID
      );
      console.log("deleted successfullly");
    } else console.log("error, cannot delete");
  }
};

// POST
const createNewSchedules = async (newName, newSrc, newGPS, newDetails) => {
  const res = await fetch("http://localhost:5000/Central", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      src: newSrc,
      name: newName,
      details: newDetails,
      GPS: newGPS,
    }),
  });
  if (res.status === 201) {
    const addedCentral = await res.json();
    Central.value.push(addedCentral);
    console.log("added sucessfully");
  } else console.log("error, cannot be added");

  EditCentral.value = {};
};

onBeforeMount(async () => {
	await getSchedules();
});
</script>

<template>
	<div id="content-section">
		<schedules
			:content="schedules"
			@delete="removeSchedules"
			class="grid justify-center pt-2"
		/>
	</div>
</template>

<style scoped></style>
