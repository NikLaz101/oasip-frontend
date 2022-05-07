<script setup>
import { ref, onBeforeMount, onBeforeUpdate } from "vue";
import Schedules from "../components/Schedules.vue";
const schedules = ref([]);

const category = ref([]);
// GET
const getCategorys = async () => {
		const res = await fetch("http://ip21at1.sit.kmutt.ac.th:5000/api/category");
	if(res.status === 200) {
		category.value = await res.json();
		console.log(category.value);
	}else console.log("error, cannot get data");
}

// GET
const getSchedules = async () => {
	// const res = await fetch("http://localhost:5000/schedule");
		const res = await fetch("http://ip21at1.sit.kmutt.ac.th:5000/api/event");
		// const res = await fetch("http://localhost:8080/api/event/");
	if(res.status === 200) {
		schedules.value = await res.json();
		// console.log(schedules.value);
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
const createNewSchedules = async (Name, Email, selectedId, Time, Duration, Notes) => {
  const res = await fetch("http://ip21at1.sit.kmutt.ac.th:5000/api/event", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      bookingName: Name,
      bookingEmail: Email,
      categoryId: selectedId,
      eventStartTime: Time,
      eventDuration: Duration,
      eventNotes:Notes
    }),
  });
  if (res.status === 201) {
    const addedSchedules = await res.json();
    schedules.value.push(addedSchedules);
    console.log("added sucessfully");
  } else console.log("error, cannot be added");

};

onBeforeMount(async () => {
	await getSchedules(), getCategorys();
});
onBeforeUpdate(async () => {
	await getSchedules();
});
</script>

<template>
	<div id="content-section">
		<schedules
			:content="schedules"
      :category="category"
			@delete="removeSchedules"
      @create="createNewSchedules"
			class="grid justify-center pt-2"
		/>
	</div>
</template>

<style scoped></style>
