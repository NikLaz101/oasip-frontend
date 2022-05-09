<script setup>
import { ref, computed, onBeforeMount } from "vue";
import moment from "moment";
import Detail from "./buttons/Detail.vue";
import Create from "./buttons/Create.vue";
import Delete from "./buttons/Delete.vue";
import Navbar from "./buttons/Navbar.vue";

const schedules = ref([]);

// GET
const getSchedules = async () => {
  const res = await fetch("http://ip21at1.sit.kmutt.ac.th:5000/api/event");
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
const createNewSchedules = async (
  Name,
  Email,
  selectedId,
  Time,
  Duration,
  Notes
) => {
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
      eventNotes: Notes,
    }),
  });
  if (res.status === 200) {
    const addedSchedules = await res.json();
    schedules.value.push(addedSchedules);
    console.log(addedSchedules);
  } else console.log("error, cannot be added");
};
// const newDetail = computed(() => {
//   return {
//     bookingName: props.content.bookingName,
//     bookingEmail: props.content.bookingEmail,
//     categoryId: props.content.categoryId,
//     categoryName: props.content.categoryName,
//     eventStartTime: props.content.eventStartTime,
//     eventDuration: props.content.eventDuration,
//     eventNotes: props.content.eventNotes,
//   };
// });

const currentDetail = ref({});
const moreDetail = (curbookingId) => {
  currentDetail.value = curbookingId;
};
</script>

<template>
  <div id="contents-list" v-cloak class="pt-20">
    <h1 class="text-5xl font-medium py-5">Schedules Event</h1>
    <div class="overflow-y-scroll table-content">
      <table class="table table-zebra w-full rounded-full">
        <thead>
          <tr>
            <!-- Narbar -->
            <Navbar />
            <th>
              <!-- Create -->
              <Create
                @create="
                  createNewSchedules
                "
              />
            </th>
          </tr>
          <!-- Detail  -->
        </thead>
        <div v-if="schedules < 1" class="text-5xl pt-20" v-cloak>
          No Scheduled Events
        </div>
        <tbody v-else>
          <tr v-for="contents in schedules" :key="contents.id">
            <td class="p-10 text-xl">{{ contents.bookingName }}</td>

            <td class="p-10 text-xl">
              {{ contents.categoryName }}
            </td>

            <td class="p-10 text-xl">
              {{
                moment(contents.eventStartTime).format("D MMMM YYYY, h:mm:ss A")
              }}
            </td>

            <td class="p-10 text-xl">
              {{ contents.eventDuration }} minute
            </td>

            <td>
              <!-- Delete -->
              <div id="showDetail">
                <Delete @delete="removeSchedules(contents.id)" />
                <!-- MoreDetails -->
                <Detail
                  @moreDetail="moreDetail(contents)"
                  :detail="currentDetail"
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
