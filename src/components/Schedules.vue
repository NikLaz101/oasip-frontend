<script setup>
import { ref, onBeforeMount } from "vue";
import moment from "moment";
import Detail from "./buttons/Detail.vue";
import Create from "./buttons/Create.vue";
import Delete from "./buttons/Delete.vue";
import Navbar from "./buttons/Navbar.vue";

const schedules = ref([]);
const URL = "http://intproj21.sit.kmutt.ac.th/at1/api/event";

// GET
const getSchedules = async () => {
  const res = await fetch(URL);
  if (res.status === 200) {
    schedules.value = await res.json();
  } else console.log("error, cannot get data");
};


onBeforeMount(async () => {
  await getSchedules();
});

//DELETE
const removeSchedules = async (removeContentID) => {
  if (confirm("Do you really want to delete")) {
    const res = await fetch(URL + "/" + removeContentID, {
      method: "DELETE",
    });
    if (res.status === 200) {
      schedules.value = schedules.value.filter(
        (schedules) => schedules.id !== removeContentID
      );
      console.log("deleted successfullly");
    } else console.log("error, cannot delete");
  }
};

// EDIT
const modifySchedules = async (newid, newtime, newnotes) => {
  const res = await fetch(URL + "/" + newid, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      eventStartTime: newtime,
      eventNotes: newnotes,
    }),
  });
  if (res.status === 201) {
    getSchedules();
    const modify = await res.json();
    schedules.value = schedules.value.map((schedules) =>
      schedules.id === modify.id
        ? {
            ...schedules,
            eventStartTime: newtime,
            eventNotes: newnotes
          }
        : schedules
    );
    console.log("edited successfully");
  } else console.log("error, cannot edit");
};

const currentDetail = ref({});
const moreDetail = (curbookingId) => {
  currentDetail.value = curbookingId;
};
</script>

<template>
  <div id="contents-list" v-cloak class="pt-20">
    <h1 class="text-5xl font-medium py-5">Schedules Event</h1>
    <div class="overflow-y-scroll table-content">
      <table class="table table-zebra w-full rounded-full break-all">
        <thead>
          <tr>
            <!-- Narbar -->
            <Navbar />
            <th>
              <!-- Create -->
              <Create @click:action="getSchedules()" />
            </th>
          </tr>
          <!-- Detail  -->
        </thead>
        <div v-if="schedules < 1" class="text-5xl pt-20" v-cloak>
          No Scheduled Events
        </div>
        <tbody v-else>
          <tr v-for="contents in schedules" :key="contents.id">
            <td class="p-10 text-xl w-1/5 m-auto break-all">{{ contents.bookingName }}</td>

            <td class="p-10 text-xl">
              {{ contents.categoryName }}
            </td>

            <td class="p-10 text-xl">
              {{
                moment(contents.eventStartTime).format("D MMMM YYYY, h:mm:ss A")
              }}
            </td>

            <td class="p-10 text-xl">{{ contents.eventDuration }} minute</td>

            <td>
              <!-- Delete -->
              <div id="showDetail">
                <Delete @delete="removeSchedules(contents.id)" />
                <!-- MoreDetails -->
                <Detail
                  @moreDetail="moreDetail(contents)"
                  :detail="currentDetail"
                  @editDetail="modifySchedules"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}
.box-element {
  @apply my-3;
  width: 1000px;
  height: 10px;
  background-color: #b3853d;
}
.textarea {
  @apply textarea-ghost focus:outline-none;
}
.table-content {
  height: 600px;
}
table th,
#Name {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}
input,
textarea {
  color: rgb(0 0 0);
}
#size {
  font-size: 1rem;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>
