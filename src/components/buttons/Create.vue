<script setup>
import { ref, computed, onBeforeMount } from "vue";

defineEmits(["create"]);
defineProps({
  create: {
    type: Object,
    require: true,
  },
});

const category = ref([]);

// GET
const getCategories = async () => {
  const res = await fetch("http://10.4.56.81:5000/api/category");
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
          </td>
        </tr>
        <tr>
          <th id="size">Email:</th>
          <td id="size">
            <input type="text" v-model="Email" />
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
            </form>
          </td>
        </tr>
        <tr>
          <th id="size">Date:</th>
          <td id="size">
            <input type="datetime-local" v-model="Time" />
          </td>
        </tr>
        <tr>
          <th id="size">Duration:</th>
          <td id="size">
            <input readonly type="text" v-model="Duration" />
          </td>
        </tr>
        <tr>
          <th id="size">Note:</th>
          <td id="size">
            <textarea cols="30" rows="5" v-model="Notes"></textarea>
          </td>
        </tr>
      </table>

      <div class="modal-action">
        <label
          for="my-modal"
          @click="
            $emit('create', Name, Email, selectedId, Time, Duration, Notes)
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
</style>
