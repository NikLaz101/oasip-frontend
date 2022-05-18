<script setup>
import { ref, onBeforeMount } from "vue";
defineEmits(["click:action"]);
const error = ref({});
const category = ref([]);
const URLC = "http://intproj21.sit.kmutt.ac.th/at1/api/category";
const URLE = "http://intproj21.sit.kmutt.ac.th/at1/api/event";

// GET
const getCategories = async () => {
  const res = await fetch(URLC);
  if (res.status === 200) {
    category.value = await res.json();
  } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
  await getCategories();
});

// POST
const createNewSchedules = async (
  Name,
  Email,
  selectedId,
  Time,
  Duration,
  Notes
) => {
  const res = await fetch(URLE, {
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
  if (res.status === 201) {
    error.value = {};
  } else if (res.status === 400) {
    error.value = await res.json();
    console.log(error.value);
  } else console.log("error, cannot be added");
};

const Name = ref();
const Email = ref();
const Selected = ref();
const Time = ref();
const Duration = ref();
const Notes = ref();
const selectedId = ref();

const newDuration = () => {
  category.value.forEach((category) => {
    if (category.eventCategoryName === Selected.value) {
      Duration.value = category.eventDuration;
      selectedId.value = category.id;
    }
    // console.log(category.eventCategoryName);
    // console.log(Duration.value);
  });
};

</script>

<template>
  <label
    for="my-modal"
    class="btn text-xl font-extrabold px-10"
    @click="
      Name = undefined;
      Email = undefined;
      Selected = undefined;
      Time = undefined;
      Duration = undefined;
      Notes = undefined;
      error = {};
    "
    >CREATE</label
  >
  <input type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <label for="my-modal" class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <table>
        <tr>
          <th id="size">Name:</th>
          <td id="size">
            <input type="text" v-model="Name" />
            <p id="error">{{ error.bookingName }}</p>
          </td>
        </tr>
        <tr>
          <th id="size">Email:</th>
          <td id="size">
            <input type="text" v-model="Email" />
            <p id="error">{{ error.bookingEmail }}</p>
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
                @change="newDuration"
                v-model="Selected"
              >
                <option selected>--Select--</option>
                <option
                  v-for="categorys in category"
                  :value="categorys.eventCategoryName"
                >
                  {{ categorys.eventCategoryName }}
                </option>
              </select>
              <p id="error">{{ error.categoryId }}</p>
            </form>
          </td>
        </tr>
        <tr>
          <th id="size">Date:</th>
          <td id="size">
            <input type="datetime-local" v-model="Time" />
            <p id="error">{{ error.eventStartTime }}</p>
          </td>
        </tr>
        <tr>
          <th id="size">Duration:</th>
          <td id="size">
            <input id="Duration" readonly type="text" v-model="Duration" />
          </td>
        </tr>
        <tr>
          <th id="size">Note:</th>
          <td id="size">
            <textarea cols="30" rows="5" v-model="Notes"></textarea>
            <p id="error">{{ error.eventNotes }}</p>
          </td>
        </tr>
      </table>

      <div class="modal-action">
        <label
          @click="
            $emit('click:action');
            createNewSchedules(Name, Email, selectedId, Time, Duration, Notes);
          "
          class="btn"
          >Create</label
        >
      </div>
    </div>
  </div>
</template>

<style>
input,
textarea {
  color: rgb(0 0 0);
}
table th,
#Name {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}
#size {
  font-size: 1rem;
}
#Duration {
  background-color: #b7babd;
}
#error {
  color: red;
  font-size: 1.5ch;
}
</style>
