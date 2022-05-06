<script setup>
import { ref, computed, onBeforeMount } from "vue";
import moment from "moment";

defineEmits(["delete", "create"]);
const props = defineProps({
  content: {
    type: Array,
    require: true,
  },
});

const category = ref([]);
const newDuration = ref([])
// GET
const getCategorys = async () => {
		const res = await fetch("http://ip21at1.sit.kmutt.ac.th:5000/api/category");
	if(res.status === 200) {
		category.value = await res.json();
		console.log(category.value);
	}else console.log("error, cannot get data");
}

onBeforeMount(async () => {
	await getCategorys();
});

// category.value.forEach(category => console.log(1));
const newDetail = computed(() => {    
  return {
    bookingName: props.content.bookingName,
    bookingEmail: props.content.bookingEmail,
    categoryId: props.content.categoryId,
    categoryName: props.content.categoryName,
    eventStartTime: props.content.eventStartTime,
    eventDuration: props.content.eventDuration,
    eventNotes: props.content.eventNotes,
  };
});

const currentDetail = ref([]);
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
            <th class="text-xl font-extrabold px-10">NAME</th>
            <th class="px-10">
              <div class="dropdown">
                <button tabindex="0" class="m-1 text-xl font-extrabold">
                  CLINIC
                </button>
                <ul
                  tabindex="0"
                  class="dropdown-content menu p-2 bg-base-300 shadow rounded-box w-auto mt-7"
                >
                  <li>
                    <button class="text-xl">Project Management</button>
                  </li>
                  <li>
                    <button class="text-xl">DevOps/Infra</button>
                  </li>
                  <li>
                    <button class="text-xl">Database</button>
                  </li>
                  <li>
                    <button class="text-xl">Client-Side</button>
                  </li>
                  <li>
                    <button class="text-xl">Server-Side</button>
                  </li>
                </ul>
              </div>
            </th>
            <th class="text-xl font-extrabold px-10">DATE</th>
            <th class="text-xl font-extrabold px-10">DURATION</th>
            <th>
              <label for="my-modal" class="btn modal-button">CREATE</label>
              <input type="checkbox" id="my-modal" class="modal-toggle" />
              <div class="modal">
                <div class="modal-box">
                  <label
                    for="my-modal"
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                    >✕</label
                  >
                  <!-- Create -->
                  <table>
        <tr>
            <th id="size">Name:</th>
            <td id="size">
                <input type="text" v-model="newDetail.bookingName" />
            </td>
        </tr>
        <tr>
            <th id="size">Email:</th>
            <td id="size">
                <input type="text" v-model="newDetail.bookingEmail" />
            </td>
        </tr>
        <tr>
            <th id="size">Clinic:</th>
            <td id="size">
                <form>
                    <select
                        id="clinics"
                        name="clinics"
                        class="text-black"
                        v-model="newDetail.categoryName"
                    >
                        <option selected>--Select--</option>
                        <option value="Project Management">
                            Project Management
                        </option>
                        <option value="DevOps/Infra">DevOps/Infra</option>
                        <option value="Database">Database</option>
                        <option value="Client-Side">Client-Side</option>
                        <option value="Server-Side">Server-Side</option>
                    </select>
                </form>
            </td>
        </tr>
        <tr>
            <th id="size">Date:</th>
            <td id="size">
                <input
                    type="datetime-local"
                    v-model="newDetail.eventStartTime"
                />
            </td>
        </tr>
        <tr>
            <th id="size">Duration:</th>
            <td id="size">
                <input type="text" v-model="newDetail.eventDuration" />
            </td>
        </tr>
        <tr>
            <th id="size">Note:</th>
            <td id="size">
                <textarea
                    cols="30"
                    rows="5"
                    v-model="newDetail.eventNotes"
                ></textarea>
            </td>
        </tr>
    </table>

                  <div class="modal-action">
                    <button @click="$emit('create')" class="btn">Create</button>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <div v-if="content < 1" class="text-5xl pt-20">No Scheduled Events</div>
        <tbody v-else>
          <tr v-for="contents in content" :key="contents.id">
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
              {{ contents.eventDuration }}
            </td>

            <td>
              <!-- Delete -->
              <div id="showDetail">
                <button @click="$emit('delete', contents.id)" class="btn m-2">
                  Delete
                </button>
                <label
                  for="my-modal-3"
                  class="btn modal-button"
                  @click="moreDetail(contents)"
                  >Detail</label
                >
                <input type="checkbox" id="my-modal-3" class="modal-toggle" />
                <div class="modal">
                  <div class="modal-box relative">
                    <label
                      for="my-modal-3"
                      class="btn btn-sm btn-circle absolute right-2 top-2"
                      >✕</label
                    >
                    <table>
                      <tbody>
                        <tr>
                          <td></td>
                          <td class="text-base font-bold">DETAIL</td>
                        </tr>
                        <tr>
                          <td>Name</td>
                          <td>
                            {{ currentDetail.bookingName }}
                          </td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>
                            {{ currentDetail.bookingEmail }}
                          </td>
                        </tr>
                        <tr>
                          <td>CLINIC</td>
                          <td>
                            {{ currentDetail.categoryName }}
                          </td>
                        </tr>
                        <tr>
                          <td>DATE</td>
                          <td>
                            {{
                              moment(currentDetail.eventStartTime).format(
                                "D MMMM YYYY, h:mm:ss A"
                              )
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td>DURATION</td>
                          <td>
                            {{ currentDetail.eventDuration }}
                          </td>
                        </tr>
                        <tr>
                          <td>NOTE</td>
                          <td v-if="currentDetail.eventNotes != null">
                            {{ currentDetail.eventNotes }}
                          </td>
                          <td v-else class="opacity-50">
                            <b>No messages</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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
table th {
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
