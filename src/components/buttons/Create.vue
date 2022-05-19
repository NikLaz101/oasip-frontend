<script setup>
import { ref, onBeforeMount } from "vue";
defineEmits(["create"]);
defineProps({
  error: {
    type: Object,
    default: {},
  },
});

const isModalOn = ref(false);
const category = ref([]);

// GET
const getCategories = async () => {
  const res = await fetch(import.meta.env.BASE_URL + "api/category");
  if (res.status === 200) {
    category.value = await res.json();
  } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
  await getCategories();
});

const Name = ref();
const Email = ref();
const Selected = ref();
const Time = ref();
const Duration = ref();
const Notes = ref("");
const selectedId = ref();

const newDuration = () => {
  category.value.forEach((category) => {
    if (category.eventCategoryName === Selected.value) {
      Duration.value = category.eventDuration;
      selectedId.value = category.id;
    }
  });
};

const field = "bg-base-100 italic";
</script>

<template>
  <div id="create">
    <button
      class="btn text-xl font-extrabold px-10"
      @click="
        Name = undefined;
        Email = undefined;
        Selected = undefined;
        Time = undefined;
        Duration = undefined;
        Notes = '';
        error = {};
        isModalOn = !isModalOn;
      "
    >
      CREATE
    </button>
    <div v-show="isModalOn" class="modal-show flex justify-center">
      <div class="modal-content bg-base-100 rounded-2xl">
        <div class="flex justify-end">
          <button class="close" @click="isModalOn = !isModalOn">x</button>
        </div>
        <div class="grid justify-center">
          <label for="name">Name</label>
          <div class="py-3">
            <input
              type="text"
              v-model="Name"
              maxlength="100"
              class="bg-base-100 italic"
              placeholder="Your name"
            />
            <p class="error">{{ error.bookingName }}</p>
          </div>

          <label for="Email">Email</label>
          <div class="py-3">
            <input
              type="text"
              v-model="Email"
              maxlength="50"
              class="bg-base-100 border-b-2 italic"
              placeholder="Your email"
            />
            <p class="error">{{ error.bookingEmail }}</p>
          </div>
          <label for="clinics">Clinic</label>
          <div class="py-3">
            <select
              name="clinics"
              class="bg-base-100 border-b-2 italic"
              @change="newDuration"
              v-model="Selected"
            >
              <option
                v-for="categorys in category"
                :value="categorys.eventCategoryName"
              >
                {{ categorys.eventCategoryName }}
              </option>
            </select>
            <p class="error">{{ error.categoryId }}</p>
          </div>
          <label for="Date">Date</label>
          <div class="py-3">
            <input type="datetime-local" v-model="Time" class="text-black" />
            <p class="error">{{ error.eventStartTime }}</p>
          </div>
          <label for="Duration">Duration (minutes)</label>
          <div class="py-3">
            <input
              class="bg-base-100 border-b-2 italic focus:outline-none pointer-events-none"
              readonly
              type="text"
              v-model="Duration"
              placeholder="Select your clinic"
            />
          </div>
          <label for="Note">Note</label>
          <div class="py-3">
            <textarea
              cols="50"
              rows="2"
              v-model="Notes"
              maxlength="500"
              class="bg-base-100 border-b-2 italic p-2"
              placeholder="Your message"
            ></textarea>
            <p class="error">{{ error.eventNotes }}</p>
          </div>
        </div>
        <div class="flex justify-end pt-2">
          <button
            @click="
              $emit('create', Name, Email, selectedId, Time, Duration, Notes);
              Name == undefined ||
              Email == undefined ||
              Selected == undefined ||
              Time == undefined
                ? isModalOn
                : (isModalOn = !isModalOn);
            "
            class="btn"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
input,
textarea,
select {
  border-color: #494a7d;
  border-radius: 5px;
  padding: 10px;
  border-width: 2px;
  width: 100%;
}
input:focus,
textarea:focus,
select:focus {
  outline: none !important;
  border: 2px solid #fcc302;
  /* box-shadow: 0 0 10px #719ece; */
}
.modal-content {
  margin: auto;
  padding: 20px;
  width: 500px;
}
.modal-show {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(32, 32, 32);
  background-color: rgba(73, 73, 73, 0.4);
}
.close {
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: rgb(82, 80, 80);
  text-decoration: none;
  cursor: pointer;
}
.auto-fill {
  background-color: #b7babd;
}
.error {
  color: red;
  font-size: 1.5ch;
}
</style>
